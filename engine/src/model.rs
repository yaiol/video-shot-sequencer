//! The project folder as the app sees it: chapters of shots, each shot a set of files.
//!
//! A file is named `CCSVExtra.ext`: chapter digits, slot digits, version digit(s), a free suffix, the
//! extension. A SHOT is a chapter + a slot: every file sharing both belongs to it; the version and the
//! extension tell its files apart. The widths of the three numbers are the folder's own (`vss.ini`).
//!
//! Sequencing is an ordered list of shots per chapter. A shot's numbers come from its place in that list,
//! so moving a shot renumbers, and renumbering renames files. Nothing here touches the disk except
//! `scan`, the config file and `apply_renames`.

use std::{
    collections::{BTreeMap, HashSet},
    fs,
    path::Path,
};

pub const CONFIG_FILE: &str = "vss.ini";
const VIDEO_EXTS: [&str; 5] = [".mp4", ".mov", ".mkv", ".webm", ".avi"];
const IMAGE_EXTS: [&str; 6] = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"];

/// The folder's settings, kept in its `vss.ini`.
#[derive(Clone, Debug, PartialEq)]
pub struct Config {
    pub chapter_digits: usize,
    pub slot_digits: usize,
    pub version_digits: usize,
    /// Chapters that are fully locked: nothing dropped in or out, no reorder, no rename.
    pub locked_chapters: Vec<u32>,
    /// Keep the gaps in a chapter's slot numbers when something is dropped (false = every drop closes them).
    pub preserve_gaps: bool,
}

