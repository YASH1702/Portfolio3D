# TODO — Yashwant Kariha Portfolio

> Last updated: Post-Phase 14 Comprehensive Polish

---

## ✅ COMPLETED

### PHASE 1 — Project Structure
- [x] Next.js 16 scaffolded with TypeScript + Tailwind CSS
- [x] Dependencies installed: three, @react-three/fiber, @react-three/drei, gsap, framer-motion, @types/three
- [x] Directory structure created: components/3d, components/sections, components/ui, hooks, data, lib, public/models, public/textures
- [x] `data/projects.ts` — structured project data for all 3 projects
- [x] `lib/cameraKeyframes.ts` — camera path definitions with smoothstep interpolation
- [x] `lib/easings.ts` — custom easing and interpolation utilities
- [x] `hooks/useScrollProgress.ts` — smooth scroll progress tracking
- [x] `hooks/useScrollCamera.ts` — scroll-driven camera hook (R3F)
- [x] `hooks/useReducedMotion.ts` — prefers-reduced-motion support
- [x] `components/3d/StudioScene.tsx` — root R3F Canvas
- [x] `components/3d/Room.tsx` — architectural shell (walls, floor, ceiling, window)
- [x] `components/3d/Desk.tsx` — procedural desk with accessories
- [x] `components/3d/Couch.tsx` — procedural modern sofa
- [x] `components/3d/Lighting.tsx` — studio lighting (hemisphere + directional + point lights)
- [x] `components/3d/HeroWall.tsx` — front wall typography (drei Text)
- [x] `components/3d/ProjectWall.tsx` — 3 interactive project frames
- [x] `components/3d/ScrollCamera.tsx` — camera driver component
- [x] `components/ui/LoadingScreen.tsx` — premium loading experience
- [x] `components/ui/Navigation.tsx` — minimal nav overlay
- [x] `components/ui/Cursor.tsx` — custom cursor (dot + lagged ring)
- [x] `app/layout.tsx` — root layout with SEO metadata + Geist fonts
- [x] `app/globals.css` — design tokens, base styles, scroll utilities
- [x] `app/page.tsx` — main page (fixed canvas + virtual scroll driver)
- [x] `app/projects/[id]/page.tsx` — project case study page
- [x] `next.config.ts` — Three.js optimization config

### PHASE 2 — Build & Environment Verification
- [x] `npm run build` passes — 0 errors, 0 TypeScript errors
- [x] All 7 routes compiled (/, /_not-found, 3x project pages)
- [x] Turbopack config verified for Next.js 16
- [x] Dynamic import `ssr: false` verified for 3D canvas

### PHASE 3 — Environment & Atmosphere
- [x] Added atmospheric fog to `StudioScene` (warm depth blur)
- [x] Added `components/3d/Environment.tsx` (area rug, side table, floor plant, bookshelf with books, skirting boards, ceiling light fixture)
- [x] Built multi-pane window with subtle daylight emission
- [x] Balanced warm materials (off-white, warm wood, plaster)

### PHASE 4 — Front Wall Typography & Architecture
- [x] Scaled architectural lettering (Yashwant Kariha fontSize: 0.46) with subtle depth backing
- [x] Added brushed brass divider bar
- [x] High-tracking role and dual-line positioning statement
- [x] Monospace tech stack specification
- [x] Subtle breathing scroll indicator arrow

### PHASE 5 — Project Frames & Canvas Artworks
- [x] `lib/projectTextures.ts` — procedural high-res (1024x720) canvas texture generator for all 3 projects:
  - JobPilot AI: Copilot dashboard, match score, pipeline queue
  - BusinessFlow: Stripe connected, calendar availability, revenue metrics
  - AI Automation Platform: Visual multi-model node graph with connecting bezier wires
- [x] Physical frame geometry: dark oak molding, inner museum matte, glass reflection plane
- [x] Integrated project metadata on frame (number, title, subtitle, tech stack)
- [x] Smooth hover interaction: frame scales to 1.025, emissive glow increases, local light brightens

### PHASE 6 — Scroll-Driven Camera & Cinematic Timeline
- [x] Calibrated camera keyframes:
  - 0–22%: Home establishing shot facing front wall
  - 28–52%: Focus on modern developer workstation (desk, monitor, lamp)
  - 58–86%: Direct perpendicular gallery view of project wall (all 3 frames in view)
  - 88–100%: Wide, calm final composition with contact overlay
- [x] Exponential damped lerp for buttery smooth camera transitions

### PHASE 7 — About Section Overlay
- [x] `components/sections/AboutOverlay.tsx` positioned on the left side to complement 3D desk view on right
- [x] Headline, bio, and 3 categorized technical skill groups
- [x] Framer motion entrance and exit transitions

### PHASE 8 — Contact Section
- [x] `components/sections/ContactSection.tsx` with "LET'S BUILD SOMETHING."
- [x] 4 primary links: Email, GitHub, LinkedIn, Resume
- [x] Responsive layout and minimal footer

### PHASE 9 — Custom Cursor & Micro-Interactions
- [x] `components/ui/Cursor.tsx` with precision dot and lagged ring
- [x] Dispatches `project-hover` event on frame hover with "VIEW CASE STUDY →" badge
- [x] Respects fine pointer media query (disabled on touch devices)

### PHASE 10 — Project Case Study Pages & UI Mockups
- [x] `components/ui/ProjectPreviewMockup.tsx` — realistic interactive browser mockup for all 3 case studies
- [x] Detailed case study sections: overview, problem, solution, key features, technology, what I built, challenges, and links
- [x] Next / Previous project navigation

