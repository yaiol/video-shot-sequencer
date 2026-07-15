// ⚠ CLAUDE PRE-COMMIT GUARD - STOP before editing this file.
//   It holds every UI string, in every language. Do NOT hand-edit it: no empty
//   {} blocks, no copying values from another app, no pasting translations, no
//   "I'll fill the others later" - all of those are bugs. The only correct path
//   is the i18n key workflow: add keys in EN, then translate, sort and audit
//   across every language. Full procedure and exact commands: see CLAUDE-i18n.md.

import { useMemo } from 'react';

const TRANSLATIONS = {
  en: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel",
    btnGlobalDiscard:                       "Discard",
    tipGlobalOpenExternal:                  "Open in default app",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "New version available:",
    lnkUpdateWhatsNew:                      "What's new",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Skip this version",
    tipUpdateDismiss:                       "Dismiss",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Open settings",
    tipHdrHelp:                             "Help",
    btnHdrRefresh:                          "Refresh",
    tipHdrRefresh:                          "Re-scan folder",
    tipHdrRefreshDisabled:                  "Commit or discard pending changes first",
    btnHdrOpenFolder:                       "Open folder…",
    btnHdrCommit:                           "Commit",
    tipHdrDigitsChapter:                    "Chapter",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Version",
    tipHdrGroup:                            "Group Shots",
    tipHdrUngroup:                          "Ungroup Shots",
    tipHdrPreserveGaps:                     "Preserve slot gaps",
    tipHdrCompactOnDrop:                    "Compact slots on drop",
    tipHdrCompactAll:                       "Compact slot gaps in all chapters",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Settings",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsAbout:                    "About",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Language",
    lblDlgSettingsDisplayTheme:             "Theme",
    btnDlgSettingsDisplayThemeDark:         "Dark",
    btnDlgSettingsDisplayThemeLight:        "Light",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "sequence and renumber video shot files via drag-and-drop.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Chapter",
    lblChapterShots:                        "%N% shots",
    lblChapterGaps:                         "%N% gaps",
    tipChapterLock:                         "Lock Chapter",
    tipChapterUnlock:                       "Unlock Chapter",
    tipChapterCompact:                      "Compact slot gaps in this chapter",
    tipChapterCollapse:                     "Collapse chapter",
    tipChapterExpand:                       "Expand chapter",
    tipChapterDragHandle:                   "Drag to reorder chapter",
    empChapterEmpty:                        "Empty chapter - drop a shot here",
    btnChapterAdd:                          "+ Add chapter",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alts",
    lblShotFiles:                           "%N% files",
    tipShotThumbHint:                       "drag to move/reorder · click ▶ to preview",
    tipShotPileHint:                        "drag the pile to move all together",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Open a project folder",
    msgAppOpenFolderDesc1:                  "%APP% reads files named %PATTERN% (digits, then optional suffix) and lets you drag shots around to renumber them in bulk.",
    msgAppOpenFolderDesc2:                  "Widths are configured per folder in %INI%.",
    ttlAppNoMatch:                          "No matching files",
    msgAppNoMatchDesc:                      "No files in this folder match the pattern %PATTERN%",
    msgAppNoMatchHint:                      "Rename a few files manually to match, then hit Refresh.",
    cfmAppPendingFolderSwitch:              "You have pending renames. Discard them and open a different folder?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Unmatched",
    empUnmatchedHint:                       "drag onto a shot or chapter to assign",
    tipUnmatchedCardHint:                   "drag to assign · click ▶ to preview",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Ready",
    msgStatusbarWorking:                    "Working…",
    msgStatusbarNoChanges:                  "No changes",
    msgStatusbarPendingDiscarded:           "Pending changes discarded",
    msgStatusbarScanResult:                 "%N% files · %U% unmatched",
    msgStatusbarRenaming:                   "Renaming %N% files…",
    msgStatusbarRenamed:                    "Renamed %N% files",
    msgStatusbarPendingRenames:             "%N% pending renames - Commit to apply",
    msgStatusbarChapterOverflow:            "Chapter %N% exceeds digit width (max %M%)",
    msgStatusbarAllChaptersUsed:            "All %N% chapter slots are used - increase chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Empty chapter %ID% added - drag shots in, then Commit",
    msgStatusbarChapterLocked:              "Chapter is locked - unlock it first to move shots in or out",
    msgStatusbarDropFolderFailed:           "Could not read the dropped folder path",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Select project folder",

    // ⚠ CLAUDE: do NOT add keys here - every key must belong to an existing Prefix block above. If no block fits, ask the user.
  },

  fr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annuler",
    btnGlobalDiscard:                       "Ignorer",
    tipGlobalOpenExternal:                  "Ouvrir dans l'application par défaut",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nouvelle version disponible :",
    lnkUpdateWhatsNew:                      "Nouveautés",
    btnUpdateDownload:                      "Télécharger",
    lnkUpdateSkip:                          "Ignorer cette version",
    tipUpdateDismiss:                       "Ignorer",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Ouvrir les paramètres",
    tipHdrHelp:                             "Aide",
    btnHdrRefresh:                          "Actualiser",
    tipHdrRefresh:                          "Réanalyser le dossier",
    tipHdrRefreshDisabled:                  "Validez ou annulez les modifications en attente d'abord",
    btnHdrOpenFolder:                       "Ouvrir le dossier…",
    btnHdrCommit:                           "Valider",
    tipHdrDigitsChapter:                    "Chapitre",
    tipHdrDigitsSlot:                       "Emplacement",
    tipHdrDigitsVersion:                    "Version",
    tipHdrGroup:                            "Grouper les photos",
    tipHdrUngroup:                          "Dégrouper les photos",
    tipHdrPreserveGaps:                     "Conserver les espacements des emplacements",
    tipHdrCompactOnDrop:                    "Compacter les emplacements au dépôt",
    tipHdrCompactAll:                       "Compacter les espacements des emplacements dans tous les chapitres",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Paramètres",
    tabDlgSettingsDisplay:                  "Affichage",
    tabDlgSettingsAbout:                    "À propos",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Langue",
    lblDlgSettingsDisplayTheme:             "Thème",
    btnDlgSettingsDisplayThemeDark:         "Sombre",
    btnDlgSettingsDisplayThemeLight:        "Clair",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Séquencez et renumérotez les fichiers de séquences vidéo par glisser-déposer.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Chapitre",
    lblChapterShots:                        "%N% prises",
    lblChapterGaps:                         "%N% espacements",
    tipChapterLock:                         "Verrouiller le chapitre",
    tipChapterUnlock:                       "Déverrouiller le chapitre",
    tipChapterCompact:                      "Compacter les espacements des emplacements dans ce chapitre",
    tipChapterCollapse:                     "Réduire le chapitre",
    tipChapterExpand:                       "Développer le chapitre",
    tipChapterDragHandle:                   "Faire glisser pour réorganiser le chapitre",
    empChapterEmpty:                        "Chapitre vide - déposez un élément ici",
    btnChapterAdd:                          "+ Ajouter un chapitre",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alt.",
    lblShotFiles:                           "%N% fichiers",
    tipShotThumbHint:                       "glisser pour déplacer/réorganiser · cliquer ▶ pour prévisualiser",
    tipShotPileHint:                        "glisser la pile pour tout déplacer ensemble",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Ouvrir un dossier de projet",
    msgAppOpenFolderDesc1:                  "%APP% lit les fichiers nommés %PATTERN% (chiffres, puis suffixe facultatif) et vous permet de faire glisser les plans pour les renuméroter en masse.",
    msgAppOpenFolderDesc2:                  "Les largeurs sont configurées par dossier dans %INI%.",
    ttlAppNoMatch:                          "Aucun fichier correspondant",
    msgAppNoMatchDesc:                      "Aucun fichier dans ce dossier ne correspond au modèle %PATTERN%",
    msgAppNoMatchHint:                      "Renommez quelques fichiers manuellement pour les faire correspondre, puis cliquez sur Actualiser.",
    cfmAppPendingFolderSwitch:              "Vous avez des renommages en attente. Les ignorer et ouvrir un autre dossier ?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Non apparié",
    empUnmatchedHint:                       "faites glisser sur une prise ou un chapitre pour attribuer",
    tipUnmatchedCardHint:                   "faites glisser pour attribuer · cliquez sur ▶ pour prévisualiser",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Prêt",
    msgStatusbarWorking:                    "Traitement…",
    msgStatusbarNoChanges:                  "Aucune modification",
    msgStatusbarPendingDiscarded:           "Modifications en attente ignorées",
    msgStatusbarScanResult:                 "%N% fichiers · %U% non appariés",
    msgStatusbarRenaming:                   "Renommage de %N% fichiers…",
    msgStatusbarRenamed:                    "%N% fichiers renommés",
    msgStatusbarPendingRenames:             "%N% renommages en attente - Valider pour appliquer",
    msgStatusbarChapterOverflow:            "Le chapitre %N% dépasse la largeur de chiffre (max %M%)",
    msgStatusbarAllChaptersUsed:            "Tous les %N% emplacements de chapitre sont utilisés - augmentez chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Chapitre vide %ID% ajouté - faites glisser les plans, puis Valider",
    msgStatusbarChapterLocked:              "Chapitre verrouillé - déverrouillez-le d'abord pour déplacer des plans.",
    msgStatusbarDropFolderFailed:           "Impossible de lire le chemin du dossier déposé",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Sélectionner le dossier du projet",

  },

  de: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Abbrechen",
    btnGlobalDiscard:                       "Verwerfen",
    tipGlobalOpenExternal:                  "In Standard-App öffnen",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Neue Version verfügbar:",
    lnkUpdateWhatsNew:                      "Was ist neu",
    btnUpdateDownload:                      "Herunterladen",
    lnkUpdateSkip:                          "Diese Version überspringen",
    tipUpdateDismiss:                       "Schließen",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Einstellungen öffnen",
    tipHdrHelp:                             "Hilfe",
    btnHdrRefresh:                          "Aktualisieren",
    tipHdrRefresh:                          "Ordner neu scannen",
    tipHdrRefreshDisabled:                  "Zuerst ausstehende Änderungen übernehmen oder verwerfen",
    btnHdrOpenFolder:                       "Ordner öffnen…",
    btnHdrCommit:                           "Bestätigen",
    tipHdrDigitsChapter:                    "Kapitel",
    tipHdrDigitsSlot:                       "Steckplatz",
    tipHdrDigitsVersion:                    "Version",
    tipHdrGroup:                            "Aufnahmen gruppieren",
    tipHdrUngroup:                          "Aufnahmen entgruppieren",
    tipHdrPreserveGaps:                     "Lücken zwischen Slots beibehalten",
    tipHdrCompactOnDrop:                    "Slots beim Ablegen komprimieren",
    tipHdrCompactAll:                       "Slot-Lücken in allen Kapiteln komprimieren",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Einstellungen",
    tabDlgSettingsDisplay:                  "Anzeige",
    tabDlgSettingsAbout:                    "Über",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Sprache",
    lblDlgSettingsDisplayTheme:             "Design",
    btnDlgSettingsDisplayThemeDark:         "Dunkel",
    btnDlgSettingsDisplayThemeLight:        "Hell",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Video-Shot-Dateien per Drag-and-drop sequenzieren und neu nummerieren.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Kapitel",
    lblChapterShots:                        "%N% Aufnahmen",
    lblChapterGaps:                         "%N% Lücken",
    tipChapterLock:                         "Kapitel sperren",
    tipChapterUnlock:                       "Kapitel entsperren",
    tipChapterCompact:                      "Slot-Lücken in diesem Kapitel komprimieren",
    tipChapterCollapse:                     "Kapitel einklappen",
    tipChapterExpand:                       "Kapitel ausklappen",
    tipChapterDragHandle:                   "Ziehen zum Neuanordnen des Kapitels",
    empChapterEmpty:                        "Leeres Kapitel - legen Sie hier eine Aufnahme ab",
    btnChapterAdd:                          "+ Kapitel hinzufügen",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% Alts",
    lblShotFiles:                           "%N% Dateien",
    tipShotThumbHint:                       "ziehen zum Verschieben/Neuanordnen · ▶ klicken zur Vorschau",
    tipShotPileHint:                        "den Stapel ziehen, um alles zusammen zu verschieben",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Projektordner öffnen",
    msgAppOpenFolderDesc1:                  "%APP% liest Dateien mit dem Namen %PATTERN% (Ziffern, dann optionaler Suffix) und ermöglicht es Ihnen, Aufnahmen zu ziehen, um sie in großen Mengen neu zu nummerieren.",
    msgAppOpenFolderDesc2:                  "Breiten werden pro Ordner in %INI% konfiguriert.",
    ttlAppNoMatch:                          "Keine passenden Dateien",
    msgAppNoMatchDesc:                      "Keine Dateien in diesem Ordner entsprechen dem Muster %PATTERN%",
    msgAppNoMatchHint:                      "Benennen Sie einige Dateien manuell um, um sie abzugleichen, und klicken Sie dann auf Aktualisieren.",
    cfmAppPendingFolderSwitch:              "Sie haben ausstehende Umbenennungen. Verwerfen und einen anderen Ordner öffnen?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Nicht zugeordnet",
    empUnmatchedHint:                       "auf eine Aufnahme oder ein Kapitel ziehen, um es zuzuweisen",
    tipUnmatchedCardHint:                   "ziehen zum Zuweisen · ▶ klicken zum Vorschau",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Bereit",
    msgStatusbarWorking:                    "Wird bearbeitet…",
    msgStatusbarNoChanges:                  "Keine Änderungen",
    msgStatusbarPendingDiscarded:           "Ausstehende Änderungen verworfen",
    msgStatusbarScanResult:                 "%N% Dateien · %U% nicht zugeordnet",
    msgStatusbarRenaming:                   "%N% Dateien werden umbenannt…",
    msgStatusbarRenamed:                    "%N% Dateien umbenannt",
    msgStatusbarPendingRenames:             "%N% ausstehende Umbenennungen - Bestätigen zum Anwenden",
    msgStatusbarChapterOverflow:            "Kapitel %N% überschreitet Ziffernbreite (max. %M%)",
    msgStatusbarAllChaptersUsed:            "Alle %N% Kapitel-Slots sind belegt - chapterDigits erhöhen",
    msgStatusbarEmptyChapterAdded:          "Leeres Kapitel %ID% hinzugefügt - Aufnahmen hineinziehen, dann Bestätigen",
    msgStatusbarChapterLocked:              "Kapitel gesperrt - zuerst entsperren, um Aufnahmen zu verschieben.",
    msgStatusbarDropFolderFailed:           "Pfad des abgelegten Ordners konnte nicht gelesen werden",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Projektordner auswählen",

  },

  es: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",
    btnGlobalDiscard:                       "Descartar",
    tipGlobalOpenExternal:                  "Abrir en la aplicación predeterminada",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nueva versión disponible:",
    lnkUpdateWhatsNew:                      "Novedades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Ayuda",
    btnHdrRefresh:                          "Actualizar",
    tipHdrRefresh:                          "Volver a escanear carpeta",
    tipHdrRefreshDisabled:                  "Confirma o descarta los cambios pendientes primero",
    btnHdrOpenFolder:                       "Abrir carpeta…",
    btnHdrCommit:                           "Confirmar",
    tipHdrDigitsChapter:                    "Capítulo",
    tipHdrDigitsSlot:                       "Ranura",
    tipHdrDigitsVersion:                    "Versión",
    tipHdrGroup:                            "Agrupar fotos",
    tipHdrUngroup:                          "Desagrupar fotos",
    tipHdrPreserveGaps:                     "Conservar espacios de ranura",
    tipHdrCompactOnDrop:                    "Compactar ranuras al soltar",
    tipHdrCompactAll:                       "Compactar espacios de ranura en todos los capítulos",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Pantalla",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Oscuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Secuencia y renumeración de archivos de tomas de vídeo mediante arrastrar y soltar.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Capítulo",
    lblChapterShots:                        "%N% tomas",
    lblChapterGaps:                         "%N% espacios",
    tipChapterLock:                         "Bloquear capítulo",
    tipChapterUnlock:                       "Desbloquear capítulo",
    tipChapterCompact:                      "Compactar espacios de ranura en este capítulo",
    tipChapterCollapse:                     "Contraer capítulo",
    tipChapterExpand:                       "Expandir capítulo",
    tipChapterDragHandle:                   "Arrastrar para reordenar capítulo",
    empChapterEmpty:                        "Capítulo vacío - suelte un elemento aquí",
    btnChapterAdd:                          "+ Añadir capítulo",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alts.",
    lblShotFiles:                           "%N% archivos",
    tipShotThumbHint:                       "arrastrar para mover/reordenar · clic ▶ para previsualizar",
    tipShotPileHint:                        "arrastrar la pila para mover todo junto",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Abrir una carpeta de proyecto",
    msgAppOpenFolderDesc1:                  "%APP% lee archivos llamados %PATTERN% (dígitos, luego sufijo opcional) y le permite arrastrar tomas para renumerarlas en masa.",
    msgAppOpenFolderDesc2:                  "Los anchos se configuran por carpeta en %INI%.",
    ttlAppNoMatch:                          "No hay archivos coincidentes",
    msgAppNoMatchDesc:                      "Ningún archivo en esta carpeta coincide con el patrón %PATTERN%",
    msgAppNoMatchHint:                      "Renombra algunos archivos manualmente para que coincidan y luego pulsa Actualizar.",
    cfmAppPendingFolderSwitch:              "Tienes cambios de nombre pendientes. ¿Descartarlos y abrir una carpeta diferente?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Sin coincidencia",
    empUnmatchedHint:                       "arrastra a una toma o capítulo para asignar",
    tipUnmatchedCardHint:                   "arrastra para asignar · haz clic en ▶ para previsualizar",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Listo",
    msgStatusbarWorking:                    "Trabajando…",
    msgStatusbarNoChanges:                  "Sin cambios",
    msgStatusbarPendingDiscarded:           "Cambios pendientes descartados",
    msgStatusbarScanResult:                 "%N% archivos · %U% sin coincidencia",
    msgStatusbarRenaming:                   "Cambiando nombre a %N% archivos…",
    msgStatusbarRenamed:                    "%N% archivos renombrados",
    msgStatusbarPendingRenames:             "%N% cambios de nombre pendientes - Confirmar para aplicar",
    msgStatusbarChapterOverflow:            "El capítulo %N% excede el ancho de dígito (máx. %M%)",
    msgStatusbarAllChaptersUsed:            "Todas las %N% ranuras de capítulo están usadas - aumente chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Capítulo vacío %ID% añadido - arrastre tomas, luego Confirmar",
    msgStatusbarChapterLocked:              "Capítulo bloqueado - desbloquéelo primero para mover tomas.",
    msgStatusbarDropFolderFailed:           "No se pudo leer la ruta de la carpeta soltada",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Seleccionar carpeta del proyecto",

  },

  pt_BR: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",
    btnGlobalDiscard:                       "Descartar",
    tipGlobalOpenExternal:                  "Abrir no aplicativo padrão",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Baixar",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir configurações",
    tipHdrHelp:                             "Ajuda",
    btnHdrRefresh:                          "Atualizar",
    tipHdrRefresh:                          "Reanalisar pasta",
    tipHdrRefreshDisabled:                  "Confirme ou descarte as alterações pendentes primeiro",
    btnHdrOpenFolder:                       "Abrir pasta…",
    btnHdrCommit:                           "Confirmar",
    tipHdrDigitsChapter:                    "Capítulo",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Versão",
    tipHdrGroup:                            "Agrupar fotos",
    tipHdrUngroup:                          "Desagrupar fotos",
    tipHdrPreserveGaps:                     "Preservar espaços de slot",
    tipHdrCompactOnDrop:                    "Compactar slots ao soltar",
    tipHdrCompactAll:                       "Compactar espaços de slot em todos os capítulos",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configurações",
    tabDlgSettingsDisplay:                  "Exibição",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sequencie e renumerar arquivos de vídeo via arrastar e soltar.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Capítulo",
    lblChapterShots:                        "%N% tomadas",
    lblChapterGaps:                         "%N% espaços",
    tipChapterLock:                         "Bloquear capítulo",
    tipChapterUnlock:                       "Desbloquear capítulo",
    tipChapterCompact:                      "Compactar espaços de slot neste capítulo",
    tipChapterCollapse:                     "Recolher capítulo",
    tipChapterExpand:                       "Expandir capítulo",
    tipChapterDragHandle:                   "Arrastar para reordenar capítulo",
    empChapterEmpty:                        "Capítulo vazio - solte um item aqui",
    btnChapterAdd:                          "+ Adicionar capítulo",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alts.",
    lblShotFiles:                           "%N% arquivos",
    tipShotThumbHint:                       "arrastar para mover/reordenar · clicar ▶ para pré-visualizar",
    tipShotPileHint:                        "arrastar a pilha para mover tudo junto",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Abrir uma pasta de projeto",
    msgAppOpenFolderDesc1:                  "%APP% lê arquivos nomeados %PATTERN% (dígitos, depois sufixo opcional) e permite arrastar tomadas para renumerá-las em massa.",
    msgAppOpenFolderDesc2:                  "As larguras são configuradas por pasta em %INI%.",
    ttlAppNoMatch:                          "Nenhum arquivo correspondente",
    msgAppNoMatchDesc:                      "Nenhum arquivo nesta pasta corresponde ao padrão %PATTERN%",
    msgAppNoMatchHint:                      "Renomeie alguns arquivos manualmente para corresponder, depois clique em Atualizar.",
    cfmAppPendingFolderSwitch:              "Você tem renomeações pendentes. Descartá-las e abrir uma pasta diferente?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Não correspondido",
    empUnmatchedHint:                       "arraste para uma cena ou capítulo para atribuir",
    tipUnmatchedCardHint:                   "arraste para atribuir · clique em ▶ para pré-visualizar",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Pronto",
    msgStatusbarWorking:                    "A trabalhar…",
    msgStatusbarNoChanges:                  "Sem alterações",
    msgStatusbarPendingDiscarded:           "Alterações pendentes descartadas",
    msgStatusbarScanResult:                 "%N% ficheiros · %U% não correspondentes",
    msgStatusbarRenaming:                   "Renomeando %N% arquivos…",
    msgStatusbarRenamed:                    "%N% arquivos renomeados",
    msgStatusbarPendingRenames:             "%N% renomeações pendentes - Confirmar para aplicar",
    msgStatusbarChapterOverflow:            "O capítulo %N% excede a largura do dígito (máx. %M%)",
    msgStatusbarAllChaptersUsed:            "Todos os %N% slots de capítulo estão em uso - aumente chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Capítulo vazio %ID% adicionado - arraste planos, depois Confirmar",
    msgStatusbarChapterLocked:              "Capítulo bloqueado - desbloqueie-o primeiro para mover cenas.",
    msgStatusbarDropFolderFailed:           "Não foi possível ler o caminho da pasta solta",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Selecionar pasta do projeto",

  },

  pt_PT: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",
    btnGlobalDiscard:                       "Descartar",
    tipGlobalOpenExternal:                  "Abrir na aplicação padrão",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versão disponível:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Transferir",
    lnkUpdateSkip:                          "Ignorar esta versão",
    tipUpdateDismiss:                       "Dispensar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir definições",
    tipHdrHelp:                             "Ajuda",
    btnHdrRefresh:                          "Atualizar",
    tipHdrRefresh:                          "Reanalisar pasta",
    tipHdrRefreshDisabled:                  "Confirme ou descarte as alterações pendentes primeiro",
    btnHdrOpenFolder:                       "Abrir pasta…",
    btnHdrCommit:                           "Confirmar",
    tipHdrDigitsChapter:                    "Capítulo",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Versão",
    tipHdrGroup:                            "Agrupar fotografias",
    tipHdrUngroup:                          "Desagrupar fotografias",
    tipHdrPreserveGaps:                     "Preservar espaços de slot",
    tipHdrCompactOnDrop:                    "Compactar slots ao soltar",
    tipHdrCompactAll:                       "Compactar espaços de slot em todos os capítulos",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Definições",
    tabDlgSettingsDisplay:                  "Visualização",
    tabDlgSettingsAbout:                    "Sobre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sequencie e renumerar ficheiros de vídeo através de arrastar e soltar.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Capítulo",
    lblChapterShots:                        "%N% tomadas",
    lblChapterGaps:                         "%N% espaços",
    tipChapterLock:                         "Bloquear capítulo",
    tipChapterUnlock:                       "Desbloquear capítulo",
    tipChapterCompact:                      "Compactar espaços de slot neste capítulo",
    tipChapterCollapse:                     "Recolher capítulo",
    tipChapterExpand:                       "Expandir capítulo",
    tipChapterDragHandle:                   "Arrastar para reordenar capítulo",
    empChapterEmpty:                        "Capítulo vazio - solte um item aqui",
    btnChapterAdd:                          "+ Adicionar capítulo",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alts.",
    lblShotFiles:                           "%N% ficheiros",
    tipShotThumbHint:                       "arrastar para mover/reordenar · clicar ▶ para pré-visualizar",
    tipShotPileHint:                        "arrastar a pilha para mover tudo junto",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Abrir uma pasta de projeto",
    msgAppOpenFolderDesc1:                  "%APP% lê ficheiros nomeados %PATTERN% (dígitos, depois sufixo opcional) e permite arrastar tomadas para renumerá-las em massa.",
    msgAppOpenFolderDesc2:                  "As larguras são configuradas por pasta em %INI%.",
    ttlAppNoMatch:                          "Nenhum ficheiro correspondente",
    msgAppNoMatchDesc:                      "Nenhum ficheiro nesta pasta corresponde ao padrão %PATTERN%",
    msgAppNoMatchHint:                      "Renomeie alguns ficheiros manualmente para corresponder, depois clique em Atualizar.",
    cfmAppPendingFolderSwitch:              "Tem renomeações pendentes. Descartá-las e abrir uma pasta diferente?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Não correspondido",
    empUnmatchedHint:                       "arraste para uma cena ou capítulo para atribuir",
    tipUnmatchedCardHint:                   "arraste para atribuir · clique em ▶ para pré-visualizar",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Pronto",
    msgStatusbarWorking:                    "A trabalhar…",
    msgStatusbarNoChanges:                  "Sem alterações",
    msgStatusbarPendingDiscarded:           "Alterações pendentes descartadas",
    msgStatusbarScanResult:                 "%N% ficheiros · %U% não correspondentes",
    msgStatusbarRenaming:                   "A renomear %N% ficheiros…",
    msgStatusbarRenamed:                    "%N% ficheiros renomeados",
    msgStatusbarPendingRenames:             "%N% renomeações pendentes - Confirmar para aplicar",
    msgStatusbarChapterOverflow:            "O capítulo %N% excede a largura do dígito (máx. %M%)",
    msgStatusbarAllChaptersUsed:            "Todos os %N% slots de capítulo estão em uso - aumente chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Capítulo vazio %ID% adicionado - arraste planos, depois Confirmar",
    msgStatusbarChapterLocked:              "Capítulo bloqueado - desbloqueie-o primeiro para mover cenas.",
    msgStatusbarDropFolderFailed:           "Não foi possível ler o caminho da pasta solta",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Selecionar pasta do projeto",

  },

  it: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annulla",
    btnGlobalDiscard:                       "Scarta",
    tipGlobalOpenExternal:                  "Apri nell'app predefinita",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nuova versione disponibile:",
    lnkUpdateWhatsNew:                      "Novità",
    btnUpdateDownload:                      "Scarica",
    lnkUpdateSkip:                          "Salta questa versione",
    tipUpdateDismiss:                       "Ignora",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Apri impostazioni",
    tipHdrHelp:                             "Aiuto",
    btnHdrRefresh:                          "Aggiorna",
    tipHdrRefresh:                          "Riscansiona cartella",
    tipHdrRefreshDisabled:                  "Prima conferma o annulla le modifiche in sospeso",
    btnHdrOpenFolder:                       "Apri cartella…",
    btnHdrCommit:                           "Conferma",
    tipHdrDigitsChapter:                    "Capitolo",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Versione",
    tipHdrGroup:                            "Raggruppa scatti",
    tipHdrUngroup:                          "Separa scatti",
    tipHdrPreserveGaps:                     "Mantieni spazi slot",
    tipHdrCompactOnDrop:                    "Comprimi slot al rilascio",
    tipHdrCompactAll:                       "Comprimi spazi slot in tutti i capitoli",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Impostazioni",
    tabDlgSettingsDisplay:                  "Schermo",
    tabDlgSettingsAbout:                    "Informazioni",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lingua",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Scuro",
    btnDlgSettingsDisplayThemeLight:        "Chiaro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sequenzia e rinumera i file di riprese video tramite trascinamento.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Capitolo",
    lblChapterShots:                        "%N% scatti",
    lblChapterGaps:                         "%N% spazi",
    tipChapterLock:                         "Blocca capitolo",
    tipChapterUnlock:                       "Sblocca capitolo",
    tipChapterCompact:                      "Comprimi spazi slot in questo capitolo",
    tipChapterCollapse:                     "Comprimi capitolo",
    tipChapterExpand:                       "Espandi capitolo",
    tipChapterDragHandle:                   "Trascina per riordinare il capitolo",
    empChapterEmpty:                        "Capitolo vuoto - trascina un elemento qui",
    btnChapterAdd:                          "+ Aggiungi capitolo",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alt.",
    lblShotFiles:                           "%N% file",
    tipShotThumbHint:                       "trascina per spostare/riordinare · clicca ▶ per l'anteprima",
    tipShotPileHint:                        "trascina la pila per spostare tutto insieme",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Apri una cartella di progetto",
    msgAppOpenFolderDesc1:                  "%APP% legge i file denominati %PATTERN% (cifre, poi suffisso opzionale) e ti consente di trascinare le inquadrature per rinumerarle in blocco.",
    msgAppOpenFolderDesc2:                  "Le larghezze sono configurate per cartella in %INI%.",
    ttlAppNoMatch:                          "Nessun file corrispondente",
    msgAppNoMatchDesc:                      "Nessun file in questa cartella corrisponde al modello %PATTERN%",
    msgAppNoMatchHint:                      "Rinomina alcuni file manualmente per farli corrispondere, quindi clicca su Aggiorna.",
    cfmAppPendingFolderSwitch:              "Hai delle ridenominazioni in sospeso. Ignorarle e aprire una cartella diversa?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Non abbinato",
    empUnmatchedHint:                       "trascina su una ripresa o un capitolo per assegnare",
    tipUnmatchedCardHint:                   "trascina per assegnare · clicca ▶ per l'anteprima",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Pronto",
    msgStatusbarWorking:                    "Elaborazione…",
    msgStatusbarNoChanges:                  "Nessuna modifica",
    msgStatusbarPendingDiscarded:           "Modifiche in sospeso scartate",
    msgStatusbarScanResult:                 "%N% file · %U% non corrispondenti",
    msgStatusbarRenaming:                   "Rinomina di %N% file…",
    msgStatusbarRenamed:                    "%N% file rinominati",
    msgStatusbarPendingRenames:             "%N% ridenominazioni in sospeso - Conferma per applicare",
    msgStatusbarChapterOverflow:            "Il capitolo %N% supera la larghezza della cifra (max %M%)",
    msgStatusbarAllChaptersUsed:            "Tutti i %N% slot capitolo sono usati - aumenta chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Capitolo vuoto %ID% aggiunto - trascina le riprese, poi Conferma",
    msgStatusbarChapterLocked:              "Capitolo bloccato - sbloccalo prima per spostare le riprese.",
    msgStatusbarDropFolderFailed:           "Impossibile leggere il percorso della cartella rilasciata",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Seleziona cartella progetto",

  },

  nl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annuleren",
    btnGlobalDiscard:                       "Verwerpen",
    tipGlobalOpenExternal:                  "Openen in standaard-app",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nieuwe versie beschikbaar:",
    lnkUpdateWhatsNew:                      "Wat is nieuw",
    btnUpdateDownload:                      "Downloaden",
    lnkUpdateSkip:                          "Deze versie overslaan",
    tipUpdateDismiss:                       "Sluiten",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Instellingen openen",
    tipHdrHelp:                             "Hulp",
    btnHdrRefresh:                          "Vernieuwen",
    tipHdrRefresh:                          "Map opnieuw scannen",
    tipHdrRefreshDisabled:                  "Eerst openstaande wijzigingen doorvoeren of negeren",
    btnHdrOpenFolder:                       "Map openen…",
    btnHdrCommit:                           "Vastleggen",
    tipHdrDigitsChapter:                    "Hoofdstuk",
    tipHdrDigitsSlot:                       "Sleuf",
    tipHdrDigitsVersion:                    "Versie",
    tipHdrGroup:                            "Opnamen groeperen",
    tipHdrUngroup:                          "Groepering opheffen",
    tipHdrPreserveGaps:                     "Sleufgaten behouden",
    tipHdrCompactOnDrop:                    "Sleuven compact maken bij neerzetten",
    tipHdrCompactAll:                       "Sleufgaten in alle hoofdstukken compact maken",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Instellingen",
    tabDlgSettingsDisplay:                  "Weergave",
    tabDlgSettingsAbout:                    "Over",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Taal",
    lblDlgSettingsDisplayTheme:             "Thema",
    btnDlgSettingsDisplayThemeDark:         "Donker",
    btnDlgSettingsDisplayThemeLight:        "Licht",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Video-opnamebestanden sequencen en hernummeren via slepen en neerzetten.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Hoofdstuk",
    lblChapterShots:                        "%N% opnamen",
    lblChapterGaps:                         "%N% gaten",
    tipChapterLock:                         "Hoofdstuk vergrendelen",
    tipChapterUnlock:                       "Hoofdstuk ontgrendelen",
    tipChapterCompact:                      "Sleufgaten in dit hoofdstuk compact maken",
    tipChapterCollapse:                     "Hoofdstuk inklappen",
    tipChapterExpand:                       "Hoofdstuk uitklappen",
    tipChapterDragHandle:                   "Slepen om hoofdstuk te herordenen",
    empChapterEmpty:                        "Leeg hoofdstuk - sleep hier een opname",
    btnChapterAdd:                          "+ Hoofdstuk toevoegen",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alts",
    lblShotFiles:                           "%N% bestanden",
    tipShotThumbHint:                       "slepen om te verplaatsen/herschikken · klik ▶ voor voorbeeld",
    tipShotPileHint:                        "sleep de stapel om alles samen te verplaatsen",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Een projectmap openen",
    msgAppOpenFolderDesc1:                  "%APP% leest bestanden genaamd %PATTERN% (cijfers, dan optioneel achtervoegsel) en laat u opnamen verslepen om ze in bulk te hernummeren.",
    msgAppOpenFolderDesc2:                  "Breedtes worden per map geconfigureerd in %INI%.",
    ttlAppNoMatch:                          "Geen overeenkomende bestanden",
    msgAppNoMatchDesc:                      "Geen bestanden in deze map komen overeen met het patroon %PATTERN%",
    msgAppNoMatchHint:                      "Hernoem enkele bestanden handmatig om ze te matchen en klik dan op Vernieuwen.",
    cfmAppPendingFolderSwitch:              "U heeft nog hernoemingen in behandeling. Deze negeren en een andere map openen?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Niet gekoppeld",
    empUnmatchedHint:                       "sleep naar een shot of hoofdstuk om toe te wijzen",
    tipUnmatchedCardHint:                   "slepen om toe te wijzen · klik op ▶ om voor te bekijken",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Klaar",
    msgStatusbarWorking:                    "Bezig…",
    msgStatusbarNoChanges:                  "Geen wijzigingen",
    msgStatusbarPendingDiscarded:           "Lopende wijzigingen genegeerd",
    msgStatusbarScanResult:                 "%N% bestanden · %U% niet-overeenkomend",
    msgStatusbarRenaming:                   "%N% bestanden hernoemen…",
    msgStatusbarRenamed:                    "%N% bestanden hernoemd",
    msgStatusbarPendingRenames:             "%N% hernoemingen in behandeling - Vastleggen om toe te passen",
    msgStatusbarChapterOverflow:            "Hoofdstuk %N% overschrijdt cijferbreedte (max %M%)",
    msgStatusbarAllChaptersUsed:            "Alle %N% hoofdstukslots zijn gebruikt - verhoog chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Leeg hoofdstuk %ID% toegevoegd - sleep shots erin, dan Vastleggen",
    msgStatusbarChapterLocked:              "Hoofdstuk vergrendeld - ontgrendel het eerst om opnamen te verplaatsen.",
    msgStatusbarDropFolderFailed:           "Pad van neergezette map kon niet gelezen worden",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Projectmap selecteren",

  },

  ru: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Отмена",
    btnGlobalDiscard:                       "Отменить",
    tipGlobalOpenExternal:                  "Открыть в приложении по умолчанию",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна новая версия:",
    lnkUpdateWhatsNew:                      "Что нового",
    btnUpdateDownload:                      "Скачать",
    lnkUpdateSkip:                          "Пропустить эту версию",
    tipUpdateDismiss:                       "Закрыть",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Открыть настройки",
    tipHdrHelp:                             "Помощь",
    btnHdrRefresh:                          "Обновить",
    tipHdrRefresh:                          "Повторное сканирование папки",
    tipHdrRefreshDisabled:                  "Сначала зафиксируйте или отмените ожидающие изменения",
    btnHdrOpenFolder:                       "Открыть папку…",
    btnHdrCommit:                           "Применить",
    tipHdrDigitsChapter:                    "Глава",
    tipHdrDigitsSlot:                       "Слот",
    tipHdrDigitsVersion:                    "Версия",
    tipHdrGroup:                            "Группировать снимки",
    tipHdrUngroup:                          "Разгруппировать снимки",
    tipHdrPreserveGaps:                     "Сохранять промежутки между слотами",
    tipHdrCompactOnDrop:                    "Сжимать слоты при перетаскивании",
    tipHdrCompactAll:                       "Сжать промежутки между слотами во всех главах",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Отображение",
    tabDlgSettingsAbout:                    "О программе",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Язык",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тёмный",
    btnDlgSettingsDisplayThemeLight:        "Светлый",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Упорядочивайте и перенумеровывайте файлы видеозаписей перетаскиванием.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Глава",
    lblChapterShots:                        "%N% кадров",
    lblChapterGaps:                         "%N% промежутков",
    tipChapterLock:                         "Заблокировать главу",
    tipChapterUnlock:                       "Разблокировать главу",
    tipChapterCompact:                      "Сжать промежутки между слотами в этой главе",
    tipChapterCollapse:                     "Свернуть главу",
    tipChapterExpand:                       "Развернуть главу",
    tipChapterDragHandle:                   "Перетащите для изменения порядка главы",
    empChapterEmpty:                        "Пустая глава - перетащите сюда кадр",
    btnChapterAdd:                          "+ Добавить главу",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% альтернатив",
    lblShotFiles:                           "%N% файлов",
    tipShotThumbHint:                       "перетащите для перемещения/изменения порядка · нажмите ▶ для предпросмотра",
    tipShotPileHint:                        "перетащите стопку, чтобы переместить все вместе",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Открыть папку проекта",
    msgAppOpenFolderDesc1:                  "%APP% читает файлы с именем %PATTERN% (цифры, затем необязательный суффикс) и позволяет перетаскивать кадры для их массовой перенумерации.",
    msgAppOpenFolderDesc2:                  "Ширина настраивается для каждой папки в %INI%.",
    ttlAppNoMatch:                          "Нет совпадающих файлов",
    msgAppNoMatchDesc:                      "В этой папке нет файлов, соответствующих шаблону %PATTERN%",
    msgAppNoMatchHint:                      "Переименуйте несколько файлов вручную, чтобы они совпали, затем нажмите Обновить.",
    cfmAppPendingFolderSwitch:              "У вас есть незавершенные переименования. Отменить их и открыть другую папку?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Без совпадений",
    empUnmatchedHint:                       "перетащите на кадр или главу, чтобы назначить",
    tipUnmatchedCardHint:                   "перетащите, чтобы назначить · нажмите ▶ для предварительного просмотра",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Готово",
    msgStatusbarWorking:                    "Работаю…",
    msgStatusbarNoChanges:                  "Без изменений",
    msgStatusbarPendingDiscarded:           "Отложенные изменения отменены",
    msgStatusbarScanResult:                 "%N% файлов · %U% несовпадений",
    msgStatusbarRenaming:                   "Переименование %N% файлов…",
    msgStatusbarRenamed:                    "%N% файлов переименовано",
    msgStatusbarPendingRenames:             "%N% ожидающих переименований - Подтвердить для применения",
    msgStatusbarChapterOverflow:            "Глава %N% превышает ширину цифры (макс. %M%)",
    msgStatusbarAllChaptersUsed:            "Все %N% слотов глав заняты - увеличьте chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Пустая глава %ID% добавлена - перетащите кадры, затем Подтвердить",
    msgStatusbarChapterLocked:              "Глава заблокирована - сначала разблокируйте ее, чтобы перемещать кадры.",
    msgStatusbarDropFolderFailed:           "Не удалось прочитать путь к перетащенной папке",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Выбрать папку проекта",

  },

  uk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Скасувати",
    btnGlobalDiscard:                       "Скасувати",
    tipGlobalOpenExternal:                  "Відкрити у програмі за замовчуванням",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна нова версія:",
    lnkUpdateWhatsNew:                      "Що нового",
    btnUpdateDownload:                      "Завантажити",
    lnkUpdateSkip:                          "Пропустити цю версію",
    tipUpdateDismiss:                       "Закрити",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Відкрити налаштування",
    tipHdrHelp:                             "Довідка",
    btnHdrRefresh:                          "Оновити",
    tipHdrRefresh:                          "Повторно сканувати теку",
    tipHdrRefreshDisabled:                  "Спочатку зафіксуйте або скасуйте незавершені зміни",
    btnHdrOpenFolder:                       "Відкрити теку…",
    btnHdrCommit:                           "Застосувати",
    tipHdrDigitsChapter:                    "Розділ",
    tipHdrDigitsSlot:                       "Слот",
    tipHdrDigitsVersion:                    "Версія",
    tipHdrGroup:                            "Групувати знімки",
    tipHdrUngroup:                          "Розгрупувати знімки",
    tipHdrPreserveGaps:                     "Зберігати проміжки між слотами",
    tipHdrCompactOnDrop:                    "Стискати слоти при перетягуванні",
    tipHdrCompactAll:                       "Стиснути проміжки між слотами в усіх розділах",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Налаштування",
    tabDlgSettingsDisplay:                  "Відображення",
    tabDlgSettingsAbout:                    "Про програму",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Мова",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Темний",
    btnDlgSettingsDisplayThemeLight:        "Світлий",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Упорядковуйте та перенумеровуйте файли відеозаписів перетягуванням.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Розділ",
    lblChapterShots:                        "%N% кадрів",
    lblChapterGaps:                         "%N% проміжків",
    tipChapterLock:                         "Заблокувати розділ",
    tipChapterUnlock:                       "Розблокувати розділ",
    tipChapterCompact:                      "Стиснути проміжки між слотами в цьому розділі",
    tipChapterCollapse:                     "Згорнути розділ",
    tipChapterExpand:                       "Розгорнути розділ",
    tipChapterDragHandle:                   "Перетягніть, щоб змінити порядок розділу",
    empChapterEmpty:                        "Порожній розділ - перетягніть сюди кадр",
    btnChapterAdd:                          "+ Додати розділ",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% альтернатив",
    lblShotFiles:                           "%N% файлів",
    tipShotThumbHint:                       "перетягніть, щоб перемістити/змінити порядок · натисніть ▶ для попереднього перегляду",
    tipShotPileHint:                        "перетягніть стопку, щоб перемістити все разом",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Відкрити папку проєкту",
    msgAppOpenFolderDesc1:                  "%APP% читає файли з назвою %PATTERN% (цифри, потім необов'язковий суфікс) і дозволяє перетягувати кадри для їх масової перенумерації.",
    msgAppOpenFolderDesc2:                  "Ширина налаштовується для кожної папки в %INI%.",
    ttlAppNoMatch:                          "Немає відповідних файлів",
    msgAppNoMatchDesc:                      "У цій папці немає файлів, що відповідають шаблону %PATTERN%",
    msgAppNoMatchHint:                      "Перейменуйте кілька файлів вручну, щоб вони збігалися, потім натисніть Оновити.",
    cfmAppPendingFolderSwitch:              "У вас є незавершені перейменування. Скасувати їх і відкрити іншу папку?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Без відповідності",
    empUnmatchedHint:                       "перетягніть на кадр або розділ, щоб призначити",
    tipUnmatchedCardHint:                   "перетягніть, щоб призначити · натисніть ▶ для попереднього перегляду",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Готово",
    msgStatusbarWorking:                    "Обробка…",
    msgStatusbarNoChanges:                  "Без змін",
    msgStatusbarPendingDiscarded:           "Відкладені зміни відхилено",
    msgStatusbarScanResult:                 "%N% файлів · %U% невідповідностей",
    msgStatusbarRenaming:                   "Перейменування %N% файлів…",
    msgStatusbarRenamed:                    "Перейменовано %N% файлів",
    msgStatusbarPendingRenames:             "%N% очікуваних перейменувань - Підтвердити для застосування",
    msgStatusbarChapterOverflow:            "Розділ %N% перевищує ширину цифри (макс. %M%)",
    msgStatusbarAllChaptersUsed:            "Всі %N% слотів розділів використано - збільшіть chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Пустий розділ %ID% додано - перетягніть кадри, потім Зафіксувати",
    msgStatusbarChapterLocked:              "Розділ заблоковано - спочатку розблокуйте його, щоб переміщувати кадри.",
    msgStatusbarDropFolderFailed:           "Не вдалося прочитати шлях до перетягнутої папки",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Вибрати теку проєкту",

  },

  pl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Anuluj",
    btnGlobalDiscard:                       "Odrzuć",
    tipGlobalOpenExternal:                  "Otwórz w domyślnej aplikacji",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Dostępna nowa wersja:",
    lnkUpdateWhatsNew:                      "Co nowego",
    btnUpdateDownload:                      "Pobierz",
    lnkUpdateSkip:                          "Pomiń tę wersję",
    tipUpdateDismiss:                       "Zamknij",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otwórz ustawienia",
    tipHdrHelp:                             "Pomoc",
    btnHdrRefresh:                          "Odśwież",
    tipHdrRefresh:                          "Ponownie skanuj folder",
    tipHdrRefreshDisabled:                  "Najpierw zatwierdź lub odrzuć oczekujące zmiany",
    btnHdrOpenFolder:                       "Otwórz folder…",
    btnHdrCommit:                           "Zatwierdź",
    tipHdrDigitsChapter:                    "Rozdział",
    tipHdrDigitsSlot:                       "Gniazdo",
    tipHdrDigitsVersion:                    "Wersja",
    tipHdrGroup:                            "Grupuj zdjęcia",
    tipHdrUngroup:                          "Rozgrupuj zdjęcia",
    tipHdrPreserveGaps:                     "Zachowaj odstępy między slotami",
    tipHdrCompactOnDrop:                    "Kompaktuj sloty po upuszczeniu",
    tipHdrCompactAll:                       "Kompaktuj odstępy między slotami we wszystkich rozdziałach",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ustawienia",
    tabDlgSettingsDisplay:                  "Wyświetlanie",
    tabDlgSettingsAbout:                    "O programie",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Język",
    lblDlgSettingsDisplayTheme:             "Motyw",
    btnDlgSettingsDisplayThemeDark:         "Ciemny",
    btnDlgSettingsDisplayThemeLight:        "Jasny",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sekwencjonuj i zmieniaj numery plików ujęć wideo metodą „przeciągnij i upuść”.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Rozdział",
    lblChapterShots:                        "%N% ujęć",
    lblChapterGaps:                         "%N% odstępów",
    tipChapterLock:                         "Zablokuj rozdział",
    tipChapterUnlock:                       "Odblokuj rozdział",
    tipChapterCompact:                      "Kompaktuj odstępy między slotami w tym rozdziale",
    tipChapterCollapse:                     "Zwiń rozdział",
    tipChapterExpand:                       "Rozwiń rozdział",
    tipChapterDragHandle:                   "Przeciągnij, aby zmienić kolejność rozdziału",
    empChapterEmpty:                        "Pusty rozdział - upuść tutaj ujęcie",
    btnChapterAdd:                          "+ Dodaj rozdział",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatyw",
    lblShotFiles:                           "%N% plików",
    tipShotThumbHint:                       "przeciągnij, aby przenieść/zmienić kolejność · kliknij ▶, aby wyświetlić podgląd",
    tipShotPileHint:                        "przeciągnij stos, aby przenieść wszystko razem",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Otwórz folder projektu",
    msgAppOpenFolderDesc1:                  "%APP% odczytuje pliki o nazwie %PATTERN% (cyfry, a następnie opcjonalny sufiks) i umożliwia przeciąganie ujęć w celu ich masowej zmiany numeracji.",
    msgAppOpenFolderDesc2:                  "Szerokości są konfigurowane dla każdego folderu w %INI%.",
    ttlAppNoMatch:                          "Brak pasujących plików",
    msgAppNoMatchDesc:                      "Brak plików w tym folderze pasujących do wzorca %PATTERN%",
    msgAppNoMatchHint:                      "Zmień nazwy kilku plików ręcznie, aby pasowały, a następnie kliknij Odśwież.",
    cfmAppPendingFolderSwitch:              "Masz oczekujące zmiany nazw. Odrzucić je i otworzyć inny folder?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Niedopasowane",
    empUnmatchedHint:                       "przeciągnij na ujęcie lub rozdział, aby przypisać",
    tipUnmatchedCardHint:                   "przeciągnij, aby przypisać · kliknij ▶, aby wyświetlić podgląd",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Gotowy",
    msgStatusbarWorking:                    "Przetwarzam…",
    msgStatusbarNoChanges:                  "Brak zmian",
    msgStatusbarPendingDiscarded:           "Odrzucono oczekujące zmiany",
    msgStatusbarScanResult:                 "%N% plików · %U% niezgodnych",
    msgStatusbarRenaming:                   "Zmienianie nazw %N% plików…",
    msgStatusbarRenamed:                    "Zmieniono nazwy %N% plików",
    msgStatusbarPendingRenames:             "%N% oczekujących zmian nazw - Zatwierdź, aby zastosować",
    msgStatusbarChapterOverflow:            "Rozdział %N% przekracza szerokość cyfry (maks. %M%)",
    msgStatusbarAllChaptersUsed:            "Wszystkie %N% miejsc na rozdziały są zajęte - zwiększ chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Pusty rozdział %ID% dodano - przeciągnij ujęcia, a następnie Zatwierdź",
    msgStatusbarChapterLocked:              "Rozdział zablokowany - odblokuj go najpierw, aby przenosić ujęcia.",
    msgStatusbarDropFolderFailed:           "Nie można było odczytać ścieżki upuszczonego folderu",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Wybierz folder projektu",

  },

  ro: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Anulează",
    btnGlobalDiscard:                       "Renunță",
    tipGlobalOpenExternal:                  "Deschide în aplicația implicită",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versiune nouă disponibilă:",
    lnkUpdateWhatsNew:                      "Ce e nou",
    btnUpdateDownload:                      "Descarcă",
    lnkUpdateSkip:                          "Omite această versiune",
    tipUpdateDismiss:                       "Ignoră",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Deschide setările",
    tipHdrHelp:                             "Ajutor",
    btnHdrRefresh:                          "Reîmprospătare",
    tipHdrRefresh:                          "Rescanează folderul",
    tipHdrRefreshDisabled:                  "Mai întâi, confirmă sau renunță la modificările în așteptare",
    btnHdrOpenFolder:                       "Deschide folderul…",
    btnHdrCommit:                           "Confirmă",
    tipHdrDigitsChapter:                    "Capitol",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Versiune",
    tipHdrGroup:                            "Grupează fotografii",
    tipHdrUngroup:                          "Degrupează fotografii",
    tipHdrPreserveGaps:                     "Păstrează spațiile dintre sloturi",
    tipHdrCompactOnDrop:                    "Compactează sloturile la plasare",
    tipHdrCompactAll:                       "Compactează spațiile dintre sloturi în toate capitolele",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Setări",
    tabDlgSettingsDisplay:                  "Afișaj",
    tabDlgSettingsAbout:                    "Despre",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Limbă",
    lblDlgSettingsDisplayTheme:             "Temă",
    btnDlgSettingsDisplayThemeDark:         "Întunecat",
    btnDlgSettingsDisplayThemeLight:        "Luminos",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Secvențiați și renumerați fișierele video prin glisare și fixare.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Capitol",
    lblChapterShots:                        "%N% cadre",
    lblChapterGaps:                         "%N% spații",
    tipChapterLock:                         "Blochează capitolul",
    tipChapterUnlock:                       "Deblochează capitolul",
    tipChapterCompact:                      "Compactează spațiile dintre sloturi în acest capitol",
    tipChapterCollapse:                     "Restrânge capitolul",
    tipChapterExpand:                       "Extinde capitolul",
    tipChapterDragHandle:                   "Trageți pentru a reordona capitolul",
    empChapterEmpty:                        "Capitol gol - plasați un element aici",
    btnChapterAdd:                          "+ Adaugă capitol",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternative",
    lblShotFiles:                           "%N% fișiere",
    tipShotThumbHint:                       "trageți pentru a muta/reordona · faceți clic pe ▶ pentru previzualizare",
    tipShotPileHint:                        "trageți grămada pentru a muta totul împreună",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Deschide un folder de proiect",
    msgAppOpenFolderDesc1:                  "%APP% citește fișierele numite %PATTERN% (cifre, apoi sufix opțional) și vă permite să trageți cadrele pentru a le renumera în bloc.",
    msgAppOpenFolderDesc2:                  "Lățimile sunt configurate per folder în %INI%.",
    ttlAppNoMatch:                          "Niciun fișier corespondent",
    msgAppNoMatchDesc:                      "Niciun fișier din acest folder nu corespunde modelului %PATTERN%",
    msgAppNoMatchHint:                      "Redenumiți manual câteva fișiere pentru a se potrivi, apoi apăsați Reîmprospătare.",
    cfmAppPendingFolderSwitch:              "Aveți redenumiri în așteptare. Le anulați și deschideți un alt folder?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Neasociat",
    empUnmatchedHint:                       "trageți pe o scenă sau un capitol pentru a atribui",
    tipUnmatchedCardHint:                   "trageți pentru a atribui · faceți clic pe ▶ pentru a previzualiza",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Gata",
    msgStatusbarWorking:                    "Se lucrează…",
    msgStatusbarNoChanges:                  "Nicio modificare",
    msgStatusbarPendingDiscarded:           "Modificări în așteptare anulate",
    msgStatusbarScanResult:                 "%N% fișiere · %U% neasortate",
    msgStatusbarRenaming:                   "Redenumire %N% fișiere…",
    msgStatusbarRenamed:                    "%N% fișiere redenumite",
    msgStatusbarPendingRenames:             "%N% redenumiri în așteptare - Confirmă pentru a aplica",
    msgStatusbarChapterOverflow:            "Capitolul %N% depășește lățimea cifrei (max %M%)",
    msgStatusbarAllChaptersUsed:            "Toate cele %N% sloturi de capitol sunt utilizate - măriți chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Capitol gol %ID% adăugat - trageți cadre, apoi Confirmați",
    msgStatusbarChapterLocked:              "Capitolul este blocat - deblocați-l mai întâi pentru a muta cadre.",
    msgStatusbarDropFolderFailed:           "Nu s-a putut citi calea folderului plasat",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Selectați folderul proiectului",

  },

  sv: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Avbryt",
    btnGlobalDiscard:                       "Kassera",
    tipGlobalOpenExternal:                  "Öppna i standardapp",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tillgänglig:",
    lnkUpdateWhatsNew:                      "Vad är nytt",
    btnUpdateDownload:                      "Ladda ner",
    lnkUpdateSkip:                          "Hoppa över den här versionen",
    tipUpdateDismiss:                       "Avfärda",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Öppna inställningar",
    tipHdrHelp:                             "Hjälp",
    btnHdrRefresh:                          "Uppdatera",
    tipHdrRefresh:                          "Skanna om mapp",
    tipHdrRefreshDisabled:                  "Bekräfta eller ignorera väntande ändringar först",
    btnHdrOpenFolder:                       "Öppna mapp…",
    btnHdrCommit:                           "Verkställ",
    tipHdrDigitsChapter:                    "Kapitel",
    tipHdrDigitsSlot:                       "Plats",
    tipHdrDigitsVersion:                    "Version",
    tipHdrGroup:                            "Gruppera bilder",
    tipHdrUngroup:                          "Avgruppera bilder",
    tipHdrPreserveGaps:                     "Behåll luckor mellan platser",
    tipHdrCompactOnDrop:                    "Kompakta platser vid släpp",
    tipHdrCompactAll:                       "Kompakta luckor mellan platser i alla kapitel",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Inställningar",
    tabDlgSettingsDisplay:                  "Visning",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Språk",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mörk",
    btnDlgSettingsDisplayThemeLight:        "Ljus",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Ordna och numrera om videoklippfiler via dra och släpp.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Kapitel",
    lblChapterShots:                        "%N% bilder",
    lblChapterGaps:                         "%N% luckor",
    tipChapterLock:                         "Lås kapitel",
    tipChapterUnlock:                       "Lås upp kapitel",
    tipChapterCompact:                      "Kompakta luckor mellan platser i detta kapitel",
    tipChapterCollapse:                     "Fäll ihop kapitel",
    tipChapterExpand:                       "Fäll ut kapitel",
    tipChapterDragHandle:                   "Dra för att ändra ordning på kapitel",
    empChapterEmpty:                        "Tomt kapitel - släpp ett klipp här",
    btnChapterAdd:                          "+ Lägg till kapitel",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternativ",
    lblShotFiles:                           "%N% filer",
    tipShotThumbHint:                       "dra för att flytta/ordna om · klicka ▶ för att förhandsgranska",
    tipShotPileHint:                        "dra högen för att flytta allt tillsammans",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Öppna en projektmapp",
    msgAppOpenFolderDesc1:                  "%APP% läser filer med namnet %PATTERN% (siffror, sedan valfritt suffix) och låter dig dra runt bilder för att omnumrera dem i bulk.",
    msgAppOpenFolderDesc2:                  "Bredd konfigureras per mapp i %INI%.",
    ttlAppNoMatch:                          "Inga matchande filer",
    msgAppNoMatchDesc:                      "Inga filer i den här mappen matchar mönstret %PATTERN%",
    msgAppNoMatchHint:                      "Byt namn på några filer manuellt för att matcha, klicka sedan på Uppdatera.",
    cfmAppPendingFolderSwitch:              "Du har väntande namnbyten. Kasta dem och öppna en annan mapp?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Omatchade",
    empUnmatchedHint:                       "dra till en tagning eller ett kapitel för att tilldela",
    tipUnmatchedCardHint:                   "dra för att tilldela · klicka på ▶ för att förhandsgranska",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Klar",
    msgStatusbarWorking:                    "Arbetar…",
    msgStatusbarNoChanges:                  "Inga ändringar",
    msgStatusbarPendingDiscarded:           "Väntande ändringar kasserade",
    msgStatusbarScanResult:                 "%N% filer · %U% omatchade",
    msgStatusbarRenaming:                   "Byter namn på %N% filer…",
    msgStatusbarRenamed:                    "%N% filer omdöpta",
    msgStatusbarPendingRenames:             "%N% väntande namnbyten - Verkställ för att tillämpa",
    msgStatusbarChapterOverflow:            "Kapitel %N% överskrider sifferbredd (max %M%)",
    msgStatusbarAllChaptersUsed:            "Alla %N% kapitelslots är använda - öka chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Tomt kapitel %ID% tillagt - dra in klipp, sedan Bekräfta",
    msgStatusbarChapterLocked:              "Kapitel låst - lås upp det först för att flytta klipp.",
    msgStatusbarDropFolderFailed:           "Kunde inte läsa sökvägen för den släppta mappen",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Välj projektmapp",

  },

  nb: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Avbryt",
    btnGlobalDiscard:                       "Forkast",
    tipGlobalOpenExternal:                  "Åpne i standardapp",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny versjon tilgjengelig:",
    lnkUpdateWhatsNew:                      "Hva er nytt",
    btnUpdateDownload:                      "Last ned",
    lnkUpdateSkip:                          "Hopp over denne versjonen",
    tipUpdateDismiss:                       "Avvis",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Åpne innstillinger",
    tipHdrHelp:                             "Hjelp",
    btnHdrRefresh:                          "Oppdater",
    tipHdrRefresh:                          "Skann mappe på nytt",
    tipHdrRefreshDisabled:                  "Bekreft eller forkast ventende endringer først",
    btnHdrOpenFolder:                       "Åpne mappe…",
    btnHdrCommit:                           "Bekreft",
    tipHdrDigitsChapter:                    "Kapittel",
    tipHdrDigitsSlot:                       "Spor",
    tipHdrDigitsVersion:                    "Versjon",
    tipHdrGroup:                            "Grupper bilder",
    tipHdrUngroup:                          "Opphev gruppering",
    tipHdrPreserveGaps:                     "Bevar mellomrom mellom spor",
    tipHdrCompactOnDrop:                    "Komprimer spor ved slipp",
    tipHdrCompactAll:                       "Komprimer mellomrom mellom spor i alle kapitler",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Innstillinger",
    tabDlgSettingsDisplay:                  "Skjerm",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Språk",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mørk",
    btnDlgSettingsDisplayThemeLight:        "Lys",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sekvenser og omnummerer videofilfiler via dra-og-slipp.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Kapittel",
    lblChapterShots:                        "%N% bilder",
    lblChapterGaps:                         "%N% mellomrom",
    tipChapterLock:                         "Lås kapittel",
    tipChapterUnlock:                       "Lås opp kapittel",
    tipChapterCompact:                      "Komprimer mellomrom mellom spor i dette kapittelet",
    tipChapterCollapse:                     "Skjul kapittel",
    tipChapterExpand:                       "Vis kapittel",
    tipChapterDragHandle:                   "Dra for å endre rekkefølge på kapittel",
    empChapterEmpty:                        "Tomt kapittel - slipp et klipp her",
    btnChapterAdd:                          "+ Legg til kapittel",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternativer",
    lblShotFiles:                           "%N% filer",
    tipShotThumbHint:                       "dra for å flytte/endre rekkefølge · klikk ▶ for forhåndsvisning",
    tipShotPileHint:                        "dra bunken for å flytte alt sammen",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Åpne en prosjektmappe",
    msgAppOpenFolderDesc1:                  "%APP% leser filer kalt %PATTERN% (sifre, deretter valgfritt suffiks) og lar deg dra bilder rundt for å omnummerere dem i bulk.",
    msgAppOpenFolderDesc2:                  "Bredder konfigureres per mappe i %INI%.",
    ttlAppNoMatch:                          "Ingen samsvarende filer",
    msgAppNoMatchDesc:                      "Ingen filer i denne mappen samsvarer med mønsteret %PATTERN%",
    msgAppNoMatchHint:                      "Gi noen filer nytt navn manuelt for å matche, og trykk deretter Oppdater.",
    cfmAppPendingFolderSwitch:              "Du har ventende omdøpninger. Forkaste dem og åpne en annen mappe?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Uten match",
    empUnmatchedHint:                       "dra til et opptak eller kapittel for å tilordne",
    tipUnmatchedCardHint:                   "dra for å tilordne · klikk ▶ for å forhåndsvise",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Klar",
    msgStatusbarWorking:                    "Arbeider…",
    msgStatusbarNoChanges:                  "Ingen endringer",
    msgStatusbarPendingDiscarded:           "Ventende endringer forkastet",
    msgStatusbarScanResult:                 "%N% filer · %U% uten treff",
    msgStatusbarRenaming:                   "Omdøper %N% filer…",
    msgStatusbarRenamed:                    "%N% filer omdøpt",
    msgStatusbarPendingRenames:             "%N% ventende omdøpninger - Bekreft for å bruke",
    msgStatusbarChapterOverflow:            "Kapittel %N% overskrider sifferbredde (maks %M%)",
    msgStatusbarAllChaptersUsed:            "Alle %N% kapittelplasser er brukt - øk chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Tomt kapittel %ID% lagt til - dra inn klipp, deretter Bekreft",
    msgStatusbarChapterLocked:              "Kapittel låst - lås det opp først for å flytte klipp.",
    msgStatusbarDropFolderFailed:           "Kunne ikke lese banen til den slappede mappen",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Velg prosjektmappe",

  },

  tr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "İptal",
    btnGlobalDiscard:                       "Vazgeç",
    tipGlobalOpenExternal:                  "Varsayılan uygulamada aç",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yeni sürüm mevcut:",
    lnkUpdateWhatsNew:                      "Yenilikler",
    btnUpdateDownload:                      "İndir",
    lnkUpdateSkip:                          "Bu sürümü atla",
    tipUpdateDismiss:                       "Kapat",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Ayarları aç",
    tipHdrHelp:                             "Yardım",
    btnHdrRefresh:                          "Yenile",
    tipHdrRefresh:                          "Klasörü yeniden tara",
    tipHdrRefreshDisabled:                  "Önce bekleyen değişiklikleri onayla veya iptal et",
    btnHdrOpenFolder:                       "Klasörü aç…",
    btnHdrCommit:                           "Onayla",
    tipHdrDigitsChapter:                    "Bölüm",
    tipHdrDigitsSlot:                       "Yuva",
    tipHdrDigitsVersion:                    "Sürüm",
    tipHdrGroup:                            "Çekimleri Grupla",
    tipHdrUngroup:                          "Çekimleri Ayır",
    tipHdrPreserveGaps:                     "Yuva boşluklarını koru",
    tipHdrCompactOnDrop:                    "Bırakıldığında yuvaları sıkıştır",
    tipHdrCompactAll:                       "Tüm bölümlerdeki yuva boşluklarını sıkıştır",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ayarlar",
    tabDlgSettingsDisplay:                  "Görüntü",
    tabDlgSettingsAbout:                    "Hakkında",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Dil",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Koyu",
    btnDlgSettingsDisplayThemeLight:        "Açık",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Video çekim dosyalarını sürükle ve bırak ile sıralayın ve yeniden numaralandırın.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Bölüm",
    lblChapterShots:                        "%N% çekim",
    lblChapterGaps:                         "%N% boşluk",
    tipChapterLock:                         "Bölümü Kilitle",
    tipChapterUnlock:                       "Bölümün Kilidini Aç",
    tipChapterCompact:                      "Bu bölümdeki yuva boşluklarını sıkıştır",
    tipChapterCollapse:                     "Bölümü daralt",
    tipChapterExpand:                       "Bölümü genişlet",
    tipChapterDragHandle:                   "Bölümü yeniden sıralamak için sürükleyin",
    empChapterEmpty:                        "Boş bölüm - buraya bir çekim bırakın",
    btnChapterAdd:                          "+ Bölüm ekle",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatif",
    lblShotFiles:                           "%N% dosya",
    tipShotThumbHint:                       "taşımak/yeniden sıralamak için sürükleyin · önizlemek için ▶ tıklayın",
    tipShotPileHint:                        "hepsini birlikte taşımak için yığını sürükleyin",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Bir proje klasörü aç",
    msgAppOpenFolderDesc1:                  "%APP%, %PATTERN% (rakamlar, ardından isteğe bağlı sonek) adlı dosyaları okur ve çekimleri toplu olarak yeniden numaralandırmak için sürüklemenizi sağlar.",
    msgAppOpenFolderDesc2:                  "Genişlikler, %INI% içinde klasör başına yapılandırılır.",
    ttlAppNoMatch:                          "Eşleşen dosya yok",
    msgAppNoMatchDesc:                      "Bu klasördeki hiçbir dosya %PATTERN% desenine uymuyor",
    msgAppNoMatchHint:                      "Eşleştirmek için birkaç dosyayı manuel olarak yeniden adlandırın, ardından Yenile'ye basın.",
    cfmAppPendingFolderSwitch:              "Bekleyen yeniden adlandırmalarınız var. Bunları atıp farklı bir klasör açmak ister misiniz?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Eşleşmeyen",
    empUnmatchedHint:                       "atamak için bir çekime veya bölüme sürükleyin",
    tipUnmatchedCardHint:                   "atamak için sürükleyin · önizlemek için ▶ tıklayın",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Hazır",
    msgStatusbarWorking:                    "Çalışıyor…",
    msgStatusbarNoChanges:                  "Değişiklik yok",
    msgStatusbarPendingDiscarded:           "Bekleyen değişiklikler atıldı",
    msgStatusbarScanResult:                 "%N% dosya · %U% eşleşmeyen",
    msgStatusbarRenaming:                   "%N% dosya yeniden adlandırılıyor…",
    msgStatusbarRenamed:                    "%N% dosya yeniden adlandırıldı",
    msgStatusbarPendingRenames:             "%N% bekleyen yeniden adlandırma - Uygulamak için onayla",
    msgStatusbarChapterOverflow:            "Bölüm %N% basamak genişliğini aşıyor (maks %M%)",
    msgStatusbarAllChaptersUsed:            "Tüm %N% bölüm yuvaları kullanıldı - chapterDigits'i artırın",
    msgStatusbarEmptyChapterAdded:          "Boş bölüm %ID% eklendi - çekimleri sürükleyin, sonra Onayla",
    msgStatusbarChapterLocked:              "Bölüm kilitli - çekimleri taşımak için önce kilidi açın.",
    msgStatusbarDropFolderFailed:           "Bırakılan klasör yolu okunamadı",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Proje klasörünü seçin",

  },

  hr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Odustani",
    btnGlobalDiscard:                       "Odbaci",
    tipGlobalOpenExternal:                  "Otvori u zadanoj aplikaciji",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova verzija dostupna:",
    lnkUpdateWhatsNew:                      "Što je novo",
    btnUpdateDownload:                      "Preuzmi",
    lnkUpdateSkip:                          "Preskoči ovu verziju",
    tipUpdateDismiss:                       "Odbaci",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otvori postavke",
    tipHdrHelp:                             "Pomoć",
    btnHdrRefresh:                          "Osvježi",
    tipHdrRefresh:                          "Ponovno skeniraj mapu",
    tipHdrRefreshDisabled:                  "Prvo potvrdite ili odbacite promjene na čekanju",
    btnHdrOpenFolder:                       "Otvori mapu…",
    btnHdrCommit:                           "Potvrdi",
    tipHdrDigitsChapter:                    "Poglavlje",
    tipHdrDigitsSlot:                       "Utor",
    tipHdrDigitsVersion:                    "Verzija",
    tipHdrGroup:                            "Grupiraj snimke",
    tipHdrUngroup:                          "Razgrupiraj snimke",
    tipHdrPreserveGaps:                     "Zadrži razmake utora",
    tipHdrCompactOnDrop:                    "Sažmi utore pri ispuštanju",
    tipHdrCompactAll:                       "Sažmi razmake utora u svim poglavljima",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Postavke",
    tabDlgSettingsDisplay:                  "Prikaz",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jezik",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Tamno",
    btnDlgSettingsDisplayThemeLight:        "Svijetlo",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sekvencirajte i prenumerirajte datoteke video snimaka povlačenjem i ispuštanjem.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Poglavlje",
    lblChapterShots:                        "%N% snimaka",
    lblChapterGaps:                         "%N% razmaka",
    tipChapterLock:                         "Zaključaj poglavlje",
    tipChapterUnlock:                       "Otključaj poglavlje",
    tipChapterCompact:                      "Sažmi razmake utora u ovom poglavlju",
    tipChapterCollapse:                     "Sažmi poglavlje",
    tipChapterExpand:                       "Proširi poglavlje",
    tipChapterDragHandle:                   "Povucite za preuređivanje poglavlja",
    empChapterEmpty:                        "Prazno poglavlje - ispustite snimku ovdje",
    btnChapterAdd:                          "+ Dodaj poglavlje",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternativa",
    lblShotFiles:                           "%N% datoteka",
    tipShotThumbHint:                       "povucite za premještanje/preuređivanje · kliknite ▶ za pregled",
    tipShotPileHint:                        "povucite hrpu za premještanje svega zajedno",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Otvori mapu projekta",
    msgAppOpenFolderDesc1:                  "%APP% čita datoteke nazvane %PATTERN% (znamenke, zatim opcionalni sufiks) i omogućuje vam povlačenje snimaka za masovno prenumeriranje.",
    msgAppOpenFolderDesc2:                  "Širine se konfiguriraju po mapi u %INI%.",
    ttlAppNoMatch:                          "Nema podudarnih datoteka",
    msgAppNoMatchDesc:                      "Nema datoteka u ovoj mapi koje odgovaraju uzorku %PATTERN%",
    msgAppNoMatchHint:                      "Ručno preimenujte nekoliko datoteka kako bi se podudarale, a zatim kliknite Osvježi.",
    cfmAppPendingFolderSwitch:              "Imate neriješena preimenovanja. Odbaciti ih i otvoriti drugu mapu?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Nepodudarno",
    empUnmatchedHint:                       "povucite na snimku ili poglavlje za dodjelu",
    tipUnmatchedCardHint:                   "povucite za dodjelu · kliknite ▶ za pregled",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Spreman",
    msgStatusbarWorking:                    "Radi…",
    msgStatusbarNoChanges:                  "Nema promjena",
    msgStatusbarPendingDiscarded:           "Promjene na čekanju odbačene",
    msgStatusbarScanResult:                 "%N% datoteka · %U% nepodudarnih",
    msgStatusbarRenaming:                   "Preimenovanje %N% datoteka…",
    msgStatusbarRenamed:                    "Preimenovano %N% datoteka",
    msgStatusbarPendingRenames:             "%N% promjena naziva na čekanju - Potvrdi za primjenu",
    msgStatusbarChapterOverflow:            "Poglavlje %N% premašuje širinu znamenke (maks. %M%)",
    msgStatusbarAllChaptersUsed:            "Svi %N% utora za poglavlja su iskorišteni - povećajte chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Prazno poglavlje %ID% dodano - povucite snimke, zatim Potvrdi",
    msgStatusbarChapterLocked:              "Poglavlje je zaključano - prvo ga otključajte za premještanje snimaka.",
    msgStatusbarDropFolderFailed:           "Nije moguće pročitati putanju odbačene mape",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Odaberite mapu projekta",

  },

  el: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Ακύρωση",
    btnGlobalDiscard:                       "Απόρριψη",
    tipGlobalOpenExternal:                  "Άνοιγμα στην προεπιλεγμένη εφαρμογή",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Νέα έκδοση διαθέσιμη:",
    lnkUpdateWhatsNew:                      "Τι νέο υπάρχει",
    btnUpdateDownload:                      "Λήψη",
    lnkUpdateSkip:                          "Παράλειψη αυτής της έκδοσης",
    tipUpdateDismiss:                       "Απόρριψη",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Άνοιγμα ρυθμίσεων",
    tipHdrHelp:                             "Βοήθεια",
    btnHdrRefresh:                          "Ανανέωση",
    tipHdrRefresh:                          "Επανάληψη σάρωσης φακέλου",
    tipHdrRefreshDisabled:                  "Επιβεβαιώστε ή απορρίψτε τις εκκρεμείς αλλαγές πρώτα",
    btnHdrOpenFolder:                       "Άνοιγμα φακέλου…",
    btnHdrCommit:                           "Επιβεβαίωση",
    tipHdrDigitsChapter:                    "Κεφάλαιο",
    tipHdrDigitsSlot:                       "Θέση",
    tipHdrDigitsVersion:                    "Έκδοση",
    tipHdrGroup:                            "Ομαδοποίηση λήψεων",
    tipHdrUngroup:                          "Κατάργηση ομαδοποίησης λήψεων",
    tipHdrPreserveGaps:                     "Διατήρηση κενών θέσεων",
    tipHdrCompactOnDrop:                    "Συμπύκνωση θέσεων κατά την απόθεση",
    tipHdrCompactAll:                       "Συμπύκνωση κενών θέσεων σε όλα τα κεφάλαια",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Ρυθμίσεις",
    tabDlgSettingsDisplay:                  "Οθόνη",
    tabDlgSettingsAbout:                    "Σχετικά",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Γλώσσα",
    lblDlgSettingsDisplayTheme:             "Θέμα",
    btnDlgSettingsDisplayThemeDark:         "Σκοτεινό",
    btnDlgSettingsDisplayThemeLight:        "Φωτεινό",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Ακολουθήστε και αναριθμήστε αρχεία βίντεο μέσω μεταφοράς και απόθεσης.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Κεφάλαιο",
    lblChapterShots:                        "%N% λήψεις",
    lblChapterGaps:                         "%N% κενά",
    tipChapterLock:                         "Κλείδωμα κεφαλαίου",
    tipChapterUnlock:                       "Ξεκλείδωμα κεφαλαίου",
    tipChapterCompact:                      "Συμπύκνωση κενών θέσεων σε αυτό το κεφάλαιο",
    tipChapterCollapse:                     "Σύμπτυξη κεφαλαίου",
    tipChapterExpand:                       "Ανάπτυξη κεφαλαίου",
    tipChapterDragHandle:                   "Σύρετε για αναδιάταξη κεφαλαίου",
    empChapterEmpty:                        "Κενό κεφάλαιο - αποθέστε ένα στοιχείο εδώ",
    btnChapterAdd:                          "+ Προσθήκη κεφαλαίου",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% εναλλακτικές",
    lblShotFiles:                           "%N% αρχεία",
    tipShotThumbHint:                       "σύρετε για μετακίνηση/αναδιάταξη · κάντε κλικ στο ▶ για προεπισκόπηση",
    tipShotPileHint:                        "σύρετε τη στοίβα για να μετακινήσετε όλα μαζί",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Άνοιγμα φακέλου έργου",
    msgAppOpenFolderDesc1:                  "Το %APP% διαβάζει αρχεία με όνομα %PATTERN% (ψηφία, μετά προαιρετικό επίθημα) και σας επιτρέπει να σύρετε λήψεις για να τις αναριθμήσετε μαζικά.",
    msgAppOpenFolderDesc2:                  "Τα πλάτη διαμορφώνονται ανά φάκελο στο %INI%.",
    ttlAppNoMatch:                          "Δεν υπάρχουν αρχεία που να ταιριάζουν",
    msgAppNoMatchDesc:                      "Δεν υπάρχουν αρχεία σε αυτόν τον φάκελο που να ταιριάζουν με το μοτίβο %PATTERN%",
    msgAppNoMatchHint:                      "Μετονομάστε μερικά αρχεία χειροκίνητα για να ταιριάξουν, μετά πατήστε Ανανέωση.",
    cfmAppPendingFolderSwitch:              "Έχετε εκκρεμείς μετονομασίες. Να τις απορρίψετε και να ανοίξετε έναν διαφορετικό φάκελο;",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Χωρίς αντιστοίχιση",
    empUnmatchedHint:                       "σύρετε σε μια λήψη ή κεφάλαιο για εκχώρηση",
    tipUnmatchedCardHint:                   "σύρετε για εκχώρηση · κάντε κλικ στο ▶ για προεπισκόπηση",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Έτοιμο",
    msgStatusbarWorking:                    "Επεξεργασία…",
    msgStatusbarNoChanges:                  "Χωρίς αλλαγές",
    msgStatusbarPendingDiscarded:           "Εκκρεμείς αλλαγές απορρίφθηκαν",
    msgStatusbarScanResult:                 "%N% αρχεία · %U% χωρίς αντιστοίχιση",
    msgStatusbarRenaming:                   "Μετονομασία %N% αρχείων…",
    msgStatusbarRenamed:                    "Μετονομάστηκαν %N% αρχεία",
    msgStatusbarPendingRenames:             "%N% εκκρεμείς μετονομασίες - Επιβεβαίωση για εφαρμογή",
    msgStatusbarChapterOverflow:            "Το κεφάλαιο %N% υπερβαίνει το πλάτος ψηφίου (μέγ. %M%)",
    msgStatusbarAllChaptersUsed:            "Όλες οι %N% θέσεις κεφαλαίων χρησιμοποιούνται - αυξήστε το chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Προστέθηκε κενό κεφάλαιο %ID% - σύρετε λήψεις, μετά Επιβεβαίωση",
    msgStatusbarChapterLocked:              "Κεφάλαιο κλειδωμένο - ξεκλειδώστε το πρώτα για να μετακινήσετε πλάνα.",
    msgStatusbarDropFolderFailed:           "Δεν ήταν δυνατή η ανάγνωση της διαδρομής του φακέλου που αποτέθηκε",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Επιλέξτε φάκελο έργου",

  },

  he: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ביטול",
    btnGlobalDiscard:                       "בטל",
    tipGlobalOpenExternal:                  "פתח ביישום ברירת המחדל",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "גרסה חדשה זמינה:",
    lnkUpdateWhatsNew:                      "מה חדש",
    btnUpdateDownload:                      "הורדה",
    lnkUpdateSkip:                          "דלג על גרסה זו",
    tipUpdateDismiss:                       "בטל",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "פתח הגדרות",
    tipHdrHelp:                             "עזרה",
    btnHdrRefresh:                          "רענן",
    tipHdrRefresh:                          "סרוק תיקייה מחדש",
    tipHdrRefreshDisabled:                  "אשר או בטל שינויים ממתינים תחילה",
    btnHdrOpenFolder:                       "פתח תיקייה…",
    btnHdrCommit:                           "אישור",
    tipHdrDigitsChapter:                    "פרק",
    tipHdrDigitsSlot:                       "חריץ",
    tipHdrDigitsVersion:                    "גרסה",
    tipHdrGroup:                            "קבץ צילומים",
    tipHdrUngroup:                          "בטל קיבוץ צילומים",
    tipHdrPreserveGaps:                     "שמור על רווחי חריצים",
    tipHdrCompactOnDrop:                    "כווץ חריצים בעת שחרור",
    tipHdrCompactAll:                       "כווץ רווחי חריצים בכל הפרקים",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "הגדרות",
    tabDlgSettingsDisplay:                  "תצוגה",
    tabDlgSettingsAbout:                    "אודות",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "שפה",
    lblDlgSettingsDisplayTheme:             "ערכת נושא",
    btnDlgSettingsDisplayThemeDark:         "כהה",
    btnDlgSettingsDisplayThemeLight:        "בהיר",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "סדר מחדש ומספר מחדש קבצי צילום וידאו באמצעות גרירה ושחרור.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "פרק",
    lblChapterShots:                        "%N% צילומים",
    lblChapterGaps:                         "%N% רווחים",
    tipChapterLock:                         "נעל פרק",
    tipChapterUnlock:                       "בטל נעילת פרק",
    tipChapterCompact:                      "כווץ רווחי חריצים בפרק זה",
    tipChapterCollapse:                     "כווץ פרק",
    tipChapterExpand:                       "הרחב פרק",
    tipChapterDragHandle:                   "גרור לסידור מחדש של הפרק",
    empChapterEmpty:                        "פרק ריק - גרור פריט לכאן",
    btnChapterAdd:                          "+ הוסף פרק",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% חלופות",
    lblShotFiles:                           "%N% קבצים",
    tipShotThumbHint:                       "גרור כדי להזיז/לסדר מחדש · לחץ על ▶ לתצוגה מקדימה",
    tipShotPileHint:                        "גרור את הערימה כדי להזיז הכל יחד",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "פתח תיקיית פרויקט",
    msgAppOpenFolderDesc1:                  "%APP% קורא קבצים בשם %PATTERN% (ספרות, ואז סיומת אופציונלית) ומאפשר לך לגרור צילומים כדי למספר אותם מחדש בכמות גדולה.",
    msgAppOpenFolderDesc2:                  "רוחבים מוגדרים לכל תיקייה ב-%INI%.",
    ttlAppNoMatch:                          "אין קבצים תואמים",
    msgAppNoMatchDesc:                      "אין קבצים בתיקייה זו התואמים את התבנית %PATTERN%",
    msgAppNoMatchHint:                      "שנה שם לכמה קבצים ידנית כדי שיתאימו, ואז לחץ על רענן.",
    cfmAppPendingFolderSwitch:              "יש לך שינויי שם ממתינים. לבטל אותם ולפתוח תיקייה אחרת?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "ללא התאמה",
    empUnmatchedHint:                       "גרור אל שוט או פרק כדי להקצות",
    tipUnmatchedCardHint:                   "גרור כדי להקצות · לחץ על ▶ לתצוגה מקדימה",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "מוכן",
    msgStatusbarWorking:                    "פועל…",
    msgStatusbarNoChanges:                  "אין שינויים",
    msgStatusbarPendingDiscarded:           "שינויים ממתינים נמחקו",
    msgStatusbarScanResult:                 "%N% קבצים · %U% לא תואמים",
    msgStatusbarRenaming:                   "משנה שם ל-%N% קבצים…",
    msgStatusbarRenamed:                    "%N% קבצים שונו",
    msgStatusbarPendingRenames:             "%N% שינויי שם ממתינים - אשר ליישום",
    msgStatusbarChapterOverflow:            "פרק %N% חורג מרוחב הספרה (מקסימום %M%)",
    msgStatusbarAllChaptersUsed:            "כל %N% חריצי הפרקים בשימוש - הגדל את chapterDigits",
    msgStatusbarEmptyChapterAdded:          "פרק ריק %ID% נוסף - גרור צילומים פנימה, ואז אשר",
    msgStatusbarChapterLocked:              "הפרק נעול - פתח אותו קודם כדי להזיז צילומים.",
    msgStatusbarDropFolderFailed:           "לא ניתן היה לקרוא את נתיב התיקייה ששוחררה",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "בחר תיקיית פרויקט",

  },

  ar: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "إلغاء",
    btnGlobalDiscard:                       "تجاهل",
    tipGlobalOpenExternal:                  "فتح في التطبيق الافتراضي",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "إصدار جديد متوفر:",
    lnkUpdateWhatsNew:                      "ما الجديد",
    btnUpdateDownload:                      "تنزيل",
    lnkUpdateSkip:                          "تخطي هذا الإصدار",
    tipUpdateDismiss:                       "تجاهل",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "فتح الإعدادات",
    tipHdrHelp:                             "مساعدة",
    btnHdrRefresh:                          "تحديث",
    tipHdrRefresh:                          "إعادة فحص المجلد",
    tipHdrRefreshDisabled:                  "قم بتأكيد أو تجاهل التغييرات المعلقة أولاً",
    btnHdrOpenFolder:                       "فتح المجلد…",
    btnHdrCommit:                           "تأكيد",
    tipHdrDigitsChapter:                    "فصل",
    tipHdrDigitsSlot:                       "فتحة",
    tipHdrDigitsVersion:                    "إصدار",
    tipHdrGroup:                            "تجميع اللقطات",
    tipHdrUngroup:                          "فك تجميع اللقطات",
    tipHdrPreserveGaps:                     "الحفاظ على فجوات الفتحات",
    tipHdrCompactOnDrop:                    "ضغط الفتحات عند الإفلات",
    tipHdrCompactAll:                       "ضغط فجوات الفتحات في جميع الفصول",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "الإعدادات",
    tabDlgSettingsDisplay:                  "عرض",
    tabDlgSettingsAbout:                    "حول",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "اللغة",
    lblDlgSettingsDisplayTheme:             "المظهر",
    btnDlgSettingsDisplayThemeDark:         "داكن",
    btnDlgSettingsDisplayThemeLight:        "فاتح",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ترتيب وإعادة ترقيم ملفات لقطات الفيديو بالسحب والإفلات.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "فصل",
    lblChapterShots:                        "%N% لقطات",
    lblChapterGaps:                         "%N% فجوات",
    tipChapterLock:                         "قفل الفصل",
    tipChapterUnlock:                       "إلغاء قفل الفصل",
    tipChapterCompact:                      "ضغط فجوات الفتحات في هذا الفصل",
    tipChapterCollapse:                     "طي الفصل",
    tipChapterExpand:                       "توسيع الفصل",
    tipChapterDragHandle:                   "اسحب لإعادة ترتيب الفصل",
    empChapterEmpty:                        "فصل فارغ - أسقط لقطة هنا",
    btnChapterAdd:                          "+ إضافة فصل",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% بدائل",
    lblShotFiles:                           "%N% ملفات",
    tipShotThumbHint:                       "اسحب للتحريك/إعادة الترتيب · انقر على ▶ للمعاينة",
    tipShotPileHint:                        "اسحب الكومة لتحريك الكل معًا",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "فتح مجلد مشروع",
    msgAppOpenFolderDesc1:                  "يقرأ %APP% الملفات المسماة %PATTERN% (أرقام، ثم لاحقة اختيارية) ويتيح لك سحب اللقطات لإعادة ترقيمها بكميات كبيرة.",
    msgAppOpenFolderDesc2:                  "يتم تكوين العروض لكل مجلد في %INI%.",
    ttlAppNoMatch:                          "لا توجد ملفات مطابقة",
    msgAppNoMatchDesc:                      "لا توجد ملفات في هذا المجلد تطابق النمط %PATTERN%",
    msgAppNoMatchHint:                      "أعد تسمية بعض الملفات يدويًا للمطابقة، ثم اضغط على تحديث.",
    cfmAppPendingFolderSwitch:              "لديك عمليات إعادة تسمية معلقة. هل تريد تجاهلها وفتح مجلد مختلف؟",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "غير مطابق",
    empUnmatchedHint:                       "اسحب إلى لقطة أو فصل لتعيينه",
    tipUnmatchedCardHint:                   "اسحب لتعيين · انقر على ▶ للمعاينة",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "جاهز",
    msgStatusbarWorking:                    "جارٍ العمل…",
    msgStatusbarNoChanges:                  "لا توجد تغييرات",
    msgStatusbarPendingDiscarded:           "تم تجاهل التغييرات المعلقة",
    msgStatusbarScanResult:                 "%N% ملف · %U% غير متطابق",
    msgStatusbarRenaming:                   "إعادة تسمية %N% ملف…",
    msgStatusbarRenamed:                    "تمت إعادة تسمية %N% ملف",
    msgStatusbarPendingRenames:             "%N% عمليات إعادة تسمية معلقة - تأكيد للتطبيق",
    msgStatusbarChapterOverflow:            "الفصل %N% يتجاوز عرض الرقم (الحد الأقصى %M%)",
    msgStatusbarAllChaptersUsed:            "جميع %N% خانات الفصول مستخدمة - زد chapterDigits",
    msgStatusbarEmptyChapterAdded:          "تمت إضافة فصل فارغ %ID% - اسحب اللقطات، ثم تأكيد",
    msgStatusbarChapterLocked:              "الفصل مقفل - افتحه أولاً لنقل اللقطات.",
    msgStatusbarDropFolderFailed:           "تعذر قراءة مسار المجلد المسقط",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "تحديد مجلد المشروع",

  },

  fa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "لغو",
    btnGlobalDiscard:                       "نادیده گرفتن",
    tipGlobalOpenExternal:                  "باز کردن در برنامه پیش‌فرض",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نسخه جدید موجود است:",
    lnkUpdateWhatsNew:                      "چه خبر",
    btnUpdateDownload:                      "دانلود",
    lnkUpdateSkip:                          "رد کردن این نسخه",
    tipUpdateDismiss:                       "رد کردن",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "باز کردن تنظیمات",
    tipHdrHelp:                             "راهنما",
    btnHdrRefresh:                          "تازه‌سازی",
    tipHdrRefresh:                          "اسکن مجدد پوشه",
    tipHdrRefreshDisabled:                  "ابتدا تغییرات در حال انتظار را اعمال یا لغو کنید",
    btnHdrOpenFolder:                       "باز کردن پوشه…",
    btnHdrCommit:                           "تأیید",
    tipHdrDigitsChapter:                    "فصل",
    tipHdrDigitsSlot:                       "شکاف",
    tipHdrDigitsVersion:                    "نسخه",
    tipHdrGroup:                            "گروه‌بندی عکس‌ها",
    tipHdrUngroup:                          "لغو گروه‌بندی عکس‌ها",
    tipHdrPreserveGaps:                     "حفظ شکاف‌های اسلات",
    tipHdrCompactOnDrop:                    "فشرده‌سازی اسلات‌ها هنگام رها کردن",
    tipHdrCompactAll:                       "فشرده‌سازی شکاف‌های اسلات در تمام فصل‌ها",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "تنظیمات",
    tabDlgSettingsDisplay:                  "نمایش",
    tabDlgSettingsAbout:                    "درباره",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "زبان",
    lblDlgSettingsDisplayTheme:             "پوسته",
    btnDlgSettingsDisplayThemeDark:         "تیره",
    btnDlgSettingsDisplayThemeLight:        "روشن",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ترتیب و شماره‌گذاری مجدد فایل‌های ویدیویی با کشیدن و رها کردن.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "فصل",
    lblChapterShots:                        "%N% نما",
    lblChapterGaps:                         "%N% شکاف",
    tipChapterLock:                         "قفل کردن فصل",
    tipChapterUnlock:                       "باز کردن قفل فصل",
    tipChapterCompact:                      "فشرده‌سازی شکاف‌های اسلات در این فصل",
    tipChapterCollapse:                     "جمع کردن فصل",
    tipChapterExpand:                       "باز کردن فصل",
    tipChapterDragHandle:                   "برای مرتب‌سازی مجدد فصل بکشید",
    empChapterEmpty:                        "فصل خالی - یک نما اینجا رها کنید",
    btnChapterAdd:                          "+ افزودن فصل",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% جایگزین",
    lblShotFiles:                           "%N% فایل",
    tipShotThumbHint:                       "برای جابجایی/تغییر ترتیب بکشید · برای پیش‌نمایش روی ▶ کلیک کنید",
    tipShotPileHint:                        "برای جابجایی همه با هم، پشته را بکشید",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "باز کردن پوشه پروژه",
    msgAppOpenFolderDesc1:                  "%APP% فایل‌هایی با نام %PATTERN% (اعداد، سپس پسوند اختیاری) را می‌خواند و به شما امکان می‌دهد نماها را برای شماره‌گذاری مجدد به صورت انبوه بکشید.",
    msgAppOpenFolderDesc2:                  "عرض‌ها در %INI% برای هر پوشه پیکربندی می‌شوند.",
    ttlAppNoMatch:                          "فایلی یافت نشد",
    msgAppNoMatchDesc:                      "هیچ فایلی در این پوشه با الگوی %PATTERN% مطابقت ندارد.",
    msgAppNoMatchHint:                      "چند فایل را به صورت دستی تغییر نام دهید تا مطابقت پیدا کنند، سپس روی تازه‌سازی کلیک کنید.",
    cfmAppPendingFolderSwitch:              "شما تغییر نام‌های در حال انتظار دارید. آیا آنها را نادیده گرفته و پوشه دیگری را باز می‌کنید؟",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "نامطابق",
    empUnmatchedHint:                       "برای اختصاص دادن، روی یک نما یا فصل بکشید",
    tipUnmatchedCardHint:                   "برای اختصاص دادن بکشید · برای پیش‌نمایش روی ▶ کلیک کنید",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "آماده",
    msgStatusbarWorking:                    "در حال کار…",
    msgStatusbarNoChanges:                  "بدون تغییر",
    msgStatusbarPendingDiscarded:           "تغییرات در انتظار لغو شد",
    msgStatusbarScanResult:                 "%N% فایل · %U% نامطابق",
    msgStatusbarRenaming:                   "تغییر نام %N% فایل…",
    msgStatusbarRenamed:                    "%N% فایل تغییر نام یافت",
    msgStatusbarPendingRenames:             "%N% تغییر نام در انتظار - برای اعمال، تأیید کنید",
    msgStatusbarChapterOverflow:            "فصل %N% از عرض رقم فراتر می‌رود (حداکثر %M%)",
    msgStatusbarAllChaptersUsed:            "همه %N% جایگاه‌های فصل استفاده شده‌اند - chapterDigits را افزایش دهید",
    msgStatusbarEmptyChapterAdded:          "فصل خالی %ID% اضافه شد - نماها را بکشید، سپس تأیید کنید",
    msgStatusbarChapterLocked:              "فصل قفل شده است - ابتدا آن را باز کنید تا نماها را جابجا کنید.",
    msgStatusbarDropFolderFailed:           "مسیر پوشه رها شده قابل خواندن نبود",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "انتخاب پوشه پروژه",

  },

  zh_CN: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "取消",
    btnGlobalDiscard:                       "放弃",
    tipGlobalOpenExternal:                  "用默认应用打开",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下载",
    lnkUpdateSkip:                          "跳过此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "打开设置",
    tipHdrHelp:                             "帮助",
    btnHdrRefresh:                          "刷新",
    tipHdrRefresh:                          "重新扫描文件夹",
    tipHdrRefreshDisabled:                  "请先提交或放弃待处理的更改",
    btnHdrOpenFolder:                       "打开文件夹…",
    btnHdrCommit:                           "提交",
    tipHdrDigitsChapter:                    "章",
    tipHdrDigitsSlot:                       "插槽",
    tipHdrDigitsVersion:                    "版本",
    tipHdrGroup:                            "组合照片",
    tipHdrUngroup:                          "取消组合照片",
    tipHdrPreserveGaps:                     "保留插槽间隙",
    tipHdrCompactOnDrop:                    "拖放时紧凑插槽",
    tipHdrCompactAll:                       "紧凑所有章节的插槽间隙",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "设置",
    tabDlgSettingsDisplay:                  "显示",
    tabDlgSettingsAbout:                    "关于",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "语言",
    lblDlgSettingsDisplayTheme:             "主题",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "浅色",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "通过拖放对视频拍摄文件进行排序和重新编号。",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "章节",
    lblChapterShots:                        "%N% 镜头",
    lblChapterGaps:                         "%N% 间隙",
    tipChapterLock:                         "锁定章节",
    tipChapterUnlock:                       "解锁章节",
    tipChapterCompact:                      "紧凑本章节的插槽间隙",
    tipChapterCollapse:                     "折叠章节",
    tipChapterExpand:                       "展开章节",
    tipChapterDragHandle:                   "拖动以重新排序章节",
    empChapterEmpty:                        "空章节 - 将素材拖放到此处",
    btnChapterAdd:                          "+ 添加章节",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% 备选",
    lblShotFiles:                           "%N% 文件",
    tipShotThumbHint:                       "拖动以移动/重新排序 · 点击 ▶ 预览",
    tipShotPileHint:                        "拖动堆叠以整体移动",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "打开项目文件夹",
    msgAppOpenFolderDesc1:                  "%APP% 读取名为 %PATTERN%（数字，后跟可选后缀）的文件，并允许您拖动镜头以批量重新编号。",
    msgAppOpenFolderDesc2:                  "宽度在 %INI% 中按文件夹配置。",
    ttlAppNoMatch:                          "无匹配文件",
    msgAppNoMatchDesc:                      "此文件夹中没有文件与模式 %PATTERN% 匹配",
    msgAppNoMatchHint:                      "手动重命名一些文件以匹配，然后点击刷新。",
    cfmAppPendingFolderSwitch:              "您有待处理的重命名。是否放弃它们并打开其他文件夹？",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "不匹配",
    empUnmatchedHint:                       "拖动到镜头或章节以分配",
    tipUnmatchedCardHint:                   "拖动以分配 · 点击 ▶ 预览",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "就绪",
    msgStatusbarWorking:                    "正在处理…",
    msgStatusbarNoChanges:                  "无更改",
    msgStatusbarPendingDiscarded:           "待处理更改已放弃",
    msgStatusbarScanResult:                 "%N% 个文件 · %U% 个不匹配",
    msgStatusbarRenaming:                   "正在重命名 %N% 个文件…",
    msgStatusbarRenamed:                    "已重命名 %N% 个文件",
    msgStatusbarPendingRenames:             "%N% 个待重命名 - 提交以应用",
    msgStatusbarChapterOverflow:            "章节 %N% 超出数字宽度（最大 %M%）",
    msgStatusbarAllChaptersUsed:            "所有 %N% 个章节槽位已用完 - 增加 chapterDigits",
    msgStatusbarEmptyChapterAdded:          "已添加空章节 %ID% - 拖入镜头，然后提交",
    msgStatusbarChapterLocked:              "章节已锁定 - 请先解锁才能移动镜头。",
    msgStatusbarDropFolderFailed:           "无法读取拖放的文件夹路径",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "选择项目文件夹",

  },

  zh_TW: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "取消",
    btnGlobalDiscard:                       "放棄",
    tipGlobalOpenExternal:                  "用預設應用程式開啟",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新版本可用:",
    lnkUpdateWhatsNew:                      "新功能",
    btnUpdateDownload:                      "下載",
    lnkUpdateSkip:                          "跳過此版本",
    tipUpdateDismiss:                       "忽略",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "開啟設定",
    tipHdrHelp:                             "說明",
    btnHdrRefresh:                          "重新整理",
    tipHdrRefresh:                          "重新掃描資料夾",
    tipHdrRefreshDisabled:                  "請先提交或放棄待處理的變更",
    btnHdrOpenFolder:                       "開啟資料夾…",
    btnHdrCommit:                           "提交",
    tipHdrDigitsChapter:                    "章",
    tipHdrDigitsSlot:                       "插槽",
    tipHdrDigitsVersion:                    "版本",
    tipHdrGroup:                            "組合相片",
    tipHdrUngroup:                          "取消組合相片",
    tipHdrPreserveGaps:                     "保留插槽間隙",
    tipHdrCompactOnDrop:                    "拖放時緊湊插槽",
    tipHdrCompactAll:                       "緊湊所有章節的插槽間隙",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "顯示",
    tabDlgSettingsAbout:                    "關於",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "語言",
    lblDlgSettingsDisplayTheme:             "主題",
    btnDlgSettingsDisplayThemeDark:         "深色",
    btnDlgSettingsDisplayThemeLight:        "淺色",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "透過拖放對影片拍攝檔案進行排序和重新編號。",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "章節",
    lblChapterShots:                        "%N% 鏡頭",
    lblChapterGaps:                         "%N% 間隙",
    tipChapterLock:                         "鎖定章節",
    tipChapterUnlock:                       "解鎖章節",
    tipChapterCompact:                      "緊湊本章節的插槽間隙",
    tipChapterCollapse:                     "收合章節",
    tipChapterExpand:                       "展開章節",
    tipChapterDragHandle:                   "拖曳以重新排列章節",
    empChapterEmpty:                        "空白章節 - 將素材拖放到此處",
    btnChapterAdd:                          "+ 新增章節",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% 備用",
    lblShotFiles:                           "%N% 檔案",
    tipShotThumbHint:                       "拖曳以移動/重新排列 · 點擊 ▶ 預覽",
    tipShotPileHint:                        "拖曳堆疊以整體移動",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "開啟專案資料夾",
    msgAppOpenFolderDesc1:                  "%APP% 讀取名稱為 %PATTERN%（數字，後接選用後綴）的檔案，並允許您拖曳鏡頭以批次重新編號。",
    msgAppOpenFolderDesc2:                  "寬度在 %INI% 中依資料夾配置。",
    ttlAppNoMatch:                          "無符合檔案",
    msgAppNoMatchDesc:                      "此資料夾中沒有檔案符合模式 %PATTERN%",
    msgAppNoMatchHint:                      "手動重新命名部分檔案以符合，然後點擊重新整理。",
    cfmAppPendingFolderSwitch:              "您有待處理的重新命名。是否要捨棄這些變更並開啟其他資料夾？",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "不符合",
    empUnmatchedHint:                       "拖曳到鏡頭或章節以指派",
    tipUnmatchedCardHint:                   "拖曳以指派 · 點擊 ▶ 預覽",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "準備就緒",
    msgStatusbarWorking:                    "正在處理…",
    msgStatusbarNoChanges:                  "無變更",
    msgStatusbarPendingDiscarded:           "待處理變更已捨棄",
    msgStatusbarScanResult:                 "%N% 個檔案 · %U% 個不符合",
    msgStatusbarRenaming:                   "正在重新命名 %N% 個檔案…",
    msgStatusbarRenamed:                    "已重新命名 %N% 個檔案",
    msgStatusbarPendingRenames:             "%N% 個待重新命名 - 提交以套用",
    msgStatusbarChapterOverflow:            "章節 %N% 超出數字寬度（最大 %M%）",
    msgStatusbarAllChaptersUsed:            "所有 %N% 個章節槽位已用盡 - 增加 chapterDigits",
    msgStatusbarEmptyChapterAdded:          "已新增空白章節 %ID% - 拖入鏡頭，然後提交",
    msgStatusbarChapterLocked:              "章節已鎖定 - 請先解鎖才能移動鏡頭。",
    msgStatusbarDropFolderFailed:           "無法讀取拖放的資料夾路徑",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "選取專案資料夾",

  },

  ja: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "キャンセル",
    btnGlobalDiscard:                       "破棄",
    tipGlobalOpenExternal:                  "既定のアプリで開く",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "新しいバージョンが利用可能です:",
    lnkUpdateWhatsNew:                      "新機能",
    btnUpdateDownload:                      "ダウンロード",
    lnkUpdateSkip:                          "このバージョンをスキップ",
    tipUpdateDismiss:                       "閉じる",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "設定を開く",
    tipHdrHelp:                             "ヘルプ",
    btnHdrRefresh:                          "更新",
    tipHdrRefresh:                          "フォルダーを再スキャン",
    tipHdrRefreshDisabled:                  "まず保留中の変更をコミットまたは破棄してください",
    btnHdrOpenFolder:                       "フォルダーを開く…",
    btnHdrCommit:                           "確定",
    tipHdrDigitsChapter:                    "章",
    tipHdrDigitsSlot:                       "スロット",
    tipHdrDigitsVersion:                    "バージョン",
    tipHdrGroup:                            "写真をグループ化",
    tipHdrUngroup:                          "写真のグループ化を解除",
    tipHdrPreserveGaps:                     "スロットの隙間を保持",
    tipHdrCompactOnDrop:                    "ドロップ時にスロットを圧縮",
    tipHdrCompactAll:                       "すべてのチャプターのスロットの隙間を圧縮",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "設定",
    tabDlgSettingsDisplay:                  "表示",
    tabDlgSettingsAbout:                    "バージョン情報",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "言語",
    lblDlgSettingsDisplayTheme:             "テーマ",
    btnDlgSettingsDisplayThemeDark:         "ダーク",
    btnDlgSettingsDisplayThemeLight:        "ライト",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ドラッグ＆ドロップでビデオショットファイルをシーケンス化し、番号を振り直します。",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "チャプター",
    lblChapterShots:                        "%N% ショット",
    lblChapterGaps:                         "%N% の隙間",
    tipChapterLock:                         "チャプターをロック",
    tipChapterUnlock:                       "チャプターのロックを解除",
    tipChapterCompact:                      "このチャプターのスロットの隙間を圧縮",
    tipChapterCollapse:                     "チャプターを折りたたむ",
    tipChapterExpand:                       "チャプターを展開する",
    tipChapterDragHandle:                   "ドラッグしてチャプターを並べ替える",
    empChapterEmpty:                        "空のチャプター - ここにショットをドロップ",
    btnChapterAdd:                          "+ チャプターを追加",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% 代替",
    lblShotFiles:                           "%N% ファイル",
    tipShotThumbHint:                       "ドラッグで移動/並べ替え · ▶ クリックでプレビュー",
    tipShotPileHint:                        "まとめて移動するには山をドラッグ",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "プロジェクトフォルダーを開く",
    msgAppOpenFolderDesc1:                  "%APP% は %PATTERN%（数字、その後オプションの接尾辞）という名前のファイルを読み込み、ショットをドラッグして一括で番号を付け直すことができます。",
    msgAppOpenFolderDesc2:                  "幅は %INI% 内のフォルダーごとに設定されます。",
    ttlAppNoMatch:                          "一致するファイルなし",
    msgAppNoMatchDesc:                      "このフォルダーには、パターン %PATTERN% に一致するファイルがありません",
    msgAppNoMatchHint:                      "いくつかのファイルを手動でリネームして一致させ、更新をクリックしてください。",
    cfmAppPendingFolderSwitch:              "保留中の名前変更があります。破棄して別のフォルダーを開きますか？",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "不一致",
    empUnmatchedHint:                       "ショットまたはチャプターにドラッグして割り当て",
    tipUnmatchedCardHint:                   "ドラッグして割り当て · ▶ をクリックしてプレビュー",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "準備完了",
    msgStatusbarWorking:                    "処理中…",
    msgStatusbarNoChanges:                  "変更なし",
    msgStatusbarPendingDiscarded:           "保留中の変更を破棄しました",
    msgStatusbarScanResult:                 "%N% 個のファイル · %U% 個が不一致",
    msgStatusbarRenaming:                   "%N% 個のファイル名を変更中…",
    msgStatusbarRenamed:                    "%N% 個のファイル名を変更しました",
    msgStatusbarPendingRenames:             "%N% 件の保留中の名前変更 - 適用するにはコミット",
    msgStatusbarChapterOverflow:            "章 %N% が桁幅を超えています (最大 %M%)",
    msgStatusbarAllChaptersUsed:            "すべての %N% 章スロットが使用されています - chapterDigits を増やしてください",
    msgStatusbarEmptyChapterAdded:          "空のチャプター %ID% を追加しました - ショットをドラッグしてコミット",
    msgStatusbarChapterLocked:              "チャプターがロックされています - ショットの移動には、まずロックを解除してください。",
    msgStatusbarDropFolderFailed:           "ドロップされたフォルダーのパスを読み取れませんでした",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "プロジェクトフォルダーを選択",

  },

  ko: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "취소",
    btnGlobalDiscard:                       "취소",
    tipGlobalOpenExternal:                  "기본 앱으로 열기",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "새 버전 사용 가능:",
    lnkUpdateWhatsNew:                      "새로운 기능",
    btnUpdateDownload:                      "다운로드",
    lnkUpdateSkip:                          "이 버전 건너뛰기",
    tipUpdateDismiss:                       "닫기",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "설정 열기",
    tipHdrHelp:                             "도움말",
    btnHdrRefresh:                          "새로 고침",
    tipHdrRefresh:                          "폴더 다시 스캔",
    tipHdrRefreshDisabled:                  "먼저 보류 중인 변경 사항을 커밋하거나 취소하세요",
    btnHdrOpenFolder:                       "폴더 열기…",
    btnHdrCommit:                           "확정",
    tipHdrDigitsChapter:                    "장",
    tipHdrDigitsSlot:                       "슬롯",
    tipHdrDigitsVersion:                    "버전",
    tipHdrGroup:                            "사진 그룹화",
    tipHdrUngroup:                          "사진 그룹 해제",
    tipHdrPreserveGaps:                     "슬롯 간격 유지",
    tipHdrCompactOnDrop:                    "드롭 시 슬롯 압축",
    tipHdrCompactAll:                       "모든 챕터의 슬롯 간격 압축",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "설정",
    tabDlgSettingsDisplay:                  "디스플레이",
    tabDlgSettingsAbout:                    "정보",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "언어",
    lblDlgSettingsDisplayTheme:             "테마",
    btnDlgSettingsDisplayThemeDark:         "어둡게",
    btnDlgSettingsDisplayThemeLight:        "밝게",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "드래그 앤 드롭으로 비디오 촬영 파일의 순서를 지정하고 번호를 다시 매깁니다.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "챕터",
    lblChapterShots:                        "%N% 샷",
    lblChapterGaps:                         "간격 %N%개",
    tipChapterLock:                         "챕터 잠금",
    tipChapterUnlock:                       "챕터 잠금 해제",
    tipChapterCompact:                      "이 챕터의 슬롯 간격 압축",
    tipChapterCollapse:                     "챕터 접기",
    tipChapterExpand:                       "챕터 펼치기",
    tipChapterDragHandle:                   "챕터 순서 변경을 위해 드래그",
    empChapterEmpty:                        "빈 챕터 - 여기에 샷을 드롭하세요",
    btnChapterAdd:                          "+ 챕터 추가",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% 대체",
    lblShotFiles:                           "%N% 파일",
    tipShotThumbHint:                       "드래그하여 이동/재정렬 · ▶ 클릭하여 미리보기",
    tipShotPileHint:                        "전체 이동하려면 더미를 드래그",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "프로젝트 폴더 열기",
    msgAppOpenFolderDesc1:                  "%APP%은(는) %PATTERN%(숫자, 선택적 접미사) 이름의 파일을 읽고, 샷을 드래그하여 일괄적으로 번호를 다시 매길 수 있도록 합니다.",
    msgAppOpenFolderDesc2:                  "너비는 %INI%에서 폴더별로 구성됩니다.",
    ttlAppNoMatch:                          "일치하는 파일 없음",
    msgAppNoMatchDesc:                      "이 폴더에 %PATTERN% 패턴과 일치하는 파일이 없습니다.",
    msgAppNoMatchHint:                      "일부 파일의 이름을 수동으로 변경하여 일치시킨 다음 새로 고침을 누르세요.",
    cfmAppPendingFolderSwitch:              "보류 중인 이름 변경이 있습니다. 변경 사항을 버리고 다른 폴더를 여시겠습니까?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "일치하지 않음",
    empUnmatchedHint:                       "장면 또는 챕터로 드래그하여 할당",
    tipUnmatchedCardHint:                   "드래그하여 할당 · ▶ 클릭하여 미리 보기",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "준비됨",
    msgStatusbarWorking:                    "작업 중…",
    msgStatusbarNoChanges:                  "변경 없음",
    msgStatusbarPendingDiscarded:           "보류 중인 변경 사항이 취소됨",
    msgStatusbarScanResult:                 "파일 %N%개 · 불일치 %U%개",
    msgStatusbarRenaming:                   "%N%개 파일 이름 변경 중…",
    msgStatusbarRenamed:                    "%N%개 파일 이름 변경 완료",
    msgStatusbarPendingRenames:             "%N%개 이름 변경 보류 중 - 적용하려면 커밋",
    msgStatusbarChapterOverflow:            "챕터 %N%이(가) 자릿수 너비를 초과합니다 (최대 %M%)",
    msgStatusbarAllChaptersUsed:            "모든 %N%개 챕터 슬롯이 사용 중입니다 - chapterDigits를 늘리세요",
    msgStatusbarEmptyChapterAdded:          "빈 챕터 %ID% 추가됨 - 샷을 드래그한 다음 커밋",
    msgStatusbarChapterLocked:              "챕터가 잠겨 있습니다 - 샷을 이동하려면 먼저 잠금을 해제하세요.",
    msgStatusbarDropFolderFailed:           "드롭된 폴더 경로를 읽을 수 없습니다",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "프로젝트 폴더 선택",

  },

  vi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Hủy",
    btnGlobalDiscard:                       "Hủy bỏ",
    tipGlobalOpenExternal:                  "Mở bằng ứng dụng mặc định",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Phiên bản mới có sẵn:",
    lnkUpdateWhatsNew:                      "Có gì mới",
    btnUpdateDownload:                      "Tải xuống",
    lnkUpdateSkip:                          "Bỏ qua phiên bản này",
    tipUpdateDismiss:                       "Bỏ qua",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Mở cài đặt",
    tipHdrHelp:                             "Trợ giúp",
    btnHdrRefresh:                          "Làm mới",
    tipHdrRefresh:                          "Quét lại thư mục",
    tipHdrRefreshDisabled:                  "Trước tiên, hãy cam kết hoặc loại bỏ các thay đổi đang chờ xử lý",
    btnHdrOpenFolder:                       "Mở thư mục…",
    btnHdrCommit:                           "Xác nhận",
    tipHdrDigitsChapter:                    "Chương",
    tipHdrDigitsSlot:                       "Khe",
    tipHdrDigitsVersion:                    "Phiên bản",
    tipHdrGroup:                            "Nhóm ảnh",
    tipHdrUngroup:                          "Bỏ nhóm ảnh",
    tipHdrPreserveGaps:                     "Giữ khoảng trống khe",
    tipHdrCompactOnDrop:                    "Thu gọn khe khi thả",
    tipHdrCompactAll:                       "Thu gọn khoảng trống khe trong tất cả các chương",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Cài đặt",
    tabDlgSettingsDisplay:                  "Hiển thị",
    tabDlgSettingsAbout:                    "Giới thiệu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Ngôn ngữ",
    lblDlgSettingsDisplayTheme:             "Chủ đề",
    btnDlgSettingsDisplayThemeDark:         "Tối",
    btnDlgSettingsDisplayThemeLight:        "Sáng",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sắp xếp và đánh số lại các tệp quay video bằng cách kéo và thả.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Chương",
    lblChapterShots:                        "%N% cảnh quay",
    lblChapterGaps:                         "%N% khoảng trống",
    tipChapterLock:                         "Khóa chương",
    tipChapterUnlock:                       "Mở khóa chương",
    tipChapterCompact:                      "Thu gọn khoảng trống khe trong chương này",
    tipChapterCollapse:                     "Thu gọn chương",
    tipChapterExpand:                       "Mở rộng chương",
    tipChapterDragHandle:                   "Kéo để sắp xếp lại chương",
    empChapterEmpty:                        "Chương trống - thả một cảnh quay vào đây",
    btnChapterAdd:                          "+ Thêm chương",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% thay thế",
    lblShotFiles:                           "%N% tệp",
    tipShotThumbHint:                       "kéo để di chuyển/sắp xếp lại · nhấp ▶ để xem trước",
    tipShotPileHint:                        "kéo chồng để di chuyển tất cả cùng lúc",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Mở thư mục dự án",
    msgAppOpenFolderDesc1:                  "%APP% đọc các tệp có tên %PATTERN% (chữ số, sau đó là hậu tố tùy chọn) và cho phép bạn kéo các cảnh quay để đánh số lại chúng hàng loạt.",
    msgAppOpenFolderDesc2:                  "Chiều rộng được cấu hình cho mỗi thư mục trong %INI%.",
    ttlAppNoMatch:                          "Không có tệp phù hợp",
    msgAppNoMatchDesc:                      "Không có tệp nào trong thư mục này khớp với mẫu %PATTERN%",
    msgAppNoMatchHint:                      "Đổi tên thủ công một vài tệp để khớp, sau đó nhấn Làm mới.",
    cfmAppPendingFolderSwitch:              "Bạn có các đổi tên đang chờ xử lý. Hủy bỏ chúng và mở một thư mục khác?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Không khớp",
    empUnmatchedHint:                       "kéo vào một cảnh quay hoặc chương để gán",
    tipUnmatchedCardHint:                   "kéo để gán · nhấp ▶ để xem trước",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Sẵn sàng",
    msgStatusbarWorking:                    "Đang xử lý…",
    msgStatusbarNoChanges:                  "Không có thay đổi",
    msgStatusbarPendingDiscarded:           "Các thay đổi đang chờ xử lý đã bị loại bỏ",
    msgStatusbarScanResult:                 "%N% tệp · %U% không khớp",
    msgStatusbarRenaming:                   "Đang đổi tên %N% tệp…",
    msgStatusbarRenamed:                    "Đã đổi tên %N% tệp",
    msgStatusbarPendingRenames:             "%N% đổi tên đang chờ xử lý - Cam kết để áp dụng",
    msgStatusbarChapterOverflow:            "Chương %N% vượt quá chiều rộng chữ số (tối đa %M%)",
    msgStatusbarAllChaptersUsed:            "Tất cả %N% ô chương đã được sử dụng - tăng chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Đã thêm chương trống %ID% - kéo cảnh vào, sau đó Cam kết",
    msgStatusbarChapterLocked:              "Chương bị khóa - hãy mở khóa trước để di chuyển cảnh quay.",
    msgStatusbarDropFolderFailed:           "Không thể đọc đường dẫn thư mục đã thả",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Chọn thư mục dự án",

  },

  th: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ยกเลิก",
    btnGlobalDiscard:                       "ละทิ้ง",
    tipGlobalOpenExternal:                  "เปิดด้วยแอปเริ่มต้น",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "มีเวอร์ชันใหม่:",
    lnkUpdateWhatsNew:                      "มีอะไรใหม่",
    btnUpdateDownload:                      "ดาวน์โหลด",
    lnkUpdateSkip:                          "ข้ามเวอร์ชันนี้",
    tipUpdateDismiss:                       "ปิด",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "เปิดการตั้งค่า",
    tipHdrHelp:                             "ช่วยเหลือ",
    btnHdrRefresh:                          "รีเฟรช",
    tipHdrRefresh:                          "สแกนโฟลเดอร์อีกครั้ง",
    tipHdrRefreshDisabled:                  "ยืนยันหรือยกเลิกการเปลี่ยนแปลงที่รอดำเนินการก่อน",
    btnHdrOpenFolder:                       "เปิดโฟลเดอร์…",
    btnHdrCommit:                           "ยืนยัน",
    tipHdrDigitsChapter:                    "บท",
    tipHdrDigitsSlot:                       "ช่อง",
    tipHdrDigitsVersion:                    "เวอร์ชัน",
    tipHdrGroup:                            "จัดกลุ่มภาพถ่าย",
    tipHdrUngroup:                          "ยกเลิกการจัดกลุ่มภาพถ่าย",
    tipHdrPreserveGaps:                     "รักษาระยะห่างของช่อง",
    tipHdrCompactOnDrop:                    "จัดช่องให้กระชับเมื่อวาง",
    tipHdrCompactAll:                       "จัดช่องว่างในทุกบทให้กระชับ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "การตั้งค่า",
    tabDlgSettingsDisplay:                  "การแสดงผล",
    tabDlgSettingsAbout:                    "เกี่ยวกับ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ภาษา",
    lblDlgSettingsDisplayTheme:             "ธีม",
    btnDlgSettingsDisplayThemeDark:         "มืด",
    btnDlgSettingsDisplayThemeLight:        "สว่าง",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "จัดลำดับและเปลี่ยนหมายเลขไฟล์วิดีโอด้วยการลากและวาง",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "บท",
    lblChapterShots:                        "%N% ช็อต",
    lblChapterGaps:                         "%N% ช่องว่าง",
    tipChapterLock:                         "ล็อกบท",
    tipChapterUnlock:                       "ปลดล็อกบท",
    tipChapterCompact:                      "จัดช่องว่างในบทนี้ให้กระชับ",
    tipChapterCollapse:                     "ยุบส่วน",
    tipChapterExpand:                       "ขยายส่วน",
    tipChapterDragHandle:                   "ลากเพื่อจัดลำดับส่วนใหม่",
    empChapterEmpty:                        "ส่วนว่าง - วางช็อตที่นี่",
    btnChapterAdd:                          "+ เพิ่มบท",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% ทางเลือก",
    lblShotFiles:                           "%N% ไฟล์",
    tipShotThumbHint:                       "ลากเพื่อย้าย/จัดลำดับใหม่ · คลิก ▶ เพื่อดูตัวอย่าง",
    tipShotPileHint:                        "ลากกองเพื่อย้ายทั้งหมดพร้อมกัน",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "เปิดโฟลเดอร์โปรเจกต์",
    msgAppOpenFolderDesc1:                  "%APP% อ่านไฟล์ที่ชื่อ %PATTERN% (ตัวเลข ตามด้วยส่วนต่อท้ายเสริม) และให้คุณลากช็อตเพื่อจัดลำดับใหม่เป็นจำนวนมาก",
    msgAppOpenFolderDesc2:                  "ความกว้างถูกกำหนดค่าต่อโฟลเดอร์ใน %INI%",
    ttlAppNoMatch:                          "ไม่มีไฟล์ที่ตรงกัน",
    msgAppNoMatchDesc:                      "ไม่มีไฟล์ในโฟลเดอร์นี้ที่ตรงกับรูปแบบ %PATTERN%",
    msgAppNoMatchHint:                      "เปลี่ยนชื่อไฟล์บางไฟล์ด้วยตนเองเพื่อให้ตรงกัน จากนั้นกดรีเฟรช",
    cfmAppPendingFolderSwitch:              "คุณมีการเปลี่ยนชื่อที่รอดำเนินการ ต้องการละทิ้งและเปิดโฟลเดอร์อื่นหรือไม่?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "ไม่ตรงกัน",
    empUnmatchedHint:                       "ลากไปที่ช็อตหรือบทเพื่อกำหนด",
    tipUnmatchedCardHint:                   "ลากเพื่อกำหนด · คลิก ▶ เพื่อดูตัวอย่าง",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "พร้อม",
    msgStatusbarWorking:                    "กำลังทำงาน…",
    msgStatusbarNoChanges:                  "ไม่มีการเปลี่ยนแปลง",
    msgStatusbarPendingDiscarded:           "ละทิ้งการเปลี่ยนแปลงที่รอดำเนินการ",
    msgStatusbarScanResult:                 "%N% ไฟล์ · %U% ไม่ตรงกัน",
    msgStatusbarRenaming:                   "กำลังเปลี่ยนชื่อ %N% ไฟล์…",
    msgStatusbarRenamed:                    "เปลี่ยนชื่อ %N% ไฟล์แล้ว",
    msgStatusbarPendingRenames:             "%N% รายการเปลี่ยนชื่อที่รอดำเนินการ - ยืนยันเพื่อใช้",
    msgStatusbarChapterOverflow:            "บทที่ %N% เกินความกว้างของตัวเลข (สูงสุด %M%)",
    msgStatusbarAllChaptersUsed:            "ช่องบททั้ง %N% ช่องถูกใช้หมดแล้ว - เพิ่ม chapterDigits",
    msgStatusbarEmptyChapterAdded:          "เพิ่มบทเปล่า %ID% แล้ว - ลากช็อตเข้ามา แล้วยืนยัน",
    msgStatusbarChapterLocked:              "บทถูกล็อก - ปลดล็อกก่อนเพื่อย้ายช็อต",
    msgStatusbarDropFolderFailed:           "ไม่สามารถอ่านพาธของโฟลเดอร์ที่ลากมาวางได้",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "เลือกโฟลเดอร์โปรเจกต์",

  },

  id: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Batal",
    btnGlobalDiscard:                       "Buang",
    tipGlobalOpenExternal:                  "Buka di aplikasi default",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baru tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baru",
    btnUpdateDownload:                      "Unduh",
    lnkUpdateSkip:                          "Lewati versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Buka pengaturan",
    tipHdrHelp:                             "Bantuan",
    btnHdrRefresh:                          "Segarkan",
    tipHdrRefresh:                          "Pindai ulang folder",
    tipHdrRefreshDisabled:                  "Terapkan atau buang perubahan tertunda terlebih dahulu",
    btnHdrOpenFolder:                       "Buka folder…",
    btnHdrCommit:                           "Terapkan",
    tipHdrDigitsChapter:                    "Bab",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Versi",
    tipHdrGroup:                            "Kelompokkan Foto",
    tipHdrUngroup:                          "Pisahkan Foto",
    tipHdrPreserveGaps:                     "Pertahankan celah slot",
    tipHdrCompactOnDrop:                    "Padatkan slot saat dijatuhkan",
    tipHdrCompactAll:                       "Padatkan celah slot di semua bab",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Pengaturan",
    tabDlgSettingsDisplay:                  "Tampilan",
    tabDlgSettingsAbout:                    "Tentang",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Terang",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Urutkan dan beri nomor ulang file rekaman video melalui seret dan lepas.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Bab",
    lblChapterShots:                        "%N% bidikan",
    lblChapterGaps:                         "%N% celah",
    tipChapterLock:                         "Kunci Bab",
    tipChapterUnlock:                       "Buka Kunci Bab",
    tipChapterCompact:                      "Padatkan celah slot di bab ini",
    tipChapterCollapse:                     "Ciutkan bab",
    tipChapterExpand:                       "Perluas bab",
    tipChapterDragHandle:                   "Seret untuk menyusun ulang bab",
    empChapterEmpty:                        "Bab kosong - letakkan bidikan di sini",
    btnChapterAdd:                          "+ Tambah bab",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatif",
    lblShotFiles:                           "%N% berkas",
    tipShotThumbHint:                       "seret untuk memindahkan/menyusun ulang · klik ▶ untuk pratinjau",
    tipShotPileHint:                        "seret tumpukan untuk memindahkan semua bersama",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Buka folder proyek",
    msgAppOpenFolderDesc1:                  "%APP% membaca file bernama %PATTERN% (digit, lalu sufiks opsional) dan memungkinkan Anda menyeret bidikan untuk menomorinya kembali secara massal.",
    msgAppOpenFolderDesc2:                  "Lebar dikonfigurasi per folder di %INI%.",
    ttlAppNoMatch:                          "Tidak ada file yang cocok",
    msgAppNoMatchDesc:                      "Tidak ada file di folder ini yang cocok dengan pola %PATTERN%",
    msgAppNoMatchHint:                      "Ganti nama beberapa file secara manual agar cocok, lalu tekan Segarkan.",
    cfmAppPendingFolderSwitch:              "Anda memiliki perubahan nama yang tertunda. Buang dan buka folder lain?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Tidak Cocok",
    empUnmatchedHint:                       "seret ke bidikan atau bab untuk menetapkan",
    tipUnmatchedCardHint:                   "seret untuk menetapkan · klik ▶ untuk pratinjau",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Siap",
    msgStatusbarWorking:                    "Sedang bekerja…",
    msgStatusbarNoChanges:                  "Tidak ada perubahan",
    msgStatusbarPendingDiscarded:           "Perubahan tertunda dibuang",
    msgStatusbarScanResult:                 "%N% berkas · %U% tidak cocok",
    msgStatusbarRenaming:                   "Mengganti nama %N% berkas…",
    msgStatusbarRenamed:                    "%N% berkas diganti namanya",
    msgStatusbarPendingRenames:             "%N% penggantian nama tertunda - Komit untuk menerapkan",
    msgStatusbarChapterOverflow:            "Bab %N% melebihi lebar digit (maks %M%)",
    msgStatusbarAllChaptersUsed:            "Semua %N% slot bab telah digunakan - tingkatkan chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Bab kosong %ID% ditambahkan - seret bidikan, lalu Komit",
    msgStatusbarChapterLocked:              "Bab terkunci - buka kuncinya terlebih dahulu untuk memindahkan bidikan.",
    msgStatusbarDropFolderFailed:           "Tidak dapat membaca jalur folder yang dijatuhkan",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Pilih folder proyek",

  },

  ca: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancel·la",
    btnGlobalDiscard:                       "Descarta",
    tipGlobalOpenExternal:                  "Obrir amb l'aplicació predeterminada",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versió disponible:",
    lnkUpdateWhatsNew:                      "Novetats",
    btnUpdateDownload:                      "Baixa",
    lnkUpdateSkip:                          "Omet aquesta versió",
    tipUpdateDismiss:                       "Descarta",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Obre la configuració",
    tipHdrHelp:                             "Ajuda",
    btnHdrRefresh:                          "Actualitzar",
    tipHdrRefresh:                          "Torna a escanejar la carpeta",
    tipHdrRefreshDisabled:                  "Primer, confirma o descarta els canvis pendents",
    btnHdrOpenFolder:                       "Obrir carpeta…",
    btnHdrCommit:                           "Confirma",
    tipHdrDigitsChapter:                    "Capítol",
    tipHdrDigitsSlot:                       "Ranura",
    tipHdrDigitsVersion:                    "Versió",
    tipHdrGroup:                            "Agrupa fotos",
    tipHdrUngroup:                          "Desagrupa fotos",
    tipHdrPreserveGaps:                     "Preservar buits d'espais",
    tipHdrCompactOnDrop:                    "Compactar espais en deixar anar",
    tipHdrCompactAll:                       "Compactar buits d'espais en tots els capítols",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuració",
    tabDlgSettingsDisplay:                  "Visualització",
    tabDlgSettingsAbout:                    "Quant a",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Fosc",
    btnDlgSettingsDisplayThemeLight:        "Clar",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Ordeneu i renumereu els fitxers de vídeo mitjançant arrossegar i deixar anar.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Capítol",
    lblChapterShots:                        "%N% preses",
    lblChapterGaps:                         "%N% buits",
    tipChapterLock:                         "Bloqueja el capítol",
    tipChapterUnlock:                       "Desbloqueja el capítol",
    tipChapterCompact:                      "Compactar buits d'espais en aquest capítol",
    tipChapterCollapse:                     "Contreure capítol",
    tipChapterExpand:                       "Expandir capítol",
    tipChapterDragHandle:                   "Arrossega per reordenar el capítol",
    empChapterEmpty:                        "Capítol buit - deixa anar un element aquí",
    btnChapterAdd:                          "+ Afegeix capítol",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatives",
    lblShotFiles:                           "%N% fitxers",
    tipShotThumbHint:                       "arrossega per moure/reordenar · clica ▶ per previsualitzar",
    tipShotPileHint:                        "arrossega la pila per moure-ho tot junt",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Obre una carpeta de projecte",
    msgAppOpenFolderDesc1:                  "%APP% llegeix fitxers anomenats %PATTERN% (dígits, després sufix opcional) i us permet arrossegar plans per renumerar-los en massa.",
    msgAppOpenFolderDesc2:                  "Les amplades es configuren per carpeta a %INI%.",
    ttlAppNoMatch:                          "No hi ha fitxers coincidents",
    msgAppNoMatchDesc:                      "No hi ha fitxers en aquesta carpeta que coincideixin amb el patró %PATTERN%",
    msgAppNoMatchHint:                      "Canvia el nom d'alguns fitxers manualment perquè coincideixin i després prem Actualitza.",
    cfmAppPendingFolderSwitch:              "Tens canvis de nom pendents. Els vols descartar i obrir una carpeta diferent?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Sense coincidència",
    empUnmatchedHint:                       "arrossega a una presa o capítol per assignar",
    tipUnmatchedCardHint:                   "arrossega per assignar · fes clic a ▶ per previsualitzar",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Llest",
    msgStatusbarWorking:                    "Processant…",
    msgStatusbarNoChanges:                  "Sense canvis",
    msgStatusbarPendingDiscarded:           "Canvis pendents descartats",
    msgStatusbarScanResult:                 "%N% fitxers · %U% sense coincidència",
    msgStatusbarRenaming:                   "Canviant el nom de %N% fitxers…",
    msgStatusbarRenamed:                    "%N% fitxers reanomenats",
    msgStatusbarPendingRenames:             "%N% canvis de nom pendents - Confirma per aplicar",
    msgStatusbarChapterOverflow:            "El capítol %N% excedeix l'amplada de dígit (màx. %M%)",
    msgStatusbarAllChaptersUsed:            "Tots els %N% espais de capítol estan usats - augmenteu chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Capítol buit %ID% afegit - arrossegueu plans, després Confirma",
    msgStatusbarChapterLocked:              "Capítol bloquejat - desbloquegeu-lo primer per moure plans.",
    msgStatusbarDropFolderFailed:           "No s'ha pogut llegir la ruta de la carpeta arrossegada",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Selecciona la carpeta del projecte",

  },

  cs: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Zrušit",
    btnGlobalDiscard:                       "Zahodit",
    tipGlobalOpenExternal:                  "Otevřít ve výchozí aplikaci",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nová verze je k dispozici:",
    lnkUpdateWhatsNew:                      "Co je nového",
    btnUpdateDownload:                      "Stáhnout",
    lnkUpdateSkip:                          "Přeskočit tuto verzi",
    tipUpdateDismiss:                       "Zavřít",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otevřít nastavení",
    tipHdrHelp:                             "Nápověda",
    btnHdrRefresh:                          "Obnovit",
    tipHdrRefresh:                          "Znovu prohledat složku",
    tipHdrRefreshDisabled:                  "Nejprve potvrďte nebo zrušte čekající změny",
    btnHdrOpenFolder:                       "Otevřít složku…",
    btnHdrCommit:                           "Potvrdit",
    tipHdrDigitsChapter:                    "Kapitola",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Verze",
    tipHdrGroup:                            "Seskupit snímky",
    tipHdrUngroup:                          "Zrušit seskupení snímků",
    tipHdrPreserveGaps:                     "Zachovat mezery slotů",
    tipHdrCompactOnDrop:                    "Komprimovat sloty při přetažení",
    tipHdrCompactAll:                       "Komprimovat mezery slotů ve všech kapitolách",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavení",
    tabDlgSettingsDisplay:                  "Zobrazení",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jazyk",
    lblDlgSettingsDisplayTheme:             "Motiv",
    btnDlgSettingsDisplayThemeDark:         "Tmavý",
    btnDlgSettingsDisplayThemeLight:        "Světlý",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sekvenujte a přečíslujte soubory videozáznamů přetažením.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Kapitola",
    lblChapterShots:                        "%N% záběrů",
    lblChapterGaps:                         "%N% mezer",
    tipChapterLock:                         "Zamknout kapitolu",
    tipChapterUnlock:                       "Odemknout kapitolu",
    tipChapterCompact:                      "Komprimovat mezery slotů v této kapitole",
    tipChapterCollapse:                     "Sbalit kapitolu",
    tipChapterExpand:                       "Rozbalit kapitolu",
    tipChapterDragHandle:                   "Přetáhněte pro změnu pořadí kapitoly",
    empChapterEmpty:                        "Prázdná kapitola - přetáhněte sem záběr",
    btnChapterAdd:                          "+ Přidat kapitolu",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternativ",
    lblShotFiles:                           "%N% souborů",
    tipShotThumbHint:                       "přetáhněte pro přesun/změnu pořadí · klikněte na ▶ pro náhled",
    tipShotPileHint:                        "přetáhněte hromádku pro přesun všeho dohromady",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Otevřít složku projektu",
    msgAppOpenFolderDesc1:                  "%APP% čte soubory pojmenované %PATTERN% (číslice, pak volitelná přípona) a umožňuje přetahovat záběry pro jejich hromadné přečíslování.",
    msgAppOpenFolderDesc2:                  "Šířky jsou konfigurovány pro každou složku v %INI%.",
    ttlAppNoMatch:                          "Žádné odpovídající soubory",
    msgAppNoMatchDesc:                      "V této složce nejsou žádné soubory odpovídající vzoru %PATTERN%",
    msgAppNoMatchHint:                      "Několik souborů ručně přejmenujte, aby se shodovaly, a poté klikněte na Obnovit.",
    cfmAppPendingFolderSwitch:              "Máte čekající přejmenování. Zahodit je a otevřít jinou složku?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Neshodné",
    empUnmatchedHint:                       "přetáhněte na záběr nebo kapitolu pro přiřazení",
    tipUnmatchedCardHint:                   "přetáhněte pro přiřazení · klikněte na ▶ pro náhled",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Připraveno",
    msgStatusbarWorking:                    "Pracuji…",
    msgStatusbarNoChanges:                  "Žádné změny",
    msgStatusbarPendingDiscarded:           "Čekající změny zahozeny",
    msgStatusbarScanResult:                 "%N% souborů · %U% neshodných",
    msgStatusbarRenaming:                   "Přejmenovávám %N% souborů…",
    msgStatusbarRenamed:                    "Přejmenováno %N% souborů",
    msgStatusbarPendingRenames:             "%N% čekajících přejmenování - Potvrďte pro použití",
    msgStatusbarChapterOverflow:            "Kapitola %N% přesahuje šířku číslice (max. %M%)",
    msgStatusbarAllChaptersUsed:            "Všechny %N% sloty kapitol jsou použity - zvyšte chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Prázdná kapitola %ID% přidána - přetáhněte záběry, poté Potvrdit",
    msgStatusbarChapterLocked:              "Kapitola je uzamčena - nejprve ji odemkněte, abyste mohli přesouvat záběry.",
    msgStatusbarDropFolderFailed:           "Nepodařilo se přečíst cestu k přetažené složce",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Vybrat složku projektu",

  },

  da: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Annuller",
    btnGlobalDiscard:                       "Kassér",
    tipGlobalOpenExternal:                  "Åbn i standardapp",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ny version tilgængelig:",
    lnkUpdateWhatsNew:                      "Hvad er nyt",
    btnUpdateDownload:                      "Download",
    lnkUpdateSkip:                          "Spring denne version over",
    tipUpdateDismiss:                       "Afvis",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Åbn indstillinger",
    tipHdrHelp:                             "Hjælp",
    btnHdrRefresh:                          "Opdater",
    tipHdrRefresh:                          "Genskan mappe",
    tipHdrRefreshDisabled:                  "Bekræft eller forkast ventende ændringer først",
    btnHdrOpenFolder:                       "Åbn mappe…",
    btnHdrCommit:                           "Bekræft",
    tipHdrDigitsChapter:                    "Kapitel",
    tipHdrDigitsSlot:                       "Plads",
    tipHdrDigitsVersion:                    "Version",
    tipHdrGroup:                            "Gruppér billeder",
    tipHdrUngroup:                          "Ophæv gruppering",
    tipHdrPreserveGaps:                     "Bevar mellemrum mellem pladser",
    tipHdrCompactOnDrop:                    "Kompaktér pladser ved slip",
    tipHdrCompactAll:                       "Kompaktér mellemrum mellem pladser i alle kapitler",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Indstillinger",
    tabDlgSettingsDisplay:                  "Skærm",
    tabDlgSettingsAbout:                    "Om",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Sprog",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Mørk",
    btnDlgSettingsDisplayThemeLight:        "Lys",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sekvenser og omnummerer videoklipfiler via træk og slip.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Kapitel",
    lblChapterShots:                        "%N% optagelser",
    lblChapterGaps:                         "%N% mellemrum",
    tipChapterLock:                         "Lås kapitel",
    tipChapterUnlock:                       "Lås kapitel op",
    tipChapterCompact:                      "Kompaktér mellemrum mellem pladser i dette kapitel",
    tipChapterCollapse:                     "Skjul kapitel",
    tipChapterExpand:                       "Udvid kapitel",
    tipChapterDragHandle:                   "Træk for at omarrangere kapitel",
    empChapterEmpty:                        "Tomt kapitel - slip et klip her",
    btnChapterAdd:                          "+ Tilføj kapitel",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternativer",
    lblShotFiles:                           "%N% filer",
    tipShotThumbHint:                       "træk for at flytte/omarrangere · klik ▶ for at forhåndsvise",
    tipShotPileHint:                        "træk bunken for at flytte alt sammen",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Åbn en projektmappe",
    msgAppOpenFolderDesc1:                  "%APP% læser filer navngivet %PATTERN% (cifre, derefter valgfrit suffiks) og lader dig trække optagelser rundt for at omnummerere dem i bulk.",
    msgAppOpenFolderDesc2:                  "Bredder konfigureres pr. mappe i %INI%.",
    ttlAppNoMatch:                          "Ingen matchende filer",
    msgAppNoMatchDesc:                      "Ingen filer i denne mappe matcher mønsteret %PATTERN%",
    msgAppNoMatchHint:                      "Omdøb et par filer manuelt for at matche, og tryk derefter på Opdater.",
    cfmAppPendingFolderSwitch:              "Du har ventende omdøbninger. Vil du kassere dem og åbne en anden mappe?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Uoverensstemmende",
    empUnmatchedHint:                       "træk til et klip eller kapitel for at tildele",
    tipUnmatchedCardHint:                   "træk for at tildele · klik på ▶ for at forhåndsvise",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Klar",
    msgStatusbarWorking:                    "Arbejder…",
    msgStatusbarNoChanges:                  "Ingen ændringer",
    msgStatusbarPendingDiscarded:           "Afventende ændringer forkastet",
    msgStatusbarScanResult:                 "%N% filer · %U% uden match",
    msgStatusbarRenaming:                   "Omdøber %N% filer…",
    msgStatusbarRenamed:                    "%N% filer omdøbt",
    msgStatusbarPendingRenames:             "%N% ventende omdøbninger - Bekræft for at anvende",
    msgStatusbarChapterOverflow:            "Kapitel %N% overskrider cifferbredde (maks. %M%)",
    msgStatusbarAllChaptersUsed:            "Alle %N% kapitelpladser er brugt - øg chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Tomt kapitel %ID% tilføjet - træk optagelser ind, og bekræft derefter",
    msgStatusbarChapterLocked:              "Kapitel låst - lås det op først for at flytte klip.",
    msgStatusbarDropFolderFailed:           "Kunne ikke læse stien til den droppede mappe",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Vælg projektmappe",

  },

  fi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Peruuta",
    btnGlobalDiscard:                       "Hylkää",
    tipGlobalOpenExternal:                  "Avaa oletussovelluksessa",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Uusi versio saatavilla:",
    lnkUpdateWhatsNew:                      "Mitä uutta",
    btnUpdateDownload:                      "Lataa",
    lnkUpdateSkip:                          "Ohita tämä versio",
    tipUpdateDismiss:                       "Hylkää",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Avaa asetukset",
    tipHdrHelp:                             "Ohje",
    btnHdrRefresh:                          "Päivitä",
    tipHdrRefresh:                          "Tarkista kansio uudelleen",
    tipHdrRefreshDisabled:                  "Vahvista tai hylkää odottavat muutokset ensin",
    btnHdrOpenFolder:                       "Avaa kansio…",
    btnHdrCommit:                           "Vahvista",
    tipHdrDigitsChapter:                    "Luku",
    tipHdrDigitsSlot:                       "Paikka",
    tipHdrDigitsVersion:                    "Versio",
    tipHdrGroup:                            "Ryhmittele kuvat",
    tipHdrUngroup:                          "Pura kuvien ryhmittely",
    tipHdrPreserveGaps:                     "Säilytä paikkojen välit",
    tipHdrCompactOnDrop:                    "Tiivistä paikat pudotettaessa",
    tipHdrCompactAll:                       "Tiivistä paikkojen välit kaikissa luvuissa",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Asetukset",
    tabDlgSettingsDisplay:                  "Näyttö",
    tabDlgSettingsAbout:                    "Tietoja",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Kieli",
    lblDlgSettingsDisplayTheme:             "Teema",
    btnDlgSettingsDisplayThemeDark:         "Tumma",
    btnDlgSettingsDisplayThemeLight:        "Vaalea",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Järjestä ja numeroi videokuvatiedostot uudelleen vetämällä ja pudottamalla.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Luku",
    lblChapterShots:                        "%N% otosta",
    lblChapterGaps:                         "%N% väliä",
    tipChapterLock:                         "Lukitse luku",
    tipChapterUnlock:                       "Avaa luku",
    tipChapterCompact:                      "Tiivistä paikkojen välit tässä luvussa",
    tipChapterCollapse:                     "Kutista luku",
    tipChapterExpand:                       "Laajenna luku",
    tipChapterDragHandle:                   "Vedä järjestääksesi luvun uudelleen",
    empChapterEmpty:                        "Tyhjä luku - pudota kuva tähän",
    btnChapterAdd:                          "+ Lisää luku",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% vaihtoehtoa",
    lblShotFiles:                           "%N% tiedostoa",
    tipShotThumbHint:                       "vedä siirtääksesi/järjestelläksesi uudelleen · napsauta ▶ esikatsellaksesi",
    tipShotPileHint:                        "vedä pinoa siirtääksesi kaikki yhdessä",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Avaa projektikansio",
    msgAppOpenFolderDesc1:                  "%APP% lukee tiedostoja nimeltä %PATTERN% (numerot, sitten valinnainen pääte) ja antaa sinun vetää otoksia uudelleen numerointia varten massana.",
    msgAppOpenFolderDesc2:                  "Leveydet määritetään kansiokohtaisesti tiedostossa %INI%.",
    ttlAppNoMatch:                          "Ei vastaavia tiedostoja",
    msgAppNoMatchDesc:                      "Tässä kansiossa ei ole tiedostoja, jotka vastaavat mallia %PATTERN%",
    msgAppNoMatchHint:                      "Nimeä muutama tiedosto manuaalisesti vastaamaan, ja paina sitten Päivitä.",
    cfmAppPendingFolderSwitch:              "Sinulla on odottavia uudelleennimeämisiä. Hylätäkö ne ja avata toinen kansio?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Ei vastaavuutta",
    empUnmatchedHint:                       "vedä otoksen tai luvun päälle määrittääksesi",
    tipUnmatchedCardHint:                   "vedä määrittääksesi · napsauta ▶ esikatsellaksesi",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Valmis",
    msgStatusbarWorking:                    "Työstää…",
    msgStatusbarNoChanges:                  "Ei muutoksia",
    msgStatusbarPendingDiscarded:           "Odotetut muutokset hylätty",
    msgStatusbarScanResult:                 "%N% tiedostoa · %U% vastaamatonta",
    msgStatusbarRenaming:                   "Nimetään %N% tiedostoa uudelleen…",
    msgStatusbarRenamed:                    "%N% tiedostoa nimetty uudelleen",
    msgStatusbarPendingRenames:             "%N% odottavaa uudelleennimeämistä - Vahvista soveltaaksesi",
    msgStatusbarChapterOverflow:            "Luku %N% ylittää numeron leveyden (enintään %M%)",
    msgStatusbarAllChaptersUsed:            "Kaikki %N% luku-paikat ovat käytössä - kasvata chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Tyhjä luku %ID% lisätty - vedä otokset sisään, sitten Vahvista",
    msgStatusbarChapterLocked:              "Luku on lukittu - avaa se ensin siirtääksesi otoksia.",
    msgStatusbarDropFolderFailed:           "Pudotetun kansion polkua ei voitu lukea",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Valitse projektikansio",

  },

  ms: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Batal",
    btnGlobalDiscard:                       "Buang",
    tipGlobalOpenExternal:                  "Buka dalam aplikasi lalai",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Versi baharu tersedia:",
    lnkUpdateWhatsNew:                      "Apa yang baharu",
    btnUpdateDownload:                      "Muat turun",
    lnkUpdateSkip:                          "Langkau versi ini",
    tipUpdateDismiss:                       "Abaikan",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Buka tetapan",
    tipHdrHelp:                             "Bantuan",
    btnHdrRefresh:                          "Segarkan",
    tipHdrRefresh:                          "Imbas semula folder",
    tipHdrRefreshDisabled:                  "Sahkan atau buang perubahan yang belum selesai dahulu",
    btnHdrOpenFolder:                       "Buka folder…",
    btnHdrCommit:                           "Sahkan",
    tipHdrDigitsChapter:                    "Bab",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Versi",
    tipHdrGroup:                            "Kumpulan Foto",
    tipHdrUngroup:                          "Nyahkumpulan Foto",
    tipHdrPreserveGaps:                     "Kekalkan jurang slot",
    tipHdrCompactOnDrop:                    "Padatkan slot semasa lepas",
    tipHdrCompactAll:                       "Padatkan jurang slot dalam semua bab",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Tetapan",
    tabDlgSettingsDisplay:                  "Paparan",
    tabDlgSettingsAbout:                    "Mengenai",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Bahasa",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Gelap",
    btnDlgSettingsDisplayThemeLight:        "Cerah",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Susun dan nombor semula fail rakaman video melalui seret dan lepas.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Bab",
    lblChapterShots:                        "%N% tangkapan",
    lblChapterGaps:                         "%N% jurang",
    tipChapterLock:                         "Kunci Bab",
    tipChapterUnlock:                       "Buka Kunci Bab",
    tipChapterCompact:                      "Padatkan jurang slot dalam bab ini",
    tipChapterCollapse:                     "Runtuhkan bab",
    tipChapterExpand:                       "Kembangkan bab",
    tipChapterDragHandle:                   "Seret untuk menyusun semula bab",
    empChapterEmpty:                        "Bab kosong - lepaskan tangkapan di sini",
    btnChapterAdd:                          "+ Tambah bab",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatif",
    lblShotFiles:                           "%N% fail",
    tipShotThumbHint:                       "seret untuk mengalih/menyusun semula · klik ▶ untuk pratonton",
    tipShotPileHint:                        "seret timbunan untuk mengalih semua bersama",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Buka folder projek",
    msgAppOpenFolderDesc1:                  "%APP% membaca fail bernama %PATTERN% (digit, kemudian akhiran pilihan) dan membolehkan anda menyeret tangkapan untuk menomborkannya semula secara pukal.",
    msgAppOpenFolderDesc2:                  "Lebar dikonfigurasi setiap folder dalam %INI%.",
    ttlAppNoMatch:                          "Tiada fail yang sepadan",
    msgAppNoMatchDesc:                      "Tiada fail dalam folder ini yang sepadan dengan corak %PATTERN%",
    msgAppNoMatchHint:                      "Namakan semula beberapa fail secara manual untuk dipadankan, kemudian tekan Segar Semula.",
    cfmAppPendingFolderSwitch:              "Anda mempunyai penamaan semula yang belum selesai. Buang dan buka folder lain?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Tidak Sepadan",
    empUnmatchedHint:                       "seret ke tangkapan atau bab untuk menetapkan",
    tipUnmatchedCardHint:                   "seret untuk menetapkan · klik ▶ untuk pratonton",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Sedia",
    msgStatusbarWorking:                    "Sedang bekerja…",
    msgStatusbarNoChanges:                  "Tiada perubahan",
    msgStatusbarPendingDiscarded:           "Perubahan tertunda dibuang",
    msgStatusbarScanResult:                 "%N% fail · %U% tidak sepadan",
    msgStatusbarRenaming:                   "Menamakan semula %N% fail…",
    msgStatusbarRenamed:                    "%N% fail dinamakan semula",
    msgStatusbarPendingRenames:             "%N% penamaan semula tertunda - Komit untuk guna",
    msgStatusbarChapterOverflow:            "Bab %N% melebihi lebar digit (maks %M%)",
    msgStatusbarAllChaptersUsed:            "Semua %N% slot bab telah digunakan - tingkatkan chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Bab kosong %ID% ditambah - seret rakaman masuk, kemudian Komit",
    msgStatusbarChapterLocked:              "Bab dikunci - buka kuncinya dahulu untuk mengalihkan rakaman.",
    msgStatusbarDropFolderFailed:           "Tidak dapat membaca laluan folder yang digugurkan",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Pilih folder projek",

  },

  hy: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Չեղարկել",
    btnGlobalDiscard:                       "Մերժել",
    tipGlobalOpenExternal:                  "Բացել լռելյայն հավելվածում",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Նոր տարբերակ հասանելի է:",
    lnkUpdateWhatsNew:                      "Ինչ նորություն կա",
    btnUpdateDownload:                      "Ներբեռնել",
    lnkUpdateSkip:                          "Բաց թողնել այս տարբերակը",
    tipUpdateDismiss:                       "Մերժել",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Բացել կարգավորումները",
    tipHdrHelp:                             "Օգնություն",
    btnHdrRefresh:                          "Թարմացնել",
    tipHdrRefresh:                          "Վերստուգել թղթապանակը",
    tipHdrRefreshDisabled:                  "Նախ հաստատեք կամ չեղարկեք սպասվող փոփոխությունները",
    btnHdrOpenFolder:                       "Բացել թղթապանակը…",
    btnHdrCommit:                           "Հաստատել",
    tipHdrDigitsChapter:                    "Գլուխ",
    tipHdrDigitsSlot:                       "Սլոթ",
    tipHdrDigitsVersion:                    "Տարբերակ",
    tipHdrGroup:                            "Խմբավորել նկարները",
    tipHdrUngroup:                          "Ապախմբավորել նկարները",
    tipHdrPreserveGaps:                     "Պահպանել բնիկների բացերը",
    tipHdrCompactOnDrop:                    "Խտացնել բնիկները գցելիս",
    tipHdrCompactAll:                       "Խտացնել բնիկների բացերը բոլոր գլուխներում",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Կարգավորումներ",
    tabDlgSettingsDisplay:                  "Ցուցադրում",
    tabDlgSettingsAbout:                    "Ծրագրի մասին",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Լեզու",
    lblDlgSettingsDisplayTheme:             "Թեմա",
    btnDlgSettingsDisplayThemeDark:         "Մուգ",
    btnDlgSettingsDisplayThemeLight:        "Բաց",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Տեսանյութերի ֆայլերը հաջորդականացնել և վերահամարակալել քաշել-թողնել մեթոդով։",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Գլուխ",
    lblChapterShots:                        "%N% կադր",
    lblChapterGaps:                         "%N% բացեր",
    tipChapterLock:                         "Գլուխը կողպել",
    tipChapterUnlock:                       "Գլուխը բացել",
    tipChapterCompact:                      "Խտացնել բնիկների բացերը այս գլխում",
    tipChapterCollapse:                     "Ծալել գլուխը",
    tipChapterExpand:                       "Բացել գլուխը",
    tipChapterDragHandle:                   "Քաշեք՝ գլուխը վերադասավորելու համար",
    empChapterEmpty:                        "Դատարկ գլուխ - գցեք կադր այստեղ",
    btnChapterAdd:                          "+ Ավելացնել գլուխ",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% այլընտրանք",
    lblShotFiles:                           "%N% ֆայլ",
    tipShotThumbHint:                       "քաշեք՝ տեղափոխելու/վերադասավորելու համար · սեղմեք ▶՝ նախադիտելու համար",
    tipShotPileHint:                        "քաշեք կույտը՝ ամբողջը միասին տեղափոխելու համար",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Բացել նախագծի թղթապանակը",
    msgAppOpenFolderDesc1:                  "%APP%-ը կարդում է %PATTERN% անունով ֆայլերը (թվեր, ապա կամընտիր վերջածանց) և թույլ է տալիս քաշել կադրերը՝ դրանք զանգվածաբար վերահամարակալելու համար։",
    msgAppOpenFolderDesc2:                  "Լայնությունները կազմաձևվում են ըստ թղթապանակի՝ %INI%-ում։",
    ttlAppNoMatch:                          "Համապատասխան ֆայլեր չկան",
    msgAppNoMatchDesc:                      "Այս թղթապանակում չկան ֆայլեր, որոնք համապատասխանում են %PATTERN% ձևանմուշին։",
    msgAppNoMatchHint:                      "Մի քանի ֆայլ ձեռքով վերանվանեք համապատասխանեցնելու համար, ապա սեղմեք Թարմացնել:",
    cfmAppPendingFolderSwitch:              "Դուք ունեք սպասվող վերանվանումներ: Հրաժարվել դրանցից և բացել այլ թղթապանակ:",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Անհամապատասխան",
    empUnmatchedHint:                       "քաշեք կադրի կամ գլխի վրա՝ նշանակելու համար",
    tipUnmatchedCardHint:                   "քաշեք՝ նշանակելու համար · սեղմեք ▶՝ նախադիտելու համար",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Պատրաստ է",
    msgStatusbarWorking:                    "Աշխատում է…",
    msgStatusbarNoChanges:                  "Ոչ մի փոփոխություն",
    msgStatusbarPendingDiscarded:           "Սպասվող փոփոխությունները մերժվեցին",
    msgStatusbarScanResult:                 "%N% ֆայլ · %U% անհամապատասխան",
    msgStatusbarRenaming:                   "%N% ֆայլերի անվանափոխում…",
    msgStatusbarRenamed:                    "%N% ֆայլեր անվանափոխվեցին",
    msgStatusbarPendingRenames:             "%N% սպասվող վերանվանումներ - Հաստատել կիրառելու համար",
    msgStatusbarChapterOverflow:            "Գլուխ %N%-ը գերազանցում է թվանշանի լայնությունը (առավելագույնը %M%)",
    msgStatusbarAllChaptersUsed:            "Բոլոր %N% գլուխների բնիկները օգտագործված են - ավելացրեք chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Դատարկ գլուխ %ID% ավելացված է - քաշեք կադրերը, ապա Հաստատել",
    msgStatusbarChapterLocked:              "Գլուխը կողպված է - նախ բացեք այն՝ կադրերը տեղափոխելու համար։",
    msgStatusbarDropFolderFailed:           "Չհաջողվեց կարդալ գցված թղթապանակի ուղին",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Ընտրել նախագծի թղթապանակը",

  },

  bg: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Отказ",
    btnGlobalDiscard:                       "Отхвърли",
    tipGlobalOpenExternal:                  "Отваряне в приложение по подразбиране",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Налична е нова версия:",
    lnkUpdateWhatsNew:                      "Какво ново",
    btnUpdateDownload:                      "Изтегли",
    lnkUpdateSkip:                          "Пропусни тази версия",
    tipUpdateDismiss:                       "Отхвърли",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Отвори настройки",
    tipHdrHelp:                             "Помощ",
    btnHdrRefresh:                          "Обнови",
    tipHdrRefresh:                          "Повторно сканиране на папка",
    tipHdrRefreshDisabled:                  "Първо потвърдете или отхвърлете чакащите промени",
    btnHdrOpenFolder:                       "Отваряне на папка…",
    btnHdrCommit:                           "Потвърди",
    tipHdrDigitsChapter:                    "Глава",
    tipHdrDigitsSlot:                       "Слот",
    tipHdrDigitsVersion:                    "Версия",
    tipHdrGroup:                            "Групирай снимки",
    tipHdrUngroup:                          "Разгрупирай снимки",
    tipHdrPreserveGaps:                     "Запазване на празнините в слотовете",
    tipHdrCompactOnDrop:                    "Компресиране на слотовете при пускане",
    tipHdrCompactAll:                       "Компресиране на празнините в слотовете във всички глави",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Настройки",
    tabDlgSettingsDisplay:                  "Показване",
    tabDlgSettingsAbout:                    "Относно",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Език",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тъмен",
    btnDlgSettingsDisplayThemeLight:        "Светъл",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Подреждайте и преномерирайте видео файлове чрез влачене и пускане.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Глава",
    lblChapterShots:                        "%N% кадъра",
    lblChapterGaps:                         "%N% празнини",
    tipChapterLock:                         "Заключване на глава",
    tipChapterUnlock:                       "Отключване на глава",
    tipChapterCompact:                      "Компресиране на празнините в слотовете в тази глава",
    tipChapterCollapse:                     "Свиване на глава",
    tipChapterExpand:                       "Разширяване на глава",
    tipChapterDragHandle:                   "Плъзнете за пренареждане на глава",
    empChapterEmpty:                        "Празна глава - пуснете кадър тук",
    btnChapterAdd:                          "+ Добавяне на глава",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% алтернативи",
    lblShotFiles:                           "%N% файла",
    tipShotThumbHint:                       "плъзнете за преместване/пренареждане · щракнете ▶ за предварителен преглед",
    tipShotPileHint:                        "плъзнете купчината, за да преместите всичко заедно",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Отвори папка на проект",
    msgAppOpenFolderDesc1:                  "%APP% чете файлове, наречени %PATTERN% (цифри, след това незадължителен суфикс) и ви позволява да влачите кадри, за да ги преномерирате наведнъж.",
    msgAppOpenFolderDesc2:                  "Ширините се конфигурират за всяка папка в %INI%.",
    ttlAppNoMatch:                          "Няма съвпадащи файлове",
    msgAppNoMatchDesc:                      "Няма файлове в тази папка, които да съвпадат с шаблона %PATTERN%",
    msgAppNoMatchHint:                      "Преименувайте няколко файла ръчно, за да съвпаднат, след което натиснете Обнови.",
    cfmAppPendingFolderSwitch:              "Имате чакащи преименувания. Отхвърляте ли ги и отваряте друга папка?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Несъответстващи",
    empUnmatchedHint:                       "плъзнете върху кадър или глава, за да присвоите",
    tipUnmatchedCardHint:                   "плъзнете за присвояване · щракнете ▶ за предварителен преглед",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Готово",
    msgStatusbarWorking:                    "Работи…",
    msgStatusbarNoChanges:                  "Без промени",
    msgStatusbarPendingDiscarded:           "Отхвърлени чакащи промени",
    msgStatusbarScanResult:                 "%N% файла · %U% несъответстващи",
    msgStatusbarRenaming:                   "Преименуване на %N% файла…",
    msgStatusbarRenamed:                    "Преименувани %N% файла",
    msgStatusbarPendingRenames:             "%N% чакащи преименувания - Потвърдете за прилагане",
    msgStatusbarChapterOverflow:            "Глава %N% надвишава ширината на цифрата (макс. %M%)",
    msgStatusbarAllChaptersUsed:            "Всички %N% слота за глави са използвани - увеличете chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Добавена е празна глава %ID% - плъзнете кадри, след това Потвърди",
    msgStatusbarChapterLocked:              "Главата е заключена - първо я отключете, за да премествате кадри.",
    msgStatusbarDropFolderFailed:           "Не може да се прочете пътят на пуснатата папка",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Изберете папка на проекта",

  },

  gl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Cancelar",
    btnGlobalDiscard:                       "Descartar",
    tipGlobalOpenExternal:                  "Abrir na aplicación predeterminada",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Nova versión dispoñible:",
    lnkUpdateWhatsNew:                      "Novidades",
    btnUpdateDownload:                      "Descargar",
    lnkUpdateSkip:                          "Omitir esta versión",
    tipUpdateDismiss:                       "Descartar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Abrir configuración",
    tipHdrHelp:                             "Axuda",
    btnHdrRefresh:                          "Actualizar",
    tipHdrRefresh:                          "Volver escanear cartafol",
    tipHdrRefreshDisabled:                  "Confirma ou descarta os cambios pendentes primeiro",
    btnHdrOpenFolder:                       "Abrir cartafol…",
    btnHdrCommit:                           "Confirmar",
    tipHdrDigitsChapter:                    "Capítulo",
    tipHdrDigitsSlot:                       "Ranura",
    tipHdrDigitsVersion:                    "Versión",
    tipHdrGroup:                            "Agrupar fotos",
    tipHdrUngroup:                          "Desagrupar fotos",
    tipHdrPreserveGaps:                     "Manter ocos de espazos",
    tipHdrCompactOnDrop:                    "Compactar espazos ao soltar",
    tipHdrCompactAll:                       "Compactar ocos de espazos en todos os capítulos",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Configuración",
    tabDlgSettingsDisplay:                  "Visualización",
    tabDlgSettingsAbout:                    "Acerca de",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Idioma",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Escuro",
    btnDlgSettingsDisplayThemeLight:        "Claro",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Secuencia e renumeración de ficheiros de tomas de vídeo mediante arrastrar e soltar.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Capítulo",
    lblChapterShots:                        "%N% tomas",
    lblChapterGaps:                         "%N% ocos",
    tipChapterLock:                         "Bloquear capítulo",
    tipChapterUnlock:                       "Desbloquear capítulo",
    tipChapterCompact:                      "Compactar ocos de espazos neste capítulo",
    tipChapterCollapse:                     "Contraer capítulo",
    tipChapterExpand:                       "Expandir capítulo",
    tipChapterDragHandle:                   "Arrastrar para reordenar capítulo",
    empChapterEmpty:                        "Capítulo baleiro - solta un elemento aquí",
    btnChapterAdd:                          "+ Engadir capítulo",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternativas",
    lblShotFiles:                           "%N% ficheiros",
    tipShotThumbHint:                       "arrastra para mover/reordenar · fai clic en ▶ para previsualizar",
    tipShotPileHint:                        "arrastra a pila para mover todo xunto",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Abrir un cartafol de proxecto",
    msgAppOpenFolderDesc1:                  "%APP% le ficheiros chamados %PATTERN% (díxitos, despois sufixo opcional) e permítelle arrastrar tomas para renumeralas en masa.",
    msgAppOpenFolderDesc2:                  "As anchuras configúranse por cartafol en %INI%.",
    ttlAppNoMatch:                          "Non hai ficheiros coincidentes",
    msgAppNoMatchDesc:                      "Non hai ficheiros neste cartafol que coincidan co patrón %PATTERN%",
    msgAppNoMatchHint:                      "Renomea algúns ficheiros manualmente para que coincidan e despois preme Actualizar.",
    cfmAppPendingFolderSwitch:              "Tes cambios de nome pendentes. Descartalos e abrir un cartafol diferente?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Sen coincidencia",
    empUnmatchedHint:                       "arrastra a unha toma ou capítulo para asignar",
    tipUnmatchedCardHint:                   "arrastra para asignar · fai clic en ▶ para previsualizar",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Listo",
    msgStatusbarWorking:                    "Traballando…",
    msgStatusbarNoChanges:                  "Sen cambios",
    msgStatusbarPendingDiscarded:           "Cambios pendentes descartados",
    msgStatusbarScanResult:                 "%N% ficheiros · %U% sen coincidencia",
    msgStatusbarRenaming:                   "Renomeando %N% ficheiros…",
    msgStatusbarRenamed:                    "%N% ficheiros renomeados",
    msgStatusbarPendingRenames:             "%N% renomeacións pendentes - Confirmar para aplicar",
    msgStatusbarChapterOverflow:            "O capítulo %N% excede o ancho de díxito (máx. %M%)",
    msgStatusbarAllChaptersUsed:            "Todos os %N% espazos de capítulo están usados - aumente chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Capítulo baleiro %ID% engadido - arrastre tomas, logo Confirmar",
    msgStatusbarChapterLocked:              "Capítulo bloqueado - desbloquéao primeiro para mover tomas.",
    msgStatusbarDropFolderFailed:           "Non se puido ler a ruta do cartafol soltado",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Seleccionar cartafol do proxecto",

  },

  hu: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Mégse",
    btnGlobalDiscard:                       "Elvetés",
    tipGlobalOpenExternal:                  "Megnyitás alapértelmezett alkalmazásban",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Új verzió elérhető:",
    lnkUpdateWhatsNew:                      "Újdonságok",
    btnUpdateDownload:                      "Letöltés",
    lnkUpdateSkip:                          "Verzió kihagyása",
    tipUpdateDismiss:                       "Elvetés",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Beállítások megnyitása",
    tipHdrHelp:                             "Súgó",
    btnHdrRefresh:                          "Frissítés",
    tipHdrRefresh:                          "Mappa újbóli vizsgálata",
    tipHdrRefreshDisabled:                  "Először véglegesítse vagy vetesse el a függőben lévő módosításokat",
    btnHdrOpenFolder:                       "Mappa megnyitása…",
    btnHdrCommit:                           "Véglegesít",
    tipHdrDigitsChapter:                    "Fejezet",
    tipHdrDigitsSlot:                       "Foglalat",
    tipHdrDigitsVersion:                    "Verzió",
    tipHdrGroup:                            "Képek csoportosítása",
    tipHdrUngroup:                          "Képek csoportosításának feloldása",
    tipHdrPreserveGaps:                     "Slot-rések megőrzése",
    tipHdrCompactOnDrop:                    "Slotok tömörítése eldobáskor",
    tipHdrCompactAll:                       "Slot-rések tömörítése az összes fejezetben",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Beállítások",
    tabDlgSettingsDisplay:                  "Megjelenítés",
    tabDlgSettingsAbout:                    "Névjegy",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Nyelv",
    lblDlgSettingsDisplayTheme:             "Téma",
    btnDlgSettingsDisplayThemeDark:         "Sötét",
    btnDlgSettingsDisplayThemeLight:        "Világos",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Videofájlok sorrendjének és számozásának módosítása húzással.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Fejezet",
    lblChapterShots:                        "%N% felvétel",
    lblChapterGaps:                         "%N% rés",
    tipChapterLock:                         "Fejezet zárolása",
    tipChapterUnlock:                       "Fejezet feloldása",
    tipChapterCompact:                      "Slot-rések tömörítése ebben a fejezetben",
    tipChapterCollapse:                     "Fejezet összecsukása",
    tipChapterExpand:                       "Fejezet kibontása",
    tipChapterDragHandle:                   "Húzza a fejezet átrendezéséhez",
    empChapterEmpty:                        "Üres fejezet - dobjon ide egy felvételt",
    btnChapterAdd:                          "+ Fejezet hozzáadása",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatíva",
    lblShotFiles:                           "%N% fájl",
    tipShotThumbHint:                       "húzza az áthelyezéshez/átrendezéshez · kattintson a ▶ ikonra az előnézethez",
    tipShotPileHint:                        "húzza a halmot az összes együtt mozgatásához",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Projektmappa megnyitása",
    msgAppOpenFolderDesc1:                  "Az %APP% beolvassa a %PATTERN% nevű fájlokat (számjegyek, majd opcionális utótag), és lehetővé teszi a felvételek húzogatását a tömeges átszámozáshoz.",
    msgAppOpenFolderDesc2:                  "A szélességek mappánként vannak konfigurálva a %INI%-ben.",
    ttlAppNoMatch:                          "Nincsenek egyező fájlok",
    msgAppNoMatchDesc:                      "Ebben a mappában nincsenek fájlok, amelyek illeszkednének a %PATTERN% mintához.",
    msgAppNoMatchHint:                      "Nevezzen át néhány fájlt manuálisan, hogy egyezzenek, majd kattintson a Frissítés gombra.",
    cfmAppPendingFolderSwitch:              "Függőben lévő átnevezései vannak. Elveti őket és megnyit egy másik mappát?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Nem egyező",
    empUnmatchedHint:                       "húzza egy felvételre vagy fejezetre a hozzárendeléshez",
    tipUnmatchedCardHint:                   "húzza a hozzárendeléshez · kattintson a ▶ gombra az előnézethez",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Kész",
    msgStatusbarWorking:                    "Feldolgozás…",
    msgStatusbarNoChanges:                  "Nincs változás",
    msgStatusbarPendingDiscarded:           "Függőben lévő változások elvetve",
    msgStatusbarScanResult:                 "%N% fájl · %U% nem egyező",
    msgStatusbarRenaming:                   "%N% fájl átnevezése…",
    msgStatusbarRenamed:                    "%N% fájl átnevezve",
    msgStatusbarPendingRenames:             "%N% függőben lévő átnevezés - Véglegesítés az alkalmazáshoz",
    msgStatusbarChapterOverflow:            "A %N% fejezet túllépi a számjegy szélességét (max. %M%)",
    msgStatusbarAllChaptersUsed:            "Az összes %N% fejezethely foglalt - növelje a chapterDigits értékét",
    msgStatusbarEmptyChapterAdded:          "Üres fejezet %ID% hozzáadva - húzzon be felvételeket, majd Véglegesít",
    msgStatusbarChapterLocked:              "Fejezet zárolva - előbb oldja fel a zárolást a felvételek mozgatásához.",
    msgStatusbarDropFolderFailed:           "Nem sikerült beolvasni az eldobott mappa elérési útját",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Projektmappa kiválasztása",

  },

  lt: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Atšaukti",
    btnGlobalDiscard:                       "Atmesti",
    tipGlobalOpenExternal:                  "Atidaryti numatytojoje programoje",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Yra nauja versija:",
    lnkUpdateWhatsNew:                      "Kas naujo",
    btnUpdateDownload:                      "Atsisiųsti",
    lnkUpdateSkip:                          "Praleisti šią versiją",
    tipUpdateDismiss:                       "Atmesti",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Atidaryti nustatymus",
    tipHdrHelp:                             "Pagalba",
    btnHdrRefresh:                          "Atnaujinti",
    tipHdrRefresh:                          "Iš naujo nuskaityti aplanką",
    tipHdrRefreshDisabled:                  "Pirmiausia patvirtinkite arba atmeskite laukiančius pakeitimus",
    btnHdrOpenFolder:                       "Atidaryti aplanką…",
    btnHdrCommit:                           "Patvirtinti",
    tipHdrDigitsChapter:                    "Skyrius",
    tipHdrDigitsSlot:                       "Lizdas",
    tipHdrDigitsVersion:                    "Versija",
    tipHdrGroup:                            "Grupuoti nuotraukas",
    tipHdrUngroup:                          "Išgrupuoti nuotraukas",
    tipHdrPreserveGaps:                     "Išlaikyti lizdų tarpus",
    tipHdrCompactOnDrop:                    "Sutraukti lizdus numetus",
    tipHdrCompactAll:                       "Sutraukti lizdų tarpus visuose skyriuose",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nustatymai",
    tabDlgSettingsDisplay:                  "Rodymas",
    tabDlgSettingsAbout:                    "Apie",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Kalba",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Tamsus",
    btnDlgSettingsDisplayThemeLight:        "Šviesus",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Išdėstykite ir pernumeruokite vaizdo įrašų failus vilkdami ir numesdami.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Skyrius",
    lblChapterShots:                        "%N% kadrų",
    lblChapterGaps:                         "%N% tarpų",
    tipChapterLock:                         "Užrakinti skyrių",
    tipChapterUnlock:                       "Atrakinti skyrių",
    tipChapterCompact:                      "Sutraukti lizdų tarpus šiame skyriuje",
    tipChapterCollapse:                     "Sutraukti skyrių",
    tipChapterExpand:                       "Išskleisti skyrių",
    tipChapterDragHandle:                   "Vilkite, kad pertvarkytumėte skyrių",
    empChapterEmpty:                        "Tuščias skyrius - numeskite kadrą čia",
    btnChapterAdd:                          "+ Pridėti skyrių",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatyvų",
    lblShotFiles:                           "%N% failų",
    tipShotThumbHint:                       "vilkite, kad perkeltumėte/pertvarkytumėte · spustelėkite ▶, kad peržiūrėtumėte",
    tipShotPileHint:                        "vilkite krūvą, kad perkeltumėte viską kartu",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Atidaryti projekto aplanką",
    msgAppOpenFolderDesc1:                  "%APP% skaito failus, pavadintus %PATTERN% (skaitmenys, tada pasirenkamas priesaga) ir leidžia vilkti kadrus, kad juos masiškai pernumeruotumėte.",
    msgAppOpenFolderDesc2:                  "Pločiai konfigūruojami kiekvienam aplankui %INI%.",
    ttlAppNoMatch:                          "Nėra atitinkančių failų",
    msgAppNoMatchDesc:                      "Šiame aplanke nėra failų, atitinkančių šabloną %PATTERN%.",
    msgAppNoMatchHint:                      "Rankiniu būdu pervardykite kelis failus, kad jie atitiktų, tada spustelėkite Atnaujinti.",
    cfmAppPendingFolderSwitch:              "Turite laukiančių pervadinimų. Atmesti juos ir atidaryti kitą aplanką?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Nesuderinta",
    empUnmatchedHint:                       "vilkite ant kadro ar skyriaus, kad priskirtumėte",
    tipUnmatchedCardHint:                   "vilkite, kad priskirtumėte · spustelėkite ▶, kad peržiūrėtumėte",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Paruošta",
    msgStatusbarWorking:                    "Vykdoma…",
    msgStatusbarNoChanges:                  "Jokių pakeitimų",
    msgStatusbarPendingDiscarded:           "Laukiantys pakeitimai atmesti",
    msgStatusbarScanResult:                 "%N% failų · %U% neatitikimų",
    msgStatusbarRenaming:                   "Pervardijama %N% failų…",
    msgStatusbarRenamed:                    "Pervardinta %N% failų",
    msgStatusbarPendingRenames:             "%N% laukiančių pervardijimų - Patvirtinkite, kad pritaikytumėte",
    msgStatusbarChapterOverflow:            "Skyrius %N% viršija skaitmens plotį (maks. %M%)",
    msgStatusbarAllChaptersUsed:            "Visi %N% skyrių lizdai yra naudojami - padidinkite chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Tuščias skyrius %ID% pridėtas - vilkite kadrus, tada Patvirtinti",
    msgStatusbarChapterLocked:              "Skyrius užrakintas - pirmiausia atrakinkite jį, kad perkeltumėte kadrus.",
    msgStatusbarDropFolderFailed:           "Nepavyko perskaityti numesto aplanko kelio",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Pasirinkti projekto aplanką",

  },

  mk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Откажи",
    btnGlobalDiscard:                       "Отфрли",
    tipGlobalOpenExternal:                  "Отвори во стандардна апликација",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Достапна е нова верзија:",
    lnkUpdateWhatsNew:                      "Што е ново",
    btnUpdateDownload:                      "Преземи",
    lnkUpdateSkip:                          "Прескокни ја оваа верзија",
    tipUpdateDismiss:                       "Отфрли",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Отвори поставки",
    tipHdrHelp:                             "Помош",
    btnHdrRefresh:                          "Освежи",
    tipHdrRefresh:                          "Повторно скенирај папка",
    tipHdrRefreshDisabled:                  "Прво потврдете ги или отфрлете ги промените во тек",
    btnHdrOpenFolder:                       "Отвори папка…",
    btnHdrCommit:                           "Потврди",
    tipHdrDigitsChapter:                    "Поглавје",
    tipHdrDigitsSlot:                       "Слот",
    tipHdrDigitsVersion:                    "Верзија",
    tipHdrGroup:                            "Групирај снимки",
    tipHdrUngroup:                          "Разгрупирај снимки",
    tipHdrPreserveGaps:                     "Зачувај ги празнините на слотовите",
    tipHdrCompactOnDrop:                    "Компактирај ги слотовите при пуштање",
    tipHdrCompactAll:                       "Компактирај ги празнините на слотовите во сите поглавја",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Поставки",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsAbout:                    "За програмата",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Јазик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Темно",
    btnDlgSettingsDisplayThemeLight:        "Светло",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Подредувајте и пренумерирајте видео датотеки со влечење и пуштање.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Поглавје",
    lblChapterShots:                        "%N% снимки",
    lblChapterGaps:                         "%N% празнини",
    tipChapterLock:                         "Заклучи поглавје",
    tipChapterUnlock:                       "Отклучи поглавје",
    tipChapterCompact:                      "Компактирај ги празнините на слотовите во ова поглавје",
    tipChapterCollapse:                     "Собери поглавје",
    tipChapterExpand:                       "Прошири поглавје",
    tipChapterDragHandle:                   "Повлечете за преуредување на поглавјето",
    empChapterEmpty:                        "Празно поглавје - испуштете снимка тука",
    btnChapterAdd:                          "+ Додај поглавје",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% алтернативи",
    lblShotFiles:                           "%N% датотеки",
    tipShotThumbHint:                       "влечете за преместување/преуредување · кликнете ▶ за преглед",
    tipShotPileHint:                        "влечете ја купката за да ги преместите сите заедно",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Отвори папка на проект",
    msgAppOpenFolderDesc1:                  "%APP% чита датотеки именувани %PATTERN% (цифри, потоа опционален суфикс) и ви овозможува да влечете снимки за да ги пренумерирате на големо.",
    msgAppOpenFolderDesc2:                  "Ширините се конфигурираат по папка во %INI%.",
    ttlAppNoMatch:                          "Нема совпаѓачки датотеки",
    msgAppNoMatchDesc:                      "Нема датотеки во оваа папка што одговараат на шаблонот %PATTERN%.",
    msgAppNoMatchHint:                      "Рачно преименувајте неколку датотеки за да се совпаднат, потоа притиснете Освежи.",
    cfmAppPendingFolderSwitch:              "Имате преименувања во тек. Да ги отфрлите и да отворите друга папка?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Несовпаѓачки",
    empUnmatchedHint:                       "влечете на снимка или поглавје за да доделите",
    tipUnmatchedCardHint:                   "влечете за да доделите · кликнете ▶ за преглед",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Подготвено",
    msgStatusbarWorking:                    "Работи…",
    msgStatusbarNoChanges:                  "Без промени",
    msgStatusbarPendingDiscarded:           "Отфрлени промени во тек",
    msgStatusbarScanResult:                 "%N% датотеки · %U% несоодветни",
    msgStatusbarRenaming:                   "Преименување %N% датотеки…",
    msgStatusbarRenamed:                    "Преименувани %N% датотеки",
    msgStatusbarPendingRenames:             "%N% преименувања во тек - Потврди за примена",
    msgStatusbarChapterOverflow:            "Поглавје %N% ја надминува ширината на цифрата (макс. %M%)",
    msgStatusbarAllChaptersUsed:            "Сите %N% слотови за поглавја се искористени - зголемете chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Додадено празно поглавје %ID% - повлечете снимки, потоа Потврди",
    msgStatusbarChapterLocked:              "Поглавјето е заклучено - прво отклучете го за да преместувате снимки.",
    msgStatusbarDropFolderFailed:           "Не можеше да се прочита патеката на испуштената папка",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Изберете папка на проектот",

  },

  sr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Откажи",
    btnGlobalDiscard:                       "Одбаци",
    tipGlobalOpenExternal:                  "Отвори у подразумеваној апликацији",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Доступна је нова верзија:",
    lnkUpdateWhatsNew:                      "Шта је ново",
    btnUpdateDownload:                      "Преузми",
    lnkUpdateSkip:                          "Прескочи ову верзију",
    tipUpdateDismiss:                       "Одбаци",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Отвори подешавања",
    tipHdrHelp:                             "Помоћ",
    btnHdrRefresh:                          "Освежи",
    tipHdrRefresh:                          "Поново скенирај фасциклу",
    tipHdrRefreshDisabled:                  "Прво потврдите или одбаците промене на чекању",
    btnHdrOpenFolder:                       "Отвори фасциклу…",
    btnHdrCommit:                           "Потврди",
    tipHdrDigitsChapter:                    "Поглавље",
    tipHdrDigitsSlot:                       "Слот",
    tipHdrDigitsVersion:                    "Верзија",
    tipHdrGroup:                            "Групиши снимке",
    tipHdrUngroup:                          "Разгрупиши снимке",
    tipHdrPreserveGaps:                     "Сачувај размаке слотова",
    tipHdrCompactOnDrop:                    "Компресуј слотове при испуштању",
    tipHdrCompactAll:                       "Компресуј размаке слотова у свим поглављима",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Подешавања",
    tabDlgSettingsDisplay:                  "Приказ",
    tabDlgSettingsAbout:                    "О програму",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Језик",
    lblDlgSettingsDisplayTheme:             "Тема",
    btnDlgSettingsDisplayThemeDark:         "Тамно",
    btnDlgSettingsDisplayThemeLight:        "Светло",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Редослед и пренумерација видео фајлова превлачењем и отпуштањем.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Поглавље",
    lblChapterShots:                        "%N% снимака",
    lblChapterGaps:                         "%N% размака",
    tipChapterLock:                         "Закључај поглавље",
    tipChapterUnlock:                       "Откључај поглавље",
    tipChapterCompact:                      "Компресуј размаке слотова у овом поглављу",
    tipChapterCollapse:                     "Скупи поглавље",
    tipChapterExpand:                       "Прошири поглавље",
    tipChapterDragHandle:                   "Превуците за преуређивање поглавља",
    empChapterEmpty:                        "Празна глава - испустите снимак овде",
    btnChapterAdd:                          "+ Додај поглавље",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% алтернатива",
    lblShotFiles:                           "%N% датотека",
    tipShotThumbHint:                       "превуците за померање/преуређивање · кликните ▶ за преглед",
    tipShotPileHint:                        "превуците го сноп да бисте све померили заједно",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Отвори фасциклу пројекта",
    msgAppOpenFolderDesc1:                  "%APP% чита датотеке назване %PATTERN% (цифре, затим опционални суфикс) и омогућава вам да превлачите снимке ради масовног пренумерисања.",
    msgAppOpenFolderDesc2:                  "Ширине се конфигуришу по фасцикли у %INI%.",
    ttlAppNoMatch:                          "Нема подударних датотека",
    msgAppNoMatchDesc:                      "Нема датотека у овој фасцикли које одговарају обрасцу %PATTERN%.",
    msgAppNoMatchHint:                      "Ручно преименујте неколико датотека да се подударају, а затим кликните на Освежи.",
    cfmAppPendingFolderSwitch:              "Имате преименовања на чекању. Одбацити их и отворити другу фасциклу?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Неупарено",
    empUnmatchedHint:                       "превуците на снимак или поглавље да бисте доделили",
    tipUnmatchedCardHint:                   "превуците за доделу · кликните ▶ за преглед",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Spreman",
    msgStatusbarWorking:                    "Radi…",
    msgStatusbarNoChanges:                  "Nema izmena",
    msgStatusbarPendingDiscarded:           "Odbacite promene na čekanju",
    msgStatusbarScanResult:                 "%N% datoteka · %U% nepodudarnih",
    msgStatusbarRenaming:                   "Преименовање %N% датотека…",
    msgStatusbarRenamed:                    "Преименовано %N% датотека",
    msgStatusbarPendingRenames:             "%N% преименовања на чекању - Потврди за примену",
    msgStatusbarChapterOverflow:            "Поглавље %N% премашује ширину цифре (макс. %M%)",
    msgStatusbarAllChaptersUsed:            "Сви %N% слотови за поглавља су искоришћени - повећајте chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Додато празно поглавље %ID% - превуците снимке, затим Потврди",
    msgStatusbarChapterLocked:              "Поглавље је закључано - прво га откључајте да бисте премештали снимке.",
    msgStatusbarDropFolderFailed:           "Није могуће прочитати путању испуштене фасцикле",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Изаберите фасциклу пројекта",

  },

  sk: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Zrušiť",
    btnGlobalDiscard:                       "Zahodiť",
    tipGlobalOpenExternal:                  "Otvoriť v predvolenej aplikácii",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "K dispozícii je nová verzia:",
    lnkUpdateWhatsNew:                      "Čo je nové",
    btnUpdateDownload:                      "Stiahnuť",
    lnkUpdateSkip:                          "Preskočiť túto verziu",
    tipUpdateDismiss:                       "Zavrieť",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Otvoriť nastavenia",
    tipHdrHelp:                             "Pomoc",
    btnHdrRefresh:                          "Obnoviť",
    tipHdrRefresh:                          "Znova skenovať priečinok",
    tipHdrRefreshDisabled:                  "Najprv potvrďte alebo zrušte čakajúce zmeny",
    btnHdrOpenFolder:                       "Otvoriť priečinok…",
    btnHdrCommit:                           "Potvrdiť",
    tipHdrDigitsChapter:                    "Kapitola",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Verzia",
    tipHdrGroup:                            "Zoskupiť snímky",
    tipHdrUngroup:                          "Zrušiť zoskupenie snímok",
    tipHdrPreserveGaps:                     "Zachovať medzery slotov",
    tipHdrCompactOnDrop:                    "Komprimovať sloty pri pustení",
    tipHdrCompactAll:                       "Komprimovať medzery slotov vo všetkých kapitolách",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavenia",
    tabDlgSettingsDisplay:                  "Zobrazenie",
    tabDlgSettingsAbout:                    "O programe",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jazyk",
    lblDlgSettingsDisplayTheme:             "Téma",
    btnDlgSettingsDisplayThemeDark:         "Tmavý",
    btnDlgSettingsDisplayThemeLight:        "Svetlý",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Sekvenujte a prečíslujte súbory videozáznamov potiahnutím a pustením.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Kapitola",
    lblChapterShots:                        "%N% záberov",
    lblChapterGaps:                         "%N% medzier",
    tipChapterLock:                         "Zamknúť kapitolu",
    tipChapterUnlock:                       "Odomknúť kapitolu",
    tipChapterCompact:                      "Komprimovať medzery slotov v tejto kapitole",
    tipChapterCollapse:                     "Zbaliť kapitolu",
    tipChapterExpand:                       "Rozbaliť kapitolu",
    tipChapterDragHandle:                   "Potiahnite pre zmenu poradia kapitoly",
    empChapterEmpty:                        "Prázdna kapitola - presuňte sem záber",
    btnChapterAdd:                          "+ Pridať kapitolu",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatív",
    lblShotFiles:                           "%N% súborov",
    tipShotThumbHint:                       "potiahnite pre presun/zmenu poradia · kliknite na ▶ pre náhľad",
    tipShotPileHint:                        "potiahnite hromadu pre presun všetkého dohromady",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Otvoriť priečinok projektu",
    msgAppOpenFolderDesc1:                  "%APP% číta súbory s názvom %PATTERN% (číslice, potom voliteľná prípona) a umožňuje presúvať zábery na hromadné prečíslovanie.",
    msgAppOpenFolderDesc2:                  "Šírky sú konfigurované pre každý priečinok v %INI%.",
    ttlAppNoMatch:                          "Žiadne zodpovedajúce súbory",
    msgAppNoMatchDesc:                      "V tomto priečinku nie sú žiadne súbory, ktoré by zodpovedali vzoru %PATTERN%.",
    msgAppNoMatchHint:                      "Niekoľko súborov premenujte ručne, aby sa zhodovali, a potom kliknite na Obnoviť.",
    cfmAppPendingFolderSwitch:              "Máte čakajúce premenovania. Zahodiť ich a otvoriť iný priečinok?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Nezhodné",
    empUnmatchedHint:                       "potiahnite na záber alebo kapitolu pre priradenie",
    tipUnmatchedCardHint:                   "potiahnite pre priradenie · kliknite na ▶ pre náhľad",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Pripravené",
    msgStatusbarWorking:                    "Pracujem…",
    msgStatusbarNoChanges:                  "Žiadne zmeny",
    msgStatusbarPendingDiscarded:           "Čakajúce zmeny zahodené",
    msgStatusbarScanResult:                 "%N% súborov · %U% nezhodných",
    msgStatusbarRenaming:                   "Premenúvam %N% súborov…",
    msgStatusbarRenamed:                    "Premenovaných %N% súborov",
    msgStatusbarPendingRenames:             "%N% čakajúcich premenovaní - Potvrďte pre použitie",
    msgStatusbarChapterOverflow:            "Kapitola %N% presahuje šírku číslice (max. %M%)",
    msgStatusbarAllChaptersUsed:            "Všetky %N% sloty kapitol sú použité - zvýšte chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Prázdna kapitola %ID% pridaná - pretiahnite zábery, potom Potvrdiť",
    msgStatusbarChapterLocked:              "Kapitola je uzamknutá - najprv ju odomknite, aby ste mohli presúvať zábery.",
    msgStatusbarDropFolderFailed:           "Nepodarilo sa prečítať cestu k pretiahnutej zložke",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Vybrať priečinok projektu",

  },

  sl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Prekliči",
    btnGlobalDiscard:                       "Zavrzi",
    tipGlobalOpenExternal:                  "Odpri v privzeti aplikaciji",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Na voljo je nova različica:",
    lnkUpdateWhatsNew:                      "Kaj je novega",
    btnUpdateDownload:                      "Prenesi",
    lnkUpdateSkip:                          "Preskoči to različico",
    tipUpdateDismiss:                       "Zavrni",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Odpri nastavitve",
    tipHdrHelp:                             "Pomoč",
    btnHdrRefresh:                          "Osveži",
    tipHdrRefresh:                          "Ponovno skeniraj mapo",
    tipHdrRefreshDisabled:                  "Najprej potrdite ali zavrzite čakajoče spremembe",
    btnHdrOpenFolder:                       "Odpri mapo…",
    btnHdrCommit:                           "Potrdi",
    tipHdrDigitsChapter:                    "Poglavje",
    tipHdrDigitsSlot:                       "Reža",
    tipHdrDigitsVersion:                    "Različica",
    tipHdrGroup:                            "Združi posnetke",
    tipHdrUngroup:                          "Razdruži posnetke",
    tipHdrPreserveGaps:                     "Ohrani vrzeli med režami",
    tipHdrCompactOnDrop:                    "Strni reže ob spustu",
    tipHdrCompactAll:                       "Strni vrzeli med režami v vseh poglavjih",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Nastavitve",
    tabDlgSettingsDisplay:                  "Prikaz",
    tabDlgSettingsAbout:                    "O programu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Jezik",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Temno",
    btnDlgSettingsDisplayThemeLight:        "Svetlo",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Zaporedno uredite in preštevilčite datoteke video posnetkov z vlečenjem in spuščanjem.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Poglavje",
    lblChapterShots:                        "%N% posnetkov",
    lblChapterGaps:                         "%N% vrzeli",
    tipChapterLock:                         "Zakleni poglavje",
    tipChapterUnlock:                       "Odkleni poglavje",
    tipChapterCompact:                      "Strni vrzeli med režami v tem poglavju",
    tipChapterCollapse:                     "Strni poglavje",
    tipChapterExpand:                       "Razširi poglavje",
    tipChapterDragHandle:                   "Povlecite za prerazporeditev poglavja",
    empChapterEmpty:                        "Prazno poglavje - spustite posnetek tukaj",
    btnChapterAdd:                          "+ Dodaj poglavje",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternativ",
    lblShotFiles:                           "%N% datotek",
    tipShotThumbHint:                       "povlecite za premikanje/preurejanje · kliknite ▶ za predogled",
    tipShotPileHint:                        "povlecite kup za premikanje vsega skupaj",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Odpri mapo projekta",
    msgAppOpenFolderDesc1:                  "%APP% bere datoteke z imenom %PATTERN% (številke, nato neobvezen pripona) in vam omogoča vlečenje posnetkov za množično preštevilčenje.",
    msgAppOpenFolderDesc2:                  "Širine so konfigurirane po mapi v %INI%.",
    ttlAppNoMatch:                          "Ni ujemajočih datotek",
    msgAppNoMatchDesc:                      "V tej mapi ni datotek, ki bi se ujemale z vzorcem %PATTERN%.",
    msgAppNoMatchHint:                      "Ročno preimenujte nekaj datotek, da se ujemajo, nato kliknite Osveži.",
    cfmAppPendingFolderSwitch:              "Imate čakajoča preimenovanja. Jih zavržete in odprete drugo mapo?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Neujeto",
    empUnmatchedHint:                       "povlecite na posnetek ali poglavje za dodelitev",
    tipUnmatchedCardHint:                   "povlecite za dodelitev · kliknite ▶ za predogled",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Pripravljeno",
    msgStatusbarWorking:                    "Delam…",
    msgStatusbarNoChanges:                  "Brez sprememb",
    msgStatusbarPendingDiscarded:           "Čakajoče spremembe zavržene",
    msgStatusbarScanResult:                 "%N% datotek · %U% neujemajočih",
    msgStatusbarRenaming:                   "Preimenovanje %N% datotek…",
    msgStatusbarRenamed:                    "Preimenovanih %N% datotek",
    msgStatusbarPendingRenames:             "%N% čakajočih preimenovanj - Potrdi za uporabo",
    msgStatusbarChapterOverflow:            "Poglavje %N% presega širino števke (največ %M%)",
    msgStatusbarAllChaptersUsed:            "Vse %N% reže za poglavja so zasedene - povečajte chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Prazno poglavje %ID% dodano - povlecite posnetke, nato Potrdi",
    msgStatusbarChapterLocked:              "Poglavje je zaklenjeno - najprej ga odklenite za premikanje posnetkov.",
    msgStatusbarDropFolderFailed:           "Ni bilo mogoče prebrati poti spuščene mape",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Izberite mapo projekta",

  },

  ta: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ரத்துசெய்",
    btnGlobalDiscard:                       "நிராகரி",
    tipGlobalOpenExternal:                  "இயல்புநிலை பயன்பாட்டில் திற",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "புதிய பதிப்பு உள்ளது:",
    lnkUpdateWhatsNew:                      "புதியது என்ன",
    btnUpdateDownload:                      "பதிவிறக்கு",
    lnkUpdateSkip:                          "இந்த பதிப்பைத் தவிர்க்கவும்",
    tipUpdateDismiss:                       "நிராகரி",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "அமைப்புகளைத் திற",
    tipHdrHelp:                             "உதவி",
    btnHdrRefresh:                          "புதுப்பி",
    tipHdrRefresh:                          "கோப்புறையை மீண்டும் ஸ்கேன் செய்",
    tipHdrRefreshDisabled:                  "முதலில் நிலுவையிலுள்ள மாற்றங்களை உறுதிப்படுத்தவும் அல்லது நிராகரிக்கவும்",
    btnHdrOpenFolder:                       "கோப்புறையைத் திற…",
    btnHdrCommit:                           "உறுதிப்படுத்து",
    tipHdrDigitsChapter:                    "அத்தியாயம்",
    tipHdrDigitsSlot:                       "ஸ்லாட்",
    tipHdrDigitsVersion:                    "பதிப்பு",
    tipHdrGroup:                            "படங்களை குழுவாக்கு",
    tipHdrUngroup:                          "படங்களை குழுவிலிருந்து நீக்கு",
    tipHdrPreserveGaps:                     "ஸ்லாட் இடைவெளிகளைப் பாதுகாக்கவும்",
    tipHdrCompactOnDrop:                    "கைவிடும்போது ஸ்லாட்டுகளைச் சுருக்கவும்",
    tipHdrCompactAll:                       "அனைத்து அத்தியாயங்களிலும் ஸ்லாட் இடைவெளிகளைச் சுருக்கவும்",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "அமைப்புகள்",
    tabDlgSettingsDisplay:                  "காட்சி",
    tabDlgSettingsAbout:                    "பற்றி",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "மொழி",
    lblDlgSettingsDisplayTheme:             "தீம்",
    btnDlgSettingsDisplayThemeDark:         "இருண்ட",
    btnDlgSettingsDisplayThemeLight:        "வெளிச்சம்",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "இழுத்து விடுவதன் மூலம் வீடியோ ஷாட் கோப்புகளை வரிசைப்படுத்தி மறுபெயரிடவும்.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "அத்தியாயம்",
    lblChapterShots:                        "%N% காட்சிகள்",
    lblChapterGaps:                         "%N% இடைவெளிகள்",
    tipChapterLock:                         "அத்தியாயத்தைப் பூட்டு",
    tipChapterUnlock:                       "அத்தியாயத்தைத் திற",
    tipChapterCompact:                      "இந்த அத்தியாயத்தில் ஸ்லாட் இடைவெளிகளைச் சுருக்கவும்",
    tipChapterCollapse:                     "அத்தியாயத்தை சுருக்கு",
    tipChapterExpand:                       "அத்தியாயத்தை விரிவுபடுத்து",
    tipChapterDragHandle:                   "அத்தியாயத்தை மறுவரிசைப்படுத்த இழுக்கவும்",
    empChapterEmpty:                        "வெற்று அத்தியாயம் - ஒரு ஷாட்டை இங்கே விடுங்கள்",
    btnChapterAdd:                          "+ அத்தியாயத்தைச் சேர்",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% மாற்றுகள்",
    lblShotFiles:                           "%N% கோப்புகள்",
    tipShotThumbHint:                       "நகர்த்த/மறுவரிசைப்படுத்த இழுக்கவும் · முன்னோட்டமிட ▶ ஐக் கிளிக் செய்யவும்",
    tipShotPileHint:                        "அனைத்தையும் ஒன்றாக நகர்த்த குவியலை இழுக்கவும்",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "ஒரு திட்ட கோப்புறையை திறக்கவும்",
    msgAppOpenFolderDesc1:                  "%APP% ஆனது %PATTERN% (எண்கள், பின்னர் விருப்பமான பின்னொட்டு) எனப் பெயரிடப்பட்ட கோப்புகளைப் படிக்கிறது மற்றும் காட்சிகளை மொத்தமாக மறுபெயரிட இழுக்க உங்களை அனுமதிக்கிறது.",
    msgAppOpenFolderDesc2:                  "அகலங்கள் %INI% இல் கோப்புறைக்கு ஏற்ப கட்டமைக்கப்படுகின்றன.",
    ttlAppNoMatch:                          "பொருந்தும் கோப்புகள் இல்லை",
    msgAppNoMatchDesc:                      "இந்த கோப்புறையில் %PATTERN% வடிவத்துடன் பொருந்தும் கோப்புகள் இல்லை",
    msgAppNoMatchHint:                      "சில கோப்புகளை கைமுறையாக மறுபெயரிட்டு பொருத்தவும், பின்னர் புதுப்பி என்பதை அழுத்தவும்.",
    cfmAppPendingFolderSwitch:              "உங்களிடம் நிலுவையிலுள்ள மறுபெயரிடல்கள் உள்ளன. அவற்றை நிராகரித்து வேறு கோப்புறையைத் திறக்கவா?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "பொருந்தாதது",
    empUnmatchedHint:                       "ஒதுக்க ஒரு ஷாட் அல்லது அத்தியாயத்தின் மீது இழுக்கவும்",
    tipUnmatchedCardHint:                   "ஒதுக்க இழுக்கவும் · முன்னோட்டமிட ▶ ஐ கிளிக் செய்யவும்",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "தயார்",
    msgStatusbarWorking:                    "வேலை செய்கிறது…",
    msgStatusbarNoChanges:                  "மாற்றங்கள் இல்லை",
    msgStatusbarPendingDiscarded:           "நிலுவையிலுள்ள மாற்றங்கள் நிராகரிக்கப்பட்டன",
    msgStatusbarScanResult:                 "%N% கோப்புகள் · %U% பொருந்தாதவை",
    msgStatusbarRenaming:                   "%N% கோப்புகள் மறுபெயரிடப்படுகின்றன…",
    msgStatusbarRenamed:                    "%N% கோப்புகள் மறுபெயரிடப்பட்டது",
    msgStatusbarPendingRenames:             "%N% மறுபெயரிடுதல்கள் நிலுவையில் உள்ளன - பயன்படுத்த உறுதிப்படுத்து",
    msgStatusbarChapterOverflow:            "அத்தியாயம் %N% இலக்க அகலத்தை மீறுகிறது (அதிகபட்சம் %M%)",
    msgStatusbarAllChaptersUsed:            "அனைத்து %N% அத்தியாய இடங்களும் பயன்படுத்தப்பட்டுள்ளன - chapterDigits ஐ அதிகரிக்கவும்",
    msgStatusbarEmptyChapterAdded:          "வெற்று அத்தியாயம் %ID% சேர்க்கப்பட்டது - காட்சிகளை இழுத்து, பின்னர் உறுதிப்படுத்து",
    msgStatusbarChapterLocked:              "அத்தியாயம் பூட்டப்பட்டுள்ளது - காட்சிகளை நகர்த்த முதலில் அதைத் திறக்கவும்.",
    msgStatusbarDropFolderFailed:           "விடப்பட்ட கோப்புறைப் பாதையைப் படிக்க முடியவில்லை",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "திட்ட கோப்புறையைத் தேர்ந்தெடுக்கவும்",

  },

  hi: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "रद्द करें",
    btnGlobalDiscard:                       "खारिज करें",
    tipGlobalOpenExternal:                  "डिफ़ॉल्ट ऐप में खोलें",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नया संस्करण उपलब्ध है:",
    lnkUpdateWhatsNew:                      "नया क्या है",
    btnUpdateDownload:                      "डाउनलोड करें",
    lnkUpdateSkip:                          "इस संस्करण को छोड़ें",
    tipUpdateDismiss:                       "खारिज करें",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "सेटिंग्स खोलें",
    tipHdrHelp:                             "सहायता",
    btnHdrRefresh:                          "रीफ़्रेश करें",
    tipHdrRefresh:                          "फ़ोल्डर को फिर से स्कैन करें",
    tipHdrRefreshDisabled:                  "पहले लंबित परिवर्तनों को कमिट या छोड़ दें",
    btnHdrOpenFolder:                       "फ़ोल्डर खोलें…",
    btnHdrCommit:                           "पुष्टि करें",
    tipHdrDigitsChapter:                    "अध्याय",
    tipHdrDigitsSlot:                       "स्लॉट",
    tipHdrDigitsVersion:                    "संस्करण",
    tipHdrGroup:                            "फ़ोटो को समूहबद्ध करें",
    tipHdrUngroup:                          "फ़ोटो को असमूहित करें",
    tipHdrPreserveGaps:                     "स्लॉट के अंतराल बनाए रखें",
    tipHdrCompactOnDrop:                    "ड्रॉप करने पर स्लॉट को सिकोड़ें",
    tipHdrCompactAll:                       "सभी अध्यायों में स्लॉट के अंतराल को सिकोड़ें",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्स",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsAbout:                    "के बारे में",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "गहरा",
    btnDlgSettingsDisplayThemeLight:        "हल्का",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ड्रैग-एंड-ड्रॉप के माध्यम से वीडियो शॉट फ़ाइलों को अनुक्रमित और पुन: क्रमांकित करें।",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "अध्याय",
    lblChapterShots:                        "%N% शॉट्स",
    lblChapterGaps:                         "%N% अंतराल",
    tipChapterLock:                         "अध्याय लॉक करें",
    tipChapterUnlock:                       "अध्याय अनलॉक करें",
    tipChapterCompact:                      "इस अध्याय में स्लॉट के अंतराल को सिकोड़ें",
    tipChapterCollapse:                     "अध्याय संक्षिप्त करें",
    tipChapterExpand:                       "अध्याय विस्तृत करें",
    tipChapterDragHandle:                   "अध्याय को पुनर्व्यवस्थित करने के लिए खींचें",
    empChapterEmpty:                        "खाली अध्याय - यहाँ एक शॉट डालें",
    btnChapterAdd:                          "+ अध्याय जोड़ें",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% विकल्प",
    lblShotFiles:                           "%N% फ़ाइलें",
    tipShotThumbHint:                       "स्थानांतरित/पुनःक्रमित करने के लिए खींचें · पूर्वावलोकन के लिए ▶ क्लिक करें",
    tipShotPileHint:                        "सभी को एक साथ ले जाने के लिए ढेर को खींचें",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "एक प्रोजेक्ट फ़ोल्डर खोलें",
    msgAppOpenFolderDesc1:                  "%APP% %PATTERN% (अंक, फिर वैकल्पिक प्रत्यय) नाम की फ़ाइलें पढ़ता है और आपको शॉट्स को खींचकर उन्हें थोक में फिर से नंबर देने की सुविधा देता है।",
    msgAppOpenFolderDesc2:                  "चौड़ाई %INI% में प्रति फ़ोल्डर कॉन्फ़िगर की जाती है।",
    ttlAppNoMatch:                          "कोई मेल खाने वाली फ़ाइलें नहीं",
    msgAppNoMatchDesc:                      "इस फ़ोल्डर में कोई भी फ़ाइल %PATTERN% पैटर्न से मेल नहीं खाती।",
    msgAppNoMatchHint:                      "कुछ फ़ाइलों का मैन्युअल रूप से नाम बदलें ताकि वे मेल खाएं, फिर रीफ़्रेश करें।",
    cfmAppPendingFolderSwitch:              "आपके पास लंबित नाम बदलने हैं। क्या उन्हें छोड़ कर कोई दूसरा फ़ोल्डर खोलना है?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "बेमेल",
    empUnmatchedHint:                       "असाइन करने के लिए किसी शॉट या अध्याय पर खींचें",
    tipUnmatchedCardHint:                   "असाइन करने के लिए खींचें · पूर्वावलोकन के लिए ▶ पर क्लिक करें",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "तैयार",
    msgStatusbarWorking:                    "काम कर रहा है…",
    msgStatusbarNoChanges:                  "कोई बदलाव नहीं",
    msgStatusbarPendingDiscarded:           "लंबित परिवर्तन छोड़े गए",
    msgStatusbarScanResult:                 "%N% फ़ाइलें · %U% बेमेल",
    msgStatusbarRenaming:                   "%N% फ़ाइलों का नाम बदला जा रहा है…",
    msgStatusbarRenamed:                    "%N% फ़ाइलों का नाम बदला गया",
    msgStatusbarPendingRenames:             "%N% लंबित नाम बदलना - लागू करने के लिए प्रतिबद्ध करें",
    msgStatusbarChapterOverflow:            "अध्याय %N% अंक चौड़ाई से अधिक है (अधिकतम %M%)",
    msgStatusbarAllChaptersUsed:            "सभी %N% अध्याय स्लॉट उपयोग किए गए हैं - chapterDigits बढ़ाएँ",
    msgStatusbarEmptyChapterAdded:          "खाली अध्याय %ID% जोड़ा गया - शॉट्स खींचें, फिर कमिट करें",
    msgStatusbarChapterLocked:              "अध्याय लॉक है - शॉट्स को स्थानांतरित करने के लिए पहले इसे अनलॉक करें।",
    msgStatusbarDropFolderFailed:           "ड्रॉप किए गए फ़ोल्डर का पथ पढ़ा नहीं जा सका",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "प्रोजेक्ट फ़ोल्डर चुनें",

  },

  bn: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "বাতিল করুন",
    btnGlobalDiscard:                       "বাদ দিন",
    tipGlobalOpenExternal:                  "ডিফল্ট অ্যাপে খুলুন",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "নতুন সংস্করণ উপলব্ধ:",
    lnkUpdateWhatsNew:                      "নতুন কি আছে",
    btnUpdateDownload:                      "ডাউনলোড করুন",
    lnkUpdateSkip:                          "এই সংস্করণটি এড়িয়ে যান",
    tipUpdateDismiss:                       "খারিজ করুন",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "সেটিংস খুলুন",
    tipHdrHelp:                             "সাহায্য",
    btnHdrRefresh:                          "রিফ্রেশ করুন",
    tipHdrRefresh:                          "ফোল্ডার পুনরায় স্ক্যান করুন",
    tipHdrRefreshDisabled:                  "প্রথমে মুলতুবি পরিবর্তনগুলি কমিট বা বাতিল করুন",
    btnHdrOpenFolder:                       "ফোল্ডার খুলুন…",
    btnHdrCommit:                           "নিশ্চিত করুন",
    tipHdrDigitsChapter:                    "অধ্যায়",
    tipHdrDigitsSlot:                       "স্লট",
    tipHdrDigitsVersion:                    "সংস্করণ",
    tipHdrGroup:                            "ছবিগুলি গ্রুপ করুন",
    tipHdrUngroup:                          "ছবিগুলি আনগ্রুপ করুন",
    tipHdrPreserveGaps:                     "স্লট ফাঁক বজায় রাখুন",
    tipHdrCompactOnDrop:                    "ড্রপ করার সময় স্লট কম্প্যাক্ট করুন",
    tipHdrCompactAll:                       "সমস্ত অধ্যায়ে স্লট ফাঁক কম্প্যাক্ট করুন",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "সেটিংস",
    tabDlgSettingsDisplay:                  "প্রদর্শন",
    tabDlgSettingsAbout:                    "সম্পর্কে",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ভাষা",
    lblDlgSettingsDisplayTheme:             "থিম",
    btnDlgSettingsDisplayThemeDark:         "গাঢ়",
    btnDlgSettingsDisplayThemeLight:        "হালকা",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ড্র্যাগ-এন্ড-ড্রপ ব্যবহার করে ভিডিও শট ফাইলগুলির ক্রম এবং পুনরায় নম্বর দিন।",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "অধ্যায়",
    lblChapterShots:                        "%N% শট",
    lblChapterGaps:                         "%N% ফাঁক",
    tipChapterLock:                         "অধ্যায় লক করুন",
    tipChapterUnlock:                       "অধ্যায় আনলক করুন",
    tipChapterCompact:                      "এই অধ্যায়ে স্লট ফাঁক কম্প্যাক্ট করুন",
    tipChapterCollapse:                     "অধ্যায় সঙ্কুচিত করুন",
    tipChapterExpand:                       "অধ্যায় প্রসারিত করুন",
    tipChapterDragHandle:                   "অধ্যায় পুনরায় সাজাতে টেনে আনুন",
    empChapterEmpty:                        "খালি অধ্যায় - এখানে একটি শট ফেলুন",
    btnChapterAdd:                          "+ অধ্যায় যোগ করুন",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% বিকল্প",
    lblShotFiles:                           "%N% ফাইল",
    tipShotThumbHint:                       "সরাতে/পুনরায় সাজাতে টেনে আনুন · পূর্বরূপ দেখতে ▶ ক্লিক করুন",
    tipShotPileHint:                        "সব একসাথে সরাতে স্তূপটি টেনে আনুন",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "একটি প্রজেক্ট ফোল্ডার খুলুন",
    msgAppOpenFolderDesc1:                  "%APP% %PATTERN% (সংখ্যা, তারপর ঐচ্ছিক প্রত্যয়) নামের ফাইলগুলি পড়ে এবং আপনাকে শটগুলি টেনে এনে সেগুলিকে একবারে পুনরায় নম্বর দিতে দেয়।",
    msgAppOpenFolderDesc2:                  "প্রস্থগুলি %INI% এ প্রতি ফোল্ডারে কনফিগার করা হয়।",
    ttlAppNoMatch:                          "কোনো মিলছে না এমন ফাইল নেই",
    msgAppNoMatchDesc:                      "এই ফোল্ডারে %PATTERN% প্যাটার্নের সাথে মেলে এমন কোনো ফাইল নেই।",
    msgAppNoMatchHint:                      "কিছু ফাইল ম্যানুয়ালি রিনেম করে মেলান, তারপর রিফ্রেশ চাপুন।",
    cfmAppPendingFolderSwitch:              "আপনার কাছে কিছু রিনেম পেন্ডিং আছে। সেগুলো বাতিল করে অন্য ফোল্ডার খুলবেন?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "অমিল",
    empUnmatchedHint:                       "অ্যাসাইন করতে একটি শট বা অধ্যায়ের উপর টেনে আনুন",
    tipUnmatchedCardHint:                   "অ্যাসাইন করতে টেনে আনুন · প্রিভিউ দেখতে ▶ ক্লিক করুন",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "প্রস্তুত",
    msgStatusbarWorking:                    "কাজ চলছে…",
    msgStatusbarNoChanges:                  "কোন পরিবর্তন নেই",
    msgStatusbarPendingDiscarded:           "মুলতুবি পরিবর্তন বাতিল করা হয়েছে",
    msgStatusbarScanResult:                 "%N% ফাইল · %U% অমিল",
    msgStatusbarRenaming:                   "%N%টি ফাইল পুনঃনামকরণ করা হচ্ছে…",
    msgStatusbarRenamed:                    "%N%টি ফাইল পুনঃনামকরণ করা হয়েছে",
    msgStatusbarPendingRenames:             "%N%টি নাম পরিবর্তন মুলতুবি - প্রয়োগ করতে কমিট করুন",
    msgStatusbarChapterOverflow:            "অধ্যায় %N% ডিজিট প্রস্থ অতিক্রম করেছে (সর্বোচ্চ %M%)",
    msgStatusbarAllChaptersUsed:            "সমস্ত %N%টি অধ্যায় স্লট ব্যবহৃত হয়েছে - chapterDigits বাড়ান",
    msgStatusbarEmptyChapterAdded:          "খালি অধ্যায় %ID% যোগ করা হয়েছে - শট টেনে আনুন, তারপর কমিট করুন",
    msgStatusbarChapterLocked:              "অধ্যায় লক করা আছে - শট সরাতে প্রথমে এটি আনলক করুন।",
    msgStatusbarDropFolderFailed:           "ড্রপ করা ফোল্ডারের পথ পড়া যায়নি",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "প্রজেক্ট ফোল্ডার নির্বাচন করুন",

  },

  ur: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "منسوخ کریں",
    btnGlobalDiscard:                       "مسترد کریں",
    tipGlobalOpenExternal:                  "پہلے سے طے شدہ ایپ میں کھولیں",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "نیا ورژن دستیاب ہے:",
    lnkUpdateWhatsNew:                      "نیا کیا ہے",
    btnUpdateDownload:                      "ڈاؤن لوڈ کریں",
    lnkUpdateSkip:                          "اس ورژن کو چھوڑ دیں",
    tipUpdateDismiss:                       "مسترد کریں",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "ترتیبات کھولیں",
    tipHdrHelp:                             "مدد",
    btnHdrRefresh:                          "ریفریش کریں",
    tipHdrRefresh:                          "فولڈر کو دوبارہ اسکین کریں",
    tipHdrRefreshDisabled:                  "پہلے زیر التواء تبدیلیوں کو کمٹ یا مسترد کریں",
    btnHdrOpenFolder:                       "فولڈر کھولیں…",
    btnHdrCommit:                           "توثیق کریں",
    tipHdrDigitsChapter:                    "باب",
    tipHdrDigitsSlot:                       "سلاٹ",
    tipHdrDigitsVersion:                    "ورژن",
    tipHdrGroup:                            "تصاویر کو گروپ کریں",
    tipHdrUngroup:                          "تصاویر کو ان گروپ کریں",
    tipHdrPreserveGaps:                     "سلاٹ کے خالی مقامات برقرار رکھیں",
    tipHdrCompactOnDrop:                    "گرانے پر سلاٹس کو کمپیکٹ کریں",
    tipHdrCompactAll:                       "تمام ابواب میں سلاٹ کے خالی مقامات کو کمپیکٹ کریں",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ترتیبات",
    tabDlgSettingsDisplay:                  "ڈسپلے",
    tabDlgSettingsAbout:                    "کے بارے میں",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "زبان",
    lblDlgSettingsDisplayTheme:             "تھیم",
    btnDlgSettingsDisplayThemeDark:         "گہرا",
    btnDlgSettingsDisplayThemeLight:        "ہلکا",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ڈریگ اینڈ ڈراپ کے ذریعے ویڈیو شاٹ فائلوں کو ترتیب دیں اور دوبارہ نمبر دیں۔",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "باب",
    lblChapterShots:                        "%N% شاٹس",
    lblChapterGaps:                         "%N% خالی مقامات",
    tipChapterLock:                         "باب کو لاک کریں",
    tipChapterUnlock:                       "باب کو ان لاک کریں",
    tipChapterCompact:                      "اس باب میں سلاٹ کے خالی مقامات کو کمپیکٹ کریں",
    tipChapterCollapse:                     "باب سمیٹیں",
    tipChapterExpand:                       "باب پھیلائیں",
    tipChapterDragHandle:                   "باب کو دوبارہ ترتیب دینے کے لیے گھسیٹیں",
    empChapterEmpty:                        "خالی باب - یہاں ایک شاٹ گرائیں",
    btnChapterAdd:                          "+ باب شامل کریں",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% متبادل",
    lblShotFiles:                           "%N% فائلیں",
    tipShotThumbHint:                       "منتقل/ترتیب نو کرنے کے لیے گھسیٹیں · پیش منظر کے لیے ▶ پر کلک کریں",
    tipShotPileHint:                        "سب کو ایک ساتھ منتقل کرنے کے لیے ڈھیر کو گھسیٹیں",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "پروجیکٹ فولڈر کھولیں",
    msgAppOpenFolderDesc1:                  "%APP% %PATTERN% (ہندسے، پھر اختیاری لاحقہ) نامی فائلیں پڑھتا ہے اور آپ کو شاٹس کو گھسیٹ کر انہیں بلک میں دوبارہ نمبر دینے کی سہولت دیتا ہے۔",
    msgAppOpenFolderDesc2:                  "چوڑائیاں %INI% میں فی فولڈر ترتیب دی جاتی ہیں۔",
    ttlAppNoMatch:                          "کوئی مماثل فائلیں نہیں",
    msgAppNoMatchDesc:                      "اس فولڈر میں کوئی فائل %PATTERN% پیٹرن سے مماثل نہیں ہے۔",
    msgAppNoMatchHint:                      "چند فائلوں کا دستی طور پر نام تبدیل کریں تاکہ وہ مماثل ہوں، پھر ریفریش دبائیں۔",
    cfmAppPendingFolderSwitch:              "آپ کے پاس زیر التواء نام تبدیلیاں ہیں۔ کیا انہیں مسترد کر کے کوئی دوسرا فولڈر کھولنا ہے؟",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "غیر مماثل",
    empUnmatchedHint:                       "تفویض کرنے کے لیے کسی شاٹ یا باب پر گھسیٹیں",
    tipUnmatchedCardHint:                   "تفویض کرنے کے لیے گھسیٹیں · پیش منظر دیکھنے کے لیے ▶ پر کلک کریں",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "تیار",
    msgStatusbarWorking:                    "کام جاری ہے…",
    msgStatusbarNoChanges:                  "کوئی تبدیلی نہیں",
    msgStatusbarPendingDiscarded:           "زیر التواء تبدیلیاں مسترد کر دی گئیں",
    msgStatusbarScanResult:                 "%N% فائلیں · %U% غیر مماثل",
    msgStatusbarRenaming:                   "%N% فائلوں کا نام تبدیل کیا جا رہا ہے…",
    msgStatusbarRenamed:                    "%N% فائلوں کا نام تبدیل کر دیا گیا",
    msgStatusbarPendingRenames:             "%N% زیر التواء نام تبدیلیاں - لاگو کرنے کے لیے تصدیق کریں",
    msgStatusbarChapterOverflow:            "باب %N% ہندسے کی چوڑائی سے تجاوز کر گیا (زیادہ سے زیادہ %M%)",
    msgStatusbarAllChaptersUsed:            "تمام %N% باب کی جگہیں استعمال ہو چکی ہیں - chapterDigits بڑھائیں",
    msgStatusbarEmptyChapterAdded:          "خالی باب %ID% شامل کیا گیا - شاٹس گھسیٹیں، پھر کمٹ کریں",
    msgStatusbarChapterLocked:              "باب مقفل ہے - شاٹس کو منتقل کرنے کے لیے پہلے اسے غیر مقفل کریں۔",
    msgStatusbarDropFolderFailed:           "ڈراپ کردہ فولڈر کا راستہ پڑھا نہیں جا سکا",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "پروجیکٹ فولڈر منتخب کریں",

  },

  sw: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Ghairi",
    btnGlobalDiscard:                       "Tupa",
    tipGlobalOpenExternal:                  "Fungua katika programu chaguomsingi",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Toleo jipya linapatikana:",
    lnkUpdateWhatsNew:                      "Nini kipya",
    btnUpdateDownload:                      "Pakua",
    lnkUpdateSkip:                          "Ruka toleo hili",
    tipUpdateDismiss:                       "Futa",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Fungua mipangilio",
    tipHdrHelp:                             "Msaada",
    btnHdrRefresh:                          "Onyesha upya",
    tipHdrRefresh:                          "Changanua upya folda",
    tipHdrRefreshDisabled:                  "Kwanza thibitisha au tupa mabadiliko yanayosubiri",
    btnHdrOpenFolder:                       "Fungua folda…",
    btnHdrCommit:                           "Thibitisha",
    tipHdrDigitsChapter:                    "Sura",
    tipHdrDigitsSlot:                       "Nafasi",
    tipHdrDigitsVersion:                    "Toleo",
    tipHdrGroup:                            "Panga Picha",
    tipHdrUngroup:                          "Tengua Picha",
    tipHdrPreserveGaps:                     "Hifadhi mapengo ya nafasi",
    tipHdrCompactOnDrop:                    "Punguza nafasi unapoangusha",
    tipHdrCompactAll:                       "Punguza mapengo ya nafasi katika sura zote",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mipangilio",
    tabDlgSettingsDisplay:                  "Onyesho",
    tabDlgSettingsAbout:                    "Kuhusu",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Lugha",
    lblDlgSettingsDisplayTheme:             "Mandhari",
    btnDlgSettingsDisplayThemeDark:         "Giza",
    btnDlgSettingsDisplayThemeLight:        "Nuru",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Panga na ubadilishe nambari za faili za video kwa kuburuta na kuacha.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Sura",
    lblChapterShots:                        "%N% Picha",
    lblChapterGaps:                         "Mapengo %N%",
    tipChapterLock:                         "Funga Sura",
    tipChapterUnlock:                       "Fungua Sura",
    tipChapterCompact:                      "Punguza mapengo ya nafasi katika sura hii",
    tipChapterCollapse:                     "Kunja sura",
    tipChapterExpand:                       "Panua sura",
    tipChapterDragHandle:                   "Buruta ili kupanga upya sura",
    empChapterEmpty:                        "Sura tupu - dondosha picha hapa",
    btnChapterAdd:                          "+ Ongeza sura",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% mbadala",
    lblShotFiles:                           "%N% faili",
    tipShotThumbHint:                       "buruta ili kusogeza/kupanga upya · bofya ▶ ili kuhakiki",
    tipShotPileHint:                        "buruta rundo ili kusogeza zote pamoja",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Fungua folda ya mradi",
    msgAppOpenFolderDesc1:                  "%APP% husoma faili zinazoitwa %PATTERN% (tarakimu, kisha kiambishi tamati cha hiari) na hukuruhusu kuburuta picha ili kuzipanga upya kwa wingi.",
    msgAppOpenFolderDesc2:                  "Upana huwekwa kwa kila folda katika %INI%.",
    ttlAppNoMatch:                          "Hakuna faili zinazolingana",
    msgAppNoMatchDesc:                      "Hakuna faili katika folda hii zinazolingana na muundo %PATTERN%.",
    msgAppNoMatchHint:                      "Badilisha jina la faili chache mwenyewe ili zilingane, kisha bofya Onyesha Upya.",
    cfmAppPendingFolderSwitch:              "Una mabadiliko ya majina yanayosubiri. Yafute na ufungue folda tofauti?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Hazilingani",
    empUnmatchedHint:                       "buruta kwenye picha au sura ili kugawa",
    tipUnmatchedCardHint:                   "buruta ili kugawa · bofya ▶ ili kuhakiki",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Tayari",
    msgStatusbarWorking:                    "Inafanya kazi…",
    msgStatusbarNoChanges:                  "Hakuna mabadiliko",
    msgStatusbarPendingDiscarded:           "Mabadiliko yanayosubiri yamekataliwa",
    msgStatusbarScanResult:                 "%N% faili · %U% zisizolingana",
    msgStatusbarRenaming:                   "Inabadilisha jina la faili %N%…",
    msgStatusbarRenamed:                    "Faili %N% zimebadilishwa jina",
    msgStatusbarPendingRenames:             "Mabadiliko %N% yanayosubiri - Thibitisha ili kutumia",
    msgStatusbarChapterOverflow:            "Sura %N% inazidi upana wa tarakimu (upeo %M%)",
    msgStatusbarAllChaptersUsed:            "Nafasi zote %N% za sura zimetumika - ongeza chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Sura tupu %ID% imeongezwa - buruta picha, kisha Thibitisha",
    msgStatusbarChapterLocked:              "Sura imefungwa - ifungue kwanza ili kusogeza picha.",
    msgStatusbarDropFolderFailed:           "Imeshindwa kusoma njia ya folda iliyoangushwa",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Chagua folda ya mradi",

  },

  pa: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "ਰੱਦ ਕਰੋ",
    btnGlobalDiscard:                       "ਛੱਡੋ",
    tipGlobalOpenExternal:                  "ਡਿਫੌਲਟ ਐਪ ਵਿੱਚ ਖੋਲ੍ਹੋ",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "ਨਵਾਂ ਸੰਸਕਰਨ ਉਪਲਬਧ ਹੈ:",
    lnkUpdateWhatsNew:                      "ਨਵਾਂ ਕੀ ਹੈ",
    btnUpdateDownload:                      "ਡਾਊਨਲੋਡ ਕਰੋ",
    lnkUpdateSkip:                          "ਇਸ ਸੰਸਕਰਨ ਨੂੰ ਛੱਡੋ",
    tipUpdateDismiss:                       "ਖਾਰਜ ਕਰੋ",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "ਸੈਟਿੰਗਾਂ ਖੋਲ੍ਹੋ",
    tipHdrHelp:                             "ਮਦਦ",
    btnHdrRefresh:                          "ਰੀਫ੍ਰੈਸ਼ ਕਰੋ",
    tipHdrRefresh:                          "ਫੋਲਡਰ ਨੂੰ ਮੁੜ-ਸਕੈਨ ਕਰੋ",
    tipHdrRefreshDisabled:                  "ਪਹਿਲਾਂ ਬਕਾਇਆ ਤਬਦੀਲੀਆਂ ਨੂੰ ਕਮਿਟ ਜਾਂ ਰੱਦ ਕਰੋ",
    btnHdrOpenFolder:                       "ਫੋਲਡਰ ਖੋਲ੍ਹੋ…",
    btnHdrCommit:                           "ਪੁਸ਼ਟੀ ਕਰੋ",
    tipHdrDigitsChapter:                    "ਅਧਿਆਇ",
    tipHdrDigitsSlot:                       "ਸਲਾਟ",
    tipHdrDigitsVersion:                    "ਵਰਜਨ",
    tipHdrGroup:                            "ਤਸਵੀਰਾਂ ਨੂੰ ਗਰੁੱਪ ਕਰੋ",
    tipHdrUngroup:                          "ਤਸਵੀਰਾਂ ਨੂੰ ਅਨਗਰੁੱਪ ਕਰੋ",
    tipHdrPreserveGaps:                     "ਸਲਾਟ ਦੇ ਖਾਲੀ ਥਾਂਵਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖੋ",
    tipHdrCompactOnDrop:                    "ਸੁੱਟਣ 'ਤੇ ਸਲਾਟਾਂ ਨੂੰ ਸੰਖੇਪ ਕਰੋ",
    tipHdrCompactAll:                       "ਸਾਰੇ ਅਧਿਆਵਾਂ ਵਿੱਚ ਸਲਾਟ ਦੇ ਖਾਲੀ ਥਾਂਵਾਂ ਨੂੰ ਸੰਖੇਪ ਕਰੋ",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "ਸੈਟਿੰਗਾਂ",
    tabDlgSettingsDisplay:                  "ਪ੍ਰਦਰਸ਼ਨ",
    tabDlgSettingsAbout:                    "ਬਾਰੇ",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "ਭਾਸ਼ਾ",
    lblDlgSettingsDisplayTheme:             "ਥੀਮ",
    btnDlgSettingsDisplayThemeDark:         "ਗੂੜ੍ਹਾ",
    btnDlgSettingsDisplayThemeLight:        "ਹਲਕਾ",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ਡਰੈਗ-ਐਂਡ-ਡ੍ਰੌਪ ਰਾਹੀਂ ਵੀਡੀਓ ਸ਼ਾਟ ਫਾਈਲਾਂ ਨੂੰ ਕ੍ਰਮਬੱਧ ਅਤੇ ਮੁੜ-ਨੰਬਰ ਦਿਓ।",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "ਅਧਿਆਇ",
    lblChapterShots:                        "%N% ਸ਼ਾਟ",
    lblChapterGaps:                         "%N% ਖਾਲੀ ਥਾਂਵਾਂ",
    tipChapterLock:                         "ਅਧਿਆਇ ਲਾਕ ਕਰੋ",
    tipChapterUnlock:                       "ਅਧਿਆਇ ਅਨਲਾਕ ਕਰੋ",
    tipChapterCompact:                      "ਇਸ ਅਧਿਆਇ ਵਿੱਚ ਸਲਾਟ ਦੇ ਖਾਲੀ ਥਾਂਵਾਂ ਨੂੰ ਸੰਖੇਪ ਕਰੋ",
    tipChapterCollapse:                     "ਅਧਿਆਇ ਨੂੰ ਛੋਟਾ ਕਰੋ",
    tipChapterExpand:                       "ਅਧਿਆਇ ਨੂੰ ਫੈਲਾਓ",
    tipChapterDragHandle:                   "ਅਧਿਆਇ ਨੂੰ ਮੁੜ-ਕ੍ਰਮਬੱਧ ਕਰਨ ਲਈ ਖਿੱਚੋ",
    empChapterEmpty:                        "ਖਾਲੀ ਅਧਿਆਇ - ਇੱਥੇ ਇੱਕ ਸ਼ਾਟ ਸੁੱਟੋ",
    btnChapterAdd:                          "+ ਅਧਿਆਇ ਸ਼ਾਮਲ ਕਰੋ",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% ਬਦਲ",
    lblShotFiles:                           "%N% ਫਾਈਲਾਂ",
    tipShotThumbHint:                       "ਮੂਵ/ਮੁੜ-ਆਰਡਰ ਕਰਨ ਲਈ ਖਿੱਚੋ · ਪੂਰਵਦਰਸ਼ਨ ਲਈ ▶ ਕਲਿੱਕ ਕਰੋ",
    tipShotPileHint:                        "ਸਾਰਿਆਂ ਨੂੰ ਇਕੱਠੇ ਮੂਵ ਕਰਨ ਲਈ ਢੇਰ ਨੂੰ ਖਿੱਚੋ",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "ਇੱਕ ਪ੍ਰੋਜੈਕਟ ਫੋਲਡਰ ਖੋਲ੍ਹੋ",
    msgAppOpenFolderDesc1:                  "%APP% %PATTERN% (ਅੰਕ, ਫਿਰ ਵਿਕਲਪਿਕ ਪਿਛੇਤਰ) ਨਾਮ ਦੀਆਂ ਫਾਈਲਾਂ ਪੜ੍ਹਦਾ ਹੈ ਅਤੇ ਤੁਹਾਨੂੰ ਸ਼ਾਟਸ ਨੂੰ ਖਿੱਚ ਕੇ ਉਹਨਾਂ ਨੂੰ ਬਲਕ ਵਿੱਚ ਦੁਬਾਰਾ ਨੰਬਰ ਦੇਣ ਦੀ ਇਜਾਜ਼ਤ ਦਿੰਦਾ ਹੈ।",
    msgAppOpenFolderDesc2:                  "ਚੌੜਾਈਆਂ %INI% ਵਿੱਚ ਪ੍ਰਤੀ ਫੋਲਡਰ ਕੌਂਫਿਗਰ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    ttlAppNoMatch:                          "ਕੋਈ ਮੇਲ ਖਾਂਦੀਆਂ ਫਾਈਲਾਂ ਨਹੀਂ",
    msgAppNoMatchDesc:                      "ਇਸ ਫੋਲਡਰ ਵਿੱਚ ਕੋਈ ਵੀ ਫਾਈਲ %PATTERN% ਪੈਟਰਨ ਨਾਲ ਮੇਲ ਨਹੀਂ ਖਾਂਦੀ।",
    msgAppNoMatchHint:                      "ਕੁਝ ਫਾਈਲਾਂ ਦਾ ਮੈਨੂਅਲੀ ਨਾਮ ਬਦਲੋ ਤਾਂ ਜੋ ਉਹ ਮੇਲ ਖਾਣ, ਫਿਰ ਰਿਫ੍ਰੈਸ਼ ਦਬਾਓ।",
    cfmAppPendingFolderSwitch:              "ਤੁਹਾਡੇ ਕੋਲ ਬਕਾਇਆ ਨਾਮ ਬਦਲਣੇ ਹਨ। ਕੀ ਉਹਨਾਂ ਨੂੰ ਰੱਦ ਕਰਕੇ ਕੋਈ ਹੋਰ ਫੋਲਡਰ ਖੋਲ੍ਹਣਾ ਹੈ?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "ਬੇਮੇਲ",
    empUnmatchedHint:                       "ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ ਇੱਕ ਸ਼ਾਟ ਜਾਂ ਅਧਿਆਇ 'ਤੇ ਖਿੱਚੋ",
    tipUnmatchedCardHint:                   "ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ ਖਿੱਚੋ · ਪੂਰਵਦਰਸ਼ਨ ਲਈ ▶ 'ਤੇ ਕਲਿੱਕ ਕਰੋ",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "ਤਿਆਰ",
    msgStatusbarWorking:                    "ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ…",
    msgStatusbarNoChanges:                  "ਕੋਈ ਬਦਲਾਅ ਨਹੀਂ",
    msgStatusbarPendingDiscarded:           "ਲੰਬਿਤ ਬਦਲਾਅ ਰੱਦ ਕੀਤੇ ਗਏ",
    msgStatusbarScanResult:                 "%N% ਫਾਈਲਾਂ · %U% ਬੇਮੇਲ",
    msgStatusbarRenaming:                   "%N% ਫਾਈਲਾਂ ਦਾ ਨਾਮ ਬਦਲਿਆ ਜਾ ਰਿਹਾ ਹੈ…",
    msgStatusbarRenamed:                    "%N% ਫਾਈਲਾਂ ਦਾ ਨਾਮ ਬਦਲਿਆ ਗਿਆ",
    msgStatusbarPendingRenames:             "%N% ਬਕਾਇਆ ਨਾਮ ਬਦਲਣੇ - ਲਾਗੂ ਕਰਨ ਲਈ ਕਮਿਟ ਕਰੋ",
    msgStatusbarChapterOverflow:            "ਅਧਿਆਇ %N% ਅੰਕ ਚੌੜਾਈ ਤੋਂ ਵੱਧ ਹੈ (ਵੱਧ ਤੋਂ ਵੱਧ %M%)",
    msgStatusbarAllChaptersUsed:            "ਸਾਰੇ %N% ਚੈਪਟਰ ਸਲਾਟ ਵਰਤੇ ਗਏ ਹਨ - chapterDigits ਵਧਾਓ",
    msgStatusbarEmptyChapterAdded:          "ਖਾਲੀ ਅਧਿਆਇ %ID% ਜੋੜਿਆ ਗਿਆ - ਸ਼ਾਟਸ ਖਿੱਚੋ, ਫਿਰ ਕਮਿਟ ਕਰੋ",
    msgStatusbarChapterLocked:              "ਅਧਿਆਇ ਲੌਕ ਹੈ - ਸ਼ਾਟਸ ਨੂੰ ਮੂਵ ਕਰਨ ਲਈ ਪਹਿਲਾਂ ਇਸਨੂੰ ਅਨਲੌਕ ਕਰੋ।",
    msgStatusbarDropFolderFailed:           "ਡ੍ਰੌਪ ਕੀਤੇ ਫੋਲਡਰ ਦਾ ਮਾਰਗ ਪੜ੍ਹਿਆ ਨਹੀਂ ਜਾ ਸਕਿਆ",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "ਪ੍ਰੋਜੈਕਟ ਫੋਲਡਰ ਚੁਣੋ",

  },

  ha: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Soke",
    btnGlobalDiscard:                       "Watsar",
    tipGlobalOpenExternal:                  "Bude a cikin manhajar asali",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Sabon sigar yana nan:",
    lnkUpdateWhatsNew:                      "Menene sabo",
    btnUpdateDownload:                      "Zazzage",
    lnkUpdateSkip:                          "Tsallake wannan sigar",
    tipUpdateDismiss:                       "Watsar",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Bude saituna",
    tipHdrHelp:                             "Taimako",
    btnHdrRefresh:                          "Sake sabuntawa",
    tipHdrRefresh:                          "Sake duba fayil",
    tipHdrRefreshDisabled:                  "Fara tabbatarwa ko soke canje-canje masu jiran gado",
    btnHdrOpenFolder:                       "Bude fayil…",
    btnHdrCommit:                           "Tabbatar",
    tipHdrDigitsChapter:                    "Babi",
    tipHdrDigitsSlot:                       "Ramin",
    tipHdrDigitsVersion:                    "Salo",
    tipHdrGroup:                            "Haɗa Hotuna",
    tipHdrUngroup:                          "Raba Hotuna",
    tipHdrPreserveGaps:                     "Ajiye gibin ramuka",
    tipHdrCompactOnDrop:                    "Haɗa ramuka yayin sauke",
    tipHdrCompactAll:                       "Haɗa gibin ramuka a dukkan surori",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Saituna",
    tabDlgSettingsDisplay:                  "Nuni",
    tabDlgSettingsAbout:                    "Game da",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Harshe",
    lblDlgSettingsDisplayTheme:             "Jigo",
    btnDlgSettingsDisplayThemeDark:         "Duhu",
    btnDlgSettingsDisplayThemeLight:        "Haske",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Tsara da sake lambobi fayilolin bidiyo ta hanyar ja-da-sauke.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Babi",
    lblChapterShots:                        "%N% hotuna",
    lblChapterGaps:                         "Gibin %N%",
    tipChapterLock:                         "Kulle Babi",
    tipChapterUnlock:                       "Buɗe Babi",
    tipChapterCompact:                      "Haɗa gibin ramuka a wannan sura",
    tipChapterCollapse:                     "Rufe babi",
    tipChapterExpand:                       "Buɗe babi",
    tipChapterDragHandle:                   "Ja don sake tsara babi",
    empChapterEmpty:                        "Babi mara komai - jefa hoto anan",
    btnChapterAdd:                          "+ Ƙara babi",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% madadin",
    lblShotFiles:                           "%N% fayiloli",
    tipShotThumbHint:                       "ja don motsawa/sake tsara · danna ▶ don samfoti",
    tipShotPileHint:                        "ja tarin don motsa duka tare",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Bude babban fayil na aiki",
    msgAppOpenFolderDesc1:                  "%APP% yana karanta fayiloli masu suna %PATTERN% (lambobi, sannan kari na zaɓi) kuma yana ba ka damar jawo hotuna don sake lambanta su gabaɗaya.",
    msgAppOpenFolderDesc2:                  "An saita faɗi ga kowane babban fayil a cikin %INI%.",
    ttlAppNoMatch:                          "Babu fayiloli masu dacewa",
    msgAppNoMatchDesc:                      "Babu fayiloli a cikin wannan babban fayil da suka dace da tsarin %PATTERN%.",
    msgAppNoMatchHint:                      "Canza sunan wasu fayiloli da hannu don dacewa, sannan danna Sabunta.",
    cfmAppPendingFolderSwitch:              "Kuna da canje-canjen suna masu jiran aiki. A watsar da su kuma a buɗe wata fayil?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Ba a daidaita ba",
    empUnmatchedHint:                       "ja zuwa harbi ko babi don sanyawa",
    tipUnmatchedCardHint:                   "ja don sanyawa · danna ▶ don samfoti",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Shirye",
    msgStatusbarWorking:                    "Ana aiki…",
    msgStatusbarNoChanges:                  "Babu canje-canje",
    msgStatusbarPendingDiscarded:           "An watsar da canje-canje masu jiran aiki",
    msgStatusbarScanResult:                 "%N% fayiloli · %U% marasa daidaito",
    msgStatusbarRenaming:                   "Ana canza sunan fayiloli %N%…",
    msgStatusbarRenamed:                    "An canza sunan fayiloli %N%",
    msgStatusbarPendingRenames:             "%N% canje-canjen suna masu jiran gado - Tabbatar don amfani",
    msgStatusbarChapterOverflow:            "Babi na %N% ya wuce faɗin lambobi (mafi girma %M%)",
    msgStatusbarAllChaptersUsed:            "Duk ramukan babi %N% an yi amfani da su - ƙara chapterDigits",
    msgStatusbarEmptyChapterAdded:          "An ƙara babi mara komai %ID% - jawo hotuna, sannan Kaddara",
    msgStatusbarChapterLocked:              "Babi a kulle yake - buɗe shi tukuna don motsa hotuna.",
    msgStatusbarDropFolderFailed:           "Ba a iya karanta hanyar babban fayil ɗin da aka jefa ba",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Zaɓi babban fayil na aiki",

  },

  yo: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Fagilee",
    btnGlobalDiscard:                       "Kọ̀sílẹ̀",
    tipGlobalOpenExternal:                  "Ṣi ni ohun elo aiyipada",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "Ẹya tuntun wa:",
    lnkUpdateWhatsNew:                      "Kí ni titun",
    btnUpdateDownload:                      "Ṣe igbasilẹ",
    lnkUpdateSkip:                          "Fo ẹya yii",
    tipUpdateDismiss:                       "Foju pa",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Ṣi eto",
    tipHdrHelp:                             "Iranlọwọ",
    btnHdrRefresh:                          "Tuntun",
    tipHdrRefresh:                          "Tun ṣe ayẹwo folda",
    tipHdrRefreshDisabled:                  "Kọkọ fi tabi kọ awọn ayipada ti o duro",
    btnHdrOpenFolder:                       "Ṣi folda…",
    btnHdrCommit:                           "Fọwọsi",
    tipHdrDigitsChapter:                    "Orí",
    tipHdrDigitsSlot:                       "Àyè",
    tipHdrDigitsVersion:                    "Ẹya",
    tipHdrGroup:                            "Ṣe Akojo Awọn Fọto",
    tipHdrUngroup:                          "Yọ Akojo Awọn Fọto Kuro",
    tipHdrPreserveGaps:                     "Ṣe itọju awọn aafo iho",
    tipHdrCompactOnDrop:                    "Ṣe akopọ awọn iho lori sisọ silẹ",
    tipHdrCompactAll:                       "Ṣe akopọ awọn aafo iho ninu gbogbo awọn ipin",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Eto",
    tabDlgSettingsDisplay:                  "Ifihan",
    tabDlgSettingsAbout:                    "Nipa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Èdè",
    lblDlgSettingsDisplayTheme:             "Àtùpà",
    btnDlgSettingsDisplayThemeDark:         "Dudu",
    btnDlgSettingsDisplayThemeLight:        "Fẹ́lẹ́fẹ́lẹ́",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Tẹle ati tun nọmba awọn faili fidio nipasẹ fifa-ati-silẹ.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Ori",
    lblChapterShots:                        "%N% Asun",
    lblChapterGaps:                         "awọn aafo %N%",
    tipChapterLock:                         "Ti Abala Pa",
    tipChapterUnlock:                       "Ṣi Abala",
    tipChapterCompact:                      "Ṣe akopọ awọn aafo iho ninu ipin yii",
    tipChapterCollapse:                     "Pa ori kọ",
    tipChapterExpand:                       "Ṣi ori",
    tipChapterDragHandle:                   "Fa lati tunto ori",
    empChapterEmpty:                        "Ori ofo - ju aworan kan si ibi",
    btnChapterAdd:                          "+ Ṣafikun ori",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% awọn yiyan",
    lblShotFiles:                           "%N% faili",
    tipShotThumbHint:                       "fa lati gbe/tunto · tẹ ▶ lati ṣe awotẹlẹ",
    tipShotPileHint:                        "fa òkìtì lati gbe gbogbo rẹ papọ",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Ṣi folda iṣẹ akanṣe kan",
    msgAppOpenFolderDesc1:                  "%APP% ka awọn faili ti a npè ni %PATTERN% (awọn nọmba, lẹhinna afikun aṣayan) ati gba ọ laaye lati fa awọn iyaworan lati tun nọmba wọn ni olopobobo.",
    msgAppOpenFolderDesc2:                  "Awọn iwọn ti wa ni tunto fun folda kọọkan ni %INI%.",
    ttlAppNoMatch:                          "Ko si awọn faili ti o baamu",
    msgAppNoMatchDesc:                      "Ko si awọn faili ninu folda yii ti o baamu apẹrẹ %PATTERN%.",
    msgAppNoMatchHint:                      "Tun orukọ diẹ ninu awọn faili pẹlu ọwọ lati baamu, lẹhinna tẹ Imudojuiwọn.",
    cfmAppPendingFolderSwitch:              "O ni awọn atunṣe orukọ ti o duro de. Fagilee wọn ki o si ṣi folda miiran?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Ko baamu",
    empUnmatchedHint:                       "fa si ori shot tabi ori lati yàn",
    tipUnmatchedCardHint:                   "fa lati yàn · tẹ ▶ lati ṣe awotẹlẹ",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Ti ṣetan",
    msgStatusbarWorking:                    "Nṣiṣẹ…",
    msgStatusbarNoChanges:                  "Ko si iyipada",
    msgStatusbarPendingDiscarded:           "Awọn iyipada ti o duro ti sọnu",
    msgStatusbarScanResult:                 "%N% faili · %U% ti ko baamu",
    msgStatusbarRenaming:                   "Nfagbaro orukọ faili %N%…",
    msgStatusbarRenamed:                    "Ti fagbaro orukọ faili %N%",
    msgStatusbarPendingRenames:             "%N% atunṣe orukọ ti o duro - Fi lelẹ lati lo",
    msgStatusbarChapterOverflow:            "Ori kẹ %N% kọja iwọn nọmba (o pọju %M%)",
    msgStatusbarAllChaptersUsed:            "Gbogbo %N% iho ori ti lo - mu chapterDigits pọ si",
    msgStatusbarEmptyChapterAdded:          "A ti fi ori kika ofo %ID% kun - fa awọn aworan wọle, lẹhinna Fọwọsi",
    msgStatusbarChapterLocked:              "Ori kọkọrọ - ṣi i ni akọkọ lati gbe awọn aworan.",
    msgStatusbarDropFolderFailed:           "Ko le ka ọna folda ti a ju silẹ",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Yan folda ise agbese",

  },

  te: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "రద్దు చేయి",
    btnGlobalDiscard:                       "విస్మరించు",
    tipGlobalOpenExternal:                  "డిఫాల్ట్ యాప్‌లో తెరవండి",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "కొత్త వెర్షన్ అందుబాటులో ఉంది:",
    lnkUpdateWhatsNew:                      "కొత్తవి ఏమిటి",
    btnUpdateDownload:                      "డౌన్‌లోడ్ చేయండి",
    lnkUpdateSkip:                          "ఈ వెర్షన్‌ను దాటవేయి",
    tipUpdateDismiss:                       "తిరస్కరించు",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "సెట్టింగ్‌లను తెరవండి",
    tipHdrHelp:                             "సహాయం",
    btnHdrRefresh:                          "తాజాకరించు",
    tipHdrRefresh:                          "ఫోల్డర్‌ను మళ్లీ స్కాన్ చేయండి",
    tipHdrRefreshDisabled:                  "ముందుగా పెండింగ్‌లో ఉన్న మార్పులను కమిట్ చేయండి లేదా విస్మరించండి",
    btnHdrOpenFolder:                       "ఫోల్డర్‌ను తెరవండి…",
    btnHdrCommit:                           "నిర్ధారించు",
    tipHdrDigitsChapter:                    "అధ్యాయం",
    tipHdrDigitsSlot:                       "స్లాట్",
    tipHdrDigitsVersion:                    "వెర్షన్",
    tipHdrGroup:                            "ఫోటోలను సమూహపరచు",
    tipHdrUngroup:                          "ఫోటోలను సమూహం నుండి తొలగించు",
    tipHdrPreserveGaps:                     "స్లాట్ ఖాళీలను భద్రపరచండి",
    tipHdrCompactOnDrop:                    "వదిలివేసినప్పుడు స్లాట్‌లను కుదించండి",
    tipHdrCompactAll:                       "అన్ని అధ్యాయాలలో స్లాట్ ఖాళీలను కుదించండి",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "సెట్టింగ్‌లు",
    tabDlgSettingsDisplay:                  "ప్రదర్శన",
    tabDlgSettingsAbout:                    "గురించి",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "భాష",
    lblDlgSettingsDisplayTheme:             "థీమ్",
    btnDlgSettingsDisplayThemeDark:         "ముదురు",
    btnDlgSettingsDisplayThemeLight:        "లేత",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "డ్రాగ్-అండ్-డ్రాప్ ద్వారా వీడియో షాట్ ఫైల్‌లను క్రమబద్ధీకరించండి మరియు తిరిగి నంబర్ చేయండి.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "అధ్యాయం",
    lblChapterShots:                        "%N% షాట్లు",
    lblChapterGaps:                         "%N% ఖాళీలు",
    tipChapterLock:                         "అధ్యాయాన్ని లాక్ చేయండి",
    tipChapterUnlock:                       "అధ్యాయాన్ని అన్‌లాక్ చేయండి",
    tipChapterCompact:                      "ఈ అధ్యాయంలో స్లాట్ ఖాళీలను కుదించండి",
    tipChapterCollapse:                     "అధ్యాయాన్ని కుదించు",
    tipChapterExpand:                       "అధ్యాయాన్ని విస్తరించు",
    tipChapterDragHandle:                   "అధ్యాయాన్ని తిరిగి ఆర్డర్ చేయడానికి లాగండి",
    empChapterEmpty:                        "ఖాళీ అధ్యాయం - ఇక్కడ ఒక షాట్‌ను వదలండి",
    btnChapterAdd:                          "+ అధ్యాయాన్ని జోడించు",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% ప్రత్యామ్నాయాలు",
    lblShotFiles:                           "%N% ఫైళ్లు",
    tipShotThumbHint:                       "తరలించడానికి/పునఃక్రమపరచడానికి లాగండి · ప్రివ్యూ చేయడానికి ▶ క్లిక్ చేయండి",
    tipShotPileHint:                        "అన్నింటినీ కలిపి తరలించడానికి కుప్పను లాగండి",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "ప్రాజెక్ట్ ఫోల్డర్‌ను తెరవండి",
    msgAppOpenFolderDesc1:                  "%APP% %PATTERN% (అంకెలు, ఆపై ఐచ్ఛిక ప్రత్యయం) అని పేరున్న ఫైల్‌లను చదువుతుంది మరియు షాట్‌లను లాగి వాటిని పెద్ద మొత్తంలో తిరిగి నంబర్ చేయడానికి మిమ్మల్ని అనుమతిస్తుంది.",
    msgAppOpenFolderDesc2:                  "వెడల్పులు %INI%లో ప్రతి ఫోల్డర్‌కు కాన్ఫిగర్ చేయబడతాయి.",
    ttlAppNoMatch:                          "సరిపోలే ఫైల్‌లు లేవు",
    msgAppNoMatchDesc:                      "ఈ ఫోల్డర్‌లో %PATTERN% నమూనాతో సరిపోలే ఫైల్‌లు లేవు.",
    msgAppNoMatchHint:                      "కొన్ని ఫైల్‌లను మాన్యువల్‌గా పేరు మార్చి సరిపోల్చండి, ఆపై రిఫ్రెష్ నొక్కండి.",
    cfmAppPendingFolderSwitch:              "మీకు పెండింగ్‌లో ఉన్న పేరు మార్పులు ఉన్నాయి. వాటిని విస్మరించి వేరే ఫోల్డర్‌ను తెరవాలా?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "సరిపోలనివి",
    empUnmatchedHint:                       "కేటాయించడానికి షాట్ లేదా అధ్యాయంపైకి లాగండి",
    tipUnmatchedCardHint:                   "కేటాయించడానికి లాగండి · ప్రివ్యూ చేయడానికి ▶ క్లిక్ చేయండి",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "సిద్ధంగా ఉంది",
    msgStatusbarWorking:                    "పని చేస్తోంది…",
    msgStatusbarNoChanges:                  "మార్పులు లేవు",
    msgStatusbarPendingDiscarded:           "పెండింగ్‌లో ఉన్న మార్పులు విస్మరించబడ్డాయి",
    msgStatusbarScanResult:                 "%N% ఫైళ్లు · %U% సరిపోలనివి",
    msgStatusbarRenaming:                   "%N% ఫైల్‌ల పేరు మారుతోంది…",
    msgStatusbarRenamed:                    "%N% ఫైల్‌ల పేరు మార్చబడింది",
    msgStatusbarPendingRenames:             "%N% పెండింగ్‌లో ఉన్న పేరు మార్పులు - వర్తింపజేయడానికి కట్టుబడి ఉండండి",
    msgStatusbarChapterOverflow:            "అధ్యాయం %N% అంకెల వెడల్పును మించిపోయింది (గరిష్టంగా %M%)",
    msgStatusbarAllChaptersUsed:            "అన్ని %N% అధ్యాయ స్లాట్‌లు ఉపయోగించబడ్డాయి - chapterDigitsని పెంచండి",
    msgStatusbarEmptyChapterAdded:          "ఖాళీ అధ్యాయం %ID% జోడించబడింది - షాట్‌లను లాగి, ఆపై కమిట్ చేయండి",
    msgStatusbarChapterLocked:              "అధ్యాయం లాక్ చేయబడింది - షాట్‌లను తరలించడానికి ముందుగా దాన్ని అన్‌లాక్ చేయండి.",
    msgStatusbarDropFolderFailed:           "డ్రాప్ చేయబడిన ఫోల్డర్ మార్గాన్ని చదవలేకపోయింది",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "ప్రాజెక్ట్ ఫోల్డర్‌ను ఎంచుకోండి",

  },

  mr: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "रद्द करा",
    btnGlobalDiscard:                       "टाका",
    tipGlobalOpenExternal:                  "डीफॉल्ट ॲपमध्ये उघडा",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "नवीन आवृत्ती उपलब्ध आहे:",
    lnkUpdateWhatsNew:                      "नवीन काय आहे",
    btnUpdateDownload:                      "डाउनलोड करा",
    lnkUpdateSkip:                          "ही आवृत्ती वगळा",
    tipUpdateDismiss:                       "डिसमिस करा",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "सेटिंग्ज उघडा",
    tipHdrHelp:                             "मदत",
    btnHdrRefresh:                          "रिफ्रेश करा",
    tipHdrRefresh:                          "फोल्डर पुन्हा स्कॅन करा",
    tipHdrRefreshDisabled:                  "प्रथम प्रलंबित बदल कमिट करा किंवा रद्द करा",
    btnHdrOpenFolder:                       "फोल्डर उघडा…",
    btnHdrCommit:                           "निश्चित करा",
    tipHdrDigitsChapter:                    "अध्याय",
    tipHdrDigitsSlot:                       "स्लॉट",
    tipHdrDigitsVersion:                    "आवृत्ती",
    tipHdrGroup:                            "फोटो गटबद्ध करा",
    tipHdrUngroup:                          "फोटो गटबद्धता रद्द करा",
    tipHdrPreserveGaps:                     "स्लॉटमधील अंतर जतन करा",
    tipHdrCompactOnDrop:                    "सोडल्यावर स्लॉट संकुचित करा",
    tipHdrCompactAll:                       "सर्व अध्यायांमधील स्लॉटमधील अंतर संकुचित करा",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "सेटिंग्ज",
    tabDlgSettingsDisplay:                  "प्रदर्शन",
    tabDlgSettingsAbout:                    "बद्दल",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "भाषा",
    lblDlgSettingsDisplayTheme:             "थीम",
    btnDlgSettingsDisplayThemeDark:         "गडद",
    btnDlgSettingsDisplayThemeLight:        "हलका",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "ड्रॅग-अँड-ड्रॉपद्वारे व्हिडिओ शॉट फाइल्सची क्रमवारी लावा आणि पुन्हा क्रमांकित करा.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "अध्याय",
    lblChapterShots:                        "%N% शॉट्स",
    lblChapterGaps:                         "%N% अंतर",
    tipChapterLock:                         "अध्याय लॉक करा",
    tipChapterUnlock:                       "अध्याय अनलॉक करा",
    tipChapterCompact:                      "या अध्यायातील स्लॉटमधील अंतर संकुचित करा",
    tipChapterCollapse:                     "धडा संकुचित करा",
    tipChapterExpand:                       "धडा विस्तृत करा",
    tipChapterDragHandle:                   "धडा पुन्हा क्रमवारी लावण्यासाठी ओढा",
    empChapterEmpty:                        "रिकामे प्रकरण - येथे एक शॉट टाका",
    btnChapterAdd:                          "+ अध्याय जोडा",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% पर्याय",
    lblShotFiles:                           "%N% फाइल्स",
    tipShotThumbHint:                       "हलवण्यासाठी/पुन्हा क्रम लावण्यासाठी ड्रॅग करा · पूर्वावलोकनसाठी ▶ क्लिक करा",
    tipShotPileHint:                        "सर्व एकत्र हलवण्यासाठी ढिगारा ड्रॅग करा",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "प्रकल्प फोल्डर उघडा",
    msgAppOpenFolderDesc1:                  "%APP% %PATTERN% (अंक, नंतर पर्यायी प्रत्यय) नावाच्या फाइल्स वाचते आणि तुम्हाला शॉट्स ड्रॅग करून त्यांना मोठ्या प्रमाणात पुन्हा क्रमांकित करण्याची परवानगी देते.",
    msgAppOpenFolderDesc2:                  "रुंदी %INI% मध्ये प्रति फोल्डर कॉन्फिगर केली जाते.",
    ttlAppNoMatch:                          "जुळणाऱ्या फाइल्स नाहीत",
    msgAppNoMatchDesc:                      "या फोल्डरमध्ये %PATTERN% पॅटर्नशी जुळणाऱ्या फाइल्स नाहीत.",
    msgAppNoMatchHint:                      "काही फाइल्स मॅन्युअली जुळवण्यासाठी पुनर्नामित करा, नंतर रिफ्रेश दाबा.",
    cfmAppPendingFolderSwitch:              "तुमच्याकडे प्रलंबित पुनर्नामिती आहेत. त्या टाकून देऊन वेगळा फोल्डर उघडायचा?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "जुळले नाही",
    empUnmatchedHint:                       "नियुक्त करण्यासाठी शॉट किंवा अध्यायावर ड्रॅग करा",
    tipUnmatchedCardHint:                   "नियुक्त करण्यासाठी ड्रॅग करा · पूर्वावलोकनसाठी ▶ क्लिक करा",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "तयार",
    msgStatusbarWorking:                    "कार्यरत आहे…",
    msgStatusbarNoChanges:                  "कोणतेही बदल नाहीत",
    msgStatusbarPendingDiscarded:           "प्रलंबित बदल टाकून दिले",
    msgStatusbarScanResult:                 "%N% फायली · %U% जुळत नाहीत",
    msgStatusbarRenaming:                   "%N% फायलींचे नाव बदलले जात आहे…",
    msgStatusbarRenamed:                    "%N% फायलींचे नाव बदलले",
    msgStatusbarPendingRenames:             "%N% प्रलंबित पुनर्नामित - लागू करण्यासाठी वचनबद्ध करा",
    msgStatusbarChapterOverflow:            "धडा %N% अंक रुंदीपेक्षा जास्त आहे (कमाल %M%)",
    msgStatusbarAllChaptersUsed:            "सर्व %N% अध्याय स्लॉट वापरले आहेत - chapterDigits वाढवा",
    msgStatusbarEmptyChapterAdded:          "रिकामे प्रकरण %ID% जोडले - शॉट्स ड्रॅग करा, नंतर कमिट करा",
    msgStatusbarChapterLocked:              "धडा लॉक केलेला आहे - शॉट्स हलवण्यासाठी आधी तो अनलॉक करा.",
    msgStatusbarDropFolderFailed:           "ड्रॉप केलेल्या फोल्डरचा मार्ग वाचता आला नाही",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "प्रकल्प फोल्डर निवडा",

  },

  tl: {

    // Prefix:Global - Scope:shared across all apps
    btnGlobalCancel:                        "Kanselahin",
    btnGlobalDiscard:                       "Itapon",
    tipGlobalOpenExternal:                  "Buksan sa default na app",

    // Prefix:Update - Scope:in-app update notification banner
    lblUpdateAvailable:                     "May bagong bersyon:",
    lnkUpdateWhatsNew:                      "Ano ang bago",
    btnUpdateDownload:                      "I-download",
    lnkUpdateSkip:                          "Laktawan ang bersyon na ito",
    tipUpdateDismiss:                       "Balewalain",

    // Prefix:Hdr - Scope:top toolbar
    tipHdrSettings:                         "Buksan ang mga setting",
    tipHdrHelp:                             "Tulong",
    btnHdrRefresh:                          "I-refresh",
    tipHdrRefresh:                          "I-scan muli ang folder",
    tipHdrRefreshDisabled:                  "I-commit o i-discard muna ang mga nakabinbing pagbabago",
    btnHdrOpenFolder:                       "Buksan ang folder…",
    btnHdrCommit:                           "Kumpirmahin",
    tipHdrDigitsChapter:                    "Kabanata",
    tipHdrDigitsSlot:                       "Slot",
    tipHdrDigitsVersion:                    "Bersyon",
    tipHdrGroup:                            "Pagsamahin ang mga Larawan",
    tipHdrUngroup:                          "Paghiwalayin ang mga Larawan",
    tipHdrPreserveGaps:                     "Panatilihin ang mga puwang ng slot",
    tipHdrCompactOnDrop:                    "I-compact ang mga slot sa pag-drop",
    tipHdrCompactAll:                       "I-compact ang mga puwang ng slot sa lahat ng kabanata",

    // Prefix:DlgSettings - Scope:settings dialog
    ttlDlgSettings:                         "Mga Setting",
    tabDlgSettingsDisplay:                  "Display",
    tabDlgSettingsAbout:                    "Tungkol sa",

    // Prefix:DlgSettingsDisplay - Scope:settings dialog (Display tab)
    lblDlgSettingsDisplayLang:              "Wika",
    lblDlgSettingsDisplayTheme:             "Tema",
    btnDlgSettingsDisplayThemeDark:         "Madilim",
    btnDlgSettingsDisplayThemeLight:        "Maliwanag",

    // Prefix:DlgSettingsAbout - Scope:settings dialog (About tab)
    msgDlgSettingsAboutDesc:                "Pagkakasunod-sunod at muling pagbibigay ng numero sa mga file ng video shot sa pamamagitan ng drag-and-drop.",

    // Prefix:Chapter - Scope:per-chapter section in main view
    lblChapter:                             "Kabanata",
    lblChapterShots:                        "%N% kuha",
    lblChapterGaps:                         "%N% puwang",
    tipChapterLock:                         "I-lock ang Kabanata",
    tipChapterUnlock:                       "I-unlock ang Kabanata",
    tipChapterCompact:                      "I-compact ang mga puwang ng slot sa kabanatang ito",
    tipChapterCollapse:                     "I-collapse ang kabanata",
    tipChapterExpand:                       "I-expand ang kabanata",
    tipChapterDragHandle:                   "I-drag para muling ayusin ang kabanata",
    empChapterEmpty:                        "Walang laman na kabanata - mag-drop ng shot dito",
    btnChapterAdd:                          "+ Magdagdag ng kabanata",

    // Prefix:Shot - Scope:per-shot row
    lblShotAlts:                            "%N% alternatibo",
    lblShotFiles:                           "%N% file",
    tipShotThumbHint:                       "i-drag para ilipat/muling ayusin · i-click ang ▶ para sa preview",
    tipShotPileHint:                        "i-drag ang tumpok para ilipat lahat nang sabay-sabay",

    // Prefix:App - Scope:app-level empty states and dialogs
    ttlAppOpenFolder:                       "Buksan ang isang folder ng proyekto",
    msgAppOpenFolderDesc1:                  "Binabasa ng %APP% ang mga file na pinangalanang %PATTERN% (mga digit, pagkatapos ay opsyonal na suffix) at hinahayaan kang i-drag ang mga shot upang muling bilangin ang mga ito nang maramihan.",
    msgAppOpenFolderDesc2:                  "Ang mga lapad ay naka-configure bawat folder sa %INI%.",
    ttlAppNoMatch:                          "Walang katugmang mga file",
    msgAppNoMatchDesc:                      "Walang mga file sa folder na ito ang tumutugma sa pattern na %PATTERN%.",
    msgAppNoMatchHint:                      "Palitan ang pangalan ng ilang file nang manu-mano upang tumugma, pagkatapos ay pindutin ang I-refresh.",
    cfmAppPendingFolderSwitch:              "Mayroon kang nakabinbing pagpapalit ng pangalan. Itapon ang mga ito at magbukas ng ibang folder?",

    // Prefix:Unmatched - Scope:unmatched files panel
    lblUnmatched:                           "Hindi Tugma",
    empUnmatchedHint:                       "i-drag sa isang shot o kabanata upang italaga",
    tipUnmatchedCardHint:                   "i-drag upang italaga · i-click ang ▶ upang i-preview",

    // Prefix:Statusbar - Scope:bottom status messages
    msgStatusbarReady:                      "Handa",
    msgStatusbarWorking:                    "Gumagana…",
    msgStatusbarNoChanges:                  "Walang pagbabago",
    msgStatusbarPendingDiscarded:           "Mga nakabinbing pagbabago ay itinapon",
    msgStatusbarScanResult:                 "%N% file · %U% hindi tugma",
    msgStatusbarRenaming:                   "Pinapalitan ang pangalan ng %N% file…",
    msgStatusbarRenamed:                    "Pinalitan ang pangalan ng %N% file",
    msgStatusbarPendingRenames:             "%N% nakabinbing pagpapalit ng pangalan - I-commit upang ilapat",
    msgStatusbarChapterOverflow:            "Ang Kabanata %N% ay lumampas sa lapad ng digit (max %M%)",
    msgStatusbarAllChaptersUsed:            "Lahat ng %N% chapter slot ay ginamit na - dagdagan ang chapterDigits",
    msgStatusbarEmptyChapterAdded:          "Walang laman na kabanata %ID% idinagdag - i-drag ang mga shot, pagkatapos ay I-commit",
    msgStatusbarChapterLocked:              "Naka-lock ang Kabanata - i-unlock muna ito para ilipat ang mga shot.",
    msgStatusbarDropFolderFailed:           "Hindi mabasa ang path ng na-drop na folder",

    // Prefix:Osd - Scope:OS native dialog titles
    ttlOsdSelectFolder:                     "Piliin ang folder ng proyekto",

  },
};

