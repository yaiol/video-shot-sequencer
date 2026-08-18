// data-icon="yaiol:video-shot-sequencer"
process.noDeprecation = true;
import { app, BrowserWindow, Menu, dialog, shell } from "electron";
import path from "path";
import fs from "fs";
import net from "net";
import express from "express";
import { fileURLToPath } from "node:url";
import pkg from "../package.json" with { type: "json" };
import { mark, dumpStartupTiming } from "./startup-timing.mjs";
mark("electron boot + module imports");

// ESM has no __dirname - derive it from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = !app.isPackaged;
const DEV_PORT = pkg.devPort;
const APP_NAME = pkg.productName;

app.setPath('userData', path.join(app.getPath('appData'), 'yaiol', isDev ? `${APP_NAME} (Dev)` : APP_NAME));

// ⚠ CLAUDE: Always use this module-level mainWindow for all dialog calls.
// Never use BrowserWindow.fromWebContents(event.sender) - silently breaks in packaged .exe.
let mainWindow = null;
let SERVER_PORT = 4000;

// ─── Config ──────────────────────────────────────────────────────────────────
const CONFIG_FILE = 'vss.ini';

const DEFAULT_CONFIG = {
  chapterDigits: 2,    // CC - 2 digits = 100 chapters (0..99)
  slotDigits:    1,    // S  - 1 digit  = 10 slots per chapter
  versionDigits: 1,    // V  - 1 digit  = 10 versions per slot
  lockedChapters: [],  // chapter numbers that are fully locked (no drops in/out, no reorder, no rename)
  preserveGaps:  true, // when true, slot-number gaps inside chapters are kept; when false, drops auto-compact to 0..N-1
};

const SUPPORTED_EXTS = ['.mp4', '.mov', '.mkv', '.webm', '.avi', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
const VIDEO_EXTS = ['.mp4', '.mov', '.mkv', '.webm', '.avi'];

// vss.ini uses Windows PascalCase key convention; JS internals use camelCase.
// Maps between the two are isolated here so the renderer can stay on camelCase.
const INI_KEYS = {
  ChapterDigits:  'chapterDigits',
  SlotDigits:     'slotDigits',
  VersionDigits:  'versionDigits',
  LockedChapters: 'lockedChapters',
  PreserveGaps:   'preserveGaps',
};

function parseIni(text) {
  const cfg = { ...DEFAULT_CONFIG };
  text.split(/\r?\n/).forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#') || line.startsWith(';') || line.startsWith('[')) return;
    const eq = line.indexOf('=');
    if (eq < 0) return;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    const jsKey = INI_KEYS[key];
    if (!jsKey) return;
    if (jsKey === 'lockedChapters') {
      cfg.lockedChapters = val.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    } else if (jsKey === 'preserveGaps') {
      cfg.preserveGaps = val.toLowerCase() === 'true';
    } else {
      const n = parseInt(val, 10);
      if (n > 0 && n < 8) cfg[jsKey] = n;
    }
  });
  return cfg;
}

function writeIni(cfg) {
  return [
    '# Video Shot Sequencer - folder config',
    '# Filename pattern: CCSVExtra.ext  (digit widths set below)',
    '',
    `ChapterDigits=${cfg.chapterDigits}`,
    `SlotDigits=${cfg.slotDigits}`,
    `VersionDigits=${cfg.versionDigits}`,
    `LockedChapters=${(cfg.lockedChapters || []).join(',')}`,
    `PreserveGaps=${cfg.preserveGaps === false ? 'false' : 'true'}`,
    '',
  ].join('\n');
}

function loadConfig(folder) {
  const p = path.join(folder, CONFIG_FILE);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, writeIni(DEFAULT_CONFIG), 'utf8');
    return { ...DEFAULT_CONFIG };
  }
  try { return parseIni(fs.readFileSync(p, 'utf8')); }
  catch { return { ...DEFAULT_CONFIG }; }
}