impl Default for Config {
    fn default() -> Self {
        Config { chapter_digits: 2, slot_digits: 1, version_digits: 1, locked_chapters: Vec::new(), preserve_gaps: true }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum Kind {
    Video,
    Image,
    Other,
}

pub fn classify(ext: &str) -> Kind {
    let ext = ext.to_lowercase();
    if VIDEO_EXTS.contains(&ext.as_str()) {
        Kind::Video
    } else if IMAGE_EXTS.contains(&ext.as_str()) {
        Kind::Image
    } else {
        Kind::Other
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct FileEntry {
    /// The name ON DISK. It does not change while a move is only pending.
    pub filename: String,
    pub version: u32,
    pub extra: String,
    /// With its dot.
    pub ext: String,
    pub kind: Kind,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Shot {
    pub slot: u32,
    pub files: Vec<FileEntry>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Chapter {
    pub chapter: u32,
    pub locked: bool,
    pub shots: Vec<Shot>,
}

impl Chapter {
    /// How many slot numbers are missing between 0 and the highest slot used.
    pub fn gap_count(&self) -> usize {
        match self.shots.iter().map(|s| s.slot).max() {
            Some(max) => (max as usize + 1).saturating_sub(self.shots.len()),
            None => 0,
        }
    }
}

// ─── vss.ini ────────────────────────────────────────────────────────────────────────────────────

pub fn parse_ini(text: &str) -> Config {
    let mut cfg = Config::default();
    for line in text.lines().map(str::trim) {
        if line.is_empty() || line.starts_with('#') || line.starts_with(';') || line.starts_with('[') {
            continue;
        }
        let Some((key, value)) = line.split_once('=') else { continue };
        let value = value.trim();
        let width = || value.parse::<usize>().ok().filter(|n| (1..8).contains(n));
        match key.trim() {
            "ChapterDigits" => cfg.chapter_digits = width().unwrap_or(cfg.chapter_digits),
            "SlotDigits" => cfg.slot_digits = width().unwrap_or(cfg.slot_digits),
            "VersionDigits" => cfg.version_digits = width().unwrap_or(cfg.version_digits),
            "LockedChapters" => cfg.locked_chapters = value.split(',').filter_map(|s| s.trim().parse().ok()).collect(),
            "PreserveGaps" => cfg.preserve_gaps = value.eq_ignore_ascii_case("true"),
            _ => {}
        }
    }
    cfg
}

pub fn write_ini(cfg: &Config) -> String {
    let locked = cfg.locked_chapters.iter().map(u32::to_string).collect::<Vec<_>>().join(",");
    format!(
        "# Video Shot Sequencer - folder config\n# Filename pattern: CCSVExtra.ext  (digit widths set below)\n\nChapterDigits={}\nSlotDigits={}\nVersionDigits={}\nLockedChapters={locked}\nPreserveGaps={}\n",
        cfg.chapter_digits, cfg.slot_digits, cfg.version_digits, cfg.preserve_gaps
    )
}

/// The folder's config. A folder opened for the first time gets its `vss.ini`, with the defaults.
pub fn load_config(folder: &Path) -> Config {
    let file = folder.join(CONFIG_FILE);
    match fs::read_to_string(&file) {
        Ok(text) => parse_ini(&text),
        Err(_) => {
            let cfg = Config::default();
            if !file.exists() {
                let _ = fs::write(&file, write_ini(&cfg));
            }
            cfg
        }
    }
}

pub fn save_config(folder: &Path, cfg: &Config) -> std::io::Result<()> {
    fs::write(folder.join(CONFIG_FILE), write_ini(cfg))
}

// ─── Names ──────────────────────────────────────────────────────────────────────────────────────

pub fn pad(n: u32, width: usize) -> String {
    format!("{n:0width$}")
}

pub fn format_filename(cfg: &Config, chapter: u32, slot: u32, version: u32, extra: &str, ext: &str) -> String {
    format!("{}{}{}{extra}{ext}", pad(chapter, cfg.chapter_digits), pad(slot, cfg.slot_digits), pad(version, cfg.version_digits))
}

/// A file name as (base, extension with its dot).
pub fn split_name(filename: &str) -> (&str, &str) {
    match filename.rfind('.') {
        Some(dot) => (&filename[..dot], &filename[dot..]),
        None => (filename, ""),
    }
}

/// A name that follows the pattern, as (chapter, slot, version, extra, ext).
fn parse_name<'a>(cfg: &Config, name: &'a str) -> Option<(u32, u32, u32, &'a str, &'a str)> {
    let digits = cfg.chapter_digits + cfg.slot_digits + cfg.version_digits;
    if name.len() < digits || !name.as_bytes()[..digits].iter().all(u8::is_ascii_digit) {
        return None;
    }
    let dot = name.rfind('.').filter(|&d| d >= digits && d + 1 < name.len())?;
    let number = |from: usize, len: usize| name[from..from + len].parse::<u32>().ok();
    Some((
        number(0, cfg.chapter_digits)?,
        number(cfg.chapter_digits, cfg.slot_digits)?,
        number(cfg.chapter_digits + cfg.slot_digits, cfg.version_digits)?,
        &name[digits..dot],
        &name[dot..],
    ))
}

// ─── Reading the folder ─────────────────────────────────────────────────────────────────────────

#[derive(Clone, Debug, PartialEq)]
pub struct Scan {
    pub config: Config,
    pub chapters: Vec<Chapter>,
    /// Pictures and videos whose name does not follow the pattern.
    pub unmatched: Vec<String>,
    /// How many files do follow it.
    pub matched: usize,
}

/// Order of the files inside a shot: by version, then video before picture, then extension, then suffix.
fn sort_files(files: &mut [FileEntry]) {
    files.sort_by(|a, b| a.version.cmp(&b.version).then(a.kind.cmp(&b.kind)).then_with(|| a.ext.cmp(&b.ext)).then_with(|| a.extra.cmp(&b.extra)));
}

pub fn scan(folder: &Path) -> std::io::Result<Scan> {
    let config = load_config(folder);
    let mut names: Vec<String> = fs::read_dir(folder)?
        .flatten()
        .filter(|e| e.file_type().is_ok_and(|t| t.is_file()))
        .map(|e| e.file_name().to_string_lossy().into_owned())
        .filter(|n| n != CONFIG_FILE && classify(split_name(n).1) != Kind::Other)
        .collect();
    names.sort();
    let mut shots: BTreeMap<(u32, u32), Vec<FileEntry>> = BTreeMap::new();
    let mut unmatched = Vec::new();
    let mut matched = 0;
    for name in names {
        match parse_name(&config, &name) {
            Some((chapter, slot, version, extra, ext)) => {
                matched += 1;
                let entry = FileEntry { version, extra: extra.to_owned(), ext: ext.to_owned(), kind: classify(ext), filename: name.clone() };
                shots.entry((chapter, slot)).or_default().push(entry);
            }
            None => unmatched.push(name),
        }
    }
    let mut chapters: Vec<Chapter> = Vec::new();
    for ((chapter, slot), mut files) in shots {
        sort_files(&mut files);
        if chapters.last().map(|c| c.chapter) != Some(chapter) {
            chapters.push(Chapter { chapter, locked: config.locked_chapters.contains(&chapter), shots: Vec::new() });
        }
        if let Some(last) = chapters.last_mut() {
            last.shots.push(Shot { slot, files });
        }
    }
    Ok(Scan { config, chapters, unmatched, matched })
}

// ─── Piles: the files of a shot that share a version ────────────────────────────────────────────

/// A shot's files as piles, in version order. In a pile the video comes first, so the top of the stack
/// is the moving picture when there is one.
pub fn piles(shot: &Shot) -> Vec<Vec<FileEntry>> {
    let mut by_version: BTreeMap<u32, Vec<FileEntry>> = BTreeMap::new();
    for f in &shot.files {
        by_version.entry(f.version).or_default().push(f.clone());
    }
    by_version
        .into_values()
        .map(|mut pile| {
            pile.sort_by(|a, b| a.kind.cmp(&b.kind).then_with(|| a.ext.cmp(&b.ext)).then_with(|| a.extra.cmp(&b.extra)));
            pile
        })
        .collect()
}

/// Write piles back into a shot: the version of a file is its pile's place.
pub fn set_piles(shot: &mut Shot, piles: Vec<Vec<FileEntry>>) {
    shot.files = piles.into_iter().enumerate().flat_map(|(i, pile)| pile.into_iter().map(move |f| FileEntry { version: i as u32, ..f })).collect();
}

// ─── Renumbering ────────────────────────────────────────────────────────────────────────────────

/// A chapter number that no longer fits in its digits.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Overflow {
    pub chapter: u32,
    pub max: u32,
}

/// Give every shot its slot, and every chapter its number, after a change.
///
/// Slots, two policies (`preserve_gaps`):
///   - on: a shot keeps the slot it comes with; on a collision it takes the next free one. A shot being
///     inserted comes with "the slot after its new neighbour", so it falls into a gap when one is there.
///   - off: slots are 0..N-1 in the order shown; every gap goes.
/// Overflow: a chapter holding more than its digits allow pushes every later chapter up by one. A chapter
/// number that no longer fits is an error and nothing is staged.
pub fn renumber(chapters: Vec<Chapter>, cfg: &Config) -> Result<Vec<Chapter>, Overflow> {
    let max_slots = 10u32.pow(cfg.slot_digits as u32);
    let max_chapters = 10u32.pow(cfg.chapter_digits as u32);
    let mut result: Vec<Chapter> = chapters
        .into_iter()
        .map(|mut ch| {
            let mut used = HashSet::new();
            for (i, shot) in ch.shots.iter_mut().enumerate() {
                if cfg.preserve_gaps {
                    while used.contains(&shot.slot) {
                        shot.slot += 1;
                    }
                    used.insert(shot.slot);
                } else {
                    shot.slot = i as u32;
                }
            }
            ch
        })
        .collect();
    for i in 0..result.len().saturating_sub(1) {
        let ch = &result[i];
        let needs_room = ch.shots.iter().any(|s| s.slot >= max_slots) || ch.shots.len() > max_slots as usize;
        if needs_room {
            for later in result.iter_mut().skip(i + 1) {
                later.chapter += 1;
            }
        }
    }
    result.sort_by_key(|c| c.chapter);
    match result.iter().find(|c| c.chapter >= max_chapters) {
        Some(big) => Err(Overflow { chapter: big.chapter, max: max_chapters - 1 }),
        None => Ok(result),
    }
}

/// Every file whose name on disk is not the name its place asks for, as (from, to).
pub fn pending_renames(chapters: &[Chapter], cfg: &Config) -> Vec<(String, String)> {
    let mut ops = Vec::new();
    for ch in chapters {
        for shot in &ch.shots {
            for f in &shot.files {
                let to = format_filename(cfg, ch.chapter, shot.slot, f.version, &f.extra, &f.ext);
                if f.filename != to {
                    ops.push((f.filename.clone(), to));
                }
            }
        }
    }
    ops
}

/// A changed set of chapters, renumbered: shots left with no file are dropped first.
pub fn stage(mut chapters: Vec<Chapter>, cfg: &Config) -> Result<Vec<Chapter>, Overflow> {
    for ch in &mut chapters {
        ch.shots.retain(|s| !s.files.is_empty());
    }
    renumber(chapters, cfg)
}

/// Rename a batch in two steps: every source to a temporary name, then every temporary name to its final
/// one. A plain one-by-one rename would overwrite when the new names overlap the old ones (two shots
/// swapping places). On a failure, whatever is still under a temporary name gets its old name back.
pub fn apply_renames(folder: &Path, renames: &[(String, String)]) -> Result<usize, String> {
    let stamp = std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map(|d| d.as_millis()).unwrap_or(0);
    let suffix = format!(".vss-tmp-{stamp}");
    let mut staged: Vec<(std::path::PathBuf, std::path::PathBuf, std::path::PathBuf)> = Vec::new(); // (original, temporary, final)
    let run = |staged: &mut Vec<_>| -> std::io::Result<()> {
        for (from, to) in renames.iter().filter(|(from, to)| from != to) {
            let (original, temporary) = (folder.join(from), folder.join(format!("{from}{suffix}")));
            fs::rename(&original, &temporary)?;
            staged.push((original, temporary, folder.join(to)));
        }
        for (_, temporary, target) in staged.iter() {
            if target.exists() {
                return Err(std::io::Error::new(std::io::ErrorKind::AlreadyExists, format!("{} already exists", target.display())));
            }
            fs::rename(temporary, target)?;
        }
        Ok(())
    };
    match run(&mut staged) {
        Ok(()) => Ok(staged.len()),
        Err(e) => {
            for (original, temporary, _) in &staged {
                if temporary.exists() {
                    let _ = fs::rename(temporary, original);
                }
            }
            Err(e.to_string())
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn file(name: &str, version: u32) -> FileEntry {
        let (base, ext) = split_name(name);
        FileEntry { filename: name.to_owned(), version, extra: base.to_owned(), ext: ext.to_owned(), kind: classify(ext) }
    }
    fn shot(slot: u32, names: &[&str]) -> Shot {
        Shot { slot, files: names.iter().map(|n| file(n, 0)).collect() }
    }
    fn chapter(n: u32, shots: Vec<Shot>) -> Chapter {
        Chapter { chapter: n, locked: false, shots }
    }
    fn slots(chapters: &[Chapter]) -> Vec<(u32, Vec<u32>)> {
        chapters.iter().map(|c| (c.chapter, c.shots.iter().map(|s| s.slot).collect())).collect()
    }
    fn sandbox(name: &str) -> std::path::PathBuf {
        let dir = std::env::temp_dir().join(format!("yaiol-vss-{}-{name}", std::process::id()));
        let _ = fs::remove_dir_all(&dir);
        fs::create_dir_all(&dir).unwrap();
        dir
    }

    #[test]
    fn the_config_file_round_trips_and_ignores_what_it_does_not_know() {
        let cfg = Config { chapter_digits: 3, slot_digits: 2, version_digits: 1, locked_chapters: vec![1, 4], preserve_gaps: false };
        assert_eq!(parse_ini(&write_ini(&cfg)), cfg);
        let odd = parse_ini("[section]\n; note\nChapterDigits=9\nSlotDigits = 2 \nLockedChapters= 2, x ,5\nPreserveGaps=TRUE\nOther=1\n");
        assert_eq!(odd, Config { chapter_digits: 2, slot_digits: 2, version_digits: 1, locked_chapters: vec![2, 5], preserve_gaps: true });
    }

    #[test]
    fn names_are_read_by_the_folder_s_digit_widths() {
        let cfg = Config::default();
        assert_eq!(parse_name(&cfg, "0120 take.one.mp4"), Some((1, 2, 0, " take.one", ".mp4")));
        assert_eq!(parse_name(&cfg, "0120.mp4"), Some((1, 2, 0, "", ".mp4")));
        assert_eq!(parse_name(&cfg, "012.mp4"), None);
        assert_eq!(parse_name(&cfg, "intro.mp4"), None);
        assert_eq!(format_filename(&cfg, 1, 2, 0, " take.one", ".mp4"), "0120 take.one.mp4");
        let wide = Config { chapter_digits: 3, slot_digits: 2, version_digits: 2, ..Config::default() };
        assert_eq!(format_filename(&wide, 1, 2, 3, "x", ".png"), "0010203x.png");
    }

    #[test]
    fn a_folder_is_read_into_chapters_shots_and_piles() {
        let dir = sandbox("scan");
        for name in ["0000a.mp4", "0000a.jpg", "0001b.png", "0010.mov", "0120.mp4", "notes.txt", "loose.png", "0aa0.png"] {
            fs::write(dir.join(name), b"x").unwrap();
        }
        let s = scan(&dir).unwrap();
        assert!(dir.join(CONFIG_FILE).is_file());
        assert_eq!(s.matched, 5);
        assert_eq!(s.unmatched, vec!["0aa0.png", "loose.png"]);
        assert_eq!(slots(&s.chapters), vec![(0, vec![0, 1]), (1, vec![2])]);
        let first = &s.chapters[0].shots[0];
        // the video before the picture inside one version; then the next version
        assert_eq!(first.files.iter().map(|f| f.filename.as_str()).collect::<Vec<_>>(), vec!["0000a.mp4", "0000a.jpg", "0001b.png"]);
        assert_eq!(piles(first).iter().map(Vec::len).collect::<Vec<_>>(), vec![2, 1]);
        assert!(pending_renames(&s.chapters, &s.config).is_empty());
        assert_eq!(s.chapters[1].gap_count(), 2);
        let _ = fs::remove_dir_all(dir);
    }

    #[test]
    fn gaps_are_kept_or_closed_by_the_folder_s_choice() {
        let before = vec![chapter(0, vec![shot(0, &["a.mp4"]), shot(3, &["b.mp4"]), shot(3, &["c.mp4"]), shot(7, &["d.mp4"])])];
        let keep = renumber(before.clone(), &Config::default()).unwrap();
        assert_eq!(slots(&keep), vec![(0, vec![0, 3, 4, 7])]);
        let close = renumber(before, &Config { preserve_gaps: false, ..Config::default() }).unwrap();
        assert_eq!(slots(&close), vec![(0, vec![0, 1, 2, 3])]);
    }

    #[test]
    fn a_full_chapter_pushes_the_later_ones_up_and_too_many_is_refused() {
        let eleven: Vec<Shot> = (0..11).map(|i| shot(i, &["x.mp4"])).collect();
        let out = renumber(vec![chapter(0, eleven.clone()), chapter(1, vec![shot(0, &["y.mp4"])]), chapter(5, vec![])], &Config::default()).unwrap();
        assert_eq!(out.iter().map(|c| c.chapter).collect::<Vec<_>>(), vec![0, 2, 6]);
        let tight = Config { chapter_digits: 1, ..Config::default() };
        assert_eq!(renumber(vec![chapter(8, eleven), chapter(9, vec![])], &tight), Err(Overflow { chapter: 10, max: 9 }));
    }

    #[test]
    fn two_shots_swapping_places_are_renamed_without_overwriting() {
        let dir = sandbox("rename");
        fs::write(dir.join("0000a.mp4"), b"first").unwrap();
        fs::write(dir.join("0010b.mp4"), b"second").unwrap();
        let s = scan(&dir).unwrap();
        let mut chapters = s.chapters.clone();
        chapters[0].shots.swap(0, 1);
        let staged = stage(chapters, &Config { preserve_gaps: false, ..Config::default() }).unwrap();
        let renames = pending_renames(&staged, &s.config);
        assert_eq!(renames, vec![("0010b.mp4".to_owned(), "0000b.mp4".to_owned()), ("0000a.mp4".to_owned(), "0010a.mp4".to_owned())]);
        assert_eq!(apply_renames(&dir, &renames), Ok(2));
        assert_eq!(fs::read(dir.join("0000b.mp4")).unwrap(), b"second");
        assert_eq!(fs::read(dir.join("0010a.mp4")).unwrap(), b"first");
        // a batch that cannot finish puts back what it had moved
        fs::write(dir.join("0020c.mp4"), b"third").unwrap();
        let bad = vec![("0000b.mp4".to_owned(), "0030b.mp4".to_owned()), ("missing.mp4".to_owned(), "0040.mp4".to_owned())];
        assert!(apply_renames(&dir, &bad).is_err());
        assert!(dir.join("0000b.mp4").is_file() && !dir.join("0030b.mp4").exists());
        // and one that would land on a file it does not move is refused, nothing lost
        let clash = vec![("0000b.mp4".to_owned(), "0020c.mp4".to_owned())];
        assert!(apply_renames(&dir, &clash).is_err());
        assert_eq!(fs::read(dir.join("0020c.mp4")).unwrap(), b"third");
        assert_eq!(fs::read(dir.join("0000b.mp4")).unwrap(), b"second");
        let _ = fs::remove_dir_all(dir);
    }
}
