# Changelog

## 1.0.2 — 2026-08-17

- Fix the release build failing on GitHub — the pre-build step reached outside the repository for the translation splitter, which exists only in the local workspace
- Ship the translation splitter inside the repository as scripts/i18n-split.mjs, so a clone builds with npm alone

## 1.0.1 — 2026-08-17

- Load only the active language's translations at startup instead of all 50, shrinking the app's entry bundle
- Add opt-in main-process cold-start instrumentation, enabled with the YAIOL_STARTUP_LOG environment variable

## 1.0.0 — 2026-07-15

- Initial release
