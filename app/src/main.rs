// data-icon="yaiol:video-shot-sequencer"
// ⚠ NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - text, title, aria-label - MUST go through the t() lookup, and
//   the key MUST be a string literal at the call site. Add the key to locales/en.json, then
//   translate, sort and audit every language with the i18n scripts. Never paste translations by hand.

mod catalog;
mod drag;
mod i18n;
mod settings;
mod site;
mod views;
mod window_accent;
mod window_menu;

use catalog::{UisBarWindow, UisAppHeader, UisIcoGithub, UisBtnNews, UisBtnUpdate, UisNewsLoader, UisStgView, news};
use dioxus::html::HasFileData;
use dioxus::prelude::*;
use dioxus_free_icons::{
    Icon,
    icons::ld_icons::{LdCircleHelp, LdSettings},
};
use engine::server::Server;
use settings::Settings;
use std::sync::OnceLock;

const CSS: [&str; 4] = [
    include_str!("../assets/uis-colors.css"),
    include_str!("../assets/uis-app.css"),
    include_str!("../assets/uis-bar-window.css"),
    include_str!("../assets/app.css"),
];

/// The local server the page draws the folder's pictures and videos from.
static SERVER: OnceLock<Server> = OnceLock::new();

fn server() -> &'static Server {
    SERVER.get().expect("the local server is started before the window")
}

// ─── App identity - single source of truth: Cargo.toml (see build.rs) ───────────────────────────
const APP_NAME: &str = env!("YAIOL_PRODUCT_NAME");
const APP_ID: &str = env!("CARGO_PKG_NAME");
const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

/// This build's identity, `<version>.<counter>`, as ONE contiguous string that survives into the
/// executable. The apps-cockpit finds it by its `yaiol-build:` prefix to tell a buffered build from
/// the release it follows - the counter cannot ride in Cargo's three-part version, and `dx bundle`
/// writes its own Windows version resource, so this is the one channel that is entirely ours.
/// ⚠ keep it a single `concat!` of literals, and read it through `black_box` (as
/// app_version_build does). A plain `BUILD_ID["yaiol-build:".len()..]` is constant-folded and the
/// optimiser keeps only the suffix - the PREFIX the cockpit searches for disappears from the exe and
/// every build reads as the bare release (found 2026-10-12 by grepping the staged exe).
const BUILD_ID: &str = concat!("yaiol-build:", env!("YAIOL_BUILD_ID"));

/// The full build identity shown to the user: the release version plus the build counter (the 4th
/// segment a buffered commit bumps), or just the release version on a clean build.
/// ⚠ DISPLAY ONLY. The release version (`CARGO_PKG_VERSION`) stays plain three-part semver
/// and must not absorb the counter: an update check compares it against the published version, and
/// four parts is not semver.
fn app_version_build() -> String {
    let full = std::hint::black_box(BUILD_ID);
    let id = &full["yaiol-build:".len()..];
    id.strip_suffix(".0").unwrap_or(id).to_owned()
}

/// A window that opens at a known size and place. Only a debug build needs it written out: see main().
#[cfg(debug_assertions)]
fn explicit_placement(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    window
        .with_inner_size(dioxus::desktop::LogicalSize::new(1280.0, 820.0))
        .with_position(dioxus::desktop::LogicalPosition::new(120.0, 80.0))
}

#[cfg(not(debug_assertions))]
fn explicit_placement(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    window.with_inner_size(dioxus::desktop::LogicalSize::new(1280.0, 820.0))
}

/// The window has no system frame: the app draws its own bar (`UisBarWindow`), which moves it and holds the three
/// window buttons. The system still resizes it from its edges, and on Windows it keeps its shadow.
fn frameless(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    let window = window.with_decorations(false);
    #[cfg(windows)]
    let window = {
        use dioxus::desktop::tao::platform::windows::WindowBuilderExtWindows;
        window.with_undecorated_shadow(true)
    };
    window
}

fn main() {
    let _ = SERVER.set(Server::start().expect("the local server starts"));

    // ⚠ in a DEBUG build Dioxus writes the window's position and size to `window-state.json` in
    // the temp folder when the app ends and puts the window back there on the next launch - for EVERY
    // Dioxus app on the machine, from the one shared file. A session that ended while the window was
    // MINIMIZED saved (-32000, -32000) and a 200 px square, so the next `cargo run` opened off screen
    // at that size and could not be brought back. Dioxus restores only what the app did NOT set
    // explicitly, so a debug build sets both, here. A release build never restores anything.
    let window = frameless(explicit_placement(
        dioxus::desktop::WindowBuilder::new().with_title(APP_NAME).with_min_inner_size(dioxus::desktop::LogicalSize::new(900.0, 600.0)),
    ));

    dioxus::LaunchBuilder::desktop()
        .with_cfg(
            dioxus::desktop::Config::new()
                // ⚠ the browser's own right-click menu (Back, Reload, Save as, Print, Inspect) is
                // never offered. Dioxus keeps it in a debug build by default - which is how it reached the
                // list on 2026-10-13 - and an app that wants a context menu draws its own.
                .with_disable_context_menu(true)
                .with_window(window)
                .with_menu(None::<dioxus::desktop::muda::Menu>),
        )
        .launch(App);
}

