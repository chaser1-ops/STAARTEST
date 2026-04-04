# Public Domain Strategy — 2026-04-04

## Domain Roles (Locked)

| Domain | Role | Status |
|--------|------|--------|
| **staartest.app** | Primary public-facing product domain for students, parents, schools | Secured — not yet configured |
| **staartest.netlify.app** | Current live working URL (temporary until cutover) | LIVE with GitHub CD |
| **riseiq.app** | iOS app product domain | Secured (GoDaddy) |
| **riseintellect.com** | Umbrella platform brand (future broader education site) | Secured (GoDaddy) |
| **risestudiolabs.com** | Company website / credit domain | Active |

## Key Clarifications

### staartest.app is the primary kid/parent/school destination
- This is what goes on flyers, school communications, and word-of-mouth
- Short, memorable, directly tied to the product name
- Will serve the STAAR Power Portal website

### riseintellect.com is NOT the primary kid-facing URL
- It's the umbrella platform brand — for investors, partners, overview
- Future: landing page that routes to STAAR Power Portal and RiseIQ
- Not where students or parents should be sent first

### staartest.netlify.app remains live until cutover
- All current links still work
- GitHub continuous deployment active
- No changes needed to current hosting — cutover is additive

## DNS Configuration Needed (Operator Action)

### For staartest.app
When ready to cut over, the operator needs to:
1. Add `staartest.app` as a custom domain in Netlify
2. Update DNS for staartest.app to point to Netlify (A record → 75.2.60.5)
3. Add `www.staartest.app` CNAME → staartest.netlify.app
4. Netlify auto-provisions SSL

### For riseintellect.com (future)
- Currently parked on GoDaddy
- When ready: either point to Netlify for a landing page, or keep parked
- Not urgent — umbrella brand, not primary product URL
