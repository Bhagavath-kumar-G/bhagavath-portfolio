# SPEC.md — Project Specification

> **Status**: `DRAFT`
>
> ⚠️ **Planning Lock**: No implementation code may be written until this spec is approved and marked `FINALIZED`.

## Vision
A modern, blazingly fast, and visually compelling personal portfolio website for **Bhagavath Kumar**. The portfolio serves as an interactive professional showcase featuring featured projects, technical skill proficiencies, career experience, and direct contact avenues—designed with responsive layouts, accessible navigation, and dark/light theme support.

## Goals
1. **Showcase Professional Identity & Expertise**: Deliver an engaging Hero and About section establishing Bhagavath's technical profile, value proposition, and career highlights.
2. **Interactive Project Showcase**: Present projects with rich metadata (descriptions, tech tags, metrics/impact, live demos, and GitHub repository links) with filtering support.
3. **Structured Skill Matrix & Experience Timeline**: Highlight core technical competencies (Frontend, Backend, Tools) and career milestones chronologically.
4. **Seamless Visitor Engagement**: Provide instant contact pathways (copyable email, contact form, social profiles, resume download/preview).
5. **High Performance & Delightful UX**: Achieve near 100 Lighthouse performance, sub-second loads, fluid micro-interactions, dark/light theme persistence, and full mobile responsiveness.

## Non-Goals (Out of Scope for v1.0)
- Complex CMS backend or database persistence (v1 will utilize structured typed TypeScript data files for zero-maintenance hosting).
- Paid third-party form backend services (v1 will support client-side form validation with Mailto / Web3Forms / Formspree or direct email trigger).
- Dynamic blogging platform with full markdown editor (can be considered in future milestones).
- User authentication, login portals, or private member dashboards.

## Users & Target Audience
- **Tech Recruiters & Talent Acquisition Specialists**: Seeking quick access to summary bio, resume, core tech stack, and contact links.
- **Engineering Managers & Technical Leads**: Evaluating project quality, architecture decisions, code links, live demos, and technical depth.
- **Collaborators & Clients**: Exploring capabilities, domain knowledge, and avenues to initiate projects or partnerships.

## Technical Constraints & Tech Stack
- **Framework**: React 18 / 19 with TypeScript for robust type safety.
- **Build Tool**: Vite (high-speed HMR and optimized tree-shaken static production bundles).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` native engine with CSS-native variables).
- **Icons**: Lucide React (feather-light, tree-shakeable SVG icons).
- **Motion/Animation**: Tailwind CSS transitions and lightweight CSS animations / Framer Motion for smooth scroll & entrance effects.
- **Deployment Target**: Static hosting ready (GitHub Pages / Vercel / Netlify / Cloudflare Pages).
- **Code Standards**: Strict TypeScript (`noImplicitAny`, strict null checks), ESLint, zero console warnings.

## Success Criteria
- [ ] Lighthouse score > 90 across Performance, Accessibility, Best Practices, and SEO.
- [ ] 100% responsive across mobile (<640px), tablet (640px-1024px), and desktop (>1024px) viewports.
- [ ] Dark/Light mode switcher with persistence to `localStorage` and system preference detection.
- [ ] Smooth navigation with in-page jump links, sticky header, and mobile menu drawer.
- [ ] Type-safe, data-driven content architecture where updating bio, projects, and skills requires only editing typed data files.
- [ ] Zero build warnings, zero TypeScript errors (`tsc --noEmit`), clean bundle analysis.

## User Stories

### As a Recruiter / Visitor
- I want to quickly see Bhagavath's core skills and download his resume so that I can evaluate fit for upcoming roles.
- I want to click live links and GitHub repositories of featured projects to see working demonstrations and code quality.
- I want to easily send an email or reach out on LinkedIn/GitHub directly from any device.

### As the Portfolio Owner (Bhagavath Kumar)
- I want to update my projects, skills, or job history in clean, strongly-typed data config files without modifying complex layout code.
- I want my site to load instantly and look sharp in both dark and light modes.
- I want a structured codebase following modular architecture to easily add a blog or interactive widgets in the future.
