# Next Session Boot Context

**For:** Whatever AI agent reads this next (Claude Chat, ChatGPT, Claude Code)
**Last updated:** 2026-04-28 by Claude Code (post Phase 18 closeout)
**Project state:** Stable production — Wave 1 PDFs shipped (6/6); Phase 19 polish + Wave 2 content are next.

## What just happened

Three major phases shipped in the same session, all to production:
- **Audit-Fix 2026-04-28** (PR #1, merge `48427a1`) — countdown SoT, PWA icons, security headers, base SEO meta. Lighthouse a11y was 88.
- **Phase 16 + T12** (PR #2 merge `1873c73`, AV fixes through `20fc507`, GSC PR #3 merge `227e5ca`) — a11y to 100/100/100/100/100, full Rich Results schema, GSC verified + sitemap submitted, 8 URLs queued for indexing, Bing Webmaster imported via GSC SSO.
- **Phase 18 — Wave 1 Power Pack PDFs** (PR #4 merge `03fac7e`) — 6 new branded PDFs (K, 1, 2, 4, 5, 6) generated from approved Wave 1 Markdown via WeasyPrint pipeline; /power-pack page now surfaces all 7 grades.

Full change record in `CHANGELOG.md`. Operator handoff context in `CLAUDE.md`. Current state in `CURRENT_STATUS.md`. Audit + recon directives archived in `audit/`. Approved Wave 1 source Markdown in `content-drafts/wave-1/` (untracked by directive policy).

## What needs to happen next

### 1. Wave 2 content sprint (operator-driven, ChatGPT supervising)
Wave 2 = study-habit guides + parent guides. Feeds into `/learn` section build (Phase 17). Same flow as Wave 1: ChatGPT generates → operator saves to `~/Downloads` → Claude Chat reviews → Claude Code files to `content-drafts/wave-2/` → conversion directive → ships to `site/assets/pdfs/` (or in-page rendering for `/learn`).

### 2. Phase 19 — polish (small follow-up items, low priority)
- Grade 6 box plot diagram (math statistics visualization)
- PDF cover thumbnails for /power-pack page card previews
- Cleanup of orphaned old stub PDFs (`gradek_power_pack.pdf` etc., 6-9 KB each, now unreferenced)
- Cover page SVG brand-mark illustration
- Spanish translations of Wave 1 packs

### 3. Phase 17 — `/learn` section build
Unlocks after Wave 2 lands. Don't start until ChatGPT signals content is ready.

### 4. Indexing follow-up (in ~7 days, light check)
Visit GSC → Indexing → Pages. Confirm `/`, `/grade3`, `/grade4`, `/grade5`, `/grade6`, `/gradek`, `/power-pack`, `/parent-dashboard` show status `Indexed` (not `Crawled — currently not indexed`). If stuck, investigate (not a current blocker).

## Project anchors

- **Repo:** https://github.com/chaser1-ops/STAARTEST
- **Production:** https://staartest.app
- **Local:** `/Volumes/AI_SSD/STARTESTING`
- **Source root:** `site/` (per `netlify.toml`)
- **Deploy model:** GitHub auto-deploy on push to `main`; preview on PR
- **Branch policy:** Branch deploys disabled (Netlify setting); only PRs trigger previews
- **GSC property:** `https://staartest.app` (URL prefix), owner `chase.neel@gmail.com`
- **GSC verification token:** `LsMZpCIAn2T6On_B1eI5C0yTZnSf-l2utHyNwnjzGPo` (in `site/index.html` `<head>` — do NOT remove)
- **PDF generator:** `scripts/build_power_pack_pdfs.py` (WeasyPrint; Python venv at `/tmp/staar_pdf_venv` — recreate if cleaned)

## Critical gotchas

- Pretty URLs is enabled. `_redirects` 301 rules for `.html → clean URL` are bypassed by Pretty URLs serving the file directly. Canonical link tags handle SEO consolidation. Do not be surprised when `curl -I /grade3.html` returns 200.
- Single source of truth for STAAR test dates is `STAAR_DATES` IIFE in `site/js/app.js`. When TEA publishes 2027 calendar, update the `YEARS[2027]` entries to match.
- HSTS is active with `preload` directive. Do NOT add subdomains that won't serve HTTPS without first removing the preload flag.
- `_headers` CSP is `script-src 'self'` only. No inline scripts allowed. Service worker registration is in external `/js/sw-register.js`. If you need inline script in the future, either move it external or add a CSP nonce.
- Removing the `<meta name="google-site-verification">` from `site/index.html` will break the GSC property within ~24h.
- All 14 HTML pages wrap content in `<main>...</main>` between `</header>` and `<footer>`. Preserve this structure.
- Cheat-sheet card titles are `<h3>` (not `<h4>`). The CSS rule `.cheat h3 { color: var(--gold); font-size: 1.1rem; margin: 0 0 8px }` controls their styling.
- **PDF generator gotchas:** WeasyPrint cannot reliably render mixed `<rect>` + `<text>` SVGs alongside emoji content (causes silent rect-only rendering failures). Use `_dog_next_to_box()` pattern (all-emoji + position word span) for any future emoji-mixed visuals. Bracketed visual regex `\[Visual(?:\s+choices)?:\s*([^\]]+)\]` matches both `[Visual:` and `[Visual choices:` syntax — extend it for new patterns rather than building a separate regex.
- **CSS scoping in PDF generator:** the rule `h1:not(.cover-title) { display: none }` deliberately hides markdown-body H1s while preserving cover H1. If new CSS classes are added, ensure the cover-title H1 retains visibility.

## PSI / Lighthouse note

PageSpeed Insights public API anon quota is currently `0/day`. Use `npx lighthouse@12 <url> --only-categories=accessibility ...` against deploy-preview or production URLs. PSI web UI works but is slow (1-3 min per run; some runs hit 5+ min during peak times).

## Three-tier workflow reminder

1. ChatGPT (Supervising Architect) — high-level intent, content generation
2. Claude Chat (Reviewing Architect) — directive authoring, audit, code review
3. Claude Code (Executor) — file operations, git, browser automation, rendering

Directives flow as JSON files between sessions. Each tier validates before the next acts. Halt-and-report behavior on uncertainty is expected and rewarded.

## Companion Project

### RiseIQ iOS App
- **Local**: /Volumes/AI_SSD/RiseIQ
- **Repo**: https://github.com/chaser1-ops/H1STAARTESTAPP
- **Status**: Uploaded to App Store Connect (TestFlight), build 1.0 (1)

### Brand Architecture

| Layer | Name | Domain |
|-------|------|--------|
| Company | RISE Studio Labs | risestudiolabs.com |
| Platform | Rise Intellect | riseintellect.com |
| Web Product | STAAR Power Portal | staartest.app |
| iOS App | RiseIQ | riseiq.app |