function saveConfig(folder, cfg) {
  fs.writeFileSync(path.join(folder, CONFIG_FILE), writeIni(cfg), 'utf8');
}

// ─── Parser ──────────────────────────────────────────────────────────────────
// Matches `CCSVExtra.ext` - concatenated digits with optional free-form suffix.
function buildPattern(cfg) {
  const c = `\\d{${cfg.chapterDigits}}`;
  const s = `\\d{${cfg.slotDigits}}`;
  const v = `\\d{${cfg.versionDigits}}`;
  return new RegExp(`^(${c})(${s})(${v})(.*?)(\\.[^.]+)$`);
}

function classifyKind(ext) {
  ext = ext.toLowerCase();
  if (VIDEO_EXTS.includes(ext)) return 'video';
  if (IMAGE_EXTS.includes(ext)) return 'image';
  return 'other';
}

function scanFolder(folder) {
  const cfg = loadConfig(folder);
  const re  = buildPattern(cfg);
  const entries = fs.readdirSync(folder, { withFileTypes: true });
  const files = [];
  const unmatched = [];
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (e.name === CONFIG_FILE) continue;
    const ext = path.extname(e.name).toLowerCase();
    if (!SUPPORTED_EXTS.includes(ext)) continue;
    const m = re.exec(e.name);
    if (!m) { unmatched.push(e.name); continue; }
    files.push({
      filename: e.name,
      chapter:  parseInt(m[1], 10),
      slot:     parseInt(m[2], 10),
      version:  parseInt(m[3], 10),
      extra:    m[4] || '',
      ext:      m[5],
      kind:     classifyKind(m[5]),
      size:     fs.statSync(path.join(folder, e.name)).size,
    });
  }
  return { config: cfg, files, unmatched };
}

function formatFilename(cfg, chapter, slot, version, extra, ext) {
  const pad = (n, w) => String(n).padStart(w, '0');
  return `${pad(chapter, cfg.chapterDigits)}${pad(slot, cfg.slotDigits)}${pad(version, cfg.versionDigits)}${extra}${ext}`;
}

