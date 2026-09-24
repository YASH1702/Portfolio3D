# AI_CONTEXT — Yashwant Kariha Portfolio

> This document enables any AI coding agent to understand the project architecture and continue development without reading the entire codebase.

---

## Project Identity

- **Owner**: Yashwant Kariha
- **Role**: Full-Stack Developer
- **Tagline**: Building digital products, AI systems & modern web experiences.
- **Stack**: Next.js 16, React, TypeScript, Three.js, React Three Fiber, Drei, Tailwind CSS, Framer Motion

---

## Architecture

```
app/
├── layout.tsx          — Root layout, fonts, metadata
├── globals.css         — Design tokens, base styles, cursor and scrollbar rules
├── not-found.tsx       — 404 page styled in studio aesthetic
├── page.tsx            — Main page: fixed R3F canvas + scroll driver + UI overlays
├── resume/
│   └── page.tsx        — Printable Curriculum Vitae (/resume)
└── projects/
    └── [id]/
        └── page.tsx    — Project case study (server component with static params)

context/
└── StudioContext.tsx   — Day/Night mode, desk lamp state, monitor screen mode, hotkeys

components/
├── 3d/
│   ├── StudioScene.tsx — Root R3F <Canvas> (dynamic import, ssr: false, PCF shadows)
│   ├── Room.tsx        — Room geometry: walls, floor, ceiling, window panels, floor sunlight
│   ├── WindowView.tsx  — Rainy exterior scenery backdrop and animated falling rain streaks
│   ├── Desk.tsx        — Developer workstation: desk, accessories, interactive lamp, notebook
│   ├── Monitor.tsx     — Interactive monitor screen (Code, Terminal, Architecture modes)
│   ├── Couch.tsx       — Modern fabric couch with pillows & sleeping cat
│   ├── SleepingCat.tsx — Curled sleeping cat on couch with rhythmic breathing animation
│   ├── Lighting.tsx    — Studio lighting: hemisphere + sun + desk lamp + fill lights
│   ├── Environment.tsx — Woven rug, floor lamp, beanbag, tree, wall slats, bookshelf
│   ├── HeroWall.tsx    — Front wall architectural typography (drei Text)
│   ├── ProjectWall.tsx — Left wall: 3 interactive ProjectFrame components + floor spotlights
│   └── ScrollCamera.tsx — Mounts useScrollCamera hook inside Canvas
├── sections/
│   ├── AboutOverlay.tsx   — Left-positioned editorial card during workspace view
│   └── ContactSection.tsx — Bottom-centered "LET'S BUILD SOMETHING." overlay with 4 links
└── ui/
    ├── LoadingScreen.tsx         — Fades out smoothly when 3D scene initialises
    ├── Navigation.tsx            — Minimal fixed header (wordmark + numbered section links)
    ├── Cursor.tsx                — Precision dot + lagged ring + "VIEW CASE STUDY" badge
    ├── ScrollIndicator.tsx       — Vertical progress bar and current section indicator
    ├── StudioControls.tsx        — Day/Night and Lamp toggle buttons (keys N and L)
    ├── PrintButton.tsx           — Client print / save as PDF button for /resume
    └── ProjectPreviewMockup.tsx  — Stylized interactive browser UI mock for case studies

hooks/
├── useScrollProgress.ts — Reads window.scrollY → smooth progress (0–1)
├── useScrollCamera.ts   — R3F hook: camera keyframe interpolation, micro-parallax & mobile FOV
└── useReducedMotion.ts  — prefers-reduced-motion media query

data/
└── projects.ts          — Single source of truth for all project data

lib/
├── cameraKeyframes.ts   — Calibrated camera positions and targets
├── easings.ts           — Smoothstep, dampedLerp, lerp, mapRange
├── projectTextures.ts   — Procedural 1024x720 canvas textures for framed project artwork
└── rainTexture.ts       — Procedural rainy/misty outdoor window scenery generator
```

---

## 3D Scene Coordinate System

