# School Mode & Sponsor Seam Architecture — 2026-04-04

## Context
The site is built primarily with Harmony Science Academy in Garland, Texas in mind, but must remain broadly usable for other schools and future branded editions.

## Current State
- Test dates reference "Garland ISD" in the countdown section and cheat sheets
- No school-specific branding beyond these references
- No sponsor placements
- RISE Studio Labs credit in all footers

## Documented Architecture Seam

### School Config Layer (Future)
A lightweight school-context system can be added without a backend by introducing a `school-config.js` file:

```javascript
// school-config.js — loaded before app.js
window.STAAR_SCHOOL = {
  name: "Harmony Science Academy",
  district: "Garland ISD",
  shortName: "HSA Garland",
  logo: null, // path to school logo if provided
  testWindows: {
    reading: { start: "2026-04-07", end: "2026-04-10", grades: "3-5" },
    math: { start: "2026-04-21", end: "2026-04-24", grades: "3-5" }
  },
  colors: null, // { primary, secondary } for school-branded accent
  sponsorLine: null // e.g. "Sponsored by [PTA Name]"
};
```

The app.js engine would check `window.STAAR_SCHOOL` and use its values for:
- Test date displays
- District name references
- Optional school logo in the topbar
- Optional sponsor line in the footer

### Default Behavior
If `school-config.js` is not loaded, the app falls back to hardcoded Garland ISD defaults — exactly as it works today. Zero regression.

### Multi-School Editions
To create a school-specific edition:
1. Copy the `site/` directory
2. Add/modify `school-config.js` with school-specific data
3. Optionally add school logo to `assets/images/`
4. Deploy to a separate Netlify site or subdomain

This requires NO backend, NO database, NO multi-tenant system. Just a config file swap.

### Sponsor Integration Points
Safe, non-tacky sponsor placement options:
1. **Footer line**: "Supported by [Sponsor Name]" alongside RISE Studio Labs credit
2. **Landing page card**: A small "Community Partner" card in the feature grid
3. **Power Pack PDF**: Sponsor logo on printable materials

Rules for sponsors:
- Never interrupt the study flow
- Never gate content behind sponsor interaction
- Keep placement subtle and professional
- PTA/PTO sponsors are preferred over commercial sponsors

### White-Label Potential
For future white-label school versions:
- CSS variables make retheming straightforward (change `--hot`, `--cyan`, etc.)
- School config layer handles text/branding
- Content (questions, cheat sheets) remains the same across editions
- Only visual identity and district-specific dates change

## Decision
- **Now**: Document the seam. Keep Garland ISD as default context. No config system built yet.
- **Next phase**: If a second school requests the product, implement the config layer.
- **Never**: Don't build a multi-tenant admin portal unless there's clear demand.

## Rise Intellect / RiseIQ Alignment
The future platform umbrella (Rise Intellect) and product module (RiseIQ) can adopt this same config pattern at a higher level — each "product" within Rise Intellect has its own config and branding while sharing the core engine.
