# STAAR Power Portal

A K-6 learning platform for Texas STAAR test preparation. Practice questions, flashcards, daily missions, badges, progress tracking, and printable study tools — all free for families.

**Live at [staartest.app](https://staartest.app)**

## Features

- **K-6 Grade Coverage** — Kindergarten through Grade 6 with age-appropriate content
- **236 Practice Questions** — Reading, Math, Science (Grade 5), and mixed review
- **Flashcard Lab** — Flip-to-learn cards with grade-aware decks and memory hints
- **Boss Battle Mode** — Timed challenge mode for test-day confidence
- **Daily Missions** — Day-of-week study rhythm (Reading / Math / Mixed / Review / Boss Battle)
- **Victory Wall** — Collectible achievement banners earned at real milestones
- **Kid Profiles** — Nickname, avatar, grade selection (no account required)
- **Streak Tracking** — 7-day study calendar with fire visualization
- **Parent Dashboard** — Subject strength bars, skill health, suggested next steps
- **7 PDF Power Packs** — Printable cheat sheets, memory tricks, and certificates
- **Test Week Mode** — Countdown + "Tonight's Best Move" recommendations
- **Responsive** — Phone, tablet, and desktop with touch-friendly targets

## Tech Stack

- Static HTML/CSS/JS — no build tools, no dependencies
- localStorage for progress tracking — no backend, no accounts
- Netlify hosting with GitHub continuous deployment

## Project Structure

```
site/                  → Published website (Netlify publish directory)
  ├── index.html       → Landing page with K-6 grade selection
  ├── gradeK-6.html    → Grade-specific study labs
  ├── css/style.css    → Design system
  ├── js/app.js        → Application engine
  └── assets/pdfs/     → Printable power packs
docs/                  → Product decisions and architecture docs
netlify.toml           → Deployment configuration
```

## Deploy

Netlify auto-deploys from `main` branch. Publish directory: `site/`.

Manual fallback: drag `site/` folder into Netlify deploy panel.

## Brand

- **Company**: [RISE Studio Labs](https://risestudiolabs.com)
- **Platform**: [Rise Intellect](https://riseintellect.com)
- **iOS App**: [RiseIQ](https://riseiq.app)

*Inspired by Sebastian & Matilda — for our kids*
