# Sponsor & Support Seam Refinement — 2026-04-04

## Current State
- RISE Studio Labs credit appears in all footers
- No sponsor placements exist
- School mode config seam documented (Phase 2) but not built

## Refined Support/Sponsor Architecture

### Guiding Principles
1. **Never interrupt the kid's study flow** with fundraising or sponsor messaging
2. **Keep sponsor placement subtle and professional** — no banner ads or pop-ups
3. **Community-friendly messaging** that builds trust rather than creating pressure
4. **Support messaging stays outside the core learning workflow**

### Approved Future Placement Points

#### 1. Footer Support Line (Lowest friction)
```html
<footer>
  <strong>STAAR Power Portal</strong><br>
  Brought to you by www.risestudiolabs.com<br>
  <span class="small muted">Supported by [Sponsor Name] — helping keep this free for families</span>
</footer>
```

#### 2. Landing Page Community Card (Medium visibility)
A single card in the feature section or below grade selection:
```
"Community Supported"
This platform is free because people like you believe learning should be accessible.
[Optional: Sponsor logo or name]
```

#### 3. Power Pack PDF Sponsor Line (Print visibility)
A small line on the last page of each PDF: "Printing supported by [Sponsor Name]"

#### 4. Parent Dashboard Support Note (Parent-facing only)
A subtle note in the parent dashboard area — never visible to the child during study.

### What NOT To Do
- No pop-ups or modals asking for money
- No gated content ("pay to unlock Grade 5")
- No sponsor logos in the topbar or hero section
- No commercial product ads anywhere
- No "donate now" pressure on any child-facing surface

### Community Messaging Concept
If a gentle community-support message is ever added, use language like:
- "It's cool to learn — and it's cool that this is free."
- "Kept free by people who believe every kid deserves great study tools."

### Implementation Timing
- **Now**: Document the seam. No sponsor code.
- **When a sponsor appears**: Add their name to the footer and PDF — that's it.
- **When multiple sponsors exist**: Consider a small "Supporters" page linked from the footer.
