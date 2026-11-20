//! What a drag does when it is dropped: a pure function from the chapters shown, what was dragged and
//! where it was released, to the chapters as they should now be (not yet renumbered: `model::stage` does
//! that). Nothing here touches the disk.
//!
//! Five things can be dragged: a whole shot, a pile (the files of one version), one file, a whole
//! chapter (by its grip), and a file from the "unmatched" list. Five things can receive: a shot (before,
//! after, or INTO it = become one more version), an empty chapter, a chapter's header (reordering
//! chapters), and, inside the shot being dragged from, another thumbnail or pile (reordering versions).

use crate::model::{Chapter, Config, FileEntry, Shot, classify, piles, set_piles, split_name};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Edge {
    Before,
    After,
    /// On the middle of a shot: the dropped file joins it as a new version.
    Into,
}

#[derive(Clone, Debug, PartialEq)]
pub enum Source {
    Shot { chapter: u32, slot: u32 },
    Pile { chapter: u32, slot: u32, version: u32 },
    File { chapter: u32, slot: u32, filename: String },
    Chapter { chapter: u32 },
    Unmatched { filename: String },
}

#[derive(Clone, Debug, PartialEq)]
pub enum Target {
    Shot { chapter: u32, slot: u32, edge: Edge },
    /// The body of a chapter with no shot.
    Chapter { chapter: u32 },
    /// A chapter's header, while a chapter is dragged.
    ChapterReorder { chapter: u32, edge: Edge },
    Thumb { chapter: u32, slot: u32, filename: String, edge: Edge },
    Pile { chapter: u32, slot: u32, version: u32, edge: Edge },
}

impl Source {
    fn chapter(&self) -> Option<u32> {
        match self {
            Source::Shot { chapter, .. } | Source::Pile { chapter, .. } | Source::File { chapter, .. } | Source::Chapter { chapter } => Some(*chapter),
            Source::Unmatched { .. } => None,
        }
    }
}

impl Target {
    fn chapter(&self) -> u32 {
        match self {
            Target::Shot { chapter, .. } | Target::Chapter { chapter } | Target::ChapterReorder { chapter, .. } | Target::Thumb { chapter, .. } | Target::Pile { chapter, .. } => *chapter,
        }
    }
    fn slot(&self) -> Option<u32> {
        match self {
            Target::Shot { slot, .. } | Target::Thumb { slot, .. } | Target::Pile { slot, .. } => Some(*slot),
            _ => None,
        }
    }
    fn edge(&self) -> Edge {
        match self {
            Target::Shot { edge, .. } | Target::ChapterReorder { edge, .. } | Target::Thumb { edge, .. } | Target::Pile { edge, .. } => *edge,
            Target::Chapter { .. } => Edge::After,
        }
    }
}

#[derive(Clone, Debug, PartialEq)]
pub enum Dropped {
    /// The drop means nothing (a pile on itself, a chapter on a shot...).
    Nothing,
    /// The chapter dragged from, or dropped on, is locked.
    Locked,
    /// The chapters as they should now be. `locked` is the new list of locked chapter numbers when moving
    /// chapters changed it (a lock travels with its chapter, but is recorded by NUMBER).
    Changed { chapters: Vec<Chapter>, locked: Option<Vec<u32>> },
}

/// The first version number a shot does not use yet.
fn free_version(shot: &Shot) -> u32 {
    (0..).find(|v| !shot.files.iter().any(|f| f.version == *v)).unwrap_or(0)
}

fn as_version(files: Vec<FileEntry>, version: u32) -> Vec<FileEntry> {
    files.into_iter().map(|f| FileEntry { version, ..f }).collect()
}

