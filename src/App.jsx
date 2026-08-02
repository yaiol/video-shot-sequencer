// ⚠ CLAUDE - NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - JSX text, title=, placeholder=, aria-label=,
//   confirm/alert/setMsg arguments - MUST go through t('keyName'). No exceptions.
//   Workflow: add keys to src/i18n.js EN, then translate, sort and audit every
//   language via the i18n key workflow. Full procedure: see CLAUDE-i18n.md.
//   Never paste translations by hand. The scripts ARE the work.
import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Settings, HelpCircle, Sun, Moon, X, ScrollText, Lock, LockOpen, ChevronRight, ChevronDown, Layers, StretchHorizontal, Combine } from 'lucide-react';
import pkg from '../package.json';
import { useT, LANGUAGES } from './i18n';
import { checkForUpdate } from './lib/update-check';
import { UpdateBanner } from './lib/ui-update-banner';
import { AppHeader } from './lib/ui-header';
import { NumberField } from './lib/ui-ctl-numberfield';
import { GithubIcon } from './lib/ui-icons';
import yaiolLogo from './assets/yaiol-logo.svg';
// Storage namespace - single source: package.json `storagePrefix`. Never hardcode a prefix.
const STORAGE_PREFIX = pkg.storagePrefix;

const APP_NAME    = pkg.productName;
const APP_VERSION = pkg.version;

// Help page URL - the id comes from package.json `name` (the canonical app id =
// folder = apps.yaiol.com slug). At runtime the lang segment is swapped to the current
// UI language; the help site falls back to EN for languages it does not publish, so any
// code is safe to send.
// CLAUDE: NEVER hardcode the slug here. A typed literal silently drifts from the id and
// 404s the help button - it did, unnoticed, in two shipped apps until 2026-07-28.
const HELP_URL = `https://apps.yaiol.com/en/p/${pkg.name}/help/`;
// GitHub source - owner is constant (yaiol); repo name is the app id (pkg.name).
const GITHUB_URL = `https://github.com/yaiol/${pkg.name}`;

const LS_LANG    = `${STORAGE_PREFIX}-lang`;
const LS_THEME   = `${STORAGE_PREFIX}-theme`;
const DEFAULT_LANG  = 'en';
const DEFAULT_THEME = 'light';

function getApiPort() {
  const params = new URLSearchParams(window.location.search);
  return params.get('apiPort') || '4000';
}
const API = `http://localhost:${getApiPort()}`;

const LS_LAST_FOLDER = `${STORAGE_PREFIX}-lastFolder`;

// ────────────────────────────────────────────────────────────────────────
// Model helpers
//
// A "shot" is the unit of sequencing: chapter + slot. All files sharing the
// same (chapter, slot) belong to the same shot. The version digit V and
// the file extension differentiate the individual files within a shot.
//
// Sequencing produces an ORDERED list of shots per chapter. The shot's id
// (chapter, slot) is derived from its position in that list, so dragging
// reorders → renumbering → file renames on disk.
// ────────────────────────────────────────────────────────────────────────

function pad(n, w) { return String(n).padStart(w, '0'); }

// A chapter has gaps when at least one slot number is missing from the
// 0..maxSlot range - i.e. the slots aren't consecutive starting at 0.
function chapterGapCount(ch) {
  if (!ch.shots.length) return 0;
  const maxSlot = ch.shots.reduce((m, sh) => Math.max(m, sh.slot), 0);
  return (maxSlot + 1) - ch.shots.length;
}
function chapterHasGaps(ch) { return chapterGapCount(ch) > 0; }

const VIDEO_EXTS = ['.mp4', '.mov', '.mkv', '.webm', '.avi'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];

function classifyKind(ext) {
  ext = ext.toLowerCase();
  if (VIDEO_EXTS.includes(ext)) return 'video';
  if (IMAGE_EXTS.includes(ext)) return 'image';
  return 'other';
}

// Group a shot's files into "piles" of files sharing the same version.
// Returns an ordered array of pile arrays, sorted by V asc.
// Within each pile, video files come first (so the visible top of the stack
// is the moving image when present), then images, then others.
function getPiles(shot) {
  const map = new Map();
  for (const f of shot.files) {
    if (!map.has(f.version)) map.set(f.version, []);
    map.get(f.version).push(f);
  }
  const rank = (k) => k === 'video' ? 0 : k === 'image' ? 1 : 2;
  const piles = [...map.entries()].sort((a, b) => a[0] - b[0]).map(([, files]) => files);
  piles.forEach(p => p.sort((a, b) =>
    rank(a.kind) - rank(b.kind) ||
    a.ext.localeCompare(b.ext) ||
    a.extra.localeCompare(b.extra)
  ));
  return piles;
}

// Write piles back into shot.files, assigning version = pile index, and
// concatenating in the new pile order. Clones each file to avoid mutating
// shared refs.
function setPiles(shot, pileList) {
  const out = [];
  pileList.forEach((files, i) => {
    files.forEach(f => out.push({ ...f, version: i }));
  });
  shot.files = out;
}

// Split a free-form filename into (extra, ext) for use as a new shot's file.
function splitNameForInsert(filename) {
  const dot = filename.lastIndexOf('.');
  const ext  = dot >= 0 ? filename.slice(dot) : '';
  const base = dot >= 0 ? filename.slice(0, dot) : filename;
  return { extra: base, ext };
}

function formatFilename(cfg, c, s, v, extra, ext) {
  return `${pad(c, cfg.chapterDigits)}${pad(s, cfg.slotDigits)}${pad(v, cfg.versionDigits)}${extra}${ext}`;
}

// Group raw scan entries into shots (one per chapter+slot), each containing files.
function buildShots(files) {
  const byShot = new Map();
  for (const f of files) {
    const key = `${f.chapter}|${f.slot}`;
    if (!byShot.has(key)) {
      byShot.set(key, { chapter: f.chapter, slot: f.slot, files: [] });
    }
    byShot.get(key).files.push(f);
  }
  // Sort files within a shot for stable display: V asc, then video > image > other
  const kindRank = (k) => k === 'video' ? 0 : k === 'image' ? 1 : 2;
  for (const shot of byShot.values()) {
    shot.files.sort((a, b) =>
      a.version - b.version ||
      kindRank(a.kind) - kindRank(b.kind) ||
      a.ext.localeCompare(b.ext) ||
      a.extra.localeCompare(b.extra)
    );
  }
  // Return shots sorted by chapter then slot
  return [...byShot.values()].sort((a, b) =>
    a.chapter - b.chapter || a.slot - b.slot
  );
}

// Build chapters from a flat list of shots: { chapter, shots[] }
function buildChapters(shots, locked) {
  const byChap = new Map();
  for (const sh of shots) {
    if (!byChap.has(sh.chapter)) byChap.set(sh.chapter, []);
    byChap.get(sh.chapter).push(sh);
  }
  const out = [];
  for (const [chapter, list] of byChap.entries()) {
    list.sort((a, b) => a.slot - b.slot);
    out.push({ chapter, shots: list, locked: locked.includes(chapter) });
  }
  out.sort((a, b) => a.chapter - b.chapter);
  return out;
}

