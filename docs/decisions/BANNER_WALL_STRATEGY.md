# Banner Wall Strategy — Phase 9

## Concept
Turn the reward system from a single oversized certificate into a collectible banner wall where students accumulate visible achievements over time.

## Visual Design
- **Banner cards**: 120px wide, rounded corners, colored border matching achievement type
- **Layout**: Flex-wrap row — banners sit side by side and wrap naturally
- **Print-friendly**: Clean on paper, multiple banners fit on one page
- **Colors**: Each banner has a thematic color (cyan for first steps, gold for streaks, etc.)

## Achievement Types
- **Effort-based**: First Steps, Dedicated Learner, Question Crusher (question count)
- **Consistency-based**: 3-Day Streak, Weekly Warrior (study streak)
- **Skill-based**: Sharp Mind (accuracy threshold), Boss Slayer (boss battle)
- **Collection-based**: Badge Collector (badge count)

## Empty State
When no banners are earned yet, the Victory Wall shows:
- "Victory Wall" heading (dimmed)
- "Complete study sessions to start earning collectible achievement banners!"
- "Answer 5 questions to earn your first banner."

This sets clear expectation without showing an embarrassing empty certificate.

## Print Strategy
- "Print My Banners" button appears when 1+ banners earned
- "Print Certificate" button appears only at major milestone
- Both use browser print (Cmd+P / Ctrl+P)
- Print styles hide navigation and buttons

## RiseIQ App Alignment
The app should eventually mirror this banner concept:
- Achievement list in badge view already shows earned/locked states
- Future: add a "Victory Wall" tab or section to the Progress view
- Banners translate naturally to SwiftUI grid cards
