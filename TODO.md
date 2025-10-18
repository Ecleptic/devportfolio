# TODO / Roadmap

## Features to Implement

### 🎮 Snowflake Clicking Game
**Priority:** Low  
**Status:** Not Started

Turn the Konami code snowflakes into an interactive game:

**Game Mechanics:**
- Timer bar (starts at 5 seconds) displayed at bottom/bottom-left depending on screen size
- Score counter displayed alongside timer
- Clicking/tapping snowflakes makes them pop and increases score
- Score progression: Click streak doubles the score each time (1 → 2 → 4 → 8 → 16...)
- Each click resets the timer but decreases max time by 0.05 seconds
  - Example progression:
    - Click 1: Score = 1, Timer resets to 5.00s max
    - Click 2: Score = 2, Timer resets to 4.95s max
    - Click 3: Score = 4, Timer resets to 4.90s max
    - Continue until timer runs out

**Game Over Screen:**
- All snowflakes disappear
- Score pulses with animation
- "Congratulations!" message
- Confetti animation
- "Play Again" button
- "Close" button

**Technical Notes:**
- Should work on mobile (touch events) and desktop (click events)
- Responsive positioning for timer/score display
- Integrate with existing Konami code trigger

---

## Completed

- ✅ Sanity CMS integration for mobile editing
- ✅ Bidirectional sync scripts (Sanity ↔ resume.json)
- ✅ GitHub Actions automation for Sanity webhook
- ✅ Netlify Function middleware for webhook routing
- ✅ Home lab infrastructure section in resume
- ✅ Multi-line text support in About section
- ✅ Paragraph spacing improvements
- ✅ Condensed and cleaned up About Me summary
