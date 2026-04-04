# Reward System Overhaul — Phase 9

## Problem (Operator Finding)
1. The certificate appeared immediately, even with zero progress — felt unearned
2. The certificate was oversized and generic
3. "earned 0 badge(s)" was embarrassing copy
4. No collectible feel — one big certificate doesn't build over time

## Solution: Two-Tier Reward System

### Tier 1: Collectible Achievement Banners
Small, collectible cards that unlock as milestones are reached. Multiple banners sit side by side on a "Victory Wall."

**Unlock triggers:**
| Banner | Trigger |
|--------|---------|
| First Steps | 5 questions answered |
| Dedicated Learner | 25 questions answered |
| Question Crusher | 50 questions answered |
| 3-Day Streak | 3 consecutive study days |
| Weekly Warrior | 7-day streak |
| Badge Collector | 3+ badges earned |
| Boss Slayer | Won a Boss Battle (7/10+) |
| Sharp Mind | 80%+ accuracy (10+ questions) |

**Design**: 120px wide cards with icon, title, description, grade-colored border. Arranged in a flex-wrap row for side-by-side display.

**Before earning any**: Shows "Victory Wall" with encouraging message and "Answer 5 questions to earn your first banner."

### Tier 2: Major Milestone Certificate
A larger formal certificate that only appears when ALL of these are met:
- 4+ badges earned
- 20+ questions answered
- 3+ day study streak

**Design**: Gold-bordered callout with grade-specific title ("Grade 3 Study Champion"), student name, stats breakdown, and RISE Studio Labs + dedication line credit.

## What Changed in Code
- `renderCertificates()` completely rewritten in app.js
- Milestone logic checks real accomplishment data before showing anything
- Empty state shows encouragement instead of "0 badge(s)"
- Print button only appears when banners are earned
- Certificate only appears at real milestone threshold

## Copy Improvements
- "Victory Certificate" → "Victory Wall" (banners) + "Study Champion" (certificate)
- Removed "earned X badge(s)" pattern
- Each banner has a specific, descriptive title
- Certificate uses "demonstrated real dedication" language