/// Put files into the target as the user aimed: a new shot at the end of an empty chapter, one more
/// version of the shot dropped INTO, or a new shot before / after the one dropped on.
/// `slot` is the slot the new shot comes with (see `model::renumber`).
fn place(working: &mut [Chapter], tgt: &Target, files: Vec<FileEntry>, slot_after_neighbour: bool) -> bool {
    let Some(chapter) = working.iter_mut().find(|c| c.chapter == tgt.chapter()) else { return false };
    if matches!(tgt, Target::Chapter { .. }) {
        // on the chapter itself = at the end, right after its last shot, so a chapter with gaps keeps them
        let slot = if slot_after_neighbour { chapter.shots.last().map(|s| s.slot + 1).unwrap_or(0) } else { 0 };
        chapter.shots.push(Shot { slot, files: as_version(files, 0) });
        return true;
    }
    let found = chapter.shots.iter().position(|s| Some(s.slot) == tgt.slot());
    if tgt.edge() == Edge::Into {
        if let Some(i) = found {
            let version = free_version(&chapter.shots[i]);
            chapter.shots[i].files.extend(as_version(files, version));
            return true;
        }
    }
    let mut idx = found.unwrap_or(chapter.shots.len());
    if tgt.edge() == Edge::After {
        idx += 1;
    }
    let idx = idx.min(chapter.shots.len());
    // The new shot's slot says where it was dropped, not where it came from: with gaps kept it falls into
    // a gap when one is there, else it pushes its neighbours forward.
    let slot = if slot_after_neighbour && idx > 0 { chapter.shots[idx - 1].slot + 1 } else { 0 };
    chapter.shots.insert(idx, Shot { slot, files: as_version(files, 0) });
    true
}

