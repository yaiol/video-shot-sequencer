// ⚠ NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - text, title, aria-label - MUST go through the t() lookup, and
//   the key MUST be a string literal at the call site.

//! The project on screen (`Ui`: its state and every operation) and what draws it: the header's controls,
//! the chapters with their shots, the unmatched files, the status bar and the confirm dialog.
//!
//! Nothing is written to disk by a drag: a drop only changes `pending`, the chapters as they WOULD be.
//! Commit renames the files; Cancel forgets the change.

use crate::{APP_NAME, catalog::UisNum, drag, i18n};
use dioxus::prelude::*;
use dioxus_free_icons::{
    Icon,
    icons::ld_icons::{LdChevronDown, LdChevronRight, LdCombine, LdLayers, LdLock, LdLockOpen, LdStretchHorizontal, LdX},
};
use engine::{
    drop::{self, Dropped},
    model::{self, Chapter, Config, FileEntry, Kind, Shot, pad},
};
use std::{
    cell::RefCell,
    collections::HashSet,
    path::{Path, PathBuf},
    rc::Rc,
};
use tokio::sync::oneshot;

/// The question on screen (Cancel / Discard) and where its answer goes.
#[derive(Clone)]
pub struct Confirm {
    message: String,
    reply: Rc<RefCell<Option<oneshot::Sender<bool>>>>,
}

/// The status line's colour.
#[derive(Clone, Copy, PartialEq)]
pub enum Tone {
    Plain,
    Ok,
    Warn,
    Err,
}

/// Everything about the open project. All signals, so it is `Copy`.
#[derive(Clone, Copy)]
pub struct Ui {
    pub lang: Signal<String>,
    pub folder: Signal<String>,
    pub config: Signal<Option<Config>>,
    /// The chapters as they are on disk (from the last scan).
    pub disk: Signal<Vec<Chapter>>,
    pub unmatched: Signal<Vec<String>>,
    /// The chapters as they would be after the changes not yet committed. `None` = nothing pending.
    pub pending: Signal<Option<Vec<Chapter>>>,
    /// Changes at every scan: part of each thumbnail's address, so a renamed file is drawn afresh.
    pub scan_gen: Signal<u32>,
    pub collapsed: Signal<HashSet<u32>>,
    /// Files of one version drawn as one pile.
    pub grouped: Signal<bool>,
    pub status: Signal<(Tone, String)>,
    pub busy: Signal<bool>,
    pub confirm: Signal<Option<Confirm>>,
}

impl Ui {
    fn t(self, key: &str) -> String {
        i18n::t(&self.lang.peek(), key)
    }

    fn say(self, tone: Tone, text: String) {
        let mut status = self.status;
        status.set((tone, text));
    }

    /// The chapters shown: the pending ones when there are any, else the disk's, with each chapter's lock
    /// as the config says it now.
    fn chapters_now(self) -> Vec<Chapter> {
        if let Some(pending) = self.pending.peek().clone() {
            return pending;
        }
        let locked = self.config.peek().as_ref().map(|c| c.locked_chapters.clone()).unwrap_or_default();
        self.disk.peek().iter().cloned().map(|c| Chapter { locked: locked.contains(&c.chapter), ..c }).collect()
    }

    fn is_dirty(self) -> bool {
        self.pending.peek().is_some()
    }

    // ─── The folder ──────────────────────────────────────────────────────────────────────────────

    pub fn refresh(self) {
        let folder = self.folder.peek().clone();
        if folder.is_empty() {
            return;
        }
        let (mut busy, mut config, mut disk, mut unmatched, mut scan_gen) = (self.busy, self.config, self.disk, self.unmatched, self.scan_gen);
        busy.set(true);
        spawn(async move {
            let wanted = folder.clone();
            let scanned = tokio::task::spawn_blocking(move || model::scan(Path::new(&wanted))).await;
            busy.set(false);
            // the folder may have changed while this one was read
            if *self.folder.peek() != folder {
                return;
            }
            match scanned {
                Ok(Ok(scan)) => {
                    let text = self.t("msgStatusbarScanResult").replace("%N%", &scan.matched.to_string()).replace("%U%", &scan.unmatched.len().to_string());
                    config.set(Some(scan.config));
                    disk.set(scan.chapters);
                    unmatched.set(scan.unmatched);
                    scan_gen += 1;
                    self.say(Tone::Ok, text);
                }
                Ok(Err(e)) => self.say(Tone::Err, e.to_string()),
                Err(e) => self.say(Tone::Err, e.to_string()),
            }
        });
    }

