# ARCHITECTURE.md — System Architecture & Component Design

> **Project:** Bhagavath Kumar Portfolio  
> **Tech Stack:** React, TypeScript, Vite, Tailwind CSS v4, Lucide React

---

## 1. High-Level Architecture Overview

The portfolio is designed as a modular, single-page application (SPA) optimized for ultra-fast load times, seamless client-side navigation, and ease of content management.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    ThemeProvider (Context)                       │  │
│  └────────────────────────────────┬─────────────────────────────────┘  │
│                                   │                                    │
│       ┌───────────────────────────┴────────────────────────────┐      │
│       ▼                                                        ▼      │
│  ┌───────────────┐                                       ┌──────────┐  │
│  │    Navbar     │ (Sticky, Blur Backdrop, ThemeToggle)  │  Footer  │  │
│  └───────┬───────┘                                       └──────────┘  │
│          │                                                             │
│          ▼ Sections (Driven by src/data/portfolioData.ts)              │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Hero Section        (Headline, Status Pill, Socials, CTAs)      │  │
│  │  About Section       (Bio, Key Metrics, Visual Showcase)         │  │
│  │  Skills Section      (Categorized Grid, Tech Badges)             │  │
│  │  Projects Section    (Filterable Grid, Demo Links, Source Links) │  │
│  │  Experience Section  (Vertical Milestone Timeline)               │  │
│  │  Contact Section     (Email Copy, Message Form, Links)           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Typed Data Layer                                │
│       src/data/portfolioData.ts ──► Single Source of Truth             │
│       src/types/portfolio.ts    ──► Strict TypeScript Models           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory & Component Structure

```
bhagavath-portfolio/
├── .gsd/                          # GSD methodology state & specs
│   ├── SPEC.md                    # Project specification
│   ├── ROADMAP.md                 # 6-phase development roadmap
│   ├── ARCHITECTURE.md            # System architecture (this file)
│   ├── STATE.md                   # Live state tracking
│   ├── DECISIONS.md               # Architecture decision records (ADRs)
│   ├── TODO.md                    # Quick task capture
│   └── JOURNAL.md                 # Session log
├── public/
│   ├── favicon.svg                # Clean portfolio icon
│   └── robots.txt                 # Search engine guidance
├── src/
│   ├── assets/                    # Static assets & avatar placeholders
│   ├── components/
│   │   ├── common/                # Atomic reusable primitives
│   │   │   ├── Button.tsx         # Primary, secondary, outline button variants
│   │   │   ├── Badge.tsx          # Status & tech tag chips
│   │   │   ├── Card.tsx           # Elevated, glassmorphic card container
│   │   │   ├── Container.tsx      # Consistent max-width container wrapper
│   │   │   └── SectionHeader.tsx  # Standardized section title & subtitle
│   │   ├── layout/                # Shell & navigation
│   │   │   ├── Navbar.tsx         # Desktop navbar with active scroll spy
│   │   │   ├── MobileMenu.tsx     # Animated slide-in mobile navigation
│   │   │   ├── ThemeToggle.tsx    # Sun/Moon mode toggle button
│   │   │   └── Footer.tsx         # Copyright, back-to-top, quick socials
│   │   └── sections/              # Page feature sections
│   │       ├── Hero.tsx           # Intro, CTA buttons, status indicator
│   │       ├── About.tsx          # Narrative & metrics counter
│   │       ├── Skills.tsx         # Categorized skills matrix
│   │       ├── Projects.tsx       # Filterable showcase with project cards
│   │       ├── Experience.tsx     # Chronological career/education timeline
│   │       └── Contact.tsx        # Contact avenues & copy-to-clipboard email
│   ├── context/
│   │   └── ThemeContext.tsx       # Theme provider (Light, Dark, System)
│   ├── data/
│   │   └── portfolioData.ts       # Typed content configuration
│   ├── hooks/
│   │   ├── useTheme.ts            # Hook to access and toggle theme
│   │   ├── useScrollSpy.ts        # Observes active section on scroll
│   │   └── useClipboard.ts        # Helper to copy email with toast feedback
│   ├── types/
│   │   └── portfolio.ts           # TypeScript interfaces (Project, Skill, Experience, etc.)
│   ├── App.tsx                    # Root layout composition
│   ├── main.tsx                   # Vite React DOM entry
│   └── index.css                  # Tailwind CSS v4 styling & theme tokens
├── index.html                     # HTML root with SEO & font preloads
├── package.json                   # Dependencies & build scripts
├── tsconfig.json                  # Strict TypeScript configuration
└── vite.config.ts                 # Vite bundler configuration
```

---

## 3. Data Models (`src/types/portfolio.ts`)

```typescript
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
  label: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    icon?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    highlight?: boolean;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Tooling' | 'Open Source';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  imageUrl?: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string; // e.g. "2023 — Present"
  description: string[];
  technologies: string[];
  type: 'work' | 'education' | 'award';
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    bio: string[];
    location: string;
    availability: string;
    avatarUrl?: string;
    resumeUrl: string;
    socials: SocialLink[];
  };
  metrics: {
    label: string;
    value: string;
    description?: string;
  }[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: ExperienceItem[];
}
```

---

## 4. Styling & Theming Strategy (Tailwind CSS v4)

Tailwind CSS v4 uses a CSS-first configuration model without requiring a legacy `tailwind.config.js`:
- Direct integration via `@tailwindcss/vite` plugin in `vite.config.ts`.
- Modern `@theme` directives in `src/index.css` defining semantic color tokens for both dark and light modes:
  - `var(--color-bg-primary)`
  - `var(--color-bg-secondary)`
  - `var(--color-text-primary)`
  - `var(--color-text-muted)`
  - `var(--color-accent)`
  - `var(--color-accent-hover)`
  - `var(--color-border)`
- Theme switching toggles the `dark` class on the `<html>` root element and saves preferences to `localStorage`.

---

## 5. Non-Functional Requirements & Performance Targets

1. **Performance**:
   - Zero large bloat packages; total bundle size target < 150KB gzipped.
   - Vite static code splitting and asset hashing.
2. **Accessibility**:
   - Semantic HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
   - Accessible color contrast ratios (WCAG 2.1 AA compliant in both dark and light themes).
   - Full keyboard navigation and visible focus rings.
3. **SEO & Metadata**:
   - Complete OpenGraph and Twitter card meta headers.
   - Meaningful page titles and meta descriptions for discovery.

