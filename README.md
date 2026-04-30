# Marbles Health - Web Developer Assignment

Submission for the Marbles Health frontend intern assignment. Two tasks: a full website implementation from a Figma prototype, and a ripple effect interaction.

---

## Task 1: Website Implementation

Built the Marbles Health website from the provided Figma prototype. The architecture follows a strict modular separation of concerns, with a hard rule: no complex animation logic inside JSX.

### Tech Stack

| Tool | Role |
|---|---|
| Next.js 16 (App Router) | Routing, layouts, server/client boundaries |
| React 19 + TypeScript | Type-safe component layer |
| Tailwind CSS 4 | Utility-first styling, consumes design tokens from `lib/tokens.ts` |
| Framer Motion | Scroll-triggered transitions, layout animations, hover effects, entry sequences |
| Lenis | Smooth scrolling via RAF loop, integrated in `components/layout/SmoothScroll.tsx` |

### Project Structure

```
/app
  layout.tsx          → Global layout: font providers (Jakarta Sans, Oswald), custom cursor

/components
  /ui                 → Atomic primitives
  /layout             → Structural wrappers (Navbar, SmoothScroll, Footer)
  /sections           → Page-level blocks (HeroSection, SeekSection, ConditionsSection, etc.)
  /motion-primitives  → Reusable motion-enhanced components (TextRoll, ContainerTextFlip)

/motion               → All animation sequences, fully isolated from JSX
  navbar.ts           → Navbar dropdown animation logic
  seek.ts             → Multi-stage SeekSection timeline
  hero.ts             → heroSequence config

/lib
  tokens.ts           → Single source of truth for colors, spacing, easing
  animate.ts          → animate() helper with presets: fadeUp, blurReveal, staggerFadeUp
```

### Animation Architecture

All sequences live in `/motion` and are imported into components. This keeps the UI layer clean and makes animation logic independently testable.

**Framer Motion** drives all animations: scroll-triggered reveals, layout transitions, hover states, entry sequences, and progress bar fills. `useAnimate` scope is used for direct DOM style updates without triggering a full React reconciliation cycle. `useInView` acts as the bridge between the DOM and the motion logic, firing sequences once an element enters the viewport.

**Design tokens** in `lib/tokens.ts` are consumed by both Tailwind and JS-based animations, so color transitions in something like `seekSequence` stay in sync with the brand palette automatically.

### Notable Sections

**Navbar**
The `NavDropdown` component uses `setupDropdownMotion` from `motion/navbar.ts`. On hover, Framer Motion staggers the entry of `li` elements while transitioning container visibility. `onMouseEnter` and `onMouseLeave` trigger the enter and leave timelines respectively, with no React state involved in the visual update.

**SeekSection**
A multi-stage orchestration defined in `motion/seek.ts`. The `SeekBar` component drives two progress divs (`seek-progress-1`, `seek-progress-2`) through a clinical process flow: tDCS, EEG, CET. The `useFloatAnimation` hook applies a continuous floating effect to the device and text containers. Background text (`TextRoll`) and device opacity are all part of a single coordinated timeline.

**ConditionsSection**
Cards are mapped from a conditions array, each wrapped with a specific rotation value (e.g., `-rotate-6`) to create an organic scattered layout. The `conditionsSequence` brings them in from off-screen using a BACK_OUT ease with a blur reveal.

**3D Text Effects**
Word swapping is handled by `components/ui/container-text-flip.tsx` and `components/motion-primitives/text-roll.tsx`, using `AnimatePresence` and spring-based transitions.

---

First, run the development server:

```bash
npm run dev

```
