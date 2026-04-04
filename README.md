# STAAR Power Portal

A premium STAAR prep website for Texas students in Grades 3–6, featuring daily study missions, official-style practice questions, badges, progress tracking, missed-question replay, printable power packs, and parent dashboards.

## Live Site

**https://staartest.netlify.app/**

## Project Structure

```
STARTESTING/
├── site/                    # Canonical website (Netlify publish directory)
│   ├── index.html           # Landing page with grade selection
│   ├── grade3.html          # Grade 3 HQ (full study lab)
│   ├── grade4.html          # Grade 4 HQ
│   ├── grade5.html          # Grade 5 HQ
│   ├── grade6.html          # Grade 6 HQ
│   ├── sources.html         # Official source attributions
│   ├── parent-dashboard.html # Parent-facing progress overview
│   ├── power-pack.html      # Printable tools and cheat sheets
│   ├── css/style.css        # Design system
│   ├── js/app.js            # App engine (practice, missions, badges, etc.)
│   └── assets/              # Images, icons, PDFs
├── docs/                    # Session logs, decisions, closeouts
├── reference/               # Reference materials
├── archive/                 # Archived builds
├── netlify.toml             # Netlify deployment config
├── CLAUDE.md                # AI execution constitution
├── PROJECT_CHARTER.md       # Project charter
├── PRODUCT_ROADMAP.md       # Roadmap
├── CHANGELOG.md             # Version history
├── CURRENT_STATUS.md        # Current project state
└── NEXT_SESSION_BOOT.md     # Next session startup guide
```

## Tech Stack

- **Static HTML/CSS/JS** — no build tools, no dependencies
- **localStorage** — client-side progress tracking
- **Netlify** — static hosting with GitHub-backed continuous deployment

## Deploy

### Netlify (GitHub-backed)
1. Push to `https://github.com/chaser1-ops/STAARTEST`
2. Netlify auto-deploys from `site/` directory via `netlify.toml`

### Manual Fallback
1. Drag the `site/` folder contents into Netlify deploy

## Credit

Brought to you by [www.risestudiolabs.com](https://www.risestudiolabs.com)