    /// The window came back to the front: read the folder again, to follow renames made in the file
    /// manager meanwhile. Not while changes are pending: reading again would wipe them.
    pub fn window_focused(self) {
        if !self.is_dirty() && !*self.busy.peek() {
            self.refresh();
        }
    }

    async fn ask(self, message: String) -> bool {
        let (tx, rx) = oneshot::channel();
        let mut confirm = self.confirm;
        confirm.set(Some(Confirm { message, reply: Rc::new(RefCell::new(Some(tx))) }));
        rx.await.unwrap_or(false)
    }

    pub fn answer(self, yes: bool) {
        let mut confirm = self.confirm;
        let asked = confirm.write().take();
        if let Some(tx) = asked.and_then(|c| c.reply.borrow_mut().take()) {
            let _ = tx.send(yes);
        }
    }

    /// Make `path` the project folder. Pending changes are lost, so they are asked about first.
    pub async fn open(self, path: PathBuf) {
        if self.is_dirty() && !self.ask(self.t("cfmAppPendingFolderSwitch")).await {
            return;
        }
        let (mut pending, mut folder, mut config, mut disk, mut unmatched) = (self.pending, self.folder, self.config, self.disk, self.unmatched);
        pending.set(None);
        config.set(None);
        disk.set(Vec::new());
        unmatched.set(Vec::new());
        folder.set(path.to_string_lossy().into_owned());
        self.refresh();
    }

    pub async fn pick_folder(self) {
        if self.is_dirty() && !self.ask(self.t("cfmAppPendingFolderSwitch")).await {
            return;
        }
        let window = dioxus::desktop::window();
        let mut dialog = rfd::AsyncFileDialog::new().set_parent(&window.window).set_title(self.t("ttlOsdSelectFolder"));
        // start where the current project is
        if let Some(parent) = Path::new(&*self.folder.peek()).parent().filter(|p| p.is_dir()) {
            dialog = dialog.set_directory(parent);
        }
        if let Some(picked) = dialog.pick_folder().await {
            let mut pending = self.pending;
            pending.set(None);
            self.open(picked.path().to_path_buf()).await;
        }
    }

    fn save_config(self, cfg: Config) {
        let folder = self.folder.peek().clone();
        if let Err(e) = model::save_config(Path::new(&folder), &cfg) {
            self.say(Tone::Err, e.to_string());
        }
        let mut config = self.config;
        config.set(Some(cfg));
    }

    // ─── The folder's settings ───────────────────────────────────────────────────────────────────

    pub fn toggle_lock(self, chapter: u32) {
        let Some(mut cfg) = self.config.peek().clone() else { return };
        match cfg.locked_chapters.iter().position(|c| *c == chapter) {
            Some(i) => {
                cfg.locked_chapters.remove(i);
            }
            None => cfg.locked_chapters.push(chapter),
        }
        cfg.locked_chapters.sort_unstable();
        let locked = cfg.locked_chapters.clone();
        self.save_config(cfg);
        // what is pending keeps its chapters' locks in step
        let pending = self.pending.peek().clone();
        if let Some(pending) = pending {
            self.stage(pending.into_iter().map(|c| Chapter { locked: locked.contains(&c.chapter), ..c }).collect());
        }
    }

    /// Keep the gaps in slot numbers on a drop, or close them. Switching does not renumber anything by
    /// itself: the next drop does, or one of the Compact buttons.
    pub fn toggle_preserve_gaps(self) {
        if let Some(cfg) = self.config.peek().clone() {
            self.save_config(Config { preserve_gaps: !cfg.preserve_gaps, ..cfg });
        }
    }

