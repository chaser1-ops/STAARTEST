# Design Merge Decision — 2026-04-04

## Context
Two reference ZIP builds were provided:
1. `staar_super_site_netlify_package.zip` — earlier build, preferred visual style
2. `staar_masterpiece_site_netlify_package.zip` — newer build, richer features

## Decision
Merge the best of both into a single canonical site.

## What came from Super (earlier build)
- Dark premium color palette (#09111f base, glass-morphism effects)
- Badge orb gradient in topbar
- Subject tab system (Reading / Math / Test Day)
- Memory tricks: P.A.W. and R.U.N.
- Printable study sheets with white background
- Overall sleeker, more premium visual identity
- Clean roadmap-step component

## What came from Masterpiece (newer build)
- Full localStorage progress engine
- Question bank with 20+ Grade 3 questions
- Badge system with rule-based unlocking
- Daily mission system (4-day rotation)
- Practice arena with 3 modes (Practice, Focus, Challenge)
- Missed-question replay
- Confidence check-in tracking
- Parent dashboard with subject strength snapshot
- Victory certificate generator
- Countdown timers for test windows
- SVG mascot character

## What was created new
- Grade selection HQ landing page (Grades 3–6)
- Grade-specific question banks for Grades 4, 5, 6
- Grade color tokens (cyan, gold, lime, purple)
- Grade-specific badges and memory tricks
- Grade-specific cheat sheet content
- Parent dashboard page (cross-grade)
- Power pack / printables page (cross-grade)
- Shared JS engine that adapts per grade via data-grade attribute
- "Enter Grade X HQ" CTA language
- RISE Studio Labs footer credit on all pages
