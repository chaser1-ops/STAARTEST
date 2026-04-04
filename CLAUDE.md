# CLAUDE.md — STAAR Power Portal

## Project Identity
- **Product**: STAAR Power Portal (K-6 learning platform)
- **Live**: https://staartest.app
- **Repo**: https://github.com/chaser1-ops/STAARTEST (public)
- **Company**: RISE Studio Labs (risestudiolabs.com)
- **Credit**: "Brought to you by www.risestudiolabs.com"
- **Dedication**: "Inspired by Sebastian & Matilda — for our kids"

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
- site/grade[K,1-6].html — Grade study labs
- netlify.toml — Deployment config