// Compute new (chapter, slot) for every shot AFTER a reorder.
//
// Two slot-assignment policies, controlled by `cfg.preserveGaps`:
//
//   • preserveGaps = true (default, "messy-workflow" mode):
//       Each shot keeps its incoming .slot value. Collisions bump forward
//       (the second shot at slot 2 takes slot 3, etc.). When a new shot is
//       inserted into a chapter, the drop handler pre-assigns its .slot to
//       `prevNeighbor.slot + 1`, so it lands in a gap if one sits at the
//       visual drop position, or extends past the last neighbor otherwise.
//
//   • preserveGaps = false ("tidy" mode):
//       Slots are consolidated 0..N-1 in display order. Any existing gaps
//       are removed at the next drop.
//
// Per-chapter `ch.locked` is the REAL lock - it blocks drops/reorder in the
// drag handlers; by the time we reach renumberChapters, locked chapters
// already have unchanged shot lists, so they renumber identically either way.
//
// Overflow: if a chapter has more shots than `maxSlots`, all higher chapters
// shift up by one. Cascade continues until no overflow remains.
function renumberChapters(chapters, cfg) {
  const maxSlots    = Math.pow(10, cfg.slotDigits);
  const maxChapters = Math.pow(10, cfg.chapterDigits);
  const preserveGaps = cfg.preserveGaps !== false;

  // Step 1: assign slots within each chapter
  const result = chapters.map(ch => {
    if (preserveGaps) {
      // Keep incoming slot numbers; bump forward on collision.
      const used = new Set();
      const newShots = ch.shots.map(sh => {
        let s = sh.slot;
        while (used.has(s)) s++;
        used.add(s);
        return { ...sh, newSlot: s };
      });
      return { ...ch, newShots };
    }
    const newShots = ch.shots.map((sh, i) => ({ ...sh, newSlot: i }));
    return { ...ch, newShots };
  });

  // Step 2: cascade chapter overflow
  // If any chapter has overflow (max newSlot >= maxSlots, or shot count > maxSlots),
  // push subsequent chapters up by 1. Repeat until clean.
  // With preserveGaps on, "overflow" is measured by max newSlot (gaps can push
  // total beyond shot count).
  for (let i = 0; i < result.length - 1; i++) {
    const ch = result[i];
    const maxNewSlot = ch.newShots.reduce((m, sh) => Math.max(m, sh.newSlot), -1);
    const needsRoom = maxNewSlot >= maxSlots || ch.newShots.length > maxSlots;
    if (needsRoom) {
      // Bump every later chapter's number by 1
      for (let j = i + 1; j < result.length; j++) {
        result[j].chapter += 1;
      }
    }
  }

  // Re-sort by chapter (cascade may have pushed numbers)
  result.sort((a, b) => a.chapter - b.chapter);

  // Step 3: detect chapter-number overflow (chapter >= maxChapters).
  // Return structured info; the caller formats the user-facing message via t().
  const tooBig = result.find(ch => ch.chapter >= maxChapters);
  const error  = tooBig ? { chapter: tooBig.chapter, max: maxChapters - 1 } : null;

  return { chapters: result, error };
}

// Produce a list of rename ops from chapters in the "displayed" shape
// (each shot already has its target slot in `slot`, each file its target
// version in `version`). Compares the desired filename against the
// on-disk filename and emits an op for every mismatch.
function computePendingRenames(chapters, cfg) {
  const ops = [];
  for (const ch of chapters) {
    for (const sh of ch.shots) {
      for (const f of sh.files) {
        const to = formatFilename(cfg, ch.chapter, sh.slot, f.version, f.extra, f.ext);
        if (f.filename !== to) ops.push({ from: f.filename, to });
      }
    }
  }
  return ops;
}

// Convert renumbered chapters (with newShots[].newSlot) back into the
// "displayed" shape used for rendering and pending state.
function flattenRenumbered(chapters) {
  return chapters.map(ch => ({
    chapter: ch.chapter,
    locked:  ch.locked,
    shots:   ch.newShots.map(sh => ({
      chapter: ch.chapter,
      slot:    sh.newSlot,
      files:   sh.files,
    })),
  }));
}

