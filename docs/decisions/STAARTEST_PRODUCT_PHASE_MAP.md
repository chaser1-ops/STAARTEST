# STAARTEST Product Phase Map

## Where We Are Now (Post Phase 12)

### Web (STAAR Power Portal)
- **Live at staartest.app** with GitHub CD
- K-6 platform with 236 questions, 7 PDFs, 11 pages
- Kid profiles, Boss Battle, weekly missions, Victory Wall
- Responsive for phone/tablet/desktop
- Guest mode (localStorage)

### iOS (RiseIQ)
- **Builds and runs** on simulator (zero errors)
- K-6 with 236 questions in JSON
- Practice engine (3 modes + Boss Battle)
- Badges, missions, streak calendar, achievements
- About view with brand credits
- Guest mode (AppStorage)

### Infrastructure
- staartest.app → Netlify DNS
- GitHub repos (STAARTEST public, H1STAARTESTAPP)
- Xcode project with valid pbxproj
- 7 PDF power packs

---

## What's Next: Recommended Phase Sequence

### Near-Term (Next 1-2 Phases)
1. **TestFlight beta** — set team ID, icon, archive, upload
2. **Real device testing** — walk through all flows on phone
3. **Study Hub content** in RiseIQ (cheat sheets from web)
4. **App icon design** — 1024x1024 for App Store

### Medium-Term (Next 3-5 Phases)
5. **Question bank expansion** — target 50+ per mature grade
6. **Rise Intellect landing page** at riseintellect.com
7. **Optional accounts** (Phase B of account strategy)
8. **App Store submission** — metadata, screenshots, review
9. **riseiq.app landing page** — app download redirect

### Long-Term (Future)
10. **School accounts** (Phase C) when district requests
11. **Teacher dashboard** for classroom use
12. **Grade 7-8 expansion**
13. **Cross-device sync** for signed-in users
14. **Premium family features** (data export, detailed reports)

---

## Decision Framework for Next Phase
Ask: "Does this make the product more useful for a real family this week?"
- If yes → do it
- If no → defer it
- If maybe → document it and move on
