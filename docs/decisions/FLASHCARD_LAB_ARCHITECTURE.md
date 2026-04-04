# Flashcard Lab Architecture

## Overview
The Flashcard Lab is a first-class learning and memory reinforcement tool available across both STAAR Power Portal (web) and RiseIQ (app). It complements the practice arena by focusing on concept recognition and quick recall rather than full question-answering.

## Data Model

### Flashcard
```
{
  front: string    // The prompt/question shown on the front of the card
  back: string     // The answer shown on the back
  hint: string     // A memory cue shown below the prompt (e.g., "Ask: WHY did they write this?")
  category: string // Subject area: "reading", "math", "science", "mixed"
}
```

### Deck
```
{
  deck: string          // Display name (e.g., "Reading Power Moves")
  cards: Flashcard[]    // Array of cards in this deck
}
```

### Organization
- Decks are organized by **grade** (K through 6)
- Each grade has 1-3 decks covering different subjects
- Grade 5 includes a Science deck
- K-2 decks are lighter (5-6 cards) and simpler in language
- Grades 3-6 decks are deeper (6-8 cards) with strategy content

## Deck Types

### Current (Phase 13)
- **Subject strategy decks**: Reading strategies, math moves, science essentials
- **Memory trick decks**: Mnemonics, quick-recall patterns
- **Foundation decks**: K-2 basics (letters, numbers, shapes)

### Future Expansion
- **Weak-spot decks**: Auto-generated from missed questions (requires per-question tracking)
- **Vocabulary decks**: Grade-level vocabulary words
- **Test-day decks**: Confidence and strategy reminders
- **Custom decks**: User-created cards (future account feature)

## User Flow
1. Student navigates to Flashcard Lab (from grade HQ or nav)
2. Selects a deck from available options
3. Sees card front with prompt + hint
4. Taps to flip → sees answer
5. Marks "Know It" (advance) or "Study More" (flag for review)
6. Progresses through deck with card counter
7. Can navigate prev/next freely

## Guest Mode Access
- Flashcards are 100% available in guest mode
- No account needed to use any deck
- Future accounts could add: custom decks, cloud-synced progress, weak-spot auto-generation

## Platform Implementation

### Web (STAAR Power Portal)
- Flashcard data embedded in app.js (same pattern as question banks)
- CSS flip animation with perspective transform
- Renders into `#flashcardLab` element on grade pages
- Deck selector pills + card flip + navigation + confidence buttons
- Mobile-friendly with touch targets

### RiseIQ (iOS App)
- Flashcard data in bundled flashcards.json
- FlashcardLoader service (same pattern as QuestionBankLoader)
- FlashcardLabView with SwiftUI 3D rotation animation
- Deck selector, card flip, navigation, confidence buttons
- Accessible from GradeHQView navigation

## Scalability
- Adding new decks: just add entries to the data structure
- Adding new grades: add grade key with deck arrays
- No code changes needed for new content — data-driven design
- Web and app can evolve deck content independently if needed
