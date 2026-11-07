# JOURNAL.md — Session Log

> **Purpose**: Chronicle of work sessions for context continuity.

---

## Sessions

## Session: 2026-11-07 08:55

### Objective
Initialize GSD methodology files for Bhagavath Kumar Portfolio: define project specification, 6-phase roadmap, architectural design, state, and decision records.

### Accomplished
- ✅ Initialized git repository.
- ✅ Created `.gsd/SPEC.md` with status `DRAFT` (Planning Lock active).
- ✅ Created `.gsd/ROADMAP.md` decomposing development into 6 manageable phases.
- ✅ Created `.gsd/ARCHITECTURE.md` defining component hierarchy, data models, and theme strategy.
- ✅ Created `.gsd/STATE.md`, `.gsd/DECISIONS.md`, `.gsd/TODO.md`.

### Verification
- [x] All `.gsd` foundational files exist and follow GSD canonical format.
- [x] Planning lock in effect; no implementation code created prior to user review.

### Handoff Notes
- Architecture and roadmap ready for user review.
- Upon approval, finalize `SPEC.md` and begin Phase 1 planning (`/plan 1`).

## Session: 2026-11-07 09:12

### Objective
Implement Stage 2: Minimalist editorial-style ink-wash aesthetic, Poppins typography, responsive Navbar, and editorial Hero section with restrained animations.

### Accomplished
- ✅ Configured Poppins web font in `index.html` and Tailwind CSS v4 `@theme` design tokens in `src/index.css`.
- ✅ Built responsive `Navbar` component (`src/components/Navbar.tsx`) with text logo, desktop navigation, and accessible mobile drawer.
- ✅ Built editorial `Hero` section (`src/components/Hero.tsx`) with introductory tag, name, tagline, first-year CS student narrative, CTA links, and subtle scroll indicator.
- ✅ Structured `App.tsx` cleanly with semantic landmarks and ink-wash color tokens.

### Verification
- [x] `npm run build` completed with 0 errors.
- [x] `npm run lint` completed with 0 errors and 0 warnings.
- [x] No changes committed or pushed to GitHub.

## Session: 2026-11-07 09:21

### Objective
Implement Stage 3: Build the About section in `src/components/About.tsx`, connecting navigation and preserving the ink-wash editorial aesthetic.

### Accomplished
- ✅ Created `src/components/About.tsx` with authentic personal introduction (Sri Sairam Engineering College, 1st year CSE).
- ✅ Structured narrative focusing on project-driven learning, collaboration, and hackathons.
- ✅ Formatted 'Areas of Interest' and clean typographic 'Currently Exploring' list (no cards, no gradients).
- ✅ Mounted `<About />` into `App.tsx` directly below `<Hero />`, wired to `#about` anchor.

### Verification
- [x] `npm run build` completed with 0 errors.
- [x] `npm run lint` completed with 0 errors and 0 warnings.
- [x] No changes committed or pushed.

## Session: 2026-11-07 09:32

### Objective
Implement Stage 4: Projects Gallery featuring all 4 projects (TeamForge, AquaBots, Smart Somangalam, ResumeIQ) with unified ink-wash editorial SVG thumbnails, accurate tech stacks, and live link integration.

