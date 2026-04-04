# Current Status — STAARTEST

**Last updated**: 2026-04-04 (Phase 11)

## Website
- **State**: Live and production-ready
- **Version**: v5.0.0+
- **Public domain**: staartest.app (DNS pointed to Netlify, propagating)
- **Netlify URL**: staartest.netlify.app (active backup)
- **Pages**: 11 (index, gradeK, grade1-6, sources, parent-dashboard, power-pack)
- **Architecture**: K-6 platform with "Starter HQ" (K-2) and "Full HQ" (3-6) tiers
- **Features**: Kid profiles, practice arena (4 modes incl. Boss Battle), weekly missions, badges (6-8/grade), streak tracking, confetti, Victory Wall with collectible banners, milestone certificates, upgraded parent dashboard with smart suggestions + next milestone, Grade 5 Science, 7-day streak calendar
- **Questions**: K (22), G1 (22), G2 (22), G3 (42), G4 (40), G5 (48 incl. Science), G6 (40) — 236 total
- **PDFs**: All K-6 grades have power packs (7 total)
- **Mobile**: Responsive for phone (600px), tablet (768px), desktop with touch-friendly targets

## Repo
- **Local**: `/Volumes/AI_SSD/STARTESTING`
- **Remote**: `https://github.com/chaser1-ops/STAARTEST` (public)
- **Branch**: `main`
- **Deployment**: GitHub-backed continuous deployment (auto-deploys on push)

## RiseIQ iOS App
- **Local**: `/Volumes/AI_SSD/RiseIQ`
- **Remote**: `https://github.com/chaser1-ops/H1STAARTESTAPP`
- **State**: Builds and runs on simulator (zero errors, zero warnings)
- **Bundle ID**: com.risestudiolabs.riseiq
- **Source files**: 21 Swift + 7 JSON (236 questions)
- **Features**: Profile, K-6 grades, practice engine (3 modes), badges, missions, 7-day streak calendar, achievements, About view
- **TestFlight**: Checklist ready, operator needs to set team ID + icon + archive

## Brand Architecture
| Layer | Name | Domain | Status |
|-------|------|--------|--------|
| Company | RISE Studio Labs | risestudiolabs.com | Active |
| Platform | Rise Intellect | riseintellect.com | Secured |
| Web Product | STAAR Power Portal | staartest.app | DNS configured |
| iOS App | RiseIQ | riseiq.app | Secured |