    pub fn set_width(self, field: fn(&mut Config) -> &mut usize, value: f64) {
        if let Some(mut cfg) = self.config.peek().clone() {
            *field(&mut cfg) = (value.round() as i64).clamp(1, 4) as usize;
            self.save_config(cfg);
        }
    }

    // ─── Staging, committing ─────────────────────────────────────────────────────────────────────

    /// Take changed chapters as the pending state: renumbered here, so the new numbers show at once.
    fn stage(self, chapters: Vec<Chapter>) {
        let Some(cfg) = self.config.peek().clone() else { return };
        let mut pending = self.pending;
        match model::stage(chapters, &cfg) {
            Err(over) => self.say(Tone::Err, self.t("msgStatusbarChapterOverflow").replace("%N%", &over.chapter.to_string()).replace("%M%", &over.max.to_string())),
            Ok(staged) => {
                let count = model::pending_renames(&staged, &cfg).len();
                if count == 0 {
                    // nothing would be renamed: not a change at all
                    pending.set(None);
                    self.say(Tone::Plain, self.t("msgStatusbarNoChanges"));
                } else {
                    pending.set(Some(staged));
                    self.say(Tone::Warn, self.t("msgStatusbarPendingRenames").replace("%N%", &count.to_string()));
                }
            }
        }
    }

    /// Close the gaps of one chapter (`Some`) or of all (`None`): slots become 0..N-1, the order stays.
    pub fn compact(self, only: Option<u32>) {
        let mut chapters = self.chapters_now();
        for ch in chapters.iter_mut().filter(|c| only.is_none_or(|n| c.chapter == n)) {
            for (i, shot) in ch.shots.iter_mut().enumerate() {
                shot.slot = i as u32;
            }
        }
        self.stage(chapters);
    }

    pub fn add_chapter(self) {
        let Some(cfg) = self.config.peek().clone() else { return };
        let mut chapters = self.chapters_now();
        let max = 10u32.pow(cfg.chapter_digits as u32);
        let Some(next) = (0..max).find(|n| !chapters.iter().any(|c| c.chapter == *n)) else {
            self.say(Tone::Err, self.t("msgStatusbarAllChaptersUsed").replace("%N%", &max.to_string()));
            return;
        };
        chapters.push(Chapter { chapter: next, locked: false, shots: Vec::new() });
        chapters.sort_by_key(|c| c.chapter);
        let mut pending = self.pending;
        pending.set(Some(chapters));
        self.say(Tone::Warn, self.t("msgStatusbarEmptyChapterAdded").replace("%ID%", &pad(next, cfg.chapter_digits)));
    }

    pub fn discard(self) {
        let mut pending = self.pending;
        pending.set(None);
        self.say(Tone::Plain, self.t("msgStatusbarPendingDiscarded"));
    }

    pub fn commit(self) {
        let (Some(pending), Some(cfg)) = (self.pending.peek().clone(), self.config.peek().clone()) else { return };
        let renames = model::pending_renames(&pending, &cfg);
        let mut pending_sig = self.pending;
        if renames.is_empty() {
            pending_sig.set(None);
            return;
        }
        let mut busy = self.busy;
        busy.set(true);
        self.say(Tone::Plain, self.t("msgStatusbarRenaming").replace("%N%", &renames.len().to_string()));
        let folder = self.folder.peek().clone();
        spawn(async move {
            let done = tokio::task::spawn_blocking(move || model::apply_renames(Path::new(&folder), &renames)).await;
            busy.set(false);
            let outcome = match done {
                Ok(Ok(count)) => {
                    pending_sig.set(None);
                    Ok(count)
                }
                Ok(Err(e)) => Err(e),
                Err(e) => Err(e.to_string()),
            };
            // read the folder again either way: after a failure it shows what is really there
            self.refresh();
            match outcome {
                Ok(count) => self.say(Tone::Ok, self.t("msgStatusbarRenamed").replace("%N%", &count.to_string())),
                Err(e) => {
                    pending_sig.set(None);
                    self.say(Tone::Err, e);
                }
            }
        });
    }

