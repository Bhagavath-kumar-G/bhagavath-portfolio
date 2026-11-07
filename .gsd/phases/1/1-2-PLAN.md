---
phase: 1
plan: 2
wave: 1
gap_closure: false
---

# Plan 1.2: Reusable UI Component Primitives

## Objective
Build atomic, accessible, and flexible UI component primitives (`Container`, `SectionHeader`, `Badge`, `Button`, `Card`) styled with modern Tailwind CSS v4 to serve as the visual building blocks for all sections.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- src/index.css

## Tasks

<task type="auto" effort="medium">
  <name>Build Layout and Typographic Primitives</name>
  <files>
    src/components/common/Container.tsx
    src/components/common/SectionHeader.tsx
    src/components/common/Badge.tsx
  </files>
  <action>
    1. Create `Container`: Responsive wrapper with standard max-width (`max-w-6xl`), auto horizontal margins, and responsive padding.
    2. Create `SectionHeader`: Standardized component for section overline/tag, title, and descriptive subtitle with consistent spacing.
    3. Create `Badge`: Reusable badge supporting variants (`default`, `accent`, `outline`, `success`) and optional dot/indicator.
    
    AVOID: arbitrary inline CSS styles.
    USE: Tailwind CSS v4 semantic classes with clean conditional className joining.
  </action>
  <verify>
    npx tsc -b
  </verify>
  <done>
    `Container`, `SectionHeader`, and `Badge` export cleanly with full TypeScript prop interfaces.
  </done>
</task>

<task type="auto" effort="medium">
  <name>Build Interactive Primitives: Button and Card</name>
  <files>
    src/components/common/Button.tsx
    src/components/common/Card.tsx
  </files>
  <action>
    1. Create `Button`: Accessible button supporting variants (`primary`, `secondary`, `outline`, `ghost`), sizes (`sm`, `md`, `lg`), optional icon slots (left/right), and polymorphic rendering (can render as `<a>` when `href` is supplied or `<button>`).
    2. Create `Card`: Elevated surface component with subtle border, background tokens (`bg-white dark:bg-slate-900`), and optional interactive hover elevation effects.
    
    AVOID: missing accessible focus rings and keyboard interaction.
    USE: `focus-visible:ring-2` and `rel="noopener noreferrer"` when rendering anchor elements with `target="_blank"`.
  </action>
  <verify>
    npx tsc -b
  </verify>
  <done>
    `Button` and `Card` components compile with strict types and zero warnings.
  </done>
</task>

## Must-Haves
- [ ] Accessible `Button` supporting button and anchor modes with safe external link handling
- [ ] Theme-aware `Card` and `Badge` components matching design tokens
- [ ] Standardized `Container` and `SectionHeader` components

## Success Criteria
- [ ] `tsc -b` passes cleanly
- [ ] Component props are strictly typed with zero `any`

