# CLAUDE.md — STAARTEST Project Constitution

## Project Identity
- **Project**: STAARTEST (STAAR Power Portal)
- **Website repo**: https://github.com/chaser1-ops/STAARTEST
- **iOS repo**: https://github.com/chaser1-ops/H1STAARTESTAPP
- **Netlify target**: https://staartest.netlify.app/
- **Brand credit**: "Brought to you by www.risestudiolabs.com" on every main page footer

## Path Rules
- **Allowed**: `/Volumes/AI_SSD/STARTESTING`, `/Volumes/AI_SSD/RiseIQ`
- **Forbidden**: Everything else. Do not read, write, scan, or infer from any other directory.
- If work outside these two paths becomes necessary, STOP and request written approval.

## Project Structure
- `site/` — Canonical website files (HTML, CSS, JS, assets). This is the Netlify publish directory.
- `docs/` — Session logs, decisions, closeouts
- `reference/` — Reference materials
- `archive/` — Archived builds and old versions

## Commit Discipline
- Use incremental commits with clear, descriptive messages
- Never force-push to main
- Always verify `git status` is clean before declaring done

## Session Requirements
- Update `docs/session_logs/` with a session log for each working session
- Update `CURRENT_STATUS.md` at the end of each session
- Update `NEXT_SESSION_BOOT.md` so the next session can start cleanly
- Produce a closeout report in `docs/closeouts/` for significant milestones

## Technical Rules
- Static HTML/CSS/JS only — no build tools unless explicitly approved
- localStorage for progress tracking — no backend
- Responsive layout required (desktop + mobile)
- All pages must include RISE Studio Labs footer credit
- Keep deployment simple for Netlify static hosting
