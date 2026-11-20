//! Dragging, done in the page with the pointer.
//!
//! The page follows the pointer itself (press, move, release) instead of using the browser's own drag and
//! drop: in this kind of window the system takes that mechanism for files dropped from outside (which is
//! how a folder dropped on the window is opened), and the two cannot both be had.
//!
//! The page decides WHAT is dragged and WHERE it would land, draws the hint (a line before or after, a
//! frame for "into") and, on release, sends one message with both. What the drop then DOES is decided in
//! the engine (`engine::drop`), never here.
//!
//! What the page reads from the elements: a chapter is `.vs-chapter` with `data-ch`, `data-locked`,
//! `data-empty`, `data-collapsed`; a shot `.vs-shot` with `data-slot`; a file `.vs-thumb` with `data-file`;
//! a pile `.vs-pile` with `data-v`; an unmatched file `.vs-unmatched-card` with `data-file`; a chapter is
//! dragged by the `.vs-grip` of its `.vs-chapter-head`.

use engine::drop::{Edge, Source, Target};
use serde::Deserialize;

/// The page's message at a release: what was dragged (`s*`) and where (`t*`).
#[derive(Deserialize, Debug, Default)]
#[serde(default)]
pub struct Msg {
    pub sk: String,
    pub sc: u32,
    pub ss: u32,
    pub sv: u32,
    pub sf: String,
    pub tk: String,
    pub tc: u32,
    pub ts: u32,
    pub tv: u32,
    pub tf: String,
    pub te: String,
}

impl Msg {
    pub fn source(&self) -> Option<Source> {
        Some(match self.sk.as_str() {
            "shot" => Source::Shot { chapter: self.sc, slot: self.ss },
            "pile" => Source::Pile { chapter: self.sc, slot: self.ss, version: self.sv },
            "file" => Source::File { chapter: self.sc, slot: self.ss, filename: self.sf.clone() },
            "chapter" => Source::Chapter { chapter: self.sc },
            "unmatched" => Source::Unmatched { filename: self.sf.clone() },
            _ => return None,
        })
    }

    pub fn target(&self) -> Option<Target> {
        let edge = match self.te.as_str() {
            "before" => Edge::Before,
            "into" => Edge::Into,
            _ => Edge::After,
        };
        Some(match self.tk.as_str() {
            "shot" => Target::Shot { chapter: self.tc, slot: self.ts, edge },
            "chapter" => Target::Chapter { chapter: self.tc },
            "chapter-reorder" => Target::ChapterReorder { chapter: self.tc, edge },
            "thumb" => Target::Thumb { chapter: self.tc, slot: self.ts, filename: self.tf.clone(), edge },
            "pile" => Target::Pile { chapter: self.tc, slot: self.ts, version: self.tv, edge },
            _ => return None,
        })
    }
}

