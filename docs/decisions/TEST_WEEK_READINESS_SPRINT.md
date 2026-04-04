# Test Week Readiness Sprint — Phase 14

## Context
STAAR Reading test: April 7-10, 2026
STAAR Math test: April 21-24, 2026
This phase ships on April 4 — 3 days before the first test.

## What Was Added

### Web — Test Week Mode Panel
A gold-bordered panel at the top of every grade dashboard showing:
- **Countdown**: Days to Reading test + days to Math test
- **Tonight's Best Move**: Single actionable recommendation based on current data:
  - Missed questions > 3 → "Replay your missed questions"
  - Streak < 2 → "Do 5 quick practice questions"
  - Accuracy < 70% → "Use flashcards to lock in concepts"
  - Strong student → "Try a Boss Battle for confidence"
- **Quick action buttons**: Flashcards / Practice Now / Missions

### Web — Parent Quick Start Tonight
Added to parent dashboard — 3 timed actions:
- 2 min: Flip through flashcards
- 5 min: Do 5 practice questions
- 10 min: Complete a full mission + replay missed

### RiseIQ — Test Week Banner
Added to GradeHQView:
- "TEST WEEK MODE" banner with countdown to both tests
- Quick action shortcuts: Flashcards / Practice / Boss Battle
- Orange-highlighted to signal urgency without panic

## Design Principles
- **Reduce decision friction**: Tell families exactly what to do tonight
- **Time-aware**: Recommendations adapt to the countdown
- **Confidence-building**: Never scary or pressure-heavy
- **Short sessions**: Emphasize 5-10 minute focused practice
- **Use existing systems**: Test Week Mode leverages existing practice, flashcards, missions, and missed-question replay — no new learning systems needed