// ────────────────────────────────────────────────────────────────────────
// App
// ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [folder, setFolder]       = useState(localStorage.getItem(LS_LAST_FOLDER) || '');
  const [config, setConfig]       = useState(null);
  const [shots,  setShots]        = useState([]);
  const [unmatched, setUnmatched] = useState([]);
  const [pending, setPending]     = useState(null); // null = no pending; else flattened chapters
  const [scanGen, setScanGen]     = useState(0);    // bumps on every successful scan - cache-buster for thumbs
  const [collapsed, setCollapsed] = useState(() => new Set());
  const [grouped,   setGrouped]   = useState(false);
  const [lang,      setLang]      = useState(() => localStorage.getItem(LS_LANG)  || DEFAULT_LANG);
  const [theme,     setTheme]     = useState(() => localStorage.getItem(LS_THEME) || DEFAULT_THEME);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [updateInfo,   setUpdateInfo]     = useState(null);
  const [confirmState, setConfirmState]   = useState(null); // { message, resolve } - inline confirm (window.confirm is blocked in packaged Electron)

  const t = useT(lang);

  // Promise-based inline confirm - resolves true on Discard, false on Cancel/Escape/backdrop.
  const askConfirm = useCallback((message) => new Promise(resolve => setConfirmState({ message, resolve })), []);

  // Persist + apply language
  useEffect(() => {
    localStorage.setItem(LS_LANG, lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  // Persist + apply theme
  useEffect(() => {
    localStorage.setItem(LS_THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check for a new version once on launch (silent if up to date / offline / skipped)
  useEffect(() => {
    checkForUpdate({ appId: pkg.name, alias: STORAGE_PREFIX, currentVersion: APP_VERSION })
      .then(u => { if (u) setUpdateInfo(u); });
  }, []);
  const [status, setStatus]       = useState('');
  const [statusKind, setStatusKind] = useState('');
  const [busy,   setBusy]         = useState(false);

  // Chapters as seen on disk (derived from scan)
  const diskChapters = useMemo(
    () => config ? buildChapters(shots, config.lockedChapters || []) : [],
    [shots, config]
  );
  // What the UI displays - pending takes precedence
  const chapters = pending || diskChapters;
  const isDirty  = pending !== null;
  const pendingCount = useMemo(
    () => isDirty && config ? computePendingRenames(pending, config).length : 0,
    [pending, config, isDirty]
  );
  // Does any chapter currently show slot gaps? Drives visibility of the
  // gap badge per chapter and the Compact-all button in the header.
  const anyChapterHasGaps = useMemo(
    () => (pending || diskChapters).some(chapterHasGaps),
    [pending, diskChapters]
  );
  // Filenames already absorbed into pending - hide them from the unmatched grid
  // so the user doesn't see duplicates while their staged drop is uncommitted.
  const visibleUnmatched = useMemo(() => {
    if (!pending) return unmatched;
    const claimed = new Set();
    for (const ch of pending) for (const sh of ch.shots) for (const f of sh.files) claimed.add(f.filename);
    return unmatched.filter(name => !claimed.has(name));
  }, [unmatched, pending]);

  const setMsg = useCallback((kind, text) => {
    setStatusKind(kind);
    setStatus(text);
  }, []);

  const refresh = useCallback(async (f) => {
    const fld = f || folder;
    if (!fld) return;
    setBusy(true);
    try {
      const r = await fetch(`${API}/scan?folder=${encodeURIComponent(fld)}`);
      if (!r.ok) throw new Error(await r.text());
      const data = await r.json();
      setConfig(data.config);
      setShots(buildShots(data.files));
      setUnmatched(data.unmatched);
      setScanGen(g => g + 1);
      setMsg('ok', t('msgStatusbarScanResult')
        .replace('%N%', data.files.length)
        .replace('%U%', data.unmatched.length));
    } catch (e) {
      setMsg('err', String(e));
    } finally {
      setBusy(false);
    }
  }, [folder, setMsg, t]);

  // Re-scan when the window regains focus - keeps the model in sync with
  // external renames done in Explorer while the app was in the background.
  // Skipped while pending changes exist (focus refresh would wipe them).
  useEffect(() => {
    if (!folder) return;
    refresh(folder);
    const onFocus = () => { if (!pending) refresh(folder); };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [folder, refresh, pending]);

  const openFolder = async () => {
    if (isDirty && !(await askConfirm(t('cfmAppPendingFolderSwitch')))) return;
    const r = await fetch(`${API}/open-folder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: t('ttlOsdSelectFolder') }),
    });
    const data = await r.json();
    if (!data) return;
    setPending(null);
    localStorage.setItem(LS_LAST_FOLDER, data.folder);
    setFolder(data.folder);
  };

  // Window-level drag-and-drop: drop a folder anywhere on the app to open it
  // as a project. Cooperates with the in-workspace shot-drag handlers - those
  // use setData('text/plain') and produce no dataTransfer.files, so this
  // window handler simply ignores internal drags by checking for a directory
  // entry first. Falls through silently when no folder is in the drop.
  const onWindowDragOver = useCallback((e) => {
    // Required to make the window a valid drop target for external files;
    // without this the browser would navigate to the dropped file.
    if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes('Files')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
  }, []);
  const onWindowDrop = useCallback(async (e) => {
    if (!e.dataTransfer || !e.dataTransfer.items || e.dataTransfer.items.length === 0) return;
    // Find the first directory entry in the drop. Files are ignored - only
    // folders are accepted, since the app's unit of work is a project folder.
    let folderFile = null;
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      const item = e.dataTransfer.items[i];
      if (item.kind !== 'file') continue;
      const entry = item.webkitGetAsEntry && item.webkitGetAsEntry();
      if (entry && entry.isDirectory) {
        folderFile = item.getAsFile();
        break;
      }
    }
    if (!folderFile) return; // No folder in this drop - let internal handlers run.
    e.preventDefault();
    e.stopPropagation();
    const newPath = window.electronAPI && window.electronAPI.getFilePath && window.electronAPI.getFilePath(folderFile);
    if (!newPath) { setMsg('err', t('msgStatusbarDropFolderFailed')); return; }
    if (isDirty && !(await askConfirm(t('cfmAppPendingFolderSwitch')))) return;
    setPending(null);
    localStorage.setItem(LS_LAST_FOLDER, newPath);
    setFolder(newPath);
  }, [isDirty, setMsg, t, askConfirm]);

  const saveConfig = useCallback(async (cfg) => {
    setConfig(cfg);
    await fetch(`${API}/save-config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder, config: cfg }),
    });
  }, [folder]);

  const toggleLock = useCallback((chapterNum) => {
    const locked = new Set(config.lockedChapters || []);
    if (locked.has(chapterNum)) locked.delete(chapterNum); else locked.add(chapterNum);
    const newCfg = { ...config, lockedChapters: [...locked].sort((a, b) => a - b) };
    saveConfig(newCfg);
    // Keep the displayed pending state in sync with the new lock set.
    if (pending) {
      const updated = pending.map(ch => ({ ...ch, locked: newCfg.lockedChapters.includes(ch.chapter) }));
      stagePending(updated);
    }
  }, [config, saveConfig, pending]); // eslint-disable-line react-hooks/exhaustive-deps

  // Project-scope: are slot gaps preserved on drop? Toggling off doesn't
  // compact anything by itself - the next drop or commit does. The user can
  // also hit a chapter's Compact button or the header Compact-all action.
  const togglePreserveGaps = useCallback(() => {
    if (!config) return;
    const next = config.preserveGaps === false;
    saveConfig({ ...config, preserveGaps: next });
  }, [config, saveConfig]);

  // One-shot: rewrite a chapter's slot numbers to 0..N-1, preserving order.
  // Stages as pending so the user can review before committing.
  const compactChapter = useCallback((chapterNum) => {
    const base = pending || chapters;
    const next = base.map(ch => {
      if (ch.chapter !== chapterNum) return { ...ch, shots: ch.shots.map(sh => ({ ...sh })) };
      return { ...ch, shots: ch.shots.map((sh, i) => ({ ...sh, slot: i })) };
    });
    stagePending(next);
  }, [pending, chapters]); // eslint-disable-line react-hooks/exhaustive-deps

  // One-shot: compact every chapter at once.
  const compactAll = useCallback(() => {
    const base = pending || chapters;
    const next = base.map(ch => ({ ...ch, shots: ch.shots.map((sh, i) => ({ ...sh, slot: i })) }));
    stagePending(next);
  }, [pending, chapters]); // eslint-disable-line react-hooks/exhaustive-deps

  // Source of truth for the per-chapter lock check used by drag/drop guards.
  const isLocked = useCallback(
    (chapterNum) => !!(config && (config.lockedChapters || []).includes(chapterNum)),
    [config]
  );

  const changeWidth = useCallback((field, value) => {
    const n = Math.max(1, Math.min(4, parseInt(value, 10) || 1));
    saveConfig({ ...config, [field]: n });
  }, [config, saveConfig]);

  // ──────────────────────────────────────────────────────────────────────
  // Drag and drop - shots only (chapter drag would require deeper UI; deferred)
  //
  // The drag state tracks the source shot identity, and the renderer marks
  // the closest drop target. On drop we splice the shot into the new
  // position, then run renumberChapters + computeRenames + applyRenames.
  // ──────────────────────────────────────────────────────────────────────
  const dragRef = useRef(null); // { kind: 'shot'|'chapter', chapter, slot }
  const [dragTarget, setDragTarget] = useState(null); // { kind, chapter, slot, edge }

  const onShotDragStart = (chapter, slot, e) => {
    if (isLocked(chapter)) { e.preventDefault(); return; }
    dragRef.current = { kind: 'shot', chapter, slot };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${chapter}/${slot}`);
  };
  const onPileDragStart = (chapter, slot, version, filenames, e) => {
    if (isLocked(chapter)) { e.preventDefault(); e.stopPropagation(); return; }
    dragRef.current = { kind: 'pile', chapter, slot, version, filenames };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', filenames.join(','));
    e.stopPropagation();
  };
  const onPileDragOver = (chapter, slot, version, e) => {
    if (!dragRef.current || dragRef.current.kind !== 'pile') return;
    const src = dragRef.current;
    if (src.chapter !== chapter || src.slot !== slot) return;
    if (src.version === version) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    const edge = (e.clientX - rect.left) < rect.width / 2 ? 'before' : 'after';
    setDragTarget({ kind: 'pile', chapter, slot, version, edge });
  };
  const onFileDragStart = (chapter, slot, filename, e) => {
    if (isLocked(chapter)) { e.preventDefault(); e.stopPropagation(); return; }
    dragRef.current = { kind: 'file', chapter, slot, filename };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', filename);
    e.stopPropagation(); // don't also trigger shot drag
  };
  const onThumbDragOver = (chapter, slot, filename, e) => {
    if (!dragRef.current || dragRef.current.kind !== 'file') return;
    // Only intra-shot reorder targets thumbs. Cross-shot file drops bubble
    // up to the shot row's handler.
    const src = dragRef.current;
    if (src.chapter !== chapter || src.slot !== slot) return;
    if (src.filename === filename) return; // dropping on self - ignore
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    const edge = (e.clientX - rect.left) < rect.width / 2 ? 'before' : 'after';
    setDragTarget({ kind: 'thumb', chapter, slot, filename, edge });
  };
  const onShotDragOver = (chapter, slot, e) => {
    if (!dragRef.current) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;
    // Files & unmatched can land in the middle ("into" = merge as alt).
    // Shot drags only support before/after.
    const src = dragRef.current;
    const canInto = src && (src.kind === 'file' || src.kind === 'unmatched');
    let edge;
    if (canInto) {
      if (y < h * 0.33) edge = 'before';
      else if (y > h * 0.66) edge = 'after';
      else edge = 'into';
    } else {
      edge = y < h / 2 ? 'before' : 'after';
    }
    setDragTarget({ kind: 'shot', chapter, slot, edge });
  };
  const onChapterDragOver = (chapter, e) => {
    if (!dragRef.current) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragTarget({ kind: 'chapter', chapter });
  };
  const onChapterDragStart = (chapter, e) => {
    if (isLocked(chapter)) { e.preventDefault(); return; }
    dragRef.current = { kind: 'chapter', chapter };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `chapter/${chapter}`);
    e.stopPropagation();
  };
  const onChapterHeaderDragOver = (chapter, e) => {
    if (!dragRef.current || dragRef.current.kind !== 'chapter') return;
    if (dragRef.current.chapter === chapter) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    const edge = (e.clientY - rect.top) < rect.height / 2 ? 'before' : 'after';
    setDragTarget({ kind: 'chapter-reorder', chapter, edge });
  };
  const onDragEnd = () => {
    dragRef.current = null;
    setDragTarget(null);
  };

  // Stage a reorder into pending state. Renumbering runs here so the user
  // sees the new IDs immediately. No disk writes until commit.
  const stagePending = (newChapters) => {
    if (!config) return;
    const cleaned = newChapters.map(ch => ({
      ...ch,
      shots: ch.shots.filter(sh => sh.files && sh.files.length > 0),
    }));
    const { chapters: numbered, error } = renumberChapters(cleaned, config);
    if (error) {
      setMsg('err', t('msgStatusbarChapterOverflow').replace('%N%', error.chapter).replace('%M%', error.max));
      return;
    }
    const flat = flattenRenumbered(numbered);
    const renames = computePendingRenames(flat, config);
    if (renames.length === 0) {
      // Identity reorder - clear pending entirely so the UI doesn't show a fake dirty state
      setPending(null);
      setMsg('', t('msgStatusbarNoChanges'));
      return;
    }
    setPending(flat);
    setMsg('warn', t('msgStatusbarPendingRenames').replace('%N%', renames.length));
  };

  const commitPending = async () => {
    if (!pending || !config) return;
    const renames = computePendingRenames(pending, config);
    if (renames.length === 0) { setPending(null); return; }
    setBusy(true);
    setMsg('', t('msgStatusbarRenaming').replace('%N%', renames.length));
    try {
      const r = await fetch(`${API}/apply-renames`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder, renames }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Rename failed');
      setMsg('ok', t('msgStatusbarRenamed').replace('%N%', data.count));
      setPending(null);
      await refresh();
    } catch (e) {
      setMsg('err', String(e));
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const discardPending = () => {
    setPending(null);
    setMsg('', t('msgStatusbarPendingDiscarded'));
  };

  const toggleCollapsed = (chapterNum) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(chapterNum)) next.delete(chapterNum); else next.add(chapterNum);
      return next;
    });
  };
  const toggleGrouped = () => setGrouped(v => !v);

  const addChapter = () => {
    if (!config) return;
    const current = pending || diskChapters;
    const used = new Set(current.map(ch => ch.chapter));
    const maxChapters = Math.pow(10, config.chapterDigits);
    let next = -1;
    for (let i = 0; i < maxChapters; i++) {
      if (!used.has(i)) { next = i; break; }
    }
    if (next < 0) {
      setMsg('err', t('msgStatusbarAllChaptersUsed').replace('%N%', maxChapters));
      return;
    }
    const newChap = { chapter: next, locked: false, shots: [] };
    // Keep chapters sorted by number so the new one slots into its proper place
    const updated = [...current, newChap].sort((a, b) => a.chapter - b.chapter);
    setPending(updated);
    setMsg('warn', t('msgStatusbarEmptyChapterAdded').replace('%ID%', pad(next, config.chapterDigits)));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const src = dragRef.current;
    const tgt = dragTarget;
    dragRef.current = null;
    setDragTarget(null);
    if (!src || !tgt) return;
    if (src.kind !== 'shot' && src.kind !== 'unmatched' && src.kind !== 'file' && src.kind !== 'chapter' && src.kind !== 'pile') return;

    // Real-lock guard: locked chapters reject every kind of drop, both as
    // source and as target. The drag itself was already blocked at start
    // for in-chapter sources, but a drop that lands ON a locked chapter
    // (from an unmatched file, or as a chapter-reorder target) is rejected
    // here. Show a status message so the user understands why nothing moved.
    const srcCh = (src.kind === 'unmatched') ? null : src.chapter;
    const tgtCh = (tgt.kind === 'chapter-reorder') ? tgt.chapter : tgt.chapter;
    if ((srcCh !== null && srcCh !== undefined && isLocked(srcCh)) || (tgtCh !== undefined && isLocked(tgtCh))) {
      setMsg('warn', t('msgStatusbarChapterLocked'));
      return;
    }

    // Build a working copy of chapters - mutate freely
    const working = chapters.map(ch => ({
      chapter: ch.chapter,
      locked:  ch.locked,
      shots:   ch.shots.map(sh => ({ ...sh, files: [...sh.files] })),
    }));

    // ── Chapter drag: reorder whole chapters ───────────────────────────
    if (src.kind === 'chapter') {
      if (tgt.kind !== 'chapter-reorder') return;
      const fromIdx = working.findIndex(c => c.chapter === src.chapter);
      if (fromIdx < 0) return;
      const [movedCh] = working.splice(fromIdx, 1);
      let toIdx = working.findIndex(c => c.chapter === tgt.chapter);
      if (toIdx < 0) return;
      if (tgt.edge === 'after') toIdx += 1;
      working.splice(toIdx, 0, movedCh);
      // Reassign chapter numbers by new position. Locked flag travels with
      // the chapter (its identity), but config.lockedChapters is keyed by
      // chapter NUMBER - sync it so the lock persists correctly post-rename.
      const newLocked = [];
      working.forEach((ch, i) => {
        ch.chapter = i;
        ch.shots.forEach(sh => { sh.chapter = i; });
        if (ch.locked) newLocked.push(i);
      });
      // Save updated locked list (only if it actually changed)
      const currentLocked = (config.lockedChapters || []).slice().sort((a, b) => a - b);
      const nextLocked    = newLocked.slice().sort((a, b) => a - b);
      if (JSON.stringify(currentLocked) !== JSON.stringify(nextLocked)) {
        saveConfig({ ...config, lockedChapters: nextLocked });
      }
      stagePending(working);
      return;
    }

    // ── Pile drag (group of same-V files moves as one) ────────────────
    if (src.kind === 'pile') {
      const srcChap = working.find(c => c.chapter === src.chapter);
      if (!srcChap) return;
      const srcShot = srcChap.shots.find(s => s.slot === src.slot);
      if (!srcShot) return;
      const srcPiles = getPiles(srcShot);
      const fromIdx = srcPiles.findIndex(p => p.length && p[0].version === src.version);
      if (fromIdx < 0) return;
      const [movedPile] = srcPiles.splice(fromIdx, 1);

      // Same-shot pile reorder
      if ((tgt.kind === 'pile' || tgt.kind === 'shot' || tgt.kind === 'thumb')
          && tgt.chapter === src.chapter && tgt.slot === src.slot) {
        let toIdx;
        if (tgt.kind === 'pile') {
          const ti = srcPiles.findIndex(p => p.length && p[0].version === tgt.version);
          toIdx = ti < 0 ? srcPiles.length
                : tgt.edge === 'after' ? ti + 1 : ti;
        } else if (tgt.kind === 'thumb') {
          // Drop on a thumb inside same shot - locate that thumb's pile in the
          // pre-removal list, then translate to remaining piles
          const tgtFile = srcShot.files.find(f => f.filename === tgt.filename);
          if (!tgtFile) { srcPiles.splice(fromIdx, 0, movedPile); return; }
          const ti = srcPiles.findIndex(p => p[0].version === tgtFile.version);
          toIdx = ti < 0 ? srcPiles.length
                : tgt.edge === 'after' ? ti + 1 : ti;
        } else {
          toIdx = tgt.edge === 'before' ? 0 : srcPiles.length;
        }
        srcPiles.splice(toIdx, 0, movedPile);
        setPiles(srcShot, srcPiles);
        stagePending(working);
        return;
      }

      // Cross-shot or chapter target - rebuild source shot first
      setPiles(srcShot, srcPiles);

      if (tgt.kind === 'chapter') {
        const tgtChap = working.find(c => c.chapter === tgt.chapter);
        if (!tgtChap) return;
        tgtChap.shots.push({ chapter: 0, slot: 0, files: movedPile.map(f => ({ ...f, version: 0 })) });
      } else {
        const tgtChap = working.find(c => c.chapter === tgt.chapter);
        if (!tgtChap) return;
        const tgtIdx = tgtChap.shots.findIndex(s => s.slot === tgt.slot);
        const tgtShot = tgtIdx >= 0 ? tgtChap.shots[tgtIdx] : null;
        if (tgt.edge === 'into' && tgtShot) {
          const usedV = new Set(tgtShot.files.map(f => f.version));
          let v = 0; while (usedV.has(v)) v++;
          movedPile.forEach(f => tgtShot.files.push({ ...f, version: v }));
        } else {
          let idx = tgtIdx >= 0 ? tgtIdx : tgtChap.shots.length;
          if (tgt.edge === 'after') idx += 1;
          tgtChap.shots.splice(idx, 0, {
            chapter: 0, slot: 0,
            files: movedPile.map(f => ({ ...f, version: 0 })),
          });
        }
      }
      stagePending(working);
      return;
    }

    // ── Same-shot file drop: reorder versions within the shot ─────────
    // Files that share a version (CCSV) are treated as one pile - moving
    // any thumb moves its whole pile, so an mp4+jpg pair stays paired.
    // Triggered by drops on a sibling thumb OR the shot row itself,
    // so the user doesn't need pixel-perfect targeting.
    if (src.kind === 'file'
        && (tgt.kind === 'thumb' || tgt.kind === 'shot')
        && tgt.chapter === src.chapter && tgt.slot === src.slot) {
      const srcChap = working.find(c => c.chapter === src.chapter);
      const srcShot = srcChap && srcChap.shots.find(s => s.slot === src.slot);
      if (!srcShot) return;
      const srcFile = srcShot.files.find(f => f.filename === src.filename);
      if (!srcFile) return;

      // If dropping onto a sibling in the SAME pile (same V), it's a no-op.
      if (tgt.kind === 'thumb') {
        const tgtFile = srcShot.files.find(f => f.filename === tgt.filename);
        if (tgtFile && tgtFile.version === srcFile.version) return;
      }

      const piles = getPiles(srcShot);
      const fromIdx = piles.findIndex(p => p[0].version === srcFile.version);
      if (fromIdx < 0) return;
      const [movedPile] = piles.splice(fromIdx, 1);

      let toIdx;
      if (tgt.kind === 'thumb') {
        const tgtFile = srcShot.files.find(f => f.filename === tgt.filename);
        const ti = tgtFile ? piles.findIndex(p => p[0].version === tgtFile.version) : -1;
        toIdx = ti < 0 ? piles.length
              : tgt.edge === 'after' ? ti + 1 : ti;
      } else {
        toIdx = tgt.edge === 'before' ? 0 : piles.length;
      }
      piles.splice(toIdx, 0, movedPile);
      setPiles(srcShot, piles);
      stagePending(working);
      return;
    }

    // ── File drag: move ONE file between shots ─────────────────────────
    if (src.kind === 'file') {
      const srcChap = working.find(c => c.chapter === src.chapter);
      if (!srcChap) return;
      const srcShot = srcChap.shots.find(s => s.slot === src.slot);
      if (!srcShot) return;
      const fileIdx = srcShot.files.findIndex(f => f.filename === src.filename);
      if (fileIdx < 0) return;
      const [movedFile] = srcShot.files.splice(fileIdx, 1);

      if (tgt.kind === 'chapter') {
        const tgtChap = working.find(c => c.chapter === tgt.chapter);
        if (!tgtChap) return;
        tgtChap.shots.push({ chapter: 0, slot: 0, files: [{ ...movedFile, version: 0 }] });
      } else {
        const tgtChap = working.find(c => c.chapter === tgt.chapter);
        if (!tgtChap) return;
        const tgtIdx = tgtChap.shots.findIndex(s => s.slot === tgt.slot);
        const tgtShot = tgtIdx >= 0 ? tgtChap.shots[tgtIdx] : null;

        if (tgt.edge === 'into' && tgtShot) {
          // Merge into target shot - assign next free V
          const usedV = new Set(tgtShot.files.map(f => f.version));
          let v = 0; while (usedV.has(v)) v++;
          tgtShot.files.push({ ...movedFile, version: v });
        } else {
          // New shot at edge position
          let idx = tgtIdx >= 0 ? tgtIdx : tgtChap.shots.length;
          if (tgt.edge === 'after') idx += 1;
          tgtChap.shots.splice(idx, 0, { chapter: 0, slot: 0, files: [{ ...movedFile, version: 0 }] });
        }
      }
      stagePending(working);
      return;
    }

    // ── Shot / unmatched drag: insert a whole shot ─────────────────────
    let moved;
    if (src.kind === 'shot') {
      const srcChap = working.find(c => c.chapter === src.chapter);
      if (!srcChap) return;
      const srcIdx = srcChap.shots.findIndex(s => s.slot === src.slot);
      if (srcIdx < 0) return;
      [moved] = srcChap.shots.splice(srcIdx, 1);
    } else {
      const { extra, ext } = splitNameForInsert(src.filename);
      moved = {
        chapter: 0, slot: 0,
        files: [{
          filename: src.filename,
          chapter: 0, slot: 0, version: 0,
          extra, ext, kind: classifyKind(ext), size: 0,
        }],
      };
    }

    if (tgt.kind === 'chapter') {
      const tgtChap = working.find(c => c.chapter === tgt.chapter);
      if (!tgtChap) return;
      // Drop on the chapter row itself = append at the end. Slot picks up
      // right after the current last shot so a gapped chapter keeps its gaps
      // intact (drop spec option a).
      const lastSlot = tgtChap.shots.length ? tgtChap.shots[tgtChap.shots.length - 1].slot : -1;
      moved.slot = lastSlot + 1;
      tgtChap.shots.push(moved);
    } else {
      const tgtChap = working.find(c => c.chapter === tgt.chapter);
      if (!tgtChap) return;
      let idx = tgtChap.shots.findIndex(s => s.slot === tgt.slot);
      if (idx < 0) idx = tgtChap.shots.length;
      if (tgt.edge === 'into') {
        // Unmatched-as-merge: append file into target shot with next free V
        const tgtShot = tgtChap.shots[idx];
        if (tgtShot) {
          const usedV = new Set(tgtShot.files.map(f => f.version));
          let v = 0; while (usedV.has(v)) v++;
          tgtShot.files.push({ ...moved.files[0], version: v });
          stagePending(working);
          return;
        }
      }
      if (tgt.edge === 'after') idx += 1;
      // Drop spec option (a): the inserted shot's slot reflects the visual
      // drop position, not its source slot. With preserveGaps on, this lets
      // it fall into an existing gap when one sits at that position;
      // otherwise it bumps neighbors forward via the collision rule in
      // renumberChapters. With preserveGaps off, slot is overwritten anyway.
      const prevSlot = idx > 0 ? tgtChap.shots[idx - 1].slot : -1;
      moved.slot = prevSlot + 1;
      tgtChap.shots.splice(idx, 0, moved);
    }

    stagePending(working);
  };

  const onUnmatchedDragStart = (filename, e) => {
    dragRef.current = { kind: 'unmatched', filename };
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', filename);
  };

  // ──────────────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────────────
  return (
    <div className="app-root" onDragEnd={onDragEnd} onDragOver={onWindowDragOver} onDrop={onWindowDrop}>
      {/* ── Update banner - notify-only, dismissible. See ../CLAUDE.md → "Update feed". ── */}
      <UpdateBanner info={updateInfo} appId={pkg.name} lang={lang} storagePrefix={STORAGE_PREFIX} t={t} onClose={() => setUpdateInfo(null)} />
      <AppHeader appName={APP_NAME} appVersion={APP_VERSION}>
        {config && (
          <div className="barh-grp">
            <NumberField min={1} max={4} width={44} value={config.chapterDigits}
                   title={t('tipHdrDigitsChapter')} aria-label={t('tipHdrDigitsChapter')}
                   onChange={v => changeWidth('chapterDigits', v)} />
            <NumberField min={1} max={4} width={44} value={config.slotDigits}
                   title={t('tipHdrDigitsSlot')} aria-label={t('tipHdrDigitsSlot')}
                   onChange={v => changeWidth('slotDigits', v)} />
            <NumberField min={1} max={4} width={44} value={config.versionDigits}
                   title={t('tipHdrDigitsVersion')} aria-label={t('tipHdrDigitsVersion')}
                   onChange={v => changeWidth('versionDigits', v)} />
          </div>
        )}
        {config && (
          <div className="barh-grp">
            <button
              className={`btn icon${grouped ? ' active' : ''}`}
              onClick={toggleGrouped}
              title={grouped ? t('tipHdrUngroup') : t('tipHdrGroup')}
              aria-label={grouped ? t('tipHdrUngroup') : t('tipHdrGroup')}
            >
              <Layers />
            </button>
            <button
              className={`btn icon${config.preserveGaps !== false ? ' active' : ''}`}
              onClick={togglePreserveGaps}
              title={config.preserveGaps !== false ? t('tipHdrCompactOnDrop') : t('tipHdrPreserveGaps')}
              aria-label={config.preserveGaps !== false ? t('tipHdrCompactOnDrop') : t('tipHdrPreserveGaps')}
            >
              <StretchHorizontal />
            </button>
            {anyChapterHasGaps && (
              <button
                className="btn icon"
                onClick={compactAll}
                title={t('tipHdrCompactAll')}
                aria-label={t('tipHdrCompactAll')}
              >
                <Combine />
              </button>
            )}
          </div>
        )}
        {isDirty && (
          <>
            <button className="btn" onClick={discardPending} disabled={busy}>{t('btnGlobalCancel')}</button>
            <button className="btn primary" onClick={commitPending} disabled={busy || pendingCount === 0}>
              {t('btnHdrCommit')} ({pendingCount})
            </button>
          </>
        )}
        <button className="btn" onClick={() => refresh()} disabled={!folder || busy || isDirty}
                title={isDirty ? t('tipHdrRefreshDisabled') : t('tipHdrRefresh')}>
          {t('btnHdrRefresh')}
        </button>
        <button className="btn primary" onClick={openFolder} disabled={busy}>{t('btnHdrOpenFolder')}</button>
        <span className="bar-spacer" />
        <div className="barh-grp">
          <button className="btn icon" onClick={() => window.open(GITHUB_URL, '_blank')} title="GitHub" aria-label="GitHub">
            <GithubIcon />
          </button>
          <button className="btn icon" onClick={() => window.open(HELP_URL.replace('/en/p/', `/${lang.replace(/_/g, '-')}/p/`), '_blank')} title={t('tipHdrHelp')} aria-label={t('tipHdrHelp')}>
            <HelpCircle />
          </button>
          <button className="btn icon" onClick={() => setSettingsOpen(true)} title={t('tipHdrSettings')} aria-label={t('tipHdrSettings')}>
            <Settings />
          </button>
        </div>
      </AppHeader>

      {settingsOpen && (
        <SettingsDialog
          t={t}
          lang={lang} setLang={setLang}
          theme={theme} setTheme={setTheme}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* .app-main content region (Rule 14) — bar-status below is its chrome sibling */}
      <div className="app-main">
      <div className="app-scroll app-scroll-y workspace" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
        <div className="main-col">
        {!folder && (
          <div className="empty">
            <h2>{t('ttlAppOpenFolder')}</h2>
            <p>{t('msgAppOpenFolderDesc1')
                  .replace('%APP%', APP_NAME)
                  .replace('%PATTERN%', 'CCSVExtra.ext')}</p>
            <p>{t('msgAppOpenFolderDesc2').replace('%INI%', 'vss.ini')}</p>
          </div>
        )}

        {folder && chapters.length === 0 && config && (
          <div className="empty">
            <h2>{t('ttlAppNoMatch')}</h2>
            <p>{t('msgAppNoMatchDesc').replace('%PATTERN%', 'CCSVExtra.ext')}</p>
            <p>{t('msgAppNoMatchHint')}</p>
          </div>
        )}

        {chapters.map(ch => {
          const isDropChapter = dragTarget && dragTarget.kind === 'chapter' && dragTarget.chapter === ch.chapter;
          const isReorderTgt  = dragTarget && dragTarget.kind === 'chapter-reorder' && dragTarget.chapter === ch.chapter;
          const isCollapsed = collapsed.has(ch.chapter);
          const chClasses = ['chapter'];
          if (ch.locked) chClasses.push('locked');
          if (isDropChapter) chClasses.push('drop-target');
          if (isCollapsed) chClasses.push('collapsed');
          if (isReorderTgt && dragTarget.edge === 'before') chClasses.push('reorder-before');
          if (isReorderTgt && dragTarget.edge === 'after')  chClasses.push('reorder-after');
          return (
            <div
              key={ch.chapter}
              className={chClasses.join(' ')}
              onDragOver={e => { if (ch.shots.length === 0 && !isCollapsed) onChapterDragOver(ch.chapter, e); }}
            >
              <div
                className="chapter-head"
                onDragOver={e => onChapterHeaderDragOver(ch.chapter, e)}
              >
                <span
                  className="grip"
                  draggable
                  onDragStart={e => onChapterDragStart(ch.chapter, e)}
                  title={t('tipChapterDragHandle')}
                >⠿</span>
                <button
                  className="collapse-btn"
                  onClick={() => toggleCollapsed(ch.chapter)}
                  title={isCollapsed ? t('tipChapterExpand') : t('tipChapterCollapse')}
                  aria-label={isCollapsed ? t('tipChapterExpand') : t('tipChapterCollapse')}
                >
                  {isCollapsed ? <ChevronRight className="icon-inline" /> : <ChevronDown className="icon-inline" />}
                </button>
                <span className="label mono">{t('lblChapter')} {pad(ch.chapter, config.chapterDigits)}</span>
                <span className="chapter-count">{t('lblChapterShots').replace('%N%', ch.shots.length)}</span>
                <span className="chapter-head-actions">
                  {chapterHasGaps(ch) && (
                    <>
                      <span className="gap-badge">{t('lblChapterGaps').replace('%N%', chapterGapCount(ch))}</span>
                      <button
                        className="btn icon small"
                        onClick={() => compactChapter(ch.chapter)}
                        title={t('tipChapterCompact')}
                        aria-label={t('tipChapterCompact')}
                        disabled={ch.locked}
                      >
                        <Combine />
                      </button>
                    </>
                  )}
                  <button
                    className={`btn icon small${ch.locked ? ' active' : ''}`}
                    onClick={() => toggleLock(ch.chapter)}
                    title={ch.locked ? t('tipChapterUnlock') : t('tipChapterLock')}
                    aria-label={ch.locked ? t('tipChapterUnlock') : t('tipChapterLock')}
                  >
                    {ch.locked ? <Lock /> : <LockOpen />}
                  </button>
                </span>
              </div>
              {!isCollapsed && <div className="chapter-body">
                {ch.shots.map(sh => {
                  const isDragging = dragRef.current && dragRef.current.kind === 'shot'
                    && dragRef.current.chapter === ch.chapter && dragRef.current.slot === sh.slot;
                  const isTarget = dragTarget && dragTarget.kind === 'shot'
                    && dragTarget.chapter === ch.chapter && dragTarget.slot === sh.slot;
                  const classes = ['shot'];
                  if (isDragging) classes.push('dragging');
                  if (isTarget && dragTarget.edge === 'before') classes.push('drop-before');
                  if (isTarget && dragTarget.edge === 'after')  classes.push('drop-after');
                  if (isTarget && dragTarget.edge === 'into')   classes.push('drop-into');

                  const altCount = new Set(sh.files.map(f => f.version)).size;

                  return (
                    <div
                      key={sh.slot}
                      className={classes.join(' ')}
                      draggable
                      onDragStart={e => onShotDragStart(ch.chapter, sh.slot, e)}
                      onDragOver={e => onShotDragOver(ch.chapter, sh.slot, e)}
                    >
                      <span className="grip">⠿</span>
                      <span className="id mono">
                        <span className="dim">{pad(ch.chapter, config.chapterDigits)}</span>
                        {pad(sh.slot, config.slotDigits)}
                      </span>
                      <div className="thumbs">
                        {grouped
                          ? getPiles(sh).map(pileFiles => {
                              const v = pileFiles[0].version;
                              const isPileTarget = dragTarget && dragTarget.kind === 'pile'
                                && dragTarget.chapter === ch.chapter
                                && dragTarget.slot === sh.slot
                                && dragTarget.version === v;
                              return (
                                <Pile
                                  key={v}
                                  files={pileFiles}
                                  version={v}
                                  folder={folder}
                                  cfg={config}
                                  gen={scanGen}
                                  t={t}
                                  dropEdge={isPileTarget ? dragTarget.edge : null}
                                  onDragStart={e => onPileDragStart(ch.chapter, sh.slot, v, pileFiles.map(f => f.filename), e)}
                                  onDragOver={e => onPileDragOver(ch.chapter, sh.slot, v, e)}
                                />
                              );
                            })
                          : sh.files.map(f => {
                              const isThumbTarget = dragTarget && dragTarget.kind === 'thumb'
                                && dragTarget.chapter === ch.chapter
                                && dragTarget.slot === sh.slot
                                && dragTarget.filename === f.filename;
                              return (
                                <Thumb
                                  key={f.filename}
                                  file={f}
                                  folder={folder}
                                  cfg={config}
                                  gen={scanGen}
                                  t={t}
                                  dropEdge={isThumbTarget ? dragTarget.edge : null}
                                  onDragStart={e => onFileDragStart(ch.chapter, sh.slot, f.filename, e)}
                                  onDragOver={e => onThumbDragOver(ch.chapter, sh.slot, f.filename, e)}
                                />
                              );
                            })}
                      </div>
                      <div className="meta mono">
                        <span className="alts">{t('lblShotAlts').replace('%N%', altCount)}</span>
                        {' · '}
                        {t('lblShotFiles').replace('%N%', sh.files.length)}
                      </div>
                    </div>
                  );
                })}
                {ch.shots.length === 0 && (
                  <div style={{ padding: 18, color: 'var(--text-mute)', textAlign: 'center', fontSize: 12 }}>
                    {t('empChapterEmpty')}
                  </div>
                )}
              </div>}
            </div>
          );
        })}

        {folder && config && (
          <div className="add-chapter-row">
            <button className="btn" onClick={addChapter} disabled={busy}>{t('btnChapterAdd')}</button>
          </div>
        )}
        </div>

        {visibleUnmatched.length > 0 && (
          <aside className="unmatched-col">
          <div className="unmatched">
            <h3>{t('lblUnmatched')} ({visibleUnmatched.length})<br /><span className="unmatched-hint">{t('empUnmatchedHint')}</span></h3>
            <div className="unmatched-grid">
              {visibleUnmatched.map(name => {
                const { ext } = splitNameForInsert(name);
                const kind = classifyKind(ext);
                const fullPath = `${folder}\\${name}`;
                const src = `${API}/file?path=${encodeURIComponent(fullPath)}&g=${scanGen}`;
                return (
                  <div
                    key={name}
                    className="unmatched-card"
                    draggable
                    onDragStart={e => onUnmatchedDragStart(name, e)}
                    title={`${name}\n(${t('tipUnmatchedCardHint')})`}
                  >
                    <div className="thumb">
                      {kind === 'image' && <img src={src} alt="" loading="lazy" draggable={false} />}
                      {kind === 'video' && <video src={src} preload="metadata" muted />}
                      {kind === 'other' && <span className="mono">?</span>}
                      <span className="ext mono">{ext.replace('.', '') || '-'}</span>
                      <button
                        className="preview-btn"
                        draggable={false}
                        onMouseDown={e => e.stopPropagation()}
                        onDragStart={e => e.preventDefault()}
                        onClick={e => { e.stopPropagation(); openExternal(folder, name); }}
                        title={t('tipGlobalOpenExternal')}
                      >▶</button>
                    </div>
                    <div className="unmatched-name mono">{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          </aside>
        )}
      </div>
      </div>

      <div className="bar-status">
        <span className={statusKind}>{status || (busy ? t('msgStatusbarWorking') : t('msgStatusbarReady'))}</span>
        <span style={{ flex: 1 }} />
        <span title={folder}>{folder || '- no folder -'}</span>
      </div>

      {/* Inline confirm - window.confirm is blocked in packaged Electron. See ../CLAUDE.md "Electron UI Constraints" + DLG-6. */}
      {confirmState && (
        <div
          className="dl-backdrop"
          onMouseDown={e => {
            if (e.target === e.currentTarget) { confirmState.resolve(false); setConfirmState(null); }
          }}
          onKeyDown={e => {
            if (e.key === 'Escape') { confirmState.resolve(false); setConfirmState(null); }
          }}
        >
          <div className="dlp" onClick={e => e.stopPropagation()}>
              <button className="dl-close" onClick={() => { confirmState.resolve(false); setConfirmState(null); }}><X /></button>
              <p className="dlp-title" style={{ marginBottom: 24 }}>
                {confirmState.message}
              </p>
              <div className="dlp-foot">
                <button
                  className="btn subtle"
                  ref={el => { if (el && !el.dataset.didFocus) { el.dataset.didFocus = '1'; el.focus(); } }}
                  onClick={() => { confirmState.resolve(false); setConfirmState(null); }}
                >
                  {t('btnGlobalCancel')}
                </button>
                <button
                  className="btn primary"
                  onClick={() => { confirmState.resolve(true); setConfirmState(null); }}
                >
                  {t('btnGlobalDiscard')}
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Thumb - image renders as <img>, video as <video preload="metadata"> so
// the browser fetches just enough to show the first frame.
// ────────────────────────────────────────────────────────────────────────
function openExternal(folder, filename) {
  const fullPath = `${folder}\\${filename}`;
  fetch(`${API}/open-external`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: fullPath }),
  });
}

function SettingsDialog({ t, lang, setLang, theme, setTheme, onClose }) {
  const [activeTab, setActiveTab] = useState('display');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const TABS = [
    { key: 'display', label: t('tabDlgSettingsDisplay'), icon: Sun },
    { key: 'about',   label: t('tabDlgSettingsAbout'),   icon: ScrollText },
  ];

  return (
    <div className="dl-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dlg" onClick={e => e.stopPropagation()}>
        <div className="dlg-head">
          <span className="dlg-title"><Settings />{t('ttlDlgSettings')}</span>
          <button className="dl-close" onClick={onClose} title={t('btnGlobalCancel')} aria-label={t('btnGlobalCancel')}>
            <X />
          </button>
        </div>

        <div className="tabs">
          {TABS.map(({ key, label, icon: TabIcon }) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <TabIcon />{label}
            </button>
          ))}
        </div>

        {/* All tab panels stacked in one grid cell → dialog sizes to the tallest (Display), no yoyo on tab switch. Rule DLG-8. */}
        <div className="dlg-body" style={{ display: 'grid' }}>
          <div style={{ gridArea: '1/1', visibility: activeTab === 'display' ? 'visible' : 'hidden', zIndex: activeTab === 'display' ? 1 : 0, background: 'var(--dlg-bgd)' }}>
              <div className="dlg-field">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayLang')}</label>
                <select className="select" value={lang} onChange={e => setLang(e.target.value)}>
                  {LANGUAGES.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
                </select>
              </div>
              <div className="dlg-field divider">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayTheme')}</label>
                <div className="opt-btns">
                  {[
                    { key: 'dark',  Icon: Moon, label: t('btnDlgSettingsDisplayThemeDark') },
                    { key: 'light', Icon: Sun,  label: t('btnDlgSettingsDisplayThemeLight') },
                  ].map(({ key, Icon, label }) => {
                    const active = theme === key;
                    return (
                      <button
                        key={key}
                        className={`opt-btn ${active ? 'active' : ''}`}
                        onClick={() => setTheme(key)}
                      >
                        <Icon />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
          </div>

          <div style={{ gridArea: '1/1', visibility: activeTab === 'about' ? 'visible' : 'hidden', zIndex: activeTab === 'about' ? 1 : 0, background: 'var(--dlg-bgd)' }}>
            <div className="dlg-about">
              <img src={yaiolLogo} alt="Yaiol" style={{ width: 120, height: 'auto', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                <div className="dlg-about-id">{APP_NAME} <b>v{APP_VERSION}</b> by yaiol</div>
                <div className="dlg-about-desc">{t('msgDlgSettingsAboutDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pile({ files, version, folder, cfg, gen, t, onDragStart, onDragOver, dropEdge }) {
  // First file is "front" of the pile (video preferred - sorted in getPiles).
  const front = files[0];
  const frontPath = `${folder}\\${front.filename}`;
  const frontSrc  = `${API}/file?path=${encodeURIComponent(frontPath)}&g=${gen || 0}`;
  const cls = ['pile'];
  if (dropEdge === 'before') cls.push('drop-before-thumb');
  if (dropEdge === 'after')  cls.push('drop-after-thumb');
  const tooltip = files.map(f => f.filename).join('\n') + '\n(' + t('tipShotPileHint') + ')';
  return (
    <div
      className={cls.join(' ')}
      title={tooltip}
      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      {files.slice(1).reverse().map((f, i) => (
        <div
          key={f.filename}
          className="pile-card pile-back"
          style={{ transform: `translateX(${(i + 1) * 5}px)`, zIndex: i }}
        />
      ))}
      <div className="pile-card pile-front" style={{ zIndex: files.length }}>
        {front.kind === 'image' && <img src={frontSrc} alt="" loading="lazy" draggable={false} />}
        {front.kind === 'video' && <video src={frontSrc} preload="metadata" muted />}
        {front.kind === 'other' && <span className="mono">?</span>}
        <span className="badge mono">V{pad(version, cfg.versionDigits)}</span>
        {files.length > 1 && <span className="pile-count mono">×{files.length}</span>}
        <span className="ext mono">{front.ext.replace('.', '')}</span>
        <button
          className="preview-btn"
          draggable={false}
          onMouseDown={e => e.stopPropagation()}
          onDragStart={e => e.preventDefault()}
          onClick={e => { e.stopPropagation(); openExternal(folder, front.filename); }}
          title={t('tipGlobalOpenExternal')}
        >▶</button>
      </div>
    </div>
  );
}

function Thumb({ file, folder, cfg, gen, t, onDragStart, onDragOver, dropEdge }) {
  const fullPath = `${folder}\\${file.filename}`;
  const src = `${API}/file?path=${encodeURIComponent(fullPath)}&g=${gen || 0}`;
  const cls = ['thumb'];
  if (dropEdge === 'before') cls.push('drop-before-thumb');
  if (dropEdge === 'after')  cls.push('drop-after-thumb');
  return (
    <div
      className={cls.join(' ')}
      title={`${file.filename}\n(${t('tipShotThumbHint')})`}
      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      {file.kind === 'image' && <img src={src} alt="" loading="lazy" draggable={false} />}
      {file.kind === 'video' && <video src={src} preload="metadata" muted />}
      {file.kind === 'other' && <span className="mono">?</span>}
      <span className="badge mono">V{pad(file.version, cfg.versionDigits)}</span>
      {file.extra && <span className="extra">{file.extra}</span>}
      <span className="ext mono">{file.ext.replace('.', '')}</span>
      <button
        className="preview-btn"
        draggable={false}
        onMouseDown={e => e.stopPropagation()}
        onDragStart={e => e.preventDefault()}
        onClick={e => { e.stopPropagation(); openExternal(folder, file.filename); }}
        title={t('tipGlobalOpenExternal')}
      >▶</button>
    </div>
  );
}