#[component]
fn App() -> Element {
    let saved = use_hook(settings::load);
    let mut lang = use_signal(|| saved.lang.clone());
    let mut theme = use_signal(|| saved.theme.clone());
    // The project: the folder opened last is opened again, if it is still there.
    let ui = views::Ui {
        lang,
        folder: use_signal(|| if std::path::Path::new(&saved.last_folder).is_dir() { saved.last_folder.clone() } else { String::new() }),
        config: use_signal(|| None),
        disk: use_signal(Vec::new),
        unmatched: use_signal(Vec::new),
        pending: use_signal(|| None),
        scan_gen: use_signal(|| 0),
        collapsed: use_signal(std::collections::HashSet::new),
        grouped: use_signal(|| false),
        status: use_signal(|| (views::Tone::Plain, String::new())),
        busy: use_signal(|| false),
        confirm: use_signal(|| None),
    };
    use_context_provider(|| ui);
    use_hook(|| {
        ui.refresh();
        // The page follows the pointer during a drag and says, at the release, what was dropped where.
        spawn(async move {
            let mut drops = document::eval(drag::BRIDGE_JS);
            while let Ok(msg) = drops.recv::<drag::Msg>().await {
                ui.dropped(msg);
            }
        });
    });
    let mut settings_open = use_signal(|| false);
    // The window bar shows maximize or restore: the window says which, and says so again whenever its size
    // changes (the bar's own button is one way among several: a snap, Win+Up, a double click).
    let mut maximized = use_signal(|| dioxus::desktop::window().is_maximized());
    // The bar is painted like the system's own title bars: the accent colour when the system colours them, and only
    // while this window is the active one (an inactive title bar is neutral). Read again each time the window comes
    // to the front, so a colour changed in the system's settings shows on return.
    let mut bar_colour = use_signal(window_accent::title_bar);
    dioxus::desktop::use_wry_event_handler(move |event, _| {
        if let dioxus::desktop::tao::event::Event::WindowEvent { event, .. } = event {
            match event {
                dioxus::desktop::WindowEvent::Resized(_) => {
                    let now = dioxus::desktop::window().is_maximized();
                    if *maximized.peek() != now {
                        maximized.set(now);
                    }
                }
                dioxus::desktop::WindowEvent::Focused(active) => {
                    if *active {
                        ui.window_focused();
                    }
                    let now = if *active { window_accent::title_bar() } else { None };
                    if *bar_colour.peek() != now {
                        bar_colour.set(now);
                    }
                }
                _ => {}
            }
        }
    });
    use_effect(move || {
        let script = match bar_colour() {
            Some(rgb) => {
                let (bgd, text, hov) = window_accent::bar_colours(rgb);
                format!("const s=document.documentElement.style; s.setProperty('--uis-win-bar-bgd','{bgd}'); s.setProperty('--uis-win-bar-text','{text}'); s.setProperty('--uis-win-bar-hov','{hov}');")
            }
            None => "const s=document.documentElement.style; s.removeProperty('--uis-win-bar-bgd'); s.removeProperty('--uis-win-bar-text'); s.removeProperty('--uis-win-bar-hov');".to_owned(),
        };
        let _ = document::eval(&script);
    });
    // "Show news from yaiol": ONE switch per MACHINE, shared by every yaiol app (a small file in the yaiol
    // app-data folder), so it is read from there rather than from this app's own settings.
    let mut news_on = use_signal(|| news::read_state().enabled);


    // <html> carries the language, its text direction and the theme: the catalog CSS keys off
    // `data-theme`, and a right-to-left language needs `dir` for the webview's own text engine.
    use_effect(move || {
        let code = lang();
        let dir = if engine::is_rtl(&code) { "rtl" } else { "ltr" };
        let _ = document::eval(&format!(
            "const r=document.documentElement; r.setAttribute('lang','{}'); r.setAttribute('dir','{dir}'); r.setAttribute('data-theme','{}');",
            code.replace('_', "-"),
            theme()
        ));
    });

    // Every change persists immediately, so leaving the settings page is plain navigation.
    use_effect(move || settings::save(&Settings { lang: lang(), theme: theme(), last_folder: (ui.folder)() }));

    let code = lang();
    let t = |key: &str| i18n::t(&code, key);
    let tip_help = t("tipHdrHelp");
    let tip_settings = t("tipHdrSettings");
    let (tip_minimize, tip_maximize, tip_restore, tip_close) = (t("tipWinMinimize"), t("tipWinMaximize"), t("tipWinRestore"), t("tipWinClose"));
    let lbl_news = t("lblStgGeneralNews");

    let version = app_version_build();
    // The app's own icon, shown at the start of the window bar: the file the executable carries, as a page picture.
    let app_icon = use_hook(|| {
        use base64::{Engine, engine::general_purpose::STANDARD};
        format!("data:image/png;base64,{}", STANDARD.encode(include_bytes!("../assets/app.png")))
    });
    let help_url = site::site_url(APP_ID, &code, "help");
    let github_url = format!("https://github.com/yaiol/{APP_ID}");

    rsx! {
        for css in CSS {
            style { "{css}" }
        }
        // A folder dropped anywhere on the window becomes the project (files are ignored: the unit of work
        // is a folder).
        div {
            class: "uis-app-root",
            ondragover: move |e| e.prevent_default(),
            ondrop: move |e| {
                e.prevent_default();
                if let Some(dir) = e.files().iter().map(|f| f.path()).find(|p| p.is_dir()) {
                    spawn(async move { ui.open(dir).await });
                }
            },
            // A new version (first) and the yaiol news, in one dialog; what is shown is decided inside.
            UisNewsLoader { app_id: APP_ID, app_version: APP_VERSION, lang: lang() }
            UisBarWindow {
                app_name: APP_NAME,
                app_version: version.clone(),
                icon_src: app_icon,
                maximized: maximized(),
                tip_minimize,
                tip_maximize,
                tip_restore,
                tip_close,
                on_minimize: move |_| dioxus::desktop::window().set_minimized(true),
                on_maximize: move |_| dioxus::desktop::window().toggle_maximized(),
                on_close: move |_| dioxus::desktop::window().close(),
                on_drag: move |_| dioxus::desktop::window().drag(),
                on_menu: move |_| window_menu::show(),
                button {
                    class: if settings_open() { "uis-barh-window-btn uis-stg-toggle active" } else { "uis-barh-window-btn uis-stg-toggle" },
                    title: "{tip_settings}",
                    "aria-label": "{tip_settings}",
                    "aria-pressed": "{settings_open()}",
                    onclick: move |_| settings_open.toggle(),
                    Icon { width: 14, height: 14, icon: LdSettings }
                }
                button {
                    class: "uis-barh-window-btn",
                    title: "{tip_help}",
                    "aria-label": "{tip_help}",
                    onclick: move |_| {
                        let _ = open::that(&help_url);
                    },
                    Icon { width: 14, height: 14, icon: LdCircleHelp }
                }
                button {
                    class: "uis-barh-window-btn",
                    title: "GitHub",
                    "aria-label": "GitHub",
                    onclick: move |_| {
                        let _ = open::that(&github_url);
                    },
                    UisIcoGithub {}
                }
                // A newer version is out: the reminder, drawn only then; a click reopens the update card.
                UisBtnUpdate { lang: lang() }
                // yaiol has news for this app: the second reminder, drawn only then; a click reopens the announcements.
                UisBtnNews { lang: lang() }
            }
            // The name and the version are in the window bar, so the header holds the work buttons only.
            UisAppHeader { app_name: APP_NAME, app_version: version.clone(), bare: true, views::HeaderControls {} }
            // .uis-app-main = the growable content region. It is also the anchor for any
            // content-scoped overlay (settings, file drop).
            div { class: "uis-app-main",
                if settings_open() {
                    UisStgView {
                        app_name: APP_NAME,
                        app_version: version.clone(),
                        lang: lang(),
                        theme: theme(),
                        on_set_lang: move |l| lang.set(l),
                        on_set_theme: move |th| theme.set(th),
                        on_close: move |_| settings_open.set(false),
                        general_extra: Some(rsx! {
                            div { class: "uis-fld-labelled divider",
                                label { class: "uis-chk-lbl",
                                    input {
                                        r#type: "checkbox",
                                        class: "uis-chk-box",
                                        checked: news_on(),
                                        onchange: move |e| {
                                            news::set_enabled(e.checked());
                                            news_on.set(e.checked());
                                        },
                                    }
                                    "{lbl_news}"
                                }
                            }
                        }),
                    }
                }
                views::Workspace {}
            }
            views::StatusBar {}
            views::ConfirmDialog {}
        }
    }
}
