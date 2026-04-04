# Web Streak Calendar Polish — 2026-04-04

## What Was Added
A 7-day streak calendar visualization on the web dashboard, showing which of the last 7 days had study activity.

## Implementation
- `buildStreakCalendar()` function added to app.js
- Shows Mon-Sun with fire emoji on active days
- Today highlighted with cyan border
- "Answer 3+ questions to count as a study day" note
- Inserted above the progress meter in the dashboard

## Visual Design
- 7 equal-width boxes in a flex row
- Active days: gold-to-orange gradient background with fire emoji
- Inactive days: subtle dark background with dot
- Today: cyan border highlight
- Responsive: wraps naturally on mobile

## Data Source
Uses the existing `state.studyDays` array from localStorage — no new data collection needed.