    /// A drag was released: let the engine say what it does, then stage it.
    pub fn dropped(self, msg: drag::Msg) {
        let (Some(src), Some(tgt), Some(cfg)) = (msg.source(), msg.target(), self.config.peek().clone()) else { return };
        match drop::apply(&self.chapters_now(), &cfg, &src, &tgt) {
            Dropped::Nothing => {}
            Dropped::Locked => self.say(Tone::Warn, self.t("msgStatusbarChapterLocked")),
            Dropped::Changed { chapters, locked } => {
                if let Some(locked) = locked {
                    self.save_config(Config { locked_chapters: locked, ..cfg });
                }
                self.stage(chapters);
            }
        }
    }

    fn open_external(self, filename: &str) {
        let _ = open::that(Path::new(&*self.folder.peek()).join(filename));
    }
}

// ─── Header ─────────────────────────────────────────────────────────────────────────────────────

/// The header's controls: the three digit widths, group / gaps / compact, then Cancel and Commit while
/// changes are pending, Refresh and Open folder.
#[component]
pub fn HeaderControls() -> Element {
    let ui = use_context::<Ui>();
    let code = (ui.lang)();
    let t = |key: &str| i18n::t(&code, key);
    let config = ui.config.read().clone();
    let pending = ui.pending.read().clone();
    let grouped = (ui.grouped)();
    let busy = (ui.busy)();
    let has_folder = !ui.folder.read().is_empty();
    let dirty = pending.is_some();
    let count = match (&pending, &config) {
        (Some(p), Some(cfg)) => model::pending_renames(p, cfg).len(),
        _ => 0,
    };
    let any_gaps = pending.as_ref().map(|p| p.iter().any(|c| c.gap_count() > 0)).unwrap_or_else(|| ui.disk.read().iter().any(|c| c.gap_count() > 0));
    let (tip_chapter, tip_slot, tip_version) = (t("tipHdrDigitsChapter"), t("tipHdrDigitsSlot"), t("tipHdrDigitsVersion"));
    let tip_group = if grouped { t("tipHdrUngroup") } else { t("tipHdrGroup") };
    let preserve = config.as_ref().is_some_and(|c| c.preserve_gaps);
    let tip_gaps = if preserve { t("tipHdrCompactOnDrop") } else { t("tipHdrPreserveGaps") };
    let tip_compact_all = t("tipHdrCompactAll");
    let (btn_cancel, btn_commit, btn_refresh, btn_open) = (t("btnGlobalCancel"), t("btnHdrCommit"), t("btnHdrRefresh"), t("btnHdrOpenFolder"));
    let tip_refresh = if dirty { t("tipHdrRefreshDisabled") } else { t("tipHdrRefresh") };
    let mut grouped_sig = ui.grouped;

    rsx! {
        if let Some(cfg) = config {
            div { class: "uis-barh-grp",
                UisNum {
                    value: Some(cfg.chapter_digits as f64),
                    min: Some(1.0),
                    max: Some(4.0),
                    width: "44px",
                    title: tip_chapter.clone(),
                    "aria-label": "{tip_chapter}",
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            ui.set_width(|c| &mut c.chapter_digits, v);
                        }
                    },
                }
                UisNum {
                    value: Some(cfg.slot_digits as f64),
                    min: Some(1.0),
                    max: Some(4.0),
                    width: "44px",
                    title: tip_slot.clone(),
                    "aria-label": "{tip_slot}",
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            ui.set_width(|c| &mut c.slot_digits, v);
                        }
                    },
                }
                UisNum {
                    value: Some(cfg.version_digits as f64),
                    min: Some(1.0),
                    max: Some(4.0),
                    width: "44px",
                    title: tip_version.clone(),
                    "aria-label": "{tip_version}",
                    on_change: move |v: Option<f64>| {
                        if let Some(v) = v {
                            ui.set_width(|c| &mut c.version_digits, v);
                        }
                    },
                }
            }
            div { class: "uis-barh-grp",
                button {
                    class: if grouped { "uis-btn ico active" } else { "uis-btn ico" },
                    title: "{tip_group}",
                    "aria-label": "{tip_group}",
                    onclick: move |_| grouped_sig.toggle(),
                    Icon { icon: LdLayers }
                }
                button {
                    class: if preserve { "uis-btn ico active" } else { "uis-btn ico" },
                    title: "{tip_gaps}",
                    "aria-label": "{tip_gaps}",
                    onclick: move |_| ui.toggle_preserve_gaps(),
                    Icon { icon: LdStretchHorizontal }
                }
                if any_gaps {
                    button { class: "uis-btn ico", title: "{tip_compact_all}", "aria-label": "{tip_compact_all}", onclick: move |_| ui.compact(None),
                        Icon { icon: LdCombine }
                    }
                }
            }
        }
        if dirty {
            button { class: "uis-btn", disabled: busy, onclick: move |_| ui.discard(), "{btn_cancel}" }
            button { class: "uis-btn primary", disabled: busy || count == 0, onclick: move |_| ui.commit(), "{btn_commit} ({count})" }
        }
        button { class: "uis-btn", title: "{tip_refresh}", disabled: !has_folder || busy || dirty, onclick: move |_| ui.refresh(), "{btn_refresh}" }
        button {
            class: "uis-btn primary",
            disabled: busy,
            onclick: move |_| {
                spawn(async move { ui.pick_folder().await });
            },
            "{btn_open}"
        }
    }
}