pub fn apply(chapters: &[Chapter], cfg: &Config, src: &Source, tgt: &Target) -> Dropped {
    // A locked chapter refuses every drop, as the place dragged from and as the place dropped on.
    let locked = |n: u32| cfg.locked_chapters.contains(&n);
    if src.chapter().is_some_and(locked) || locked(tgt.chapter()) {
        return Dropped::Locked;
    }
    let mut working: Vec<Chapter> = chapters.to_vec();
    let changed = |chapters: Vec<Chapter>| Dropped::Changed { chapters, locked: None };

    match src {
        // ── A whole chapter: reorder the chapters ───────────────────────────────────────────────
        Source::Chapter { chapter } => {
            let Target::ChapterReorder { chapter: onto, edge } = tgt else { return Dropped::Nothing };
            let Some(from) = working.iter().position(|c| c.chapter == *chapter) else { return Dropped::Nothing };
            let moved = working.remove(from);
            let Some(mut to) = working.iter().position(|c| c.chapter == *onto) else { return Dropped::Nothing };
            if *edge == Edge::After {
                to += 1;
            }
            working.insert(to, moved);
            // chapters are numbered by their new place; the lock goes with the chapter
            let mut new_locked = Vec::new();
            for (i, ch) in working.iter_mut().enumerate() {
                ch.chapter = i as u32;
                if ch.locked {
                    new_locked.push(i as u32);
                }
            }
            let mut current = cfg.locked_chapters.clone();
            current.sort_unstable();
            Dropped::Changed { chapters: working, locked: (current != new_locked).then_some(new_locked) }
        }

        // ── A pile: the files of one version move as one ────────────────────────────────────────
        Source::Pile { chapter, slot, version } => {
            let Some(shot) = working.iter_mut().find(|c| c.chapter == *chapter).and_then(|c| c.shots.iter_mut().find(|s| s.slot == *slot)) else {
                return Dropped::Nothing;
            };
            let mut rest = piles(shot);
            let Some(from) = rest.iter().position(|p| p[0].version == *version) else { return Dropped::Nothing };
            let moved = rest.remove(from);
            let same_shot = tgt.chapter() == *chapter && tgt.slot() == Some(*slot);
            if same_shot {
                let place_of = |v: u32, edge: Edge, rest: &[Vec<FileEntry>]| match rest.iter().position(|p| p[0].version == v) {
                    Some(i) if edge == Edge::After => i + 1,
                    Some(i) => i,
                    None => rest.len(),
                };
                let to = match tgt {
                    Target::Pile { version: v, edge, .. } => place_of(*v, *edge, &rest),
                    Target::Thumb { filename, edge, .. } => match shot.files.iter().find(|f| f.filename == *filename) {
                        Some(f) => place_of(f.version, *edge, &rest),
                        None => return Dropped::Nothing,
                    },
                    _ => {
                        if tgt.edge() == Edge::Before {
                            0
                        } else {
                            rest.len()
                        }
                    }
                };
                rest.insert(to, moved);
                set_piles(shot, rest);
                return changed(working);
            }
            set_piles(shot, rest);
            if place(&mut working, tgt, moved, false) { changed(working) } else { Dropped::Nothing }
        }

        Source::File { chapter, slot, filename } => {
            let Some(shot) = working.iter_mut().find(|c| c.chapter == *chapter).and_then(|c| c.shots.iter_mut().find(|s| s.slot == *slot)) else {
                return Dropped::Nothing;
            };
            let Some(index) = shot.files.iter().position(|f| f.filename == *filename) else { return Dropped::Nothing };
            let same_shot = tgt.chapter() == *chapter && tgt.slot() == Some(*slot) && matches!(tgt, Target::Thumb { .. } | Target::Shot { .. });

            // ── Inside its own shot: reorder the versions ───────────────────────────────────────
            // Files sharing a version are one pile: moving any thumbnail moves its whole pile, so a
            // video and its picture stay together. Dropping on the row itself works too, so the aim
            // does not have to be exact.
            if same_shot {
                let version = shot.files[index].version;
                let onto = match tgt {
                    Target::Thumb { filename: onto, .. } => shot.files.iter().find(|f| f.filename == *onto).map(|f| f.version),
                    _ => None,
                };
                if onto == Some(version) {
                    return Dropped::Nothing; // onto a file of its own pile
                }
                let mut rest = piles(shot);
                let Some(from) = rest.iter().position(|p| p[0].version == version) else { return Dropped::Nothing };
                let moved = rest.remove(from);
                let to = match (tgt, onto) {
                    (Target::Thumb { edge, .. }, Some(v)) => match rest.iter().position(|p| p[0].version == v) {
                        Some(i) if *edge == Edge::After => i + 1,
                        Some(i) => i,
                        None => rest.len(),
                    },
                    (Target::Thumb { .. }, None) => rest.len(),
                    _ => {
                        if tgt.edge() == Edge::Before {
                            0
                        } else {
                            rest.len()
                        }
                    }
                };
                rest.insert(to, moved);
                set_piles(shot, rest);
                return changed(working);
            }

            // ── To another shot or chapter: that ONE file moves ─────────────────────────────────
            let moved = shot.files.remove(index);
            if place(&mut working, tgt, vec![moved], false) { changed(working) } else { Dropped::Nothing }
        }

        // ── A whole shot, or a file from the unmatched list ─────────────────────────────────────
        Source::Shot { chapter, slot } => {
            // onto itself: nothing to do
            if tgt.chapter() == *chapter && tgt.slot() == Some(*slot) {
                return Dropped::Nothing;
            }
            let Some(from) = working.iter_mut().find(|c| c.chapter == *chapter) else { return Dropped::Nothing };
            let Some(index) = from.shots.iter().position(|s| s.slot == *slot) else { return Dropped::Nothing };
            let moved = from.shots.remove(index);
            let Some(into) = working.iter_mut().find(|c| c.chapter == tgt.chapter()) else { return Dropped::Nothing };
            let mut idx = match tgt {
                Target::Chapter { .. } => into.shots.len(),
                _ => into.shots.iter().position(|s| Some(s.slot) == tgt.slot()).unwrap_or(into.shots.len()),
            };
            if !matches!(tgt, Target::Chapter { .. }) && tgt.edge() == Edge::After {
                idx += 1;
            }
            let idx = idx.min(into.shots.len());
            let slot = if idx > 0 { into.shots[idx - 1].slot + 1 } else { 0 };
            // a whole shot keeps its files and their versions
            into.shots.insert(idx, Shot { slot, files: moved.files });
            changed(working)
        }

        Source::Unmatched { filename } => {
            let (base, ext) = split_name(filename);
            let entry = FileEntry { filename: filename.clone(), version: 0, extra: base.to_owned(), ext: ext.to_owned(), kind: classify(ext) };
            if place(&mut working, tgt, vec![entry], true) { changed(working) } else { Dropped::Nothing }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::model::{pending_renames, stage};

    fn file(name: &str, version: u32) -> FileEntry {
        let (_, ext) = split_name(name);
        FileEntry { filename: name.to_owned(), version, extra: name[3..name.len() - ext.len()].to_owned(), ext: ext.to_owned(), kind: classify(ext) }
    }
    /// Chapter 0: shot 0 (a.mp4 + a.jpg as version 0, b.png as version 1), shot 1 (c.mp4), shot 3 (d.mp4);
    /// chapter 1: shot 0 (e.mp4); chapter 2: empty.
    fn project() -> Vec<Chapter> {
        vec![
            Chapter {
                chapter: 0,
                locked: false,
                shots: vec![
                    Shot { slot: 0, files: vec![file("000a.mp4", 0), file("000a.jpg", 0), file("001b.png", 1)] },
                    Shot { slot: 1, files: vec![file("010c.mp4", 0)] },
                    Shot { slot: 3, files: vec![file("030d.mp4", 0)] },
                ],
            },
            Chapter { chapter: 1, locked: false, shots: vec![Shot { slot: 0, files: vec![file("100e.mp4", 0)] }] },
            Chapter { chapter: 2, locked: false, shots: vec![] },
        ]
    }
    fn cfg() -> Config {
        Config { chapter_digits: 1, ..Config::default() }
    }
    /// The files' names after the drop is staged, chapter by chapter, shot by shot.
    fn names(dropped: Dropped, cfg: &Config) -> Vec<Vec<Vec<String>>> {
        let Dropped::Changed { chapters, .. } = dropped else { panic!("not a change: {dropped:?}") };
        let staged = stage(chapters, cfg).unwrap();
        staged
            .iter()
            .map(|c| c.shots.iter().map(|s| s.files.iter().map(|f| crate::model::format_filename(cfg, c.chapter, s.slot, f.version, &f.extra, &f.ext)).collect()).collect())
            .collect()
    }
    fn shot(chapter: u32, slot: u32) -> Source {
        Source::Shot { chapter, slot }
    }
    fn on_shot(chapter: u32, slot: u32, edge: Edge) -> Target {
        Target::Shot { chapter, slot, edge }
    }

    #[test]
    fn a_shot_moved_up_takes_the_place_and_pushes_the_others() {
        let out = names(apply(&project(), &cfg(), &shot(0, 3), &on_shot(0, 0, Edge::Before)), &cfg());
        assert_eq!(out[0], vec![vec!["000d.mp4"], vec!["010a.mp4", "010a.jpg", "011b.png"], vec!["020c.mp4"]]);
    }

    #[test]
    fn a_shot_dropped_where_a_gap_is_falls_into_it() {
        // after shot 1, where slot 2 is free: only the moved shot is renamed
        let dropped = apply(&project(), &cfg(), &shot(1, 0), &on_shot(0, 1, Edge::After));
        let Dropped::Changed { chapters, .. } = dropped.clone() else { panic!() };
        let renames = pending_renames(&stage(chapters, &cfg()).unwrap(), &cfg());
        assert_eq!(renames, vec![("100e.mp4".to_owned(), "020e.mp4".to_owned())]);
        assert_eq!(names(dropped, &cfg())[0].len(), 4);
    }

    #[test]
    fn a_shot_goes_to_the_end_of_an_empty_chapter_and_onto_itself_does_nothing() {
        let out = names(apply(&project(), &cfg(), &shot(0, 1), &Target::Chapter { chapter: 2 }), &cfg());
        assert_eq!(out[2], vec![vec!["200c.mp4"]]);
        assert_eq!(apply(&project(), &cfg(), &shot(0, 1), &on_shot(0, 1, Edge::After)), Dropped::Nothing);
    }

    #[test]
    fn one_file_dropped_into_a_shot_becomes_its_next_version() {
        let src = Source::File { chapter: 0, slot: 0, filename: "001b.png".to_owned() };
        let out = names(apply(&project(), &cfg(), &src, &on_shot(0, 1, Edge::Into)), &cfg());
        assert_eq!(out[0][0], vec!["000a.mp4", "000a.jpg"]);
        assert_eq!(out[0][1], vec!["010c.mp4", "011b.png"]);
    }

    #[test]
    fn one_file_dropped_beside_a_shot_becomes_a_shot_of_its_own() {
        let src = Source::File { chapter: 0, slot: 0, filename: "001b.png".to_owned() };
        let out = names(apply(&project(), &cfg(), &src, &on_shot(1, 0, Edge::Before)), &cfg());
        assert_eq!(out[1], vec![vec!["100b.png"], vec!["110e.mp4"]]);
    }

    #[test]
    fn inside_a_shot_a_file_moves_with_its_whole_version() {
        // the picture of version 0 dropped after the file of version 1: the video goes with it
        let src = Source::File { chapter: 0, slot: 0, filename: "000a.jpg".to_owned() };
        let tgt = Target::Thumb { chapter: 0, slot: 0, filename: "001b.png".to_owned(), edge: Edge::After };
        let out = names(apply(&project(), &cfg(), &src, &tgt), &cfg());
        assert_eq!(out[0][0], vec!["000b.png", "001a.mp4", "001a.jpg"]);
        // onto the other file of its own version: nothing
        let own = Target::Thumb { chapter: 0, slot: 0, filename: "000a.mp4".to_owned(), edge: Edge::Before };
        assert_eq!(apply(&project(), &cfg(), &src, &own), Dropped::Nothing);
    }

    #[test]
    fn a_pile_reorders_inside_its_shot_or_leaves_as_one() {
        let src = Source::Pile { chapter: 0, slot: 0, version: 1 };
        let first = Target::Pile { chapter: 0, slot: 0, version: 0, edge: Edge::Before };
        assert_eq!(names(apply(&project(), &cfg(), &src, &first), &cfg())[0][0], vec!["000b.png", "001a.mp4", "001a.jpg"]);
        let away = Source::Pile { chapter: 0, slot: 0, version: 0 };
        let out = names(apply(&project(), &cfg(), &away, &on_shot(1, 0, Edge::Into)), &cfg());
        // what stays is renumbered from version 0; the pile joins the other shot as its next version
        assert_eq!(out[0][0], vec!["000b.png"]);
        assert_eq!(out[1][0], vec!["100e.mp4", "101a.mp4", "101a.jpg"]);
    }

    #[test]
    fn an_unmatched_file_takes_the_numbers_of_where_it_lands() {
        let src = Source::Unmatched { filename: "loose take.mov".to_owned() };
        let out = names(apply(&project(), &cfg(), &src, &on_shot(0, 1, Edge::After)), &cfg());
        assert_eq!(out[0][2], vec!["020loose take.mov"]);
        let merged = names(apply(&project(), &cfg(), &src, &on_shot(1, 0, Edge::Into)), &cfg());
        assert_eq!(merged[1][0], vec!["100e.mp4", "101loose take.mov"]);
    }

    #[test]
    fn chapters_reorder_and_the_lock_follows_its_chapter() {
        let mut chapters = project();
        chapters[1].locked = true;
        // the lock is checked on the chapter dragged and the one dropped on, by number
        let locked_cfg = Config { locked_chapters: vec![1], ..cfg() };
        assert_eq!(apply(&chapters, &locked_cfg, &Source::Chapter { chapter: 1 }, &Target::ChapterReorder { chapter: 0, edge: Edge::Before }), Dropped::Locked);
        assert_eq!(apply(&chapters, &locked_cfg, &shot(0, 1), &on_shot(1, 0, Edge::After)), Dropped::Locked);
        // moving chapter 0 after chapter 2 renumbers all three, and the locked one is now number 0
        let Dropped::Changed { chapters: out, locked } =
            apply(&chapters, &locked_cfg, &Source::Chapter { chapter: 0 }, &Target::ChapterReorder { chapter: 2, edge: Edge::After })
        else {
            panic!()
        };
        assert_eq!(out.iter().map(|c| (c.chapter, c.locked, c.shots.len())).collect::<Vec<_>>(), vec![(0, true, 1), (1, false, 0), (2, false, 3)]);
        assert_eq!(locked, Some(vec![0]));
        // a chapter dropped on a shot means nothing
        assert_eq!(apply(&project(), &cfg(), &Source::Chapter { chapter: 0 }, &on_shot(1, 0, Edge::After)), Dropped::Nothing);
    }
}
