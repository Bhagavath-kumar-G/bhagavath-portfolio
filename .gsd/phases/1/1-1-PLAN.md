---
phase: 1
plan: 1
wave: 1
gap_closure: false
---

# Plan 1.1: Theme System & Type Contracts

## Objective
Establish the foundational data contracts and the robust dark/light theme management system with automatic system preference detection and localStorage persistence.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- src/index.css

## Tasks

<task type="auto" effort="medium">
  <name>Create TypeScript Data Models and Contracts</name>
  <files>
    src/types/portfolio.ts
    src/data/portfolioData.ts
  </files>
  <action>
    1. Define TypeScript interfaces in `src/types/portfolio.ts` for:
       - `SocialLink`
       - `SkillItem` and `SkillCategory`
       - `Project`
       - `ExperienceItem`
       - `PortfolioData`
    2. Populate initial typed starter data structure in `src/data/portfolioData.ts` adhering strictly to `PortfolioData` interface with placeholders for Bhagavath Kumar.
    
    AVOID: using `any` or loose string types for known categories.
    USE: strict union types for project categories and experience types.
  </action>
  <verify>
    npx tsc -b
  </verify>
  <done>
    TypeScript compiler cleanly validates `src/types/portfolio.ts` and `src/data/portfolioData.ts` with zero type errors.
  </done>
</task>

<task type="auto" effort="medium">
  <name>Implement Theme Context and Custom Hook</name>
  <files>
    src/context/ThemeContext.tsx
    src/hooks/useTheme.ts
  </files>
  <action>
    1. Create `ThemeContext` supporting 'light', 'dark', and 'system' modes.
    2. Read initial theme from `localStorage` with fallback to `window.matchMedia('(prefers-color-scheme: dark)')`.
    3. Toggle `.dark` class on `document.documentElement` dynamically.
    4. Listen for system theme change events when set to 'system'.
    5. Provide custom hook `useTheme()` with helpful helper functions (`theme`, `resolvedTheme`, `setTheme`, `toggleTheme`).
    
    AVOID: re-rendering entire component tree on theme updates; use native DOM class toggling.
    USE: clean React context with custom hook error handling for missing provider.
  </action>
  <verify>
    npx tsc -b
  </verify>
  <done>
    ThemeContext and useTheme compile with zero errors and cleanly export typed context provider and consumer hook.
  </done>
</task>

## Must-Haves
- [ ] Strongly-typed contracts for all portfolio sections in `src/types/portfolio.ts`
- [ ] Theme provider with persistence and system color-scheme detection
- [ ] Zero TypeScript or lint errors

## Success Criteria
- [ ] All tasks verified passing with `tsc -b`
- [ ] Clean exports available for subsequent component integration