export const LANGUAGES = [
  { key: 'ar', label: 'العربية' },
  { key: 'bn', label: 'বাংলা' },
  { key: 'bg', label: 'Български' },
  { key: 'ca', label: 'Català' },
  { key: 'zh_CN', label: '简体中文' },
  { key: 'zh_TW', label: '繁體中文' },
  { key: 'cs', label: 'Čeština' },
  { key: 'da', label: 'Dansk' },
  { key: 'de', label: 'Deutsch' },
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español' },
  { key: 'fa', label: 'فارسی' },
  { key: 'fi', label: 'Suomi' },
  { key: 'fr', label: 'Français' },
  { key: 'gl', label: 'Galego' },
  { key: 'el', label: 'Ελληνικά' },
  { key: 'ha', label: 'Hausa' },
  { key: 'he', label: 'עברית' },
  { key: 'hi', label: 'हिन्दी' },
  { key: 'hr', label: 'Hrvatski' },
  { key: 'hu', label: 'Magyar' },
  { key: 'hy', label: 'Հայերեն' },
  { key: 'id', label: 'Indonesia' },
  { key: 'it', label: 'Italiano' },
  { key: 'ja', label: '日本語' },
  { key: 'ko', label: '한국어' },
  { key: 'lt', label: 'Lietuvių' },
  { key: 'mk', label: 'Македонски' },
  { key: 'mr', label: 'मराठी' },
  { key: 'ms', label: 'Melayu' },
  { key: 'nl', label: 'Nederlands' },
  { key: 'nb', label: 'Norsk' },
  { key: 'pa', label: 'ਪੰਜਾਬੀ' },
  { key: 'pl', label: 'Polski' },
  { key: 'pt_BR', label: 'Português (Brasil)' },
  { key: 'pt_PT', label: 'Português (Portugal)' },
  { key: 'ro', label: 'Română' },
  { key: 'ru', label: 'Русский' },
  { key: 'sk', label: 'Slovenčina' },
  { key: 'sl', label: 'Slovenščina' },
  { key: 'sr', label: 'Српски' },
  { key: 'sv', label: 'Svenska' },
  { key: 'sw', label: 'Kiswahili' },
  { key: 'ta', label: 'தமிழ்' },
  { key: 'te', label: 'తెలుగు' },
  { key: 'th', label: 'ไทย' },
  { key: 'tl', label: 'Filipino' },
  { key: 'tr', label: 'Türkçe' },
  { key: 'uk', label: 'Українська' },
  { key: 'ur', label: 'اردو' },
  { key: 'vi', label: 'Tiếng Việt' },
  { key: 'yo', label: 'Yorùbá' },
];

const base = TRANSLATIONS.en;

// ⚠ CLAUDE: useT MUST return a useMemo-wrapped function. The bare form
//   `return (key) => ...` produces a new function every render, which destabilizes
//   every useCallback/useEffect depending on `t` → infinite render loop, EMFILE crashes.
//   See CLAUDE-i18n.md → "useT() must memoize". Do not "simplify" this.
export function useT(langKey) {
  return useMemo(() => {
    const lang = TRANSLATIONS[langKey] || base;
    return (key) => lang[key] ?? base[key] ?? key;
  }, [langKey]);
}

export function getT(langKey) {
  const lang = TRANSLATIONS[langKey] || base;
  return (key) => lang[key] ?? base[key] ?? key;
}
