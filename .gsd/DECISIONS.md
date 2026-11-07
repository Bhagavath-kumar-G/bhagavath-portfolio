# DECISIONS.md — Architecture Decision Records

> **Purpose**: Log significant technical decisions and their rationale.

---

## [DECISION-001] Stack Selection: React + TypeScript + Vite + Tailwind CSS v4

**Date**: 2026-11-07  
**Status**: Accepted  

### Context
We need a robust, lightning-fast, and modern stack for a personal developer portfolio that provides first-class developer experience, strong typing, low runtime overhead, and effortless deployment.

### Decision
Adopt React (18/19), TypeScript, Vite, and Tailwind CSS v4.

### Rationale
- **Vite**: Sub-second HMR and optimized production bundling without complex configuration overhead.
- **TypeScript**: Strict type definitions for portfolio content prevent broken links, missing fields, or data mismatches.
- **Tailwind CSS v4**: High-performance CSS engine with `@tailwindcss/vite`, native `@theme` directives, zero configuration file bloat, and standard CSS variable support.
- **React**: Ecosystem maturity, clean component composition, and universal hosting compatibility.

### Consequences
Requires modern Node environment and familiarity with Tailwind CSS v4 syntax changes compared to v3.

### Alternatives Considered
- Next.js: Excess overhead and SSR server requirements for a static portfolio.
- Vanilla HTML/JS: Less maintainable component abstraction and harder to manage complex interactive states (like theme toggling and project filters).

---

## [DECISION-002] Content Architecture: Centralized Strongly-Typed Data Store

**Date**: 2026-11-07  
**Status**: Accepted  

### Context
Portfolio content (projects, experiences, skills, socials) changes frequently. Hardcoding content into JSX leads to clutter, duplicate styles, and maintenance friction.

### Decision
Maintain a single source of truth in `src/data/portfolioData.ts`, strictly typed by interfaces in `src/types/portfolio.ts`.

### Rationale
- Decouples UI presentation from portfolio content.
- Allows updating bio, skills, or projects in seconds without touching markup.
- Ensures all project cards, badges, and timeline items adhere to a consistent contract.

### Consequences
New content fields require updating both TypeScript interfaces and data objects.

---

## [DECISION-003] Theming Strategy: Semantic CSS Variables with Class Toggling

**Date**: 2026-11-07  
**Status**: Accepted  

### Context
A modern portfolio requires seamless Dark and Light theme switching that respects system preferences and persists across reloads.

### Decision
Use a lightweight `ThemeContext` that controls a `.dark` class on the `<html>` root element, bound to CSS variables defined in `@theme` in `src/index.css`.

### Rationale
- Native CSS variable updates perform with zero re-rendering overhead.
- Simple, reliable persistence in `localStorage`.
- No heavy external theme libraries required.

---

## [DECISION-005] Halftone Portrait Shader: React Bits HalftoneReveal with Fallback

**Date**: 2026-11-07  
**Status**: Accepted  

### Context
To elevate the visual aesthetic of Bhagavath's editorial hero section, an interactive halftone dot matrix presentation was required that unmasks the authentic photograph on cursor movement while integrating seamlessly into the charcoal/ivory ink-wash aesthetic.

### Decision
Implement `HalftoneReveal.tsx` utilizing WebGL2 shaders (`#version 300 es`) with ping-pong framebuffers for pointer trail smoothing, dynamic ink/paper color synchronization with `useTheme()`, and an automatic fallback to standard `<img>` if WebGL2 context or compilation fails.

### Rationale
- Zero additional npm dependencies (pure WebGL2 API).
- Dynamic monochromatic ink colors update without restarting canvas animation.
- Respects `prefers-reduced-motion` and accessibility guidelines (`role="img"`).

---

## [DECISION-006] Final Interactive CTA: React Bits SlingButton with Mailto Action

**Date**: 2026-11-07  
**Status**: Accepted  

### Context
We needed a memorable, playful yet restrained final interaction positioned before the Footer to encourage visitors to reach out without introducing complex forms or backend dependencies.

### Decision
Implement `SlingButton` via `src/components/SlingButton.tsx` and `src/components/ConnectCta.tsx`, executing `mailto:bhagavathg1382008@gmail.com` on successful sling release, direct click/tap, and keyboard activation (`Enter`/`Space`).

### Rationale
- Pure client-side interaction requiring zero server endpoints.
- Physics-based spring and particle effects feel organic within the ink-wash identity.
- Full keyboard focusability and ARIA annotations satisfy WCAG accessibility standards.

---

## [DECISION-007] Continuous Full-Page Background: Fixed Viewport WebGL2 DotField

**Date**: 2026-11-07  
**Status**: Accepted  

### Context
A continuous background dot matrix was desired across the entire portfolio (from the Hero top down through the Footer). Rendering an oversized 10,000px canvas to match the scroll height would exceed GPU texture budgets, cause memory bloat, and degrade frame rates on mobile devices.

### Decision
Mount a single `<DotField />` canvas at `App.tsx` level styled with `position: fixed; inset: 0; pointer-events: none; z-index: 0;`. Global pointer listeners track cursor coordinates across the window, keeping memory strictly bounded to the viewport size (`PIXEL_BUDGET = 9e6`) while delivering seamless, unbroken coverage as the user scrolls.

### Rationale
- Constant memory footprint (~60 FPS GPU performance).
- Zero event blocking for foreground interactive cards, inputs, and buttons.
- Continuous coverage down to the bottom of the Footer.

---

*Last updated: 2026-11-07*

