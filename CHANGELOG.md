# Changelog

All notable changes to STAAR Power Portal documented here.
Follows [Keep a Changelog](https://keepachangelog.com/) format.

## [Audit Fix 2026-04-28] — 2026-04-28

**Merge commit:** `48427a1` (PR #1)
**Audit basis:** Three-tier review (curl external audit + Chrome runtime recon + filesystem recon)
**Live verification:** 16/16 smoke tests pass; Lighthouse mobile 98/88/100/92

### Fixed (P0)
- **Expired countdown bug** — STAAR test windows (April 7-10, April 21-24, 2026) had passed; site rendered 0/0/0/0 to every visitor. Refactored two duplicated date constants in `app.js:608-609` and `:894-895` into single `STAAR_DATES` IIFE module with auto-roll to next year and post-test transitional state.
- **PWA install broken** — `manifest.json` had empty `icons: []`. Generated brand-aligned icon set (8 sizes: 72/96/128/144/152/192/384/512), favicon (ICO + SVG), apple-touch-icon, and 1200x630 og-image from master SVG.
- **Social sharing broken** — No `og:image` anywhere on the site. Added OG/Twitter Card meta to all 13 pages pointing to brand-aligned 108KB og-image.
- **Sub-pages SEO-incomplete** — 12 of 13 pages had no canonical, no OG, no manifest link, no theme-color, no favicon. Injected standard head block.
- **Sitemap canonicalization** — Replaced `.html` URLs (which served as duplicates) with clean URLs + `lastmod` + `changefreq`.

### Added (P1)
- **Service worker** (`site/sw.js`) — Cache-first for static assets, network-first for HTML. CSP-safe registration via external `site/js/sw-register.js`.
- **Security headers** — Added Content-Security-Policy and Strict-Transport-Security (with `includeSubDomains; preload`) to `_headers`. Hardened existing X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Asset cache rules** — 1-year immutable on `/css /js /assets`; revalidate-every-visit on HTML; 1-day on `manifest.json`.
- **Grade 3 PDF alias** — `_redirects` rule maps `/assets/pdfs/grade3_power_pack.pdf` → `garland_staar_grade3_power_pack.pdf` so external bookmarks to the conventional naming pattern resolve.
- **`/sources` page** — Added `<h1>Sources & Citations</h1>` and meta description.
- **Meta descriptions** — Added to `404.html`, `privacy.html`, `terms.html`, `sources.html`.
- **netlify.toml documentation** — Inline comments explaining Pretty URLs interaction with `_redirects`.

### Changed
- **Renamed** `site/gradeK.html` → `site/gradek.html` (filesystem case standardization to match Pretty URLs lowercased output).
- **Renamed** `site/assets/pdfs/gradeK_power_pack.pdf` → `site/assets/pdfs/gradek_power_pack.pdf`.
- **Twitter Card** upgraded from `summary` to `summary_large_image`.

### Repo Hygiene
- Added `.forgestate.json`, `.DS_Store`, `staar_*_site_netlify_package.zip` to `.gitignore`.
- Removed empty `archive/` and `reference/` directories.
- Moved legacy zips to `/Volumes/AI_SSD/admin/staar-legacy-zips/` for archival.

### Notes
- `.html → clean URL` 301 redirects in `_redirects` do not fire because Netlify Pretty URLs intercepts requests first; canonical link tags handle SEO consolidation instead.
- HSTS deployed value is `max-age=31536000` (1 year, Netlify default override) rather than directive-specified `max-age=63072000` (2 years). Both qualify for HSTS preload.

---

## 2026-04-04

### Added
- Test Week Mode with countdown to STAAR Reading (Apr 7) and Math (Apr 21)
- "Tonight's Best Move" personalized study recommendations
- Parent Quick Start with timed study actions (2/5/10 min)
- Flashcard Lab with ~100 cards across 15 grade-aware decks
- CSS flip animation for flashcards with deck selector
- Flashcard sections and nav links on all 7 grade pages
- Collectible Victory Wall with 8 milestone-based achievement banners
- Milestone-gated Study Champion certificate
- Kid profile system (nickname, avatar, grade selection)
- Boss Battle mode (10 questions, 20-second timer)
- Weekly mission rhythm (day-of-week themed study plan)
- Streak tracking with 7-day calendar and fire visualization
- Confetti effects on achievements
- Grade 5 Science (questions + study hub cheat sheets)
- Upgraded parent dashboard with strength bars, skill health, next milestone
- K-6 platform architecture with Starter HQ (K-2) and Full HQ (3-6) tiers
- 236 practice questions across K-6
- 7 PDF power packs with cheat sheets, memory tricks, certificates
- Mobile responsive design (768px tablet + 600px phone breakpoints)
- Touch-friendly targets (44-48px minimum)
- Dark premium design system
- "Inspired by Sebastian & Matilda" dedication on all pages
- RISE Studio Labs credit on all pages
- GitHub-backed Netlify continuous deployment
- staartest.app custom domain with Netlify DNS