- **X axis**: Left (`-6.0`) to Right (`+6.0`)
- **Y axis**: Floor (`0.0`) to Ceiling (`4.0`)
- **Z axis**: Front Wall (`-6.0`) to Back Wall (`+6.0`)

| Object | Coordinates | Description |
|--------|-------------|-------------|
| Front Wall | `Z = -6.0` | Contains HeroWall architectural lettering |
| Left Wall | `X = -6.0` | Contains the 3 framed project artwork displays |
| Right Wall | `X = +6.0` | Contains the large 4-pane natural window |
| Couch | `[-1.5, 0, 1.5]` | Foreground left modern fabric sofa |
| Desk | `[2.2, 0, -1.2]` | Midground right workstation with monitor & accessories |
| Bookshelf | `[5.2, 0, -3.5]` | Wall bookshelf with colored books |
| Floor Plant | `[-5.4, 0, -4.2]`| Large potted plant in back-left corner |
| Project 01 | `[-5.92, 1.95, -2.2]` | CareerPulse framed display |
| Project 02 | `[-5.92, 1.95,  0.0]` | CoreDesk framed display |
| Project 03 | `[-5.92, 1.95,  2.2]` | TaskForge framed display |

---

## Camera Timeline & Navigation Targets

Virtual scroll height is set to `500vh` in `app/page.tsx`.
`useScrollProgress` reads window scroll and dampens target progress at ~6% per RAF tick.

| Scroll % | Camera Position | Target (LookAt) | Active Section | UI Overlay Visible |
|----------|-----------------|-----------------|----------------|--------------------|
| 0% – 22% | `[0.0, 1.65, 5.0]` → `[0.1, 1.65, 3.0]` | `[0.0, 1.80, -5.86]` | Home | None (Scroll indicator active) |
| 28% – 52% | `[1.3, 1.35, 0.4]` | `[2.2, 1.05, -1.2]` | About | `AboutOverlay` (left side) |
| 58% – 86% | `[-2.3, 1.95, 0.0]` | `[-5.92, 1.95, 0.0]` | Work / Projects | None (3D frames interactive) |
| 88% – 100% | `[0.0, 1.7, 3.6]` | `[0.0, 1.4, -2.0]` | Contact | `ContactSection` (bottom center) |

---

## Mobile & Responsive Behavior

1. **Aspect Ratio & FOV Compensation**:
   In `hooks/useScrollCamera.ts`, when `size.width / size.height < 1.0` (portrait mobile):
   Vertical FOV dynamically increases from 55° up to 72° to preserve horizontal room coverage.
   During the Projects section, camera X shifts back from `-2.3` to `-1.5` so all 3 frames fit comfortably.
2. **Touch Devices**:
   `globals.css` applies `cursor: none` only under `@media (hover: hover) and (pointer: fine)`.
   `Cursor.tsx` checks `window.matchMedia("(pointer: fine)")` and stays inert on phones.
3. **Performance on Mobile**:
   DPR capped at `[1, 1.5]`.
   `AdaptiveDpr pixelated` automatically drops DPR under heavy load.
   `PauseOnHidden` pauses WebGL when browser tab loses visibility.

---

## Interaction Architecture

- **Hovering Project Frames**:
  Dispatches `window.dispatchEvent(new CustomEvent("project-hover", { detail: { active: true, title: project.title } }))`.
  `Cursor.tsx` catches this event, expands the outer ring, and displays `"VIEW CASE STUDY →"`.
  The 3D frame scales to `1.025`, emissive intensity rises to `0.12`, and local point light brightens to `0.75`.
- **Clicking Project Frames**:
  Routes cleanly to `/projects/${project.id}` case study page.
- **Navigation Links**:
  Smoothly scrolls `window.scrollTo` to the corresponding virtual scroll progress.

---

## Development & Build

```bash
npm run dev     # Starts development server (http://localhost:3001)
npm run build   # Production static generation (all 7 routes pre-rendered)
npm run lint    # ESLint verification
```
