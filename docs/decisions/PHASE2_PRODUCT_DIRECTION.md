# Phase 2 Product Direction — 2026-04-04

## Evolution Summary
Phase 2 evolves the site from a static study portal into a product with identity, motivation loops, and structured learning rhythms — while keeping the static Netlify-friendly architecture.

## Key Product Decisions

### 1. Kid Profile System
- **Approach**: localStorage-only, no real auth
- **Why**: Kids feel ownership without account friction. Parents don't need to manage credentials.
- **Future**: When login is needed, Netlify Identity or a lightweight auth layer can wrap the existing profile system. The localStorage profile becomes the "offline mode" fallback.

### 2. Weekly Mission Rhythm
- **Approach**: Day-of-week detection drives mission suggestions
- **Why**: Returning students always have a clear next action. Reduces decision fatigue.
- **Structure**: Mon=Reading, Tue=Math, Wed=Mixed, Thu=Weak Spots, Fri=Boss Battle, Weekend=Free

### 3. Boss Battle Mode
- **Approach**: 10 random questions, 20-second timer, score-based verdict
- **Why**: Adds stakes and replay value. Kids love "boss fight" framing.
- **Badge**: "Boss Slayer" unlocked at 7/10 or better

### 4. Grade 5 Science
- **Decision**: INCLUDED
- **Justification**: STAAR tests Science at Grade 5. Omitting it would be a product gap.
- **Scope**: 8 science questions covering matter, ecosystems, weather, force/motion, earth/space, light/sound, engineering, energy. Science tab in study hub with cheat sheets.
- **Architecture**: `science` added as a valid subject in the engine. Science filter pill appears only on Grade 5 pages.

### 5. Question Bank Expansion
- Grade 3: 32 questions (was 20)
- Grade 4: 28 questions (was 10)
- Grade 5: 38 questions including 8 Science (was 10)
- Grade 6: 28 questions (was 10)
- Total: 126 questions (was 50)

### 6. Streak System
- Consecutive study days tracked (3+ questions = valid study day)
- Current streak and longest-ever streak displayed
- Fire emoji visualization scales with streak length
- Streak milestones trigger confetti

### 7. Parent Dashboard Upgrade
- Profile-aware header with avatar and nickname
- Subject strength bars with visual fills
- Skill health labels (strong / improving / needs work)
- Recent activity table
- Suggested next action based on data analysis

### 8. Future Platform Alignment
- **Rise Intellect**: Future platform umbrella brand
- **RiseIQ**: Future product module name
- **Action now**: Structure code so migration is easy. Don't rebrand yet.
- **School config seam**: Documented separately. Ready for multi-school editions when needed.

## Architecture Principles
- Static-first: no database, no backend, no build tools
- localStorage for all persistence
- Shared JS engine adapts per grade via `data-grade` attribute
- CSS variables enable future retheming
- School config layer is a documented seam, not a built system
