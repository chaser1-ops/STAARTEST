# Next Session Boot Context

**For:** Whatever AI agent reads this next (Claude Chat, ChatGPT, Claude Code)
**Last updated:** 2026-04-28 by Claude Chat (Reviewing Architect)
**Project state:** Stable production — audit complete, indexing pending

## What just happened

Full site audit completed 2026-04-28. Three-tier review (external curl + Chrome runtime + filesystem recon). 9 atomic commits merged to main via PR #1 (`48427a1`). Production smoke test: 8/8 curl + 8/8 Chrome checks pass. Lighthouse mobile 98/88/100/92.

Full change record in `CHANGELOG.md`. Operator handoff context in `CLAUDE.md`. Current state in `CURRENT_STATUS.md`. Audit directives archived in `audit/` folder.

## What needs to happen next (in priority order)

### 1. T12 — Search engine submission (HIGH priority, not yet done)
Production is live but Google has not been told. Steps:
- Add property `https://staartest.app` to Google Search Console (URL prefix, HTML tag verification)
- Submit `https://staartest.app/sitemap.xml`
- URL Inspection + Request Indexing for: `/`, `/grade3`, `/grade4`, `/grade5`, `/power-pack`, `/parent-dashboard`
- Repeat for Bing Webmaster Tools (import from GSC)

### 2. Rich Results schema (medium priority, do BEFORE indexing requests for max yield)
Current schema is bare `WebSite` + publisher Org. Adding `EducationalOrganization` (homepage), `Course` (per grade page), `BreadcrumbList` (sub-pages) unlocks SERP enhancements. ~30 lines JSON-LD per page.

### 3. Accessibility pass (medium priority)
Lighthouse 88 → likely 95+ with one focused session: contrast audit on `.muted` / `.small`, ARIA labels on interactive components, focus rings on avatar grid, alt text on mascot SVG.

### 4. Power pack content parity (lower priority, content work)
Grade 3 PDF is 22KB (real pack); other grades are 6-9KB stubs. Content build-out to parity.

## Project anchors

- **Repo:** https://github.com/chaser1-ops/STAARTEST
- **Production:** https://staartest.app
- **Local:** `/Volumes/AI_SSD/STARTESTING`
- **Source root:** `site/` (per `netlify.toml`)
- **Deploy model:** GitHub auto-deploy on push to `main`; preview on PR
- **Branch policy:** Branch deploys disabled (Netlify setting); only PRs trigger previews

## Critical gotchas

- Pretty URLs is enabled. `_redirects` 301 rules for `.html → clean URL` are bypassed by Pretty URLs serving the file directly. Canonical link tags handle SEO consolidation. Do not be surprised when `curl -I /grade3.html` returns 200.
- Single source of truth for STAAR test dates is `STAAR_DATES` IIFE in `site/js/app.js`. When TEA publishes 2027 calendar, update the `YEARS[2027]` entries to match.
- HSTS is active with `preload` directive. Do NOT add subdomains that won't serve HTTPS without first removing the preload flag.
- `_headers` CSP is `script-src 'self'` only. No inline scripts allowed. Service worker registration is in external `/js/sw-register.js`. If you need inline script in the future, either move it external or add a CSP nonce.

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