// ─── Workspace ──────────────────────────────────────────────────────────────────────────────────

/// A picture or a video's first frame, drawn from the local server.
#[component]
fn Preview(kind: Kind, src: String) -> Element {
    match kind {
        Kind::Image => rsx! {
            img { src: "{src}", alt: "", loading: "lazy", draggable: false }
        },
        Kind::Video => rsx! {
            video { src: "{src}", preload: "metadata", muted: true }
        },
        Kind::Other => rsx! {
            span { class: "vs-mono", "?" }
        },
    }
}

fn file_src(folder: &str, filename: &str, generation: u32) -> String {
    crate::server().file_url(&Path::new(folder).join(filename), generation)
}

#[component]
pub fn Workspace() -> Element {
    let ui = use_context::<Ui>();
    let code = (ui.lang)();
    let t = |key: &str| i18n::t(&code, key);
    let folder = (ui.folder)();
    let config = ui.config.read().clone();
    let pending = ui.pending.read().clone();
    let collapsed = ui.collapsed.read().clone();
    let grouped = (ui.grouped)();
    let busy = (ui.busy)();
    let generation = (ui.scan_gen)();
    let locked_now = config.as_ref().map(|c| c.locked_chapters.clone()).unwrap_or_default();
    let chapters: Vec<Chapter> = match &pending {
        Some(p) => p.clone(),
        None => ui.disk.read().iter().cloned().map(|c| Chapter { locked: locked_now.contains(&c.chapter), ..c }).collect(),
    };
    // a file already taken into the pending change is no longer shown as unmatched
    let claimed: HashSet<&str> = pending.iter().flatten().flat_map(|c| &c.shots).flat_map(|s| &s.files).map(|f| f.filename.as_str()).collect();
    let unmatched: Vec<String> = ui.unmatched.read().iter().filter(|n| !claimed.contains(n.as_str())).cloned().collect();

    let (ttl_open, desc1, desc2) =
        (t("ttlAppOpenFolder"), t("msgAppOpenFolderDesc1").replace("%APP%", APP_NAME), t("msgAppOpenFolderDesc2"));
    let (ttl_none, none_desc, none_hint) = (t("ttlAppNoMatch"), t("msgAppNoMatchDesc"), t("msgAppNoMatchHint"));
    let (lbl_chapter, lbl_shots, lbl_gaps) = (t("lblChapter"), t("lblChapterShots"), t("lblChapterGaps"));
    let (tip_grip, tip_expand, tip_collapse, tip_compact, tip_lock, tip_unlock) =
        (t("tipChapterDragHandle"), t("tipChapterExpand"), t("tipChapterCollapse"), t("tipChapterCompact"), t("tipChapterLock"), t("tipChapterUnlock"));
    let (lbl_alts, lbl_files, emp_chapter, btn_add) = (t("lblShotAlts"), t("lblShotFiles"), t("empChapterEmpty"), t("btnChapterAdd"));
    let (tip_thumb, tip_pile, tip_open) = (t("tipShotThumbHint"), t("tipShotPileHint"), t("tipGlobalOpenExternal"));
    let (lbl_unmatched, emp_unmatched, tip_card) = (t("lblUnmatched"), t("empUnmatchedHint"), t("tipUnmatchedCardHint"));
    let mut collapsed_sig = ui.collapsed;
    let widths = config.clone().unwrap_or_default();
    let has_config = config.is_some();

    // The ▶ of a thumbnail: opens the file in the system's own program for it.
    let preview_btn = |filename: String| {
        let tip = tip_open.clone();
        rsx! {
            button {
                class: "vs-preview-btn",
                title: "{tip}",
                onclick: move |e| {
                    e.stop_propagation();
                    ui.open_external(&filename);
                },
                "▶"
            }
        }
    };

    let draw_file = |f: &FileEntry| {
        let src = file_src(&folder, &f.filename, generation);
        let ext = f.ext.trim_start_matches('.').to_owned();
        rsx! {
            div { key: "{f.filename}", class: "vs-thumb", "data-file": "{f.filename}", title: "{f.filename}\n({tip_thumb})",
                Preview { kind: f.kind, src }
                span { class: "vs-badge vs-mono", "V{pad(f.version, widths.version_digits)}" }
                if !f.extra.is_empty() {
                    span { class: "vs-extra", "{f.extra}" }
                }
                span { class: "vs-ext vs-mono", "{ext}" }
                {preview_btn(f.filename.clone())}
            }
        }
    };

    let draw_pile = |files: Vec<FileEntry>| {
        // the first file is the front of the pile (a video when there is one)
        let front = files[0].clone();
        let src = file_src(&folder, &front.filename, generation);
        let names = files.iter().map(|f| f.filename.as_str()).collect::<Vec<_>>().join("\n");
        let ext = front.ext.trim_start_matches('.').to_owned();
        let behind = files.len() - 1;
        rsx! {
            div { key: "{front.version}", class: "vs-pile", "data-v": "{front.version}", title: "{names}\n({tip_pile})",
                for i in 0..behind {
                    div { key: "{i}", class: "vs-pile-card vs-pile-back", style: "transform: translateX({(i + 1) * 5}px); z-index: {i};" }
                }
                div { class: "vs-pile-card vs-pile-front", style: "z-index: {files.len()};",
                    Preview { kind: front.kind, src }
                    span { class: "vs-badge vs-mono", "V{pad(front.version, widths.version_digits)}" }
                    if behind > 0 {
                        span { class: "vs-pile-count vs-mono", "×{files.len()}" }
                    }
                    span { class: "vs-ext vs-mono", "{ext}" }
                    {preview_btn(front.filename.clone())}
                }
            }
        }
    };

    let draw_shot = |chapter: u32, shot: &Shot| {
        let versions = shot.files.iter().map(|f| f.version).collect::<HashSet<_>>().len();
        let meta_alts = lbl_alts.replace("%N%", &versions.to_string());
        let meta_files = lbl_files.replace("%N%", &shot.files.len().to_string());
        rsx! {
            div { key: "{shot.slot}", class: "vs-shot", "data-slot": "{shot.slot}",
                span { class: "vs-grip", "⠿" }
                span { class: "vs-id vs-mono",
                    span { class: "vs-dim", "{pad(chapter, widths.chapter_digits)}" }
                    "{pad(shot.slot, widths.slot_digits)}"
                }
                div { class: "vs-thumbs",
                    if grouped {
                        {model::piles(shot).into_iter().map(&draw_pile)}
                    } else {
                        {shot.files.iter().map(&draw_file)}
                    }
                }
                div { class: "vs-meta vs-mono",
                    span { class: "vs-alts", "{meta_alts}" }
                    " · {meta_files}"
                }
            }
        }
    };

    rsx! {
        div { class: "uis-app-scroll uis-app-scroll-y vs-workspace",
            div { class: "vs-main-col",
                if folder.is_empty() {
                    div { class: "uis-emp",
                        p { class: "uis-emp-title", "{ttl_open}" }
                        p { class: "uis-emp-sub", "{desc1}" }
                        p { class: "uis-emp-sub", "{desc2}" }
                    }
                }
                if !folder.is_empty() && chapters.is_empty() && has_config {
                    div { class: "uis-emp",
                        p { class: "uis-emp-title", "{ttl_none}" }
                        p { class: "uis-emp-sub", "{none_desc}" }
                        p { class: "uis-emp-sub", "{none_hint}" }
                    }
                }
                {
                    chapters
                        .iter()
                        .map(|ch| {
                            let number = ch.chapter;
                            let is_collapsed = collapsed.contains(&number);
                            let gaps = ch.gap_count();
                            let mut class = String::from("vs-chapter");
                            if ch.locked {
                                class.push_str(" vs-locked");
                            }
                            if is_collapsed {
                                class.push_str(" vs-collapsed");
                            }
                            let tip_fold = if is_collapsed { tip_expand.clone() } else { tip_collapse.clone() };
                            let tip_padlock = if ch.locked { tip_unlock.clone() } else { tip_lock.clone() };
                            let shots_label = lbl_shots.replace("%N%", &ch.shots.len().to_string());
                            let gaps_label = lbl_gaps.replace("%N%", &gaps.to_string());
                            rsx! {
                                div {
                                    key: "{number}",
                                    class: "{class}",
                                    "data-ch": "{number}",
                                    "data-locked": "{ch.locked}",
                                    "data-empty": "{ch.shots.is_empty()}",
                                    "data-collapsed": "{is_collapsed}",
                                    div { class: "vs-chapter-head",
                                        span { class: "vs-grip", title: "{tip_grip}", "⠿" }
                                        button {
                                            class: "vs-collapse-btn",
                                            title: "{tip_fold}",
                                            "aria-label": "{tip_fold}",
                                            onclick: move |_| {
                                                let mut set = collapsed_sig.write();
                                                if !set.remove(&number) {
                                                    set.insert(number);
                                                }
                                            },
                                            if is_collapsed {
                                                Icon { class: "uis-ico-inline", icon: LdChevronRight }
                                            } else {
                                                Icon { class: "uis-ico-inline", icon: LdChevronDown }
                                            }
                                        }
                                        span { class: "vs-label vs-mono", "{lbl_chapter} {pad(number, widths.chapter_digits)}" }
                                        span { class: "vs-chapter-count", "{shots_label}" }
                                        span { class: "vs-chapter-head-actions",
                                            if gaps > 0 {
                                                span { class: "vs-gap-badge", "{gaps_label}" }
                                                button {
                                                    class: "uis-btn ico small",
                                                    title: "{tip_compact}",
                                                    "aria-label": "{tip_compact}",
                                                    disabled: ch.locked,
                                                    onclick: move |_| ui.compact(Some(number)),
                                                    Icon { icon: LdCombine }
                                                }
                                            }
                                            button {
                                                class: if ch.locked { "uis-btn ico small active" } else { "uis-btn ico small" },
                                                title: "{tip_padlock}",
                                                "aria-label": "{tip_padlock}",
                                                onclick: move |_| ui.toggle_lock(number),
                                                if ch.locked {
                                                    Icon { icon: LdLock }
                                                } else {
                                                    Icon { icon: LdLockOpen }
                                                }
                                            }
                                        }
                                    }
                                    if !is_collapsed {
                                        div { class: "vs-chapter-body",
                                            {ch.shots.iter().map(|shot| draw_shot(number, shot))}
                                            if ch.shots.is_empty() {
                                                div { style: "padding: 18px; color: var(--uis-text-mute); text-align: center; font-size: 12px;", "{emp_chapter}" }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                }
                if !folder.is_empty() && has_config {
                    div { class: "vs-add-chapter-row",
                        button { class: "uis-btn", disabled: busy, onclick: move |_| ui.add_chapter(), "{btn_add}" }
                    }
                }
            }
            if !unmatched.is_empty() {
                aside { class: "vs-unmatched-col",
                    div { class: "vs-unmatched",
                        h3 {
                            "{lbl_unmatched} ({unmatched.len()})"
                            br {}
                            span { class: "vs-unmatched-hint", "{emp_unmatched}" }
                        }
                        div { class: "vs-unmatched-grid",
                            {
                                unmatched
                                    .iter()
                                    .map(|name| {
                                        let ext = model::split_name(name).1;
                                        let kind = model::classify(ext);
                                        let src = file_src(&folder, name, generation);
                                        let shown_ext = if ext.is_empty() { "-".to_owned() } else { ext.trim_start_matches('.').to_owned() };
                                        rsx! {
                                            div { key: "{name}", class: "vs-unmatched-card", "data-file": "{name}", title: "{name}\n({tip_card})",
                                                div { class: "vs-thumb",
                                                    Preview { kind, src }
                                                    span { class: "vs-ext vs-mono", "{shown_ext}" }
                                                    {preview_btn(name.clone())}
                                                }
                                                div { class: "vs-unmatched-name vs-mono", "{name}" }
                                            }
                                        }
                                    })
                            }
                        }
                    }
                }
            }
        }
    }
}

// ─── Status bar, confirm ────────────────────────────────────────────────────────────────────────

#[component]
pub fn StatusBar() -> Element {
    let ui = use_context::<Ui>();
    let code = (ui.lang)();
    let t = |key: &str| i18n::t(&code, key);
    let (tone, text) = ui.status.read().clone();
    let folder = (ui.folder)();
    let shown = if !text.is_empty() {
        text
    } else if (ui.busy)() {
        t("msgStatusbarWorking")
    } else {
        t("msgStatusbarReady")
    };
    // The Electron app puts the kind's own name on the span ('ok', 'err', 'warn', ''), and so does this.
    let class = match tone {
        Tone::Plain => "",
        Tone::Ok => "ok",
        Tone::Warn => "warn",
        Tone::Err => "err",
    };
    let shown_folder = if folder.is_empty() { t("msgStatusbarNoFolder") } else { folder.clone() };
    rsx! {
        div { class: "uis-bar-status",
            span { class: "{class}", "{shown}" }
            span { style: "flex: 1;" }
            span { title: "{folder}", "{shown_folder}" }
        }
    }
}

/// The question asked before pending changes are lost: Cancel (has the focus) or Discard.
#[component]
pub fn ConfirmDialog() -> Element {
    let ui = use_context::<Ui>();
    let Some(message) = ui.confirm.read().as_ref().map(|c| c.message.clone()) else {
        return rsx! {};
    };
    let code = (ui.lang)();
    let t = |key: &str| i18n::t(&code, key);
    let (btn_cancel, btn_discard) = (t("btnGlobalCancel"), t("btnGlobalDiscard"));
    rsx! {
        div {
            class: "uis-dl-backdrop",
            onmousedown: move |_| ui.answer(false),
            onkeydown: move |e| {
                if e.key() == Key::Escape {
                    ui.answer(false);
                }
            },
            div { class: "uis-dlp", onmousedown: move |e| e.stop_propagation(),
                button { class: "uis-dl-close", onclick: move |_| ui.answer(false),
                    Icon { icon: LdX }
                }
                p { class: "uis-dlp-title", style: "margin-bottom: 24px;", "{message}" }
                div { class: "uis-dlp-foot",
                    button {
                        class: "uis-btn subtle",
                        onmounted: move |e| async move {
                            let _ = e.set_focus(true).await;
                        },
                        onclick: move |_| ui.answer(false),
                        "{btn_cancel}"
                    }
                    button { class: "uis-btn primary", onclick: move |_| ui.answer(true), "{btn_discard}" }
                }
            }
        }
    }
}
