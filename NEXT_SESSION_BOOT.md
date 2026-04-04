# Next Session Boot — STAAR Power Portal

## Read First
1. This file (NEXT_SESSION_BOOT.md)
2. CURRENT_STATUS.md
3. docs/SESSION_CLOSEOUT_INDEX.md

## Project Identity
- **Product**: STAAR Power Portal
- **Live at**: https://staartest.app (backup: https://staartest.netlify.app)
- **Repo**: https://github.com/chaser1-ops/STAARTEST (public)
- **Local root**: /Volumes/AI_SSD/STARTESTING
- **Deployment**: GitHub → Netlify auto-deploy on push to main
- **Publish directory**: site/

## Companion Project
- **iOS App**: RiseIQ at /Volumes/AI_SSD/RiseIQ
- **Repo**: https://github.com/chaser1-ops/H1STAARTESTAPP
- **Status**: Uploaded to App Store Connect (TestFlight), build 1.0 (1)

## Brand Architecture
| Layer | Name | Domain |
|-------|------|--------|
| Company | RISE Studio Labs | risestudiolabs.com |
| Platform | Rise Intellect | riseintellect.com |
| Web Product | STAAR Power Portal | staartest.app |
| iOS App | RiseIQ | riseiq.app |

## Path Rules
- **Allowed**: /Volumes/AI_SSD/STARTESTING, /Volumes/AI_SSD/RiseIQ
- **Forbidden**: Everything else

## What's Live Right Now
- K-6 platform with 236 questions across 7 grades
- ~100 flashcards in 15 grade-aware decks
- Boss Battle, weekly missions, badges, streak tracking
- Victory Wall with collectible achievement banners
- Test Week Mode with smart recommendations
- Parent dashboard with next milestone + quick start
- 7 PDF power packs (K-6)
- Terms and Privacy pages
- Responsive for phone/tablet/desktop
- Guest mode (localStorage, no accounts)

## Recommended Next Steps
1. **Test RiseIQ on real device** via TestFlight — build is already uploaded, highest value next action
2. **Gather family feedback** after STAAR test week
3. **Expand flashcard decks** (vocabulary, more strategies)
4. **Expand question banks** toward 50+ per grade
5. **Build Rise Intellect landing page** at riseintellect.com
6. **Optional accounts** when cross-device sync is requested