// ─── Server ──────────────────────────────────────────────────────────────────
function startServer(callback) {
  function findFreePort(port, cb) {
    const tester = net.createServer();
    tester.once("error", () => findFreePort(port + 1, cb));
    tester.once("listening", () => { tester.close(() => cb(port)); });
    tester.listen(port);
  }

  const api = express();
  api.use(express.json({ limit: "10mb" }));
  api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") { res.sendStatus(204); return; }
    next();
  });

  api.get("/version", (_req, res) => res.json({ version: app.getVersion() }));

  api.post("/open-folder", async (req, res) => {
    const { title } = req.body || {};
    const result = await dialog.showOpenDialog(mainWindow, {
      title,
      properties: ['openDirectory'],
    });
    if (result.canceled || !result.filePaths.length) { res.json(null); return; }
    res.json({ folder: result.filePaths[0] });
  });

  api.get("/scan", (req, res) => {
    const folder = req.query.folder;
    if (!folder || !fs.existsSync(folder)) { res.status(400).json({ error: 'folder missing' }); return; }
    try { res.json(scanFolder(folder)); }
    catch (e) { res.status(500).json({ error: String(e) }); }
  });

  api.post("/open-external", async (req, res) => {
    const { path: filePath } = req.body || {};
    if (!filePath || !fs.existsSync(filePath)) { res.status(404).json({ error: 'not found' }); return; }
    const err = await shell.openPath(filePath);
    if (err) { res.status(500).json({ error: err }); return; }
    res.json({ ok: true });
  });

  api.post("/save-config", (req, res) => {
    const { folder, config } = req.body;
    try { saveConfig(folder, config); res.json({ ok: true }); }
    catch (e) { res.status(500).json({ error: String(e) }); }
  });

  // Serve thumbnails - file:// is blocked in renderer, so funnel through HTTP
  api.get("/file", (req, res) => {
    const filePath = decodeURIComponent(req.query.path || "");
    try {
      const ext  = path.extname(filePath).toLowerCase().slice(1);
      const mime = {
        jpg:'image/jpeg', jpeg:'image/jpeg', png:'image/png', gif:'image/gif',
        webp:'image/webp', bmp:'image/bmp',
        mp4:'video/mp4', mov:'video/quicktime', mkv:'video/x-matroska',
        webm:'video/webm', avi:'video/x-msvideo',
      }[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', mime);
      // Range support for video thumbnails
      const stat = fs.statSync(filePath);
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end   = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        res.status(206).setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
        res.setHeader('Content-Length', end - start + 1);
        fs.createReadStream(filePath, { start, end }).pipe(res);
      } else {
        res.setHeader('Content-Length', stat.size);
        fs.createReadStream(filePath).pipe(res);
      }
    } catch { res.status(404).end(); }
  });

  // Apply a batch of renames atomically (best-effort: stop on first error).
  // Uses two-phase rename via tmp suffix to avoid collisions when targets overlap sources.
  api.post("/apply-renames", (req, res) => {
    const { folder, renames } = req.body; // [{from, to}]
    if (!Array.isArray(renames) || !folder) { res.status(400).json({ error: 'bad request' }); return; }
    const TMP_SUFFIX = '.vss-tmp-' + Date.now();
    const stage = [];
    try {
      // Phase 1 - move each source to a tmp name (skip no-op renames)
      for (const r of renames) {
        if (r.from === r.to) continue;
        const src = path.join(folder, r.from);
        const tmp = path.join(folder, r.from + TMP_SUFFIX);
        fs.renameSync(src, tmp);
        stage.push({ tmp, to: path.join(folder, r.to) });
      }
      // Phase 2 - move tmp to final
      for (const s of stage) fs.renameSync(s.tmp, s.to);
      res.json({ ok: true, count: stage.length });
    } catch (e) {
      // Best-effort rollback: rename anything still in tmp form back to its original
      for (const s of stage) {
        try { if (fs.existsSync(s.tmp)) fs.renameSync(s.tmp, s.to.replace(TMP_SUFFIX, '')); } catch {}
      }
      res.status(500).json({ error: String(e) });
    }
  });

  findFreePort(4000, (port) => {
    SERVER_PORT = port;
    api.listen(port, () => {
      mark("express listening");
      console.log(`${APP_NAME} API on http://localhost:${port}`);
      if (callback) callback(port);
    });
  });
}

function createWindow(port) {
  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    frame: true,
    icon: path.join(__dirname, isDev ? '../public/app.ico' : '../dist/app.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const query = { apiPort: String(port) };
  if (isDev) {
    const qs = new URLSearchParams(query).toString();
    mainWindow.loadURL(`http://localhost:${DEV_PORT}?${qs}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"), { query });
  }
  mark("BrowserWindow created");
  mainWindow.webContents.once('did-finish-load', () => { mark("renderer did-finish-load"); dumpStartupTiming({ appName: APP_NAME, isDev, userDataPath: app.getPath("userData") }); });
  mainWindow.webContents.on('did-finish-load', () => mainWindow.setTitle(isDev ? `${APP_NAME} (Dev)` : APP_NAME));

  // ⚠ CLAUDE: Ctrl+Shift+I is dead because Menu.setApplicationMenu(null) removes the default shortcut.
  // This restores it in dev only - do NOT remove.
  if (isDev) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.shift && input.key === 'I') {
        mainWindow.webContents.toggleDevTools();
        event.preventDefault();
      }
    });
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    const appUrl = isDev ? `http://localhost:${DEV_PORT}` : `file://`;
    if (!url.startsWith(appUrl)) { event.preventDefault(); shell.openExternal(url); }
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(() => { mark("app.whenReady");
  Menu.setApplicationMenu(null);
  startServer((port) => createWindow(port));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow(SERVER_PORT);
});
