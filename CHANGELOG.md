# Changelog — STAARTEST

## v4.0.0 — 2026-04-04 (Phase 3: K-6 Platform Foundation)
### Added
- K-6 platform architecture: Kindergarten, Grade 1, and Grade 2 Starter HQ pages
- Grade tiering system: "Starter HQ" (K-2) and "Full HQ" (3-6) with visual badges
- PDF power packs for Grades 4, 5, and 6 (reading/math/science cheat sheets, memory tricks, test day tips, certificates)
- K-2 question banks: Kindergarten (12), Grade 1 (12), Grade 2 (14) — age-appropriate content
- K-2 badge definitions (6 per grade)
- K-2 study hub cheat sheets (letters, numbers, shapes, counting, stories, vocabulary)
- Grade 5 Science cheat sheet panel in study hub

### Expanded
- Grade 4 questions: 28 → 40 (added viewpoint, poetry rhythm, multiple meaning, angles, line plots, rounding)
- Grade 5 questions: 38 → 48 (added dividing decimals, prime/composite, inherited traits, simple machines)
- Grade 6 questions: 28 → 40 (added unreliable narrator, theme across genres, GCF/LCM, box plots)
- Total questions across platform: 126 → 188

### Changed
- Homepage reframed from "Grades 3-6 Study HQ" to "K-6 Learning Platform"
- Grade selection now shows tiered sections with Starter Zones and Full Study Labs
- Navigation updated on sources, parent dashboard, and power pack pages for K-6
- Parent dashboard grade cards expanded to 7 (K through 6)
- Power pack page now links all 4 PDF packs (Grades 3-6)
- Profile setup now includes K, 1, 2 in grade selection

### Documented
- K-6 platform direction (docs/decisions/K6_PLATFORM_DIRECTION.md)
- Grade tiering strategy (docs/decisions/GRADE_TIERING_STRATEGY.md)
- Sponsor/support seam refinement (docs/decisions/SPONSOR_SUPPORT_SEAM_REFINEMENT.md)

## v3.0.0 — 2026-04-04 (Phase 2: Legendary Product Expansion)
### Added
- Kid profile system: nickname, avatar selection (16 options), grade, localStorage persistence
- Profile bar on all grade pages showing identity and streak
- Weekly mission rhythm: Mon=Reading, Tue=Math, Wed=Mixed, Thu=Weak Spots, Fri=Boss Battle
- Boss Battle mode: 10 random questions, 20-second timer, score verdict, Boss Slayer badge
- Streak system: consecutive study day tracking, current + longest streak, fire visualization
- Confetti effects on badge unlock, boss battle victory, streak milestones
- Grade 5 Science: 8 questions + Science tab with cheat sheets (matter, ecosystems, weather, force/motion)
- Upgraded parent dashboard: subject strength bars, skill health labels, activity table, suggested next action

### Expanded
- Question banks: Grade 3 (20→32), Grade 4 (10→28), Grade 5 (10→38 incl. Science), Grade 6 (10→28)
- Total questions: 50 → 126
- Badges expanded to 8 per grade (including Boss Slayer, Study Streak, Science Explorer)

### Documented
- School mode / sponsor seam architecture (docs/decisions/SCHOOL_MODE_AND_SPONSOR_SEAM.md)
- Phase 2 product direction (docs/decisions/PHASE2_PRODUCT_DIRECTION.md)
- Rise Intellect / RiseIQ future platform alignment notes
- iOS companion app roadmap updated with web-to-iOS module mapping

## v2.0.0 — 2026-04-04
### Added
- Complete website redesign merging two reference builds
- Dark premium design system (super build aesthetic + masterpiece features)
- Landing page with grade selection HQ for Grades 3–6
- Grade 3 HQ with 20+ practice questions, cheat sheets, missions, badges
- Grade 4 HQ with 10+ practice questions and grade-specific content
- Grade 5 HQ with 10+ practice questions and grade-specific content
- Grade 6 HQ with 10+ practice questions and grade-specific content
- Sources page with official TEA/Garland ISD attributions
- Parent dashboard page with progress overview
- Power pack / printables page with cross-grade memory tricks
- Practice arena with 3 modes: Practice, Focus (45s timer), Challenge (30s timer)
- localStorage progress tracking isolated per grade
- Badge system with grade-specific badges
- Daily mission system (4-day rotation)
- Missed-question replay
- Confidence check-in tracking
- Victory certificate generator
- Countdown timers for STAAR test windows
- Subject tabs (Reading, Math, Test Day) per grade
- Memory tricks: P.A.W., R.U.N., S.T.A.R., C.L.A.I.M., S.O.L.V.E.
- RISE Studio Labs footer credit on all pages
- Responsive layout for desktop and mobile
- Print-friendly styles
- Full project governance docs
- netlify.toml for GitHub-backed deployment
- Git repo with GitHub remote

### Source Attribution
- Visual style foundation: `staar_super_site_netlify_package.zip` (dark premium aesthetic)
- Feature/content foundation: `staar_masterpiece_site_netlify_package.zip` (rich portal features)
- Both builds merged, refined, and expanded
