# Next Session Boot Context

**For:** Whatever AI agent reads this next (Claude Chat, ChatGPT, Claude Code)
**Last updated:** 2026-04-28 by Claude Code (post Phase 16 + T12 closeout)
**Project state:** Stable production — Phase 16 + T12 complete; Wave 1 content sprint active under ChatGPT supervision

## What just happened

Two web sessions closed:
- **Audit-Fix 2026-04-28** (PR #1, merge `48427a1`) — countdown SoT, PWA icon set, security headers, base SEO meta. Lighthouse a11y was 88.
- **Phase 16 + T12** (PR #2 merge `1873c73`, AV fixes through `20fc507`, GSC verification PR #3 merge `227e5ca`) — a11y to 100/100/100/100/100, full Rich Results schema (EducationalOrganization + Course + BreadcrumbList), GSC verified, sitemap submitted (13 pages), 8 priority URLs queued for indexing.

**Bing Webmaster Tools: deferred to operator manual follow-up** (Sign In flow blocked auto-driving; Bing accepts GSC import via Google SSO — ~2 min manual task).

Full change record in `CHANGELOG.md`. Operator handoff context in `CLAUDE.md`. Current state in `CURRENT_STATUS.md`. Audit directives + recon report archived in `audit/`.

## Active workstream

### Wave 1 content sprint (ChatGPT supervising)
- **Grades 4 and 5** — approved.
- **Grade 6** — in revision.
- **Grades 2, 1, K** — queued.
- **Local file ops:** `content-drafts/wave-1/` is the staging directory. Grade 4 draft expected in `~/Downloads`; file it into `content-drafts/wave-1/` as it lands. Grade 5 follows.
- **Domain portfolio decision** pending — see `audit/STAAR_Domain_Recon_2026-04-28.pdf`.

## What needs to happen next on the web platform

### 1. Bing Webmaster import (manual, ~2 min — operator)
Sign in at `https://www.bing.com/webmasters` with `chase.neel@gmail.com` (Google SSO accepted). Use "Import your sites from Google Search Console". Select `staartest.app` from imported list. Then Sitemaps → submit `https://staartest.app/sitemap.xml`.

### 2. Indexing follow-up (in ~7 days — light check)
Visit GSC → Indexing → Pages. Confirm `/`, `/grade3`, `/grade4`, `/grade5`, `/grade6`, `/gradek`, `/power-pack`, `/parent-dashboard` show status `Indexed` (not stuck on `Crawled — currently not indexed`). If any are stuck, that's signal to investigate (not a current blocker).

### 3. Phase 17 — `/learn` section build (queued)
Unlocks after Wave 1 + Wave 2 content lands. Don't start until ChatGPT signals the content is ready to wire into the site.

### 4. Power pack PDF content parity (folded into content sprints)
Grade 3 PDF is 22KB (real); others are 6-9KB stubs. Built out as content sprints progress.

## Project anchors

- **Repo:** https://github.com/chaser1-ops/STAARTEST
- **Production:** https://staartest.app
- **Local:** `/Volumes/AI_SSD/STARTESTING`
- **Source root:** `site/` (per `netlify.toml`)
- **Deploy model:** GitHub auto-deploy on push to `main`; preview on PR
- **Branch policy:** Branch deploys disabled (Netlify setting); only PRs trigger previews
- **GSC property:** `https://staartest.app` (URL prefix), owner `chase.neel@gmail.com`
- **GSC verification token:** `LsMZpCIAn2T6On_B1eI5C0yTZnSf-l2utHyNwnjzGPo` (in `site/index.html` `<head>` — do NOT remove)

## Critical gotchas

- Pretty URLs is enabled. `_redirects` 301 rules for `.html → clean URL` are bypassed by Pretty URLs serving the file directly. Canonical link tags handle SEO consolidation. Do not be surprised when `curl -I /grade3.html` returns 200.
- Single source of truth for STAAR test dates is `STAAR_DATES` IIFE in `site/js/app.js`. When TEA publishes 2027 calendar, update the `YEARS[2027]` entries to match.
- HSTS is active with `preload` directive. Do NOT add subdomains that won't serve HTTPS without first removing the preload flag.
- `_headers` CSP is `script-src 'self'` only. No inline scripts allowed. Service worker registration is in external `/js/sw-register.js`. If you need inline script in the future, either move it external or add a CSP nonce.
- Removing the `<meta name="google-site-verification">` from `site/index.html` will break the GSC property within ~24h. Don't remove unless deliberately switching verification methods.
- All 14 HTML pages now wrap content in `<main>...</main>` between `</header>` and `<footer>`. Preserve this structure.
- Cheat-sheet card titles are `<h3>` (not `<h4>`). The CSS rule `.cheat h3 { color: var(--gold); font-size: 1.1rem; margin: 0 0 8px }` controls their styling.

## PSI / Lighthouse note for next session

PageSpeed Insights public API anon quota is currently `0/day` in this region — use `npx lighthouse@12 <url> --only-categories=accessibility ...` against deploy-preview or production URLs instead of the API. PSI web UI also works but takes 2-5 min per run.

## Three-tier workflow reminder

1. ChatGPT (Supervising Architect) — high-level intent, strategy decisions
2. Claude Chat (Reviewing Architect) — directive authoring, audit, code review
3. Claude Code (Executor) — file operations, git, browser automation

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
