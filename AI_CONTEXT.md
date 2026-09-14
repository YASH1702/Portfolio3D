# AI_CONTEXT — Yashwant Kariha Portfolio

> This document enables any AI coding agent to understand the project architecture and continue development without reading the entire codebase.

---

## Project Identity

- **Owner**: Yashwant Kariha
- **Role**: Full-Stack Developer
- **Tagline**: Building digital products, AI systems & modern web experiences.
- **Stack (personal)**: React, Next.js, TypeScript, Node.js, PostgreSQL, Prisma, OpenAI, Tailwind CSS

---

## What This Is

A **cinematic scroll-driven 3D portfolio website**. The user never controls a character or navigates pages in the traditional sense. Instead:

1. The entire page is a tall div (500vh) that creates scroll distance.
2. A **fixed R3F (React Three Fiber) canvas** sits behind everything, rendering a 3D room.
3. Scrolling changes `window.scrollY`, which is converted to a `progress` value (0–1).
4. `progress` drives **camera keyframe interpolation** — the camera smoothly moves through the room.
5. The room contains the portfolio content as **physical objects**: text on the front wall, project frames on the left wall, desk showing developer workspace.

---

## Architecture

```
app/
├── layout.tsx          — Root layout, fonts, metadata
├── globals.css         — Design tokens, base styles, canvas utilities
├── page.tsx            — Main page: canvas + scroll driver + UI overlays
└── projects/
    └── [id]/
        └── page.tsx    — Project case study (server component, static params)

components/
├── 3d/
│   ├── StudioScene.tsx — Root R3F <Canvas> (dynamic import, ssr: false)
│   ├── Room.tsx        — Room geometry: walls, floor, ceiling, window
│   ├── Desk.tsx        — Procedural desk with all accessories
│   ├── Couch.tsx       — Procedural modern sofa
│   ├── Lighting.tsx    — All lights: hemisphere + directional + 3 point lights
│   ├── HeroWall.tsx    — Front wall typography using drei Text
│   ├── ProjectWall.tsx — Left wall: 3 interactive ProjectFrame components
│   └── ScrollCamera.tsx — Mounts useScrollCamera hook inside Canvas
├── sections/           — (Phase 7+) HTML overlays for About/Contact
└── ui/
    ├── LoadingScreen.tsx — Fades out after 3D scene initialises
    ├── Navigation.tsx    — Fixed minimal nav (wordmark + 3 links)
    └── Cursor.tsx        — Custom dot+ring cursor for desktop

hooks/
├── useScrollProgress.ts — Reads window.scrollY → smooth progress (0–1)
├── useScrollCamera.ts   — R3F hook: drives camera based on progress
└── useReducedMotion.ts  — prefers-reduced-motion media query

data/
└── projects.ts          — Single source of truth for all project data

lib/
├── cameraKeyframes.ts   — Camera keyframe definitions + interpolation
└── easings.ts           — Smoothstep, dampedLerp, lerp, mapRange
```

---

## 3D Scene Structure

### Room Coordinate System
- X axis: left (negative) → right (positive)
- Y axis: floor (0) → ceiling (4)
- Z axis: back (-6) → front (camera starts at Z=5)

### Key Positions
| Object | Position | Notes |
|--------|----------|-------|
| Camera start | `[0, 1.6, 5]` | Facing front wall |
| Front wall | `Z = -6` | Hero typography |
| Left wall | `X = -6` | Project frames |
| Desk | `[2.2, 0, -1.2]` | Right side |
| Couch | `[-1.5, 0, 1.5]` | Center-left |
| Project frame 1 | `[-5.95, 2.0, -1.6]` | JobPilot AI |
| Project frame 2 | `[-5.95, 2.0, 0.0]` | BusinessFlow |
| Project frame 3 | `[-5.95, 2.0, 1.6]` | AI Automation |

### Room Dimensions
- Width (X): 12 units
- Height (Y): 4 units  
- Depth (Z): 12 units
- All walls are simple `<planeGeometry>` — no heavy models

---

## Camera System

### How It Works
1. `useScrollProgress` → smooth `progress` (0–1) from scroll position
2. `progress` passed as prop from `page.tsx` → `StudioScene` → `ScrollCamera`
3. `ScrollCamera` mounts `useScrollCamera` hook inside R3F Canvas
4. `useScrollCamera` reads `progress`, calls `interpolateCameraKeyframes(progress)`
5. Returns target `position` and `target` (lookAt point)
6. Uses `dampedLerp` (exponential decay, lambda=5) to smooth camera toward target
7. Applies via `camera.position.copy()` and `camera.lookAt()` each frame

### Camera Keyframes
| Progress | Position | Target | Section |
|----------|----------|--------|---------|
| 0% | [0, 1.6, 5] | [0, 1.4, 0] | home |
| 25% | [0.5, 1.55, 3.2] | [0, 1.4, 0] | home |
| 45% | [1.8, 1.5, 1.8] | [1.5, 1.2, -1] | about |
| 65% | [-1.5, 1.6, 0.5] | [-4, 1.5, 0] | projects |
| 80% | [-2.5, 1.6, 0.2] | [-4.5, 1.5, 0] | projects |
| 100% | [0, 1.5, -1.5] | [0, 1.2, -4] | contact |