### Accomplished
- ✅ Created 4 vector SVG thumbnails in `public/assets/projects/` matching the ink-wash global visual system (#171717, #222222, #F2F0E9, #A3A3A3, #383838, #C8C4B8).
- ✅ Inspected `0-to-shipped-resume-parser` codebase to verify authentic stack for ResumeIQ (React 19, Express.js, Google Gemini AI, MongoDB, PDF-Parse).
- ✅ Implemented `src/data/projectsData.ts` and `src/components/Projects.tsx` with a responsive 2x2 editorial grid.
- ✅ Connected `#projects` to Hero CTA button and Navbar navigation.
- ✅ Verified build and lint with 0 errors and 0 warnings.

## Session: 2026-11-07 09:37

### Objective
Implement Stage 5: Build "The Journey" editorial timeline (`src/components/Journey.tsx`) featuring four authentic milestone entries, connecting navigation, and adhering strictly to the ink-wash design aesthetic.

### Accomplished
- ✅ Created `src/components/Journey.tsx` with vertical editorial timeline, subtle separator rules, and monochrome numbering.
- ✅ Structured the 4 verified entries:
  - 01 — Computer Science Journey (Sri Sairam Engineering College)
  - 02 — Building & Innovation (TeamForge, AquaBots, ResumeIQ, Smart Somangalam)
  - 03 — Hackathons & Collaboration (Gramathon 2026 First Prize, NASA Space Apps 2026, Orion 2026)
  - 04 — Continuous Learning (NPTEL, Coursera, AI Learning Programmes)
- ✅ Integrated into `App.tsx` below `Projects`, wired to `#journey` and `#experience`.
- ✅ Verified build and lint with 0 errors and 0 warnings.

## Session: 2026-11-07 09:44

### Objective
Implement Stage 6: Build the Contact section (`src/components/Contact.tsx`) and Minimalist Footer (`src/components/Footer.tsx`) with client-side validation, authentic mailto submission, copy-to-clipboard, verified GitHub/LinkedIn profiles, and back-to-top navigation.

### Accomplished
- ✅ Created `src/components/Contact.tsx` with client-side form validation (name, email, message) and real `mailto:` email generation.
- ✅ Added functional one-click email copy button with dynamic 'Copied!' toast state.
- ✅ Added verified GitHub and LinkedIn profile links with accessible `rel="noopener noreferrer"` attributes, skipping X/Twitter.
- ✅ Created `src/components/Footer.tsx` with copyright, craft note, and smooth scroll-to-top action.
- ✅ Verified navigation routing: Hero's 'Get in Touch' button and Navbar's 'Contact' link navigate to `#contact`.
- ✅ Verified build and lint with 0 errors and 0 warnings.

## Session: 2026-11-07 10:20

### Objective
Execute Phase 1 of Animation Upgrade Plan: Theming Engine & Interactive Tactile Hanging Lamp Pull-Cord, inspired by MacMillan Studio's interaction quality.

### Accomplished
- ✅ Created the decoupled theme context system in `src/context/theme-context-base.ts`, `src/context/ThemeContext.tsx`, and `src/context/useTheme.ts` with `localStorage` persistence and strict compliance with React Refresh and React 19 compiler rules.
- ✅ Defined comprehensive dual-theme tokens in `src/index.css` for Dark Charcoal (`#171717` / `#222222`) and Soft Ivory Light Mode (`#F7F6F2` / `#ECEAE4`), with inverted primary CTAs and smooth 0.4s transitions.
- ✅ Built tactile `src/components/HangingLampCord.tsx` with high-inertia spring physics (`framer-motion`), vertical pull-drag interaction (`drag="y"`), dynamic cord stretch, kinetic bounce sequence, keyboard accessibility (`Enter`/`Space`), and `useReducedMotion()` fallback, avoiding any external sound dependencies.
- ✅ Adjusted navbar clearances in `src/components/Navbar.tsx` so the hanging cord never collides with navigation links or hamburger buttons.
- ✅ Mounted `<ThemeProvider>` and `<HangingLampCord />` in `src/App.tsx`.
- ✅ Verified with `npm run build` (0 errors) and `npm run lint` (0 errors, 0 warnings).
- ✅ Empirically validated theme switching, persistent storage across page reload, and visual quality via Playwright.

### Bug Fix: Lamp Pull-Cord Cord Disconnect on Drag Release
- **Root Cause**: The previous implementation mixed CSS flex layout height updates (`motion.div height: cordHeight`) with GPU CSS transforms (`motion.button style={{ y }}`). Furthermore, button padding (`p-1.5`) offset the visual bead cylinder 6px inside the box, and without `dragSnapToOrigin={true}`, Framer Motion's drag boundary solver allowed the bead to rest off-origin within `dragConstraints`, leaving a gap when the cord height settled.
- **Fix**: Re-architected `HangingLampCord.tsx` to use a unified SVG coordinate system (`width: 32px`, center `x = 16px`). Rendered the cord as a true SVG `<motion.line>` with `x1="16" y1="8" x2="16" y2={cordY2}`. Positioned the bead button (`top: 76px, left: 9px, width: 14px, height: 26px`) with zero outer padding and an accessible hit target via `before:-inset-2.5`. Both the line endpoint (`cordY2 = useTransform(y, latestY => 78 + latestY)`) and button (`style={{ y }}`) are tied to the exact same MotionValue `y`, ensuring the line enters 2px inside the bead cap across all drag, spring, and rest states. Added `dragSnapToOrigin={true}`.
- **Verification**: Verified via Playwright automated mouse drag, click, keyboard interaction, and settling tests. `npm run build` (0 errors) and `npm run lint` (0 errors).

## Session: 2026-11-07 10:43

### Objective
Execute Phase 2 of Animation Upgrade Plan: Ambient Soft Spotlight & Magnetic Navigation.

### Accomplished
- ✅ Created `src/components/AmbientSpotlight.tsx` featuring GPU-accelerated cursor following with inertia spring physics (`stiffness: 140, damping: 24, mass: 0.6`) and smooth opacity fading.
- ✅ Tailored theme-aware gradients: subtle soft-ivory ambient mist in Dark Mode (`#171717`) and specular warm paper gleam in Light Mode (`#F7F6F2`).
- ✅ Handled mobile/touch devices: lazy check for `(pointer: fine)` so touchscreens never instantiate listeners or render overhead.
- ✅ Integrated `prefers-reduced-motion` check returning `null` when motion is disabled.
- ✅ Updated `src/components/Navbar.tsx` with `MagneticNavItem` and `MagneticLogo`: restrained magnetic displacement (clamped to `±5px` X, `±3.5px` Y) and expanding editorial micro-indicator dots on hover.
- ✅ Verified that magnetic pull does not distort click targets or keyboard focus.
- ✅ Mounted `<AmbientSpotlight />` in `src/App.tsx`.
- ✅ Verified `npm run build` and `npm run lint` pass with 0 errors and 0 warnings.
- ✅ Empirically validated spotlight motion, hover magnetics, and navigation via Playwright.

## Session: 2026-11-07 10:49

### Objective
Execute Phase 3 of Animation Upgrade Plan: Cinematic Hero Typography Reveal.

### Accomplished
- ✅ Redesigned `src/components/Hero.tsx` with masked line-by-line typography reveals using custom deceleration cubic bezier easing (`[0.16, 1, 0.3, 1]`).
- ✅ Wrapped headline, sub-heading, and tagline in `overflow-hidden` mask containers with descender clearance, sliding from `y: 115%` to `y: 0%` without clipping or layout jumping.
- ✅ Staggered entrance timing: `HELLO, I'M` (0.12s) → `BHAGAVATH KUMAR` (0.24s) → `A Curious Mind Turning Ideas into Code.` (0.36s) → narrative body (0.48s) → CTA group (0.60s) → scroll indicator (0.95s).
- ✅ Created `MagneticCta` wrappers for "Explore My Work" and "Get in Touch" buttons with clamped spring physics (`±4px` X, `±3px` Y) and subtle arrow nudge on hover.
- ✅ Enhanced scroll indicator with expanding line (`w-8` to `w-12`) and translating down-arrow on hover.
- ✅ Integrated `useReducedMotion()` fallback switching smoothly to instant opacity transitions with zero sliding.
- ✅ Verified `npm run build` and `npm run lint` pass with 0 errors and 0 warnings.
- ✅ Empirically validated mid-flight reveal coordinates, settling metrics, and dual-theme appearance via Playwright.

## Session: 2026-11-07 11:04

### Objective
Execute Phase 3 of Animation Upgrade Plan: Cinematic Hero Typography Reveal (Isolated strictly to `Hero.tsx`).

### Accomplished
- ✅ Inspected existing `src/components/Hero.tsx` and implemented masked typography line reveals with `overflow-hidden` containers.
- ✅ Orchestrated line-by-line staggered reveal using `cubic-bezier(0.16, 1, 0.3, 1)`:
  - Sub-heading (`HELLO, I'M`) at `t = 0.15s`
  - Headline word 1 (`BHAGAVATH`) at `t = 0.27s` with descender padding
  - Headline word 2 (`KUMAR`) at `t = 0.39s` with descender padding
  - Tagline (`A Curious Mind Turning Ideas into Code.`) at `t = 0.51s`
  - Supporting narrative at `t = 0.63s`
  - CTA buttons at `t = 0.75s`
  - Scroll indicator at `t = 1.05s`
- ✅ Applied `MagneticCta` wrappers to "Explore My Work" and "Get in Touch" buttons with clamped spring physics (`±4px` X, `±3px` Y).
- ✅ Added `useReducedMotion()` fallback returning instant opacity with zero sliding.
- ✅ Ensured all other sections (`Projects.tsx`, `About.tsx`, `Journey.tsx`, `Contact.tsx`) remain unmodified.
- ✅ Verified `npm run build` and `npm run lint` pass with 0 errors and 0 warnings.

## Session: 2026-11-07 11:32

### Objective
Debug and resolve the 3D perspective tilt interaction on project cards in `src/components/Projects.tsx` while keeping surface spotlight intact.

### Root Cause Analysis & Fixes
- **Decoupled 3D Context:** Separated the outer layout wrapper (`containerRef` with `style={{ perspective: 1000 }}`) from the inner 3D article (`transformStyle: 'preserve-3d'`), eliminating coordinate feedback where rotating the element shifted its own `getBoundingClientRect()`.
- **Planar Axis Sign Correction:** Fixed conflicting rotation signs (Option A: card angles cooperatively towards cursor, `rotateXTarget = -normY * 2`, `rotateYTarget = normX * -2`).
- **MotionValue Binding Permanence:** Removed ternary number fallback in `style={{ rotateX, rotateY }}`, ensuring Framer Motion's change subscriptions are permanently bound.
- **Spring Latency Optimization:** Tuned spring physics from sluggish `{ stiffness: 280, damping: 24, mass: 0.5 }` to snappy, organic `{ stiffness: 320, damping: 25, mass: 0.25 }` (<70ms latency).
- **Separated Animation Pipelines:** Decoupled `itemVariants` entrance animation onto outer container, preventing variant transform conflicts with direct card rotation.
- **Hardware Pointer & Reduced-Motion Resilience:** Expanded query to `(any-pointer: fine) || (pointer: fine)` to support touchscreen Windows laptops, and added dynamic `prefers-reduced-motion` event listener.
- **Verification:** Verified live interaction across all 4 cards in Playwright for dark and light modes, testing smooth ±2deg tilt on hover, flat settling on leave, and clean build/lint results.

## Session: 2026-11-07 11:40

### Objective
Execute Phase 5: Smooth Scroll-Triggered Section Reveals & Final Coordination throughout the entire portfolio.

### Accomplished
- ✅ Standardized on signature `cubic-bezier(0.16, 1, 0.3, 1)` easing curve across `About.tsx`, `Projects.tsx`, `Journey.tsx`, `Contact.tsx`, and `Footer.tsx`.
- ✅ Configured coordinated staggered entrances (`staggerChildren: 0.12 - 0.14`, `delayChildren: 0.06`, `duration: 0.75s`) with `-60px` viewport margins for natural scroll-triggered reveals.
- ✅ Added responsive micro-interactions: timeline node hover scale (`Journey.tsx`), button and link elevation (`Contact.tsx`, `Footer.tsx`), and smooth back-to-top execution.
- ✅ Integrated `useReducedMotion()` fallbacks across all sections to respect accessibility preferences.
- ✅ Empirically verified end-to-end site interaction, scrolling, theme switching, and back-to-top in Playwright.
- ✅ Verified `npm run lint` and `npm run build` pass with 0 errors and 0 warnings.

## Session: 2026-11-07 12:24

### Objective
Implement Personal Portrait Integration stage in `src/components/Hero.tsx` using authentic user-uploaded photograph.

### Accomplished
- ✅ Verified image asset copied to `public/assets/bhagavath-portrait.jpg` (812 × 1024 px, valid JPEG, unmodified original photograph).
- ✅ Refined Hero into a 12-column editorial split composition (`lg:grid-cols-12`):
  - Left (7 cols): Preserved 100% of animated name, intro, narrative, and magnetic CTAs.
  - Right (5 cols): Integrated an editorial 4:5 frame (`aspect-[4/5]`) with 1px theme-aware border (`border-[#383838]` / `light:border-[#DCD8CE]`).
- ✅ Implemented cinematic bottom-to-top unmasking reveal (`clipPath: inset(100% 0 0 0) -> inset(0% 0 0 0)`, `delay: 0.35s`, `duration: 0.95s`, `ease: [0.16, 1, 0.3, 1]`) timed to complement headline typography.
- ✅ Added restrained hover scale (`scale: 1.05` vs base `scale: 1.035`, net scale delta 1.0145) with 0 distortion.
- ✅ Implemented subtle desktop scroll parallax (`0 – 6px` maximum displacement), active exclusively on desktop viewports.
- ✅ Empirically verified across Desktop (1440x900), Tablet (768x1024), Mobile (375x667), Dark and Light themes via Playwright.
- ✅ Verified `prefers-reduced-motion` cleanly falls back to instant opacity and zero parallax.
- ✅ Both `npm run lint` and `npm run build` pass with 0 errors.

## Session: 2026-11-07 12:45

### Objective
Integrate React Bits HalftoneReveal WebGL2 component into the Hero section portrait frame, rendering authentic user photograph as an interactive halftone matrix with pointer reveals, click ripple burst, and dynamic dual-theme synchronization.

### Accomplished
- ✅ Created `src/components/HalftoneReveal.tsx` featuring complete WebGL2 shaders (`VERTEX`, `MASK`, `VIEW`), ping-pong framebuffers, dynamic texture sizing, pointer movement trails, and click burst physics.
- ✅ Created `src/components/HalftoneReveal.css` with responsive container, crosshair canvas, and graceful `<img>` fallback styling.
- ✅ Integrated `<HalftoneReveal />` into `src/components/Hero.tsx` with monochromatic ink-wash dot styling (`mode="mono"`, `shape="dot"`, `cellSize={6}`, `angle={45}`, `dotScale={0.75}`, `contrast={1.4}`, `revealRadius={150}`, `softness={0.6}`, `linger={1.0}`).
- ✅ Synchronized dual-theme color transitions dynamically via `useTheme()`:
  - Dark Mode: `inkColor="#F2F0E9"`, `paperColor="#171717"`
  - Light Mode: `inkColor="#171717"`, `paperColor="#F7F6F2"`
- ✅ Configured accessible image role (`role="img"`, descriptive `aria-label`, `aria-hidden="true"` canvas) and graceful fallback to `<img>` upon WebGL2 failure.
- ✅ Honored `prefers-reduced-motion` by disabling intro reveals and ripple bursts.
- ✅ Empirically verified rendering, pointer unmasking, click burst, theme switching, and mobile responsiveness via Playwright.
- ✅ `npm run lint` and `npm run build` pass with 0 errors and 0 warnings.

## Session: 2026-11-07 13:00

### Objective
Integrate React Bits SlingButton component as the final interactive CTA section immediately before the Footer, triggering a default email composer to `bhagavathg1382008@gmail.com`.

### Accomplished
- ✅ Installed required packages: `motion`, `@hugeicons/react`, and `@hugeicons/core-free-icons` alongside existing `framer-motion`.
- ✅ Created `src/components/SlingButton.css` with elastic band, tension circle, focus indicator, and reduced-motion overrides.
- ✅ Created `src/components/SlingButton.tsx` converting source JavaScript into clean, strongly typed TypeScript with pointer capture, velocity calculations, particle burst dynamics, and keyboard accessibility.
- ✅ Created `src/components/ConnectCta.tsx` placed immediately before `Footer` in `App.tsx` with label `"LET'S CONNECT"`, supporting text `"Have an idea? Let's make it happen."`, and accessible label `"Email Bhagavath"`.
- ✅ Integrated dynamic dual-theme styling via `useTheme()`:
  - Dark: pad `#F2F0E9`, icon `#171717`, accent `#F2F0E9`, well `#222222`, band `#777777`
  - Light: pad `#171717`, icon `#F7F6F2`, accent `#171717`, well `#ECEAE4`, band `#8A857A`
- ✅ Empirically verified with Playwright across dark/light themes, keyboard navigation (`Enter` and `Space`), mouse stretch past `armAt=56px`, particle recoil, click-to-send, and mobile viewport.
- ✅ `npm.cmd run lint` and `npm.cmd run build` pass with 0 errors and 0 warnings.

## Session: 2026-11-07 13:20

### Objective
Integrate React Bits DotField as a continuous, full-page background covering the entire portfolio from the top of the Hero section down to the bottom of the Footer with ink-wash theme colors.

### Accomplished
- ✅ Created `src/components/DotField.tsx` converting WebGL2 `#version 300 es` shaders, Oklab ink conversions, and instanced particle rendering to strict TypeScript.
- ✅ Created `src/components/DotField.css` supporting fixed full-viewport canvas layout with zero click interception (`pointer-events: none`).
- ✅ Mounted once at the application root level in `src/App.tsx`, providing continuous background coverage across all pages and viewports while scrolling.
- ✅ Updated `src/components/Footer.tsx` background to transparent so dots seamlessly reach the very bottom.
- ✅ Bound theme transitions to `useTheme()`:
  - Dark: `gradientFrom="#777777"`, `gradientTo="#D6D3CB"`, `glowColor="#F2F0E9"`, `lightMode={false}`
  - Light: `gradientFrom="#8A857A"`, `gradientTo="#55534E"`, `glowColor="#171717"`, `lightMode={true}`
- ✅ Empirically verified with Playwright across dark/light themes, cursor lensing, continuous scrolling down to the footer, mobile responsiveness, and reduced motion.
- ✅ `npm.cmd run lint` and `npm.cmd run build` pass with 0 errors and 0 warnings.

## Session: 2026-11-07 14:00

### Objective
Upgrade portfolio scroll-triggered animations across About, Projects, Journey, Contact, ConnectCta, and Footer to support bidirectional viewport reveals (`once: false`), ensuring elements smoothly re-reveal when scrolling down or scrolling up, cleanly reset on viewport exit, and maintain robust reduced-motion accessibility.

### Accomplished
- ✅ Upgraded `src/components/About.tsx`: Split into two distinct bidirectional animation blocks (Narrative Grid and Numbered Interests `01`–`04`), animating smoothly in both scroll directions with `viewport={{ once: false, margin: '-50px', amount: 0.15 }}`.
- ✅ Upgraded `src/components/Projects.tsx`: Section heading and individual `ProjectCard` items animate bidirectionally, completely preserving 3D perspective tilt (`rotateX`, `rotateY`) and radial spotlight tracking.
- ✅ Upgraded `src/components/Journey.tsx`: Section header and each vertical timeline entry reveal independently and bidirectionally as the visitor scrolls up or down.
- ✅ Upgraded `src/components/Contact.tsx`: Header, direct contact channels, academic context, profile links, and message composer trigger bidirectionally.
- ✅ Upgraded `src/components/ConnectCta.tsx`: Final SlingButton section triggers bidirectionally with spring entrance and exit.
- ✅ Upgraded `src/components/Footer.tsx`: Back-to-top and copyright footer trigger bidirectionally with `viewport={{ once: false, margin: '-20px', amount: 0.1 }}`.
- ✅ Coordinated timing and easing: `CUBIC_EASE = [0.16, 1, 0.3, 1]` for 0.75s entrance, 0.35s `easeOut` for exit.
- ✅ Preserved Hero initial cinematic load reveal (`Hero.tsx`) completely intact.
- ✅ Preserved HalftoneReveal, DotField, SlingButton, and HangingLampCord interactions.
- ✅ Bulletproof `prefers-reduced-motion`: In `reducedVariants`, `hidden` and `visible` both default to `opacity: 1, y: 0`, preventing flickering or vanishing elements for users with motion sensitivity.
- ✅ Empirically validated bidirectional scroll down, scroll up, exit reset, and reduced-motion via Playwright.
- ✅ `npm.cmd run lint` and `npm.cmd run build` pass with 0 errors and 0 warnings.

## Session: 2026-11-07 14:20

### Objective
Implement automatic active-section detection and a RubberSegment-inspired sliding indicator capsule for the desktop and mobile navigation bar, preserving smooth scrolling, magnetic pull interactions, mobile drawer, and ink-wash dual-theming.

### Accomplished
- ✅ Updated `src/components/Navbar.tsx` with robust, deterministic active section detection (`SECTION_IDS = ['home', 'about', 'projects', 'journey', 'contact']`) with `requestAnimationFrame` debouncing on scroll and resize.
- ✅ Handled edge cases: top of page (< 80px) locks to `home`, bottom of page (within 60px of document end) locks to `contact`, and intermediate sections detect via a fixed threshold below the sticky navbar (`refY = 140px`).
- ✅ Integrated Framer Motion `<LayoutGroup id="desktop-navbar">` and `layoutId="active-nav-indicator"` for RubberSegment-inspired elastic sliding capsule animation with restrained spring dynamics (`stiffness: 380, damping: 30, mass: 0.8`).
- ✅ Fully synchronized theme colors:
  - Dark Mode: Primary soft ivory text (`#F2F0E9`), dark 50% surface background, subtle charcoal border.
  - Light Mode: Primary charcoal text (`#171717`), soft sand background (`#ECEAE4`), subtle sand border (`#DCD8CE`).
  - Inactive links remain muted (`#A3A3A3` / `#6B6964`) with magnetic hover pull and micro-dot indicator.
- ✅ Updated mobile drawer navigation:
  - Closes on link selection and smoothly scrolls with fixed navbar clearance offset.
  - Automatically highlights the active section inside the drawer with active pill background, indicator dot, and `aria-current="location"`.
  - Added dual-theme support to the mobile drawer backdrop and border.
- ✅ Supported keyboard accessibility (`focus-visible:ring-1 focus-visible:ring-[#C8C4B8]`) and `prefers-reduced-motion` instant transitions (`duration: 0`, `behavior: 'auto'`).
- ✅ Empirically validated all 10 user requirements across desktop, tablet, and mobile viewports with Playwright.
- ✅ `npm.cmd run lint` and `npm.cmd run build` pass with 0 errors and 0 warnings.

---

*Last updated: 2026-11-07*

