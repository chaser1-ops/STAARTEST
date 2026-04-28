# CLAUDE.md — STAAR Power Portal

## Project Identity
- **Product**: STAAR Power Portal (K-6 learning platform)
- **Live**: https://staartest.app
- **Repo**: https://github.com/chaser1-ops/STAARTEST (public)
- **Company**: RISE Studio Labs (risestudiolabs.com)
- **Credit**: "Brought to you by www.risestudiolabs.com"
- **Dedication**: "Inspired by Sebastian & Matilda — for our kids"

## Audit Cadence

**Last full audit: 2026-04-28** — STAAR-AUDIT-FIX-2026-04-28
- PR #1, merge commit `48427a1`
- Three-tier workflow: external curl audit + Chrome runtime recon + filesystem recon
- 9 atomic commits across 39 files, 552 insertions / 31 deletions
- Production smoke test: 8/8 curl checks pass, 8/8 Chrome checks pass
- Lighthouse mobile (Slow 4G): Performance 98 / Accessibility 88 / Best Practices 100 / SEO 92
- Audit directives archived under `audit/` directory

### Backlog from this audit (not blocking)
1. **Accessibility pass** — Lighthouse 88; likely color contrast on `.muted` / `.small` classes against dark backgrounds. Quick wins available.
2. **Rich Results schema** — Add `EducationalOrganization` (homepage) + `Course` (per grade page) + `BreadcrumbList` (sub-pages) JSON-LD. Unlocks SERP enhancements.
3. **Power pack content parity** — Grade 3 PDF is 22KB (full pack); grades K, 1, 2, 4, 5, 6 PDFs are 6-9KB stubs. Build out to parity in a content sprint.
4. **`.html → 301` enforcement** — Currently bypassed by Pretty URLs. Canonical tags handle SEO; only worth revisiting if Pretty URLs is ever disabled.

## STAAR Test Window Dates

Dates live in `site/js/app.js` in the `STAAR_DATES` IIFE module (single source of truth).

```javascript
var YEARS = {
  2026: { reading: '2026-04-07', math: '2026-04-21', readingEnd: '2026-04-10', mathEnd: '2026-04-24' },
  2027: { reading: '2027-04-06', math: '2027-04-20', readingEnd: '2027-04-09', mathEnd: '2027-04-23' },
  2028: { reading: '2028-04-04', math: '2028-04-18', readingEnd: '2028-04-07', mathEnd: '2028-04-21' }
};
```

- 2027 and 2028 dates are estimates (2nd-3rd week of April pattern)
- **Update when TEA publishes the official 2027 STAAR calendar** — usually fall semester of prior year
- Auto-roll: when current date > `YEARS[currentYear].mathEnd`, advances to next year automatically
- Post-test transitional state (April 24 → August 31): countdown renders "Results coming soon — keep practicing for next year" instead of 0/0/0/0
- Headlines update dynamically via `data-staar-headline` attributes

## Path Rules
- **Allowed**: /Volumes/AI_SSD/STARTESTING, /Volumes/AI_SSD/RiseIQ
- **Forbidden**: Everything else

## Technical Rules
- Static HTML/CSS/JS only — no build tools
- localStorage for progress — no backend
- Responsive layout required
- All pages include RISE Studio Labs credit + dedication line
- Terms and Privacy pages exist at terms.html and privacy.html
- Netlify auto-deploys from site/ directory on push to main

## Key Files
- site/js/app.js — Main application engine (~2200 lines)
- site/css/style.css — Design system (~750 lines)
- site/index.html — Homepage
- site/grade[k,1-6].html — Grade study labs (lowercase k since 2026-04-28)
- netlify.toml — Deployment config

## Netlify Deploy Pipeline

- `git push origin main` IS the production deploy (Netlify webhook auto-builds; live in ~30-60s)
- Branch deploys are **disabled** — only PRs trigger preview builds
  (Netlify settings → Build & deploy → "Deploy only the production branch")
- Deploy preview URL pattern: `https://deploy-preview-{N}--staartest.netlify.app/`
- Pretty URLs is **enabled** and serves both `/grade3` and `/grade3.html` with status 200
  - Custom `_redirects` 301 rules for `.html → clean URL` do NOT fire because Pretty URLs intercepts first
  - Canonical `<link rel="canonical">` tags are the SEO consolidation mechanism
  - The one exception: `/gradeK.html → /gradek 301` works because the file was renamed to lowercase, so Pretty URLs cannot find it
- Source root is `site/` (per netlify.toml `publish = "site"`)
- Rollback: `git revert HEAD && git push origin main` → live in ~60s
