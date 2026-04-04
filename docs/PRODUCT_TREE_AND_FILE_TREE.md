# Product Tree & File Tree

## Product Architecture

```
RISE Studio Labs (risestudiolabs.com)
└── Rise Intellect (riseintellect.com) — platform umbrella
    ├── STAAR Power Portal (staartest.app) — K-6 web study platform
    │   ├── 13 HTML pages
    │   ├── 236 practice questions (K-6)
    │   ├── 15 flashcard decks (~100 cards)
    │   ├── 7 PDF power packs
    │   ├── Guest profiles (localStorage)
    │   └── Auto-deploys via GitHub → Netlify
    └── RiseIQ (riseiq.app) — iOS companion app
        ├── SwiftUI (iOS 17+)
        ├── 236 questions in JSON
        ├── 15 flashcard decks in JSON
        ├── Profile, practice, flashcards, badges, missions
        └── Uploaded to App Store Connect (TestFlight)
```

## STAARTEST File Tree

```
STARTESTING/
├── site/                      ← Netlify publish directory
│   ├── index.html             ← Homepage (K-6 landing)
│   ├── gradeK.html            ← Kindergarten HQ
│   ├── grade1.html            ← 1st Grade HQ
│   ├── grade2.html            ← 2nd Grade HQ
│   ├── grade3.html            ← 3rd Grade HQ (42 questions)
│   ├── grade4.html            ← 4th Grade HQ (40 questions)
│   ├── grade5.html            ← 5th Grade HQ (48 questions + Science)
│   ├── grade6.html            ← 6th Grade HQ (40 questions)
│   ├── sources.html           ← Official source attributions
│   ├── parent-dashboard.html  ← Parent-facing overview
│   ├── power-pack.html        ← Study tools & printables
│   ├── terms.html             ← Terms of use
│   ├── privacy.html           ← Privacy policy
│   ├── css/style.css          ← Design system (~750 lines)
│   ├── js/app.js              ← App engine (~2200 lines)
│   └── assets/pdfs/           ← 7 PDF power packs (K-6)
├── docs/                      ← Product decisions and architecture
│   ├── decisions/             ← 11 product decision docs
│   ├── closeouts/             ← Session closeout packages
│   ├── SESSION_CLOSEOUT_INDEX.md
│   ├── PRODUCT_TREE_AND_FILE_TREE.md
│   ├── PHASE_HISTORY_SUMMARY.md
│   └── NEXT_BRANCH_RECOMMENDATIONS.md
├── netlify.toml               ← Deployment config
├── CLAUDE.md                  ← AI execution rules
├── README.md                  ← Public project overview
├── CURRENT_STATUS.md          ← Current state
├── NEXT_SESSION_BOOT.md       ← Next session startup
├── CHANGELOG.md               ← Version history
└── PRODUCT_ROADMAP.md         ← Shipped/next/future
```

## RiseIQ File Tree (top-level)

```
RiseIQ/
├── RiseIQ.xcodeproj/          ← Xcode project
├── RiseIQ/
│   ├── App/
│   │   ├── RiseIQApp.swift
│   │   └── ContentView.swift
│   ├── Models/
│   │   ├── Question.swift
│   │   ├── FlashCard.swift
│   │   └── UserProfile.swift
│   ├── Views/                 ← All SwiftUI views
│   ├── Data/
│   │   ├── questions.json     ← 236 questions
│   │   └── flashcards.json    ← ~100 flashcards
│   └── Assets.xcassets/       ← App icon (26 sizes + 1024px)
└── README.md
```
