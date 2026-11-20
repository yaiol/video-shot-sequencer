# Video Shot Sequencer

Video Shot Sequencer is part of [yaiol Applications](https://apps.yaiol.com).

## Install

Download the latest installer from the [releases page](../../releases/latest).

## Build from source

Requires the Rust toolchain (stable) and, for the installer, the Dioxus CLI (`cargo install dioxus-cli`).

```bash
cargo run                                         # run in development
cd app && dx bundle --desktop --release --package-types nsis   # Windows installer → release/
```

## Architecture

A Cargo workspace of two crates:

- `engine/` — everything that is not the window: reading a project folder into chapters and shots, the
  renumbering rules, what each kind of drop does, the two-step rename on disk, and a small local server
  that gives the folder's pictures and videos to the page. No UI dependency.
- `app/` — the Dioxus desktop shell. The look comes from the shared stylesheet in `app/assets/`;
  strings come from `locales/<lang>.json`, embedded in the executable at build time.
