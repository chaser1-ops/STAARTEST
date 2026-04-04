# Parent Utility Upgrade — Phase 10

## What Changed

### Smarter Suggested Actions
The parent dashboard now gives context-aware, specific recommendations instead of generic messages:
- Streak-based: "Keep practicing to hit 7 days for the Weekly Warrior banner"
- Weakness-based: "Math could use attention" (when reading is 5+ ahead of math)
- Accuracy-based: "Accuracy is at X%. Slow down and focus on explanations"
- Milestone-based: "X more questions to earn the Question Crusher banner"
- Each suggestion has a thematic icon

### Next Milestone Indicator
New section below the suggested action showing the closest achievable milestone:
- "Answer X more questions to earn the First Steps banner"
- "Build a 3-day study streak to earn the streak banner"
- "X more days for the Weekly Warrior banner"

### Visual Fixes
- Subject progress bars: changed from light gray `#e5e7eb` to `rgba(255,255,255,.08)` to match dark theme
- Skill health borders: changed from `#f0f0f0` to `var(--line)` for dark theme consistency
- Suggestion box: changed from `#f0fdf4` (light green, jarring on dark) to `rgba(94,230,255,.08)` with cyan border
- Next milestone box: gold-tinted background matching the achievement banner style

## Why This Matters
Parents checking their child's progress now get:
1. What's going well (subject bars, accuracy)
2. What needs work (skill health labels)
3. What to do next (specific, actionable suggestion)
4. What's coming up (next milestone with clear distance)

This turns the parent view from a data dump into a useful coaching tool.
