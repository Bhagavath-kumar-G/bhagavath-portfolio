---
updated: 2026-11-07T14:18:00+05:30
---

# Project State

## Current Position

**Milestone:** v1.7 — Automatic Active Navbar + RubberSegment-Inspired Indicator  
**Phase:** Active Navbar Detection & Sliding Segment Indicator  
**Status:** complete  
**Plan:** Implemented automatic scroll-spy active section detection across `#home`, `#about`, `#projects`, `#journey`, and `#contact` with requestAnimationFrame throttling, edge-case top/bottom clamping, and an elastic RubberSegment-inspired sliding capsule indicator with dual-theme synchronization and accessible mobile drawer highlighting.  

## Last Action

Implemented Automatic Active Navbar + RubberSegment-Inspired Indicator in `src/components/Navbar.tsx`:
1. **Automatic Active-Section Detection:**
   - Detects `#home`, `#about`, `#projects`, `#journey`, and `#contact` using a deterministic reference threshold below the fixed navbar (`refY = 140px`).
   - Symmetrical downward and upward transitions with zero hysteresis deadzones.
   - Guarded edge cases: top of page (`scrollY < 80` -> `home`) and bottom of page (`windowHeight + scrollY >= documentHeight - 60` -> `contact`).
   - Throttled with `requestAnimationFrame` on scroll and resize for optimal 60fps performance.
2. **RubberSegment-Inspired Sliding Indicator:**
   - Subtle background capsule rendered using Framer Motion `<LayoutGroup id="desktop-navbar">` and `layoutId="active-nav-indicator"`.
   - Restrained spring physics: `type: 'spring', stiffness: 380, damping: 30, mass: 0.8` delivering organic elastic stretch when moving between items with minimal overshoot.
   - Theme-aware ink palette:
     - Dark theme: Soft ivory active text (`#F2F0E9`), subtle dark surface with 50% opacity and charcoal border.
     - Light theme: Dark charcoal active text (`#171717`), soft sand surface (`#ECEAE4`) and border (`#DCD8CE`).
     - Inactive items remain muted (`#A3A3A3` / `#6B6964`).
   - Inactive items preserve magnetic cursor pull and hover micro-dot.
3. **Preserved Navigation & Mobile Behavior:**
   - Semantic `<nav>` and anchor `<a>` tags with `aria-current="location"`.
   - Smooth scrolling with offset clearance (`targetTop - 70`) preventing section titles from hiding under the fixed header.
   - Mobile navigation drawer highlights active item with `aria-current="location"`, active badge, and background tint; automatically closes on link selection and scrolls smoothly to target section.
4. **Accessibility & Reduced Motion:**
   - Visible keyboard focus rings (`focus-visible:ring-1 focus-visible:ring-[#C8C4B8]`) on logo, desktop nav items, mobile button, and drawer links.
   - `prefers-reduced-motion` cleanly bypasses spring animation (`duration: 0`) and uses instant jump navigation (`behavior: 'auto'`).
   - Zero horizontal overflow across all tested viewports (375px to 1920px).
5. **Empirical Validation:**
   - `npm.cmd run lint`: 0 errors, 0 warnings.
   - `npm.cmd run build`: Built cleanly with Vite in 1.05s.
   - Tested 10 verification scenarios via Playwright.

## Next Steps

1. User review of the Automatic Active Navbar and RubberSegment sliding indicator.
2. Maintain clean git status (no commits or pushes).

## Active Decisions

| Decision | Choice | Made | Affects |
|----------|--------|------|---------|
| DECISION-001: Core Stack | React + TypeScript + Vite + Tailwind CSS v4 | 2026-11-07 | All Phases |
| DECISION-002: Content Architecture | Single source of truth in typed TS file (`projectsData.ts`, etc.) | 2026-11-07 | All Components |
| DECISION-003: Theming Engine | CSS Custom Variables + `html.light`/`html.dark` classes + `localStorage` | 2026-11-07 | All Components |
| DECISION-004: Tactile Lamp Interaction | Elastic spring displacement (`drag="y"`) + kinetic bounce + 0 audio dependencies | 2026-11-07 | HangingLampCord |

## Blockers

*None.*
