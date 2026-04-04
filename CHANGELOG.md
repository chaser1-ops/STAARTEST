# Changelog — STAARTEST

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