/// Installed once.
pub const BRIDGE_JS: &str = r#"
if (!window.__vss) {
  window.__vss = true;
  let down = null;      // a press that may become a drag: { x, y, src }
  let drag = null;      // what is being dragged
  let tgt = null;       // where it would land (stays the last place aimed at, as long as none replaces it)
  let marks = [];
  const num = (el, key) => parseInt(el.dataset[key], 10);
  const unmark = () => { marks.forEach(([el, c]) => el.classList.remove(c)); marks = []; };
  const mark = (el, c) => { if (el) { el.classList.add(c); marks.push([el, c]); } };

  // What a press on `el` would drag. A locked chapter gives nothing away.
  const sourceAt = (el) => {
    if (!el || !el.closest || el.closest('button, input, select, textarea')) return null;
    const card = el.closest('.vs-unmatched-card');
    if (card) return { kind: 'unmatched', filename: card.dataset.file, el: card };
    const chEl = el.closest('.vs-chapter');
    if (!chEl || chEl.dataset.locked === 'true') return null;
    const chapter = num(chEl, 'ch');
    if (el.closest('.vs-chapter-head .vs-grip')) return { kind: 'chapter', chapter, el: chEl };
    const shot = el.closest('.vs-shot');
    if (!shot) return null;
    const slot = num(shot, 'slot');
    const pile = el.closest('.vs-pile');
    if (pile) return { kind: 'pile', chapter, slot, version: num(pile, 'v'), el: pile };
    const thumb = el.closest('.vs-thumb');
    if (thumb && thumb.dataset.file) return { kind: 'file', chapter, slot, filename: thumb.dataset.file, el: thumb };
    return { kind: 'shot', chapter, slot, el: shot };
  };

  // Where a release at (x, y) would land; undefined = nowhere new (the last place stays).
  const targetAt = (x, y) => {
    const el = document.elementFromPoint(x, y);
    const chEl = el && el.closest ? el.closest('.vs-chapter') : null;
    if (!chEl) return undefined;
    const chapter = num(chEl, 'ch');
    const shot = el.closest('.vs-shot');
    if (shot) {
      const slot = num(shot, 'slot');
      const own = drag.chapter === chapter && drag.slot === slot;
      // inside the shot dragged from: another file, or another pile, reorders the versions
      const thumb = el.closest('.vs-thumb');
      if (thumb && drag.kind === 'file' && own && thumb.dataset.file && thumb.dataset.file !== drag.filename) {
        const r = thumb.getBoundingClientRect();
        return { kind: 'thumb', chapter, slot, filename: thumb.dataset.file, edge: (x - r.left) < r.width / 2 ? 'before' : 'after', el: thumb };
      }
      const pile = el.closest('.vs-pile');
      if (pile && drag.kind === 'pile' && own && num(pile, 'v') !== drag.version) {
        const r = pile.getBoundingClientRect();
        return { kind: 'pile', chapter, slot, version: num(pile, 'v'), edge: (x - r.left) < r.width / 2 ? 'before' : 'after', el: pile };
      }
      // the shot's row: a file may also land in its middle ("into" = one more version); a shot only before or after
      const r = shot.getBoundingClientRect();
      const at = y - r.top;
      let edge;
      if (drag.kind === 'file' || drag.kind === 'unmatched') edge = at < r.height * 0.33 ? 'before' : at > r.height * 0.66 ? 'after' : 'into';
      else edge = at < r.height / 2 ? 'before' : 'after';
      return { kind: 'shot', chapter, slot, edge, el: shot };
    }
    const head = el.closest('.vs-chapter-head');
    if (head && drag.kind === 'chapter' && drag.chapter !== chapter) {
      const r = head.getBoundingClientRect();
      return { kind: 'chapter-reorder', chapter, edge: (y - r.top) < r.height / 2 ? 'before' : 'after', el: chEl };
    }
    if (chEl.dataset.empty === 'true' && chEl.dataset.collapsed !== 'true') return { kind: 'chapter', chapter, el: chEl };
    return undefined;
  };

  const show = () => {
    unmark();
    document.body.classList.add('vs-dragging-on');
    marks.push([document.body, 'vs-dragging-on']);
    if (drag.kind === 'shot') mark(drag.el, 'vs-dragging');
    if (!tgt) return;
    if (tgt.kind === 'shot') mark(tgt.el, 'vs-drop-' + tgt.edge);
    else if (tgt.kind === 'thumb' || tgt.kind === 'pile') mark(tgt.el, 'vs-drop-' + tgt.edge + '-thumb');
    else if (tgt.kind === 'chapter-reorder') mark(tgt.el, 'vs-reorder-' + tgt.edge);
    else if (tgt.kind === 'chapter') mark(tgt.el, 'vs-drop-target');
  };
  const end = () => { unmark(); down = null; drag = null; tgt = null; };

  document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const src = sourceAt(e.target);
    if (src) down = { x: e.clientX, y: e.clientY, src };
  });
  document.addEventListener('mousemove', (e) => {
    if (!down) return;
    if (!drag) {
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) < 5) return;
      drag = down.src;
    }
    e.preventDefault();
    const t = targetAt(e.clientX, e.clientY);
    if (t !== undefined) tgt = t;
    show();
  });
  document.addEventListener('mouseup', (e) => {
    if (drag) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      // only a release over the work area is a drop
      if (tgt && el && el.closest && el.closest('.vs-workspace')) {
        dioxus.send({
          sk: drag.kind, sc: drag.chapter || 0, ss: drag.slot || 0, sv: drag.version || 0, sf: drag.filename || '',
          tk: tgt.kind, tc: tgt.chapter || 0, ts: tgt.slot || 0, tv: tgt.version || 0, tf: tgt.filename || '', te: tgt.edge || '',
        });
      }
      // the click that follows a drag's release is not a click
      const swallow = (c) => { c.stopPropagation(); c.preventDefault(); };
      window.addEventListener('click', swallow, { capture: true, once: true });
      setTimeout(() => window.removeEventListener('click', swallow, { capture: true }), 0);
    }
    end();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drag) end(); });
  // the browser's own drag of a picture or a video must not start
  document.addEventListener('dragstart', (e) => { if (e.target && e.target.closest && e.target.closest('.vs-workspace')) e.preventDefault(); });
}
"#;
