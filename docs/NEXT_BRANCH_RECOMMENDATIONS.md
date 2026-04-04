# Next Branch Recommendations

**Written**: April 4, 2026
**Context**: STAAR Power Portal is live and stable. RiseIQ build 1.0 (1) is uploaded to App Store Connect. STAAR test week begins April 7. This document recommends what to work on next.

---

## Recommended Sequence

### 1. TestFlight Device Testing (DO THIS FIRST)

**Why #1**: The build is already uploaded to App Store Connect. This is the single highest-value, lowest-effort action available. Everything else is secondary until RiseIQ is verified on a real device.

**What to do**:
- In App Store Connect, add yourself as a TestFlight tester
- Install TestFlight on a physical iPhone
- Download and install RiseIQ build 1.0 (1)
- Walk through every flow: profile setup, grade selection, practice modes, Boss Battle, flashcards, badges, missions, streak calendar, achievements
- Note anything that looks or feels wrong on real hardware (gestures, font sizes, scroll behavior, animation performance)

**Effort**: 1-2 hours, mostly operator action in App Store Connect + iPhone
**Risk**: Low — app is already built and stable
**Output**: Verified real-device experience or a short bug list to address

---

### 2. Gather Family Feedback After Test Week

**Why #2**: Real families are using the web platform during STAAR test week (Reading: Apr 7, Math: Apr 21). Their feedback is the highest-quality signal available for what to build next.

**What to ask**:
- Which grade pages did your kid use most?
- What confused them?
- What did they ask for that wasn't there?
- Did they use flashcards? Boss Battle? Missions?
- Did you (parent) use the parent dashboard?

**Output**: A prioritized list of real-user requests that replaces guesswork

---

### 3. Expand Flashcard Decks (Based on Feedback)

**Why #3**: The current 15 decks (~100 cards) cover core vocabulary and strategies but leave room for expansion. This is content work, not architecture work — low risk, high return.

**Good candidates for new decks**:
- Sight words by grade (K-2 especially)
- Academic vocabulary (Tier 2 words)
- Math vocabulary (fractions, geometry, measurement)
- Reading strategies (inference, main idea, text structure)
- Test-day confidence / mindset cards

**Effort**: Medium — writing content and adding JSON entries to app.js and the iOS flashcards.json
**Dependency**: None — can be done independently of any other work

---

### 4. Expand Question Banks Toward 50+ Per Grade

**Why #4**: Grades K, 1, and 2 have 22 questions each — below the 50-question target. Grade 3-6 are closer but still have room. More questions mean longer sessions before repetition and better coverage of tested standards.

**Priority order**: G1 and G2 first (most room to grow), then K, then fill gaps in 3-6.
**Effort**: Medium — writing quality questions to STAAR standards takes care
**Dependency**: None

---

### 5. App Maturity Based on TestFlight Feedback

**Why #5**: After real-device testing, there will likely be a short list of polish items. Address those before adding new features.

**Common items to watch for**:
- Safe area inset issues on newer iPhones
- Scroll behavior in long lists
- Font size legibility on smaller screens
- Any flow that requires more taps than it should

**Effort**: Low-medium depending on what surfaces
**Dependency**: Requires TestFlight results (step 1)

---

### 6. Rise Intellect Landing Page at riseintellect.com

**Why #6**: The domain is secured. A single static page positions Rise Intellect as the platform umbrella for both STAAR Power Portal and RiseIQ. Useful if you need to share a brand URL with a school, press contact, or investor.

**What to include**: Brand statement, product links (staartest.app, riseiq.app), company credit (RISE Studio Labs), contact or inquiry method.

**Effort**: Low — single static HTML page, same design system as STAAR Power Portal
**Dependency**: None — can be done anytime

---

### 7. App Store Submission (After TestFlight Confidence)

**Why #7**: Once TestFlight testing shows a stable, polished experience, App Store submission is the natural next step. Do not submit before real-device validation.

**What's needed**:
- Screenshot set (iPhone 6.7", 6.5", 5.5" minimum)
- App Store description copy
- Age rating questionnaire
- Privacy policy URL (terms.html and privacy.html already exist at staartest.app)

**Effort**: Medium — mostly Apple process overhead
**Dependency**: Requires TestFlight sign-off (step 1) and family feedback integration (step 2)

---

## What to Defer

**Optional accounts / cross-device sync**: High effort, introduces backend complexity, not demanded yet. Defer until multiple families explicitly request it or a school deployment requires it.

**Teacher/school dashboard**: High value for institutional adoption, but premature without a school formally requesting it. Defer until there is an actual school relationship.

---

## Decision Framework

Before starting any work, ask: "Does this help a real family study better this month?"
- Yes → build it
- Maybe → gather feedback first, then decide
- No → defer until the answer changes
