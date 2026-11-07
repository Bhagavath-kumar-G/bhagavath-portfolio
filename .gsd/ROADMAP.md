---
milestone: v1.0
version: 1.0.0
updated: 2026-11-07T08:54:00+05:30
---

# ROADMAP.md — Bhagavath Kumar Portfolio

> **Current Phase:** Phase 1 - Foundation & Design System (Ready for Planning)
> **Status:** Planning

## Must-Haves (from SPEC.md)
- [ ] Responsive modern portfolio built with React, TypeScript, Vite, and Tailwind CSS v4
- [ ] Dark / Light mode toggle with automatic system theme detection and local storage persistence
- [ ] Hero section with dynamic status badge, resume CTA, and social links
- [ ] About section highlighting background, value proposition, and key metrics
- [ ] Categorized Technical Skills matrix with intuitive grouping
- [ ] Featured Projects showcase with category filtering, tech tags, and live/repo links
- [ ] Career & Education chronological timeline component
- [ ] Contact section with direct messaging avenues and copy-to-clipboard email
- [ ] Type-safe, data-driven architecture (`src/data/portfolioData.ts`)
- [ ] Production-ready build with Lighthouse 90+ score and zero TypeScript errors

---

## Phases

### Phase 1: Foundation & Design System
**Status:** ⬜ Not Started
**Objective:** Establish project scaffolding with Vite + React + TypeScript, configure Tailwind CSS v4, implement theme management (Dark/Light), and build foundational UI layout primitives.
**Dependencies:** None

**Key Deliverables:**
- Vite + React 18/19 + TypeScript initialization
- Tailwind CSS v4 configuration (`@tailwindcss/vite`, CSS theme variables, color tokens)
- Theme system (`ThemeContext`, dark/light switcher with persistence)
- Global layout wrapper: Sticky Header with blur backdrop, navigation links, mobile drawer, and Footer
- Reusable UI kit: `Container`, `Button`, `Badge`, `Card`, `SectionHeader`

---

### Phase 2: Hero & About Me Presentation
**Status:** ⬜ Not Started
**Objective:** Create high-converting Hero and About sections presenting Bhagavath's professional profile, core narrative, and quick calls to action.
**Dependencies:** Phase 1

**Key Deliverables:**
- Centralized type-safe data schema (`src/data/portfolioData.ts`) for profile metadata
- Hero component: headline, title, "Available for Work" live indicator, CTAs (Resume, Contact, Projects), and social links
- About component: professional summary, key achievements, highlights, and avatar presentation
- Responsive layout with mobile-first typography and micro-interactions

---

### Phase 3: Technical Skills Matrix
**Status:** ⬜ Not Started
**Objective:** Deliver an engaging, categorized skills showcase displaying proficiency across frontend, backend, tooling, and core competencies.
**Dependencies:** Phase 1

**Key Deliverables:**
- Structured skills dataset categorized by domain (e.g. Frontend, Backend, Tools & DevOps, Core Strengths)
- Interactive skill matrix component with category icons and visual tag pills
- Filtering or category tab switching for quick discovery
- Full accessibility support (screen reader friendly attributes, keyboard navigation)

---

### Phase 4: Featured Projects & Case Studies
**Status:** ⬜ Not Started
**Objective:** Build an interactive project showcase featuring real-world projects, live demo links, source code repositories, and technical highlight tags.
**Dependencies:** Phase 1

**Key Deliverables:**
- Project data schema (title, description, role, tags, live URL, repo URL, preview image, features list)
- Category filter bar (All, Web Applications, Tools, Open Source)
- Project card component with hover elevation, responsive image container, and action buttons
- Responsive project grid with empty-state handling and smooth transitions

---

### Phase 5: Career & Education Timeline
**Status:** ⬜ Not Started
**Objective:** Provide a structured chronological timeline detailing work experience, key deliverables, and educational background.
**Dependencies:** Phase 1

**Key Deliverables:**
- Experience data model (company, role, timeline, accomplishments, technologies used)
- Education & certification data model
- Interactive timeline component (alternating cards on desktop, streamlined linear rail on mobile)
- Visual cues, dates, and technology badges for each milestone

---

### Phase 6: Contact Section, SEO & Production Launch
**Status:** ⬜ Not Started
**Objective:** Implement contact section, integrate SEO & social sharing metadata, conduct performance audits, and prepare deployment configuration.
**Dependencies:** Phases 1-5

**Key Deliverables:**
- Contact section with copyable email address, quick mailto trigger, and contact form UI
- SEO optimization: title tags, meta description, OpenGraph preview cards, Twitter cards, and favicon
- Performance audit: tree-shaking verification, asset optimization, Lighthouse 90+ score
- Build verification and deployment recipes (Vercel, Netlify, GitHub Pages)
