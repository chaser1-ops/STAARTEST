# Changelog

All notable changes to STAAR Power Portal documented here.
Follows [Keep a Changelog](https://keepachangelog.com/) format.

## [Phase 18 — Wave 1 Power Pack PDFs] — 2026-04-28

**PR:** [#4](https://github.com/chaser1-ops/STAARTEST/pull/4) (merge commit `03fac7e`)
**Production verification:** 7/7 PDFs serve 200, /power-pack shows 7 grade cards, Lighthouse mobile a11y on /power-pack = **100**

### Added
- **6 new branded PDFs** generated from Wave 1 Markdown source (`content-drafts/wave-1/`):
  - `garland_staar_kindergarten_power_pack.pdf` (262 KB, 26 pages)
  - `garland_staar_grade1_power_pack.pdf` (65 KB, 25 pages)
  - `garland_staar_grade2_power_pack.pdf` (69 KB, 25 pages)
  - `garland_staar_grade4_power_pack.pdf` (74 KB, 25 pages)
  - `garland_staar_grade5_power_pack.pdf` (92 KB, 33 pages — includes Science)
  - `garland_staar_grade6_power_pack.pdf` (79 KB, 27 pages)
  (Grade 3 untouched at 22 KB.)
- **`scripts/build_power_pack_pdfs.py`** — WeasyPrint-based Markdown → PDF converter, brand-consistent typography (cyan #5ee6ff / purple #9a7cff / pink #ff5fa2 gradient header, US Letter 0.6" margins, Inter font stack, footer on every page with page counter).
- **K visual rendering** — bracketed placeholders rendered as inline SVG:
  - 5 stars in a row (`<polygon>` star primitives, gold fill)
  - 8 apples (red circles with green stems)
  - Cookie group comparison (brown circles, labeled rows)
  - Ball group 3-way comparison (blue circles)
  - Shape primitives row (cyan circle, purple square, gold triangle, pink rectangle, each labeled)
  - Position diagram (`🐕 [next to] 📦` emoji approach for WeasyPrint compatibility)
- **/power-pack page** updated:
  - Canonical hrefs for all 7 grades pointing to `garland_staar_{grade}_power_pack.pdf`
  - Subtitles: "Pre-STAAR Foundations" (K/1/2), "TEKS-aligned STAAR Prep" (3/4/6), "TEKS-aligned + Science" (5)
  - Layout preserved: 4-column top row + 3-column bottom row, existing button color variants kept

### Notes
- Grade 3 PDF stays untouched (legacy artisan layout from earlier phase).
- Old stub PDFs (`gradek_power_pack.pdf` etc., 6-9 KB each) remain on disk but unreferenced; cleanup deferred.
- Public PSI API quota exhausted; verification used local `lighthouse@12` CLI against production URLs.
- Bracketed visual regex covers `[Visual: ...]` and `[Visual choices: ...]` patterns; unmatched patterns fall back to italic text.

### Deferred to Phase 19 polish
- Grade 6 box plot diagram (data display visualization)
- PDF cover thumbnails for /power-pack page card previews
- Spanish translations of Wave 1 packs
- Cleanup of old stub PDFs
- Cover page SVG illustration enhancement

---

## [Phase 16 + T12] — 2026-04-28

**Phase 16 PR:** [#2](https://github.com/chaser1-ops/STAARTEST/pull/2) (merge commit `1873c73`, 8 atomic commits)
**T12 verification PR:** [#3](https://github.com/chaser1-ops/STAARTEST/pull/3) (merge commit `227e5ca`)
**Lighthouse mobile a11y:** 88 → **100** across all 5 audited pages (`/`, `/gradek`, `/grade3`, `/power-pack`, `/sources`)

### Added (Part A — Accessibility)
- **`<main>` landmark** on all 14 HTML pages (was: section soup; now `<header>` → `<main>` → `<footer>` per WCAG landmark-one-main).
- **Underline rule for inline links** in body text (`p a`, `.lead a`, `.panel p a`, `.small a`, `ul.pretty a`, `main a` — excluding `.btn` / `.brand` / cards). Satisfies WCAG link-in-text-block.
- Profile setup modal (`#profileOverlay`): explicit dark text colors on `h2 / label / input / p` (was inheriting `--text` light on white card → ~1:1; now 6.65:1 to 17.7:1, AAA).
- Flashcard "Know It" button: bg `#14b8a6` → `#115e59` (teal-800) for white-text contrast `2.33:1 → 7.7:1`, AAA.
- Print-sheet `<strong>` colors: `#22c55e → #15803d` and `#4f46e5 → #3730a3` for AAA on white.
- Cheat-sheet card heading rename: `<h4> → <h3>` across all 7 grade pages (heading-order audit).

### Changed (Part A)
- `--muted: #8fa3c8 → #b3c0d8` (10:1 on dark bg, 8:1 on glass overlays — AAA).

### Added (Part B — Rich Results schema)
- **EducationalOrganization** JSON-LD on homepage (parent-org link to RISE Studio Labs, Texas areaServed, student audience).
- **Course** JSON-LD on all 7 grade pages — TEKS-aligned per-grade `teaches` values, `isAccessibleForFree: true`, `Offer { price: 0, USD }`.
- **BreadcrumbList** JSON-LD on all 12 sub-pages (Home → page name) for SERP breadcrumb enhancement.

**Validation:**
- 19 JSON-LD blocks total parse cleanly across all pages.
- Google Rich Results Test on `/grade3`: ✅ Breadcrumbs (1 valid), ✅ Course list item (1 valid), ✅ Paywalled Content (1 valid, auto-derived from `isAccessibleForFree`).

### Operations (Part C — T12 GSC Submission)
- **GSC property added** under `chase.neel@gmail.com`: `https://staartest.app` (URL prefix method).
- **Verification:** HTML tag method, token `LsMZpCIAn2T6On_B1eI5C0yTZnSf-l2utHyNwnjzGPo` injected via PR #3, GSC confirmed "Ownership verified".
- **Sitemap submitted** to GSC: `https://staartest.app/sitemap.xml` — Status: **Success**, **13 pages discovered**.
- **Indexing requested** for 8 priority URLs (all confirmed "added to a priority crawl queue", no quota errors):
  - `/` (was already on Google — re-requested)
  - `/grade3`, `/grade4`, `/grade5`, `/grade6`, `/gradek`
  - `/power-pack`, `/parent-dashboard`
- **Bing Webmaster Tools: deferred to manual operator follow-up** (~2 min via Bing → Google SSO → Import from GSC → submit sitemap). Not blocking; Bing crawls Google data so most of the work propagates from GSC.

### Notes
- Public PSI API was rate-limited (anon quota = 0/day), so a11y verification ran via local `lighthouse@12` CLI against deploy preview + production URLs (matches PSI methodology).
- Production etag chain through this session: `f189d73` → `ecc40d44` (docs closeout) → `0ebcd1ef` (Phase 16 merge) → updated again on GSC verification PR.

---

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