### PHASE 11 — Responsive & Mobile Adaptations
- [x] Automatic vertical FOV compensation for portrait/mobile viewports in `useScrollCamera.ts`
- [x] Mobile camera offset so all 3 project frames remain visible on narrow screens
- [x] Touch-friendly navigation targets and standard cursor fallback

### PHASE 12 — Performance Optimizations
- [x] `PauseOnHidden` pauses render loop when browser tab is inactive
- [x] Capped DPR `[1, 1.5]` to prevent GPU overload on retina screens
- [x] `AdaptiveDpr` and `AdaptiveEvents` for dynamic performance tuning
- [x] Zero external image HTTP dependencies (procedural canvas textures)

### PHASE 13 — Accessibility
- [x] Hidden semantic HTML structure in `page.tsx` for screen readers
- [x] ARIA attributes on navigation, loading screen, and section overlays
- [x] Focus visible rings for keyboard navigation
- [x] `useReducedMotion` hook snaps camera and disables animations

### PHASE 14 — Production QA
- [x] `npm run build` succeeds with zero errors (all 8 static routes pre-rendered)
- [x] Dev server running smoothly at `http://localhost:3001`
- [x] Git commits tracking each phase

---

## ✅ ADVANCED POLISH & ENHANCEMENTS
- [x] **Subtle Camera Micro-Parallax**: Smooth, weighted mouse coordinate tracking with damped lerp (lambda: 3.5), disabled on touch / reduced-motion.
- [x] **Day / Night Studio Mode**: Global context toggle switching directional sun, ambient fill, window emission, fog, and background between natural daylight and late-night coding studio.
- [x] **Interactive Desk Lamp**: 3D clickable desk lamp with smooth illumination dimming and hotkey ('L').
- [x] **Interactive 3D Monitor**: Clickable screen cycling between Code Editor, Turbopack Terminal Logs, and Visual System Architecture.
- [x] **Architectural Sunlight & Gallery Spots**: Floor sunlight patch with window mullion shadows (Day mode) + 3 circular floor pools beneath project frames.
- [x] **Curriculum Vitae at `/resume`**: Printable, clean web resume with technical competencies, project metrics, and education.
- [x] **Keyboard Navigation & Hotkeys**: Keys `1-4` for instant section glide, `N` for Day/Night, `L` for Lamp.
- [x] **Sleeping Cat on Sofa**: Curled-up sleeping cat on the couch cushion with procedural fur, ears, curled tail, and slow rhythmic breathing animation (~4.2s cycle).
- [x] **Rainy Window Scenery**: Outside window backdrop with misty overcast sky, rain-washed trees/city, and animated falling raindrops outside the glass (`WindowView.tsx`).
- [x] **Cozy Corner Beanbag & Backlight**: Slumped oatmeal boucle beanie chair in the corner with a warm ambient LED back-glow onto the wall.
- [x] **Standing Corner Floor Lamp**: Slender modern floor lamp with brass detailing, linen cylindrical shade, and warm ambient light.
- [x] **Lush Indoor Greenery & Trees**: Sculptural indoor olive tree in a fluted ceramic pot, trailing pothos vines cascading over the bookshelf, and a side-table succulent.
- [x] **Wall Design & Acoustic Wood Slats**: Vertical acoustic oak slat paneling in the corner and minimal geometric framed wall art.
- [x] **Layered Woven Rug**: Textured Scandinavian woven rug with subtle geometric striping and soft fringed ends.
- [x] **Scroll-Triggered Frame Reveal Animation**: Smooth staggered entry (`X = -6.65` to `-5.92`) as camera reaches gallery section (`ProjectWall.tsx`).
- [x] **Active Project Frame Spotlight**: Active frame shines at full 1.0 brightness while others subtly dim to 0.65; dynamic spotlight point light brightening.
- [x] **Desk Coffee Cup Steam Particles**: Procedural wispy steam rising directly from the mug using `instancedMesh` with organic sine-wave wobble and opacity dissipation (`SteamParticles.tsx`).
- [x] **Monitor Real-Time IST Clock & Code Editor Cursor**: Live updating Indian Standard Time clock (`HH:MM IST`) and blinking code cursor on workstation display (`Monitor.tsx`).
- [x] **Editorial Experience Timeline**: Compact 3-step career timeline (2023 → 2024 → 2025) integrated into the editorial About overlay card (`AboutOverlay.tsx`).
- [x] **Drei `useProgress` Driven Loading Screen**: Real asset loading progress percentage bar with graceful fallbacks (`LoadingScreen.tsx`).
- [x] **Procedural Web Audio Ambient Rain Sound**: Web Audio API filtered noise simulation with dual day/night intensity levels and opt-in button + keyboard shortcut ('A') (`studioAudio.ts` & `AudioToggle.tsx`).
- [x] **Branded OpenGraph Image (`/opengraph-image`)**: Dynamic Node.js ImageResponse social preview card for LinkedIn/Twitter previews (`opengraph-image.tsx`).
- [x] **Comprehensive SEO Metadata**: Full OpenGraph tags, Twitter summary card, robots directives, and canonical URLs (`app/layout.tsx`).

---

## ⚠️ KNOWN ISSUES

- None. All 14 phases + comprehensive enhancements built, verified, and passing cleanly with 0 errors.

---

## 📦 ASSETS REQUIRED

- All textures and visuals are procedurally generated with high visual fidelity.
- Optional: Real project GitHub/demo URLs (Feature #1) can be added whenever repositories are public.

---

## 🚀 FUTURE IMPROVEMENTS

- Optional custom 3D model replacements (.glb) if desired in the future.
