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

*Last updated: 2026-11-07*
