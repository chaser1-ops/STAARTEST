# Post-Test-Week Branch Recommendation

## Current Product Maturity

### Web (STAAR Power Portal — staartest.app)
- Live and auto-deploying
- K-6 platform with 236 questions, flashcards, boss battle, missions, rewards
- Test Week Mode with smart recommendations
- Responsive for phone/tablet/desktop
- Public GitHub repo, clean documentation
- Used by real families during STAAR testing week

### iOS (RiseIQ)
- Builds with zero errors, runs on simulator
- Practice engine, flashcards, boss battle, review, badges, missions
- Not yet on TestFlight (needs team ID, icon, archive)
- 236 questions in bundled JSON, fully aligned with web

### Infrastructure
- staartest.app live (Netlify DNS)
- GitHub continuous deployment
- Brand architecture locked (RiseIQ, Rise Intellect, RISE Studio Labs)

---

## Branch Options Evaluated

### Option A: TestFlight Push
**What**: Set team ID, create app icon, archive, upload to TestFlight, test on real device.
**Effort**: Low (1-2 hours of operator action + light code polish)
**Value**: HIGH — moves RiseIQ from "builds on simulator" to "real app on real phones"
**Risk**: Low — app is already stable, just needs operator-side Apple Developer actions
**Recommendation**: **Do this first.** It's the highest-value, lowest-effort next step.

### Option B: Account/Guest Implementation
**What**: Add optional sign-in for cross-device sync.
**Effort**: High (backend service, auth UI, data migration, testing)
**Value**: Medium — most families are fine with device-local for now
**Risk**: Medium — introduces backend complexity and maintenance burden
**Recommendation**: Defer until there's clear demand from multiple families or a school deployment.

### Option C: Deeper App Maturity
**What**: Add Study Hub content, more flashcard decks, per-question miss tracking, push notifications.
**Effort**: Medium (multiple features, each moderate)
**Value**: Medium-high — makes the app more competitive and complete
**Recommendation**: Good second priority after TestFlight. Focus on the features users ask for.

### Option D: Teacher/Parent Utility
**What**: Teacher dashboard, class progress view, shared assignments.
**Effort**: High (new user type, new views, potentially a backend)
**Value**: High for school adoption, but premature without school demand
**Recommendation**: Defer until a school formally requests it.

### Option E: Rise Intellect Landing Page
**What**: Build riseintellect.com as a brand/routing page.
**Effort**: Low (single static page)
**Value**: Low-medium — useful for investor/partner conversations, not urgent for families
**Recommendation**: Nice-to-have. Do it when there's a specific need (investor meeting, press, etc.)

---

## Recommended Sequence

### Immediate (This Week)
1. **TestFlight push** — operator sets team ID, creates icon, archives, uploads
2. **Real device testing** — walk through all flows on a physical iPhone
3. **Gather family feedback** — what worked, what confused, what's missing

### Next Sprint (Post-Test Week)
4. **App maturity based on feedback** — add the features users actually asked for
5. **Expand flashcard decks** — vocabulary, more strategies, test-day confidence
6. **Per-question miss tracking** — smarter weak-spot recommendations

### Later
7. **App Store submission** — when confident from TestFlight feedback
8. **Rise Intellect landing page** — when there's a routing need
9. **Optional accounts** — when cross-device sync is requested
10. **School features** — when a school formally engages

---

## Decision Framework
Ask: "Does this help a real family study better this month?"
- Yes → build it
- Maybe → gather feedback first
- No → defer it