---

## Scroll System

- **Virtual scroll height**: 500vh (set in `page.tsx` → `SCROLL_HEIGHT`)
- **Canvas**: `position: fixed; inset: 0` — never moves
- **Scroll driver**: `height: 500vh` div with `pointer-events: none`
- **Smooth progress**: `useScrollProgress` applies ~6% per-frame damping

To change scroll speed: adjust `SCROLL_HEIGHT` in `app/page.tsx`.
To change camera smoothness: adjust `lambda` in `useScrollCamera.ts` (default: 5).

---

## Project Data

Projects live in `data/projects.ts`. Each project has:
- `id`, `number`, `title`, `subtitle`, `description`
- `problem`, `solution`, `features[]`, `technologies[]`
- `techCategories` (organized by layer)
- `challenges`, `whatIBuilt`
- `image` (placeholder path), `github?`, `demo?`
- `status`, `year`
- `wallPosition` (3D coordinates for left wall)
- `frameRotation` (pre-set to face camera)

To add a project: add entry to `projects[]` array and add a `wallPosition`.

---

## Design System

### Colors (CSS variables in `globals.css`)
```
--color-wall:          #f0ebe0  (warm off-white)
--color-floor:         #c8a87a  (natural wood)
--color-text-primary:  #1a1a18  (near-black)
--color-text-secondary:#5a5850
--color-text-mono:     #8b7355  (warm brown)
--color-accent-warm:   #c4a882
--color-bg:            #e8e0d4  (canvas background)
```

### Typography
- `--font-display`: Geist Sans (Next.js Google Fonts)
- `--font-mono`: Geist Mono (Next.js Google Fonts)
- Hero name: 0.28 units (drei Text), letter-spacing 0.12em
- Role: 0.1 units, tracking 0.22em
- Mono metadata: `--font-geist-mono`, small sizes

---

## Lighting Setup (`components/3d/Lighting.tsx`)

| Light | Type | Color | Intensity | Purpose |
|-------|------|-------|-----------|---------|
| Hemisphere | hemisphere | warm/cool | 0.4 | Ground bounce |
| Ambient | ambient | warm white | 0.3 | Soft fill |
| Sun | directional | warm white | 1.0 (variable) | Window sunlight |
| Desk lamp | point | warm amber | 0.8 | Desk work light |
| Screen | point | cool white | 0.15 | Monitor glow |
| Window bounce | point | cool white | 0.3 | Room fill |

Sun intensity oscillates very slowly (period ~20s) for a subtle breathing effect.

---

## Interaction

### Project Frames
- **Hover**: emissive intensity increases from 0 → 0.12 (smooth, 8% per frame)
- **Click**: `router.push('/projects/${project.id}')`
- **Cursor**: set via `document.body.style.cursor` on pointer enter/leave

### Navigation
- Clicking a nav item calls `scrollToProgress(target)` where target is a progress % 
- Uses `window.scrollTo({ top, behavior: 'smooth' })`
- Active section derived from `interpolateCameraKeyframes(progress).section`

---

## Performance Strategy

- Three.js loaded **client-side only** (`dynamic(() => import(...), { ssr: false })`)
- DPR capped at `[1, 2]` via Canvas `dpr` prop
- `AdaptiveDpr` + `AdaptiveEvents` from drei for runtime adaptation
- Shadows: `soft` (PCFSoft), shadow map 1024×1024
- Max 3 shadow-casting lights (only directional casts shadows)
- Animation budget: mostly scroll-driven, not continuous
- Sunlight animation: extremely slow (delta × 0.05), near-zero CPU cost
- `delta` capped at 50ms in `useScrollCamera` to prevent large jumps

---

## Accessibility

- 3D canvas has `aria-hidden="true"` — decorative layer
- Semantic HTML content in hidden div for screen readers (in `page.tsx`)
- Navigation uses `<button>` elements with `aria-label` / `aria-current`
- `useReducedMotion()` causes camera to snap (lambda=100) instead of animate
- Focus states: `outline: 2px solid #8b7355` on `:focus-visible`
- Loading screen has `aria-live="polite"` and `aria-label="Loading portfolio"`

---

## File Naming Conventions

- 3D components: PascalCase, exported as default
- Hooks: camelCase, prefixed with `use`
- Lib utilities: camelCase functions, named exports
- Data: camelCase variable names, named exports

---

## Known Limitations (Phase 1)

1. `HeroWall.tsx` uses drei `Text` default font — will look generic until custom font added in Phase 12
2. Project frames show colored placeholder backgrounds — replace with actual screenshots
3. Camera keyframe positions are estimates — need tuning after visual testing
4. No contact section content yet (Phase 8)
5. Mobile not yet optimized (Phase 9)
6. No actual GLB models (procedural geometry only) — fine for performance

---

## Development Commands

```bash
cd d:\Portfolioz\portfolio
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
```
