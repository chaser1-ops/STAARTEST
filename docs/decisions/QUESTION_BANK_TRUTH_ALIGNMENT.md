# Question Bank Truth Alignment — 2026-04-04

## Truth Source
The **web app.js** is the canonical source for all question content. The iOS JSON files are exports from this source.

## Current Totals

| Grade | Web (app.js) | iOS (JSON) | Status |
|-------|-------------|------------|--------|
| K | 22 | 22 | Aligned |
| 1 | 22 | 22 | Aligned |
| 2 | 22 | 22 | Aligned |
| 3 | 42 | 42 | Aligned (synced in Phase 6) |
| 4 | 40 | 40 | Aligned |
| 5 | 48 | 48 | Aligned |
| 6 | 40 | 40 | Aligned |
| **Total** | **236** | **236** | **Fully aligned** |

## Sync Process
1. Edit questions in web `app.js` (canonical source)
2. Run `_export_questions.py` to regenerate JSON files
3. Copy JSON to `/Volumes/AI_SSD/RiseIQ/Sources/Data/`
4. Commit both repos

## Known Delta (Resolved)
- Phase 5 added 10 questions to web Grade 3 (32→42) but didn't update iOS JSON
- Phase 6 synced iOS Grade 3 JSON to match (32→42)
- All grades now fully aligned

## Future Guidance
- Always update web first, then export to iOS
- The export script handles format conversion automatically
- If iOS needs app-only content, document it as an intentional divergence
