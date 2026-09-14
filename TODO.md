# TODO — Yashwant Kariha Portfolio

> Last updated: Phase 1

---

## ✅ COMPLETED

### PHASE 1 — Project Structure
- [x] Next.js 15 scaffolded with TypeScript + Tailwind CSS
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

---

## ✅ PHASE 2 — Build Verified
- [x] `npm run build` passes — 0 errors, 0 TypeScript errors
- [x] All 7 routes compiled (/, /_not-found, 3x project pages)
- [x] Turbopack config fixed for Next.js 16
- [x] Git checkpoint: `cb79507` — Phase 1 complete

---

## ⬜ REMAINING

### PHASE 3 — Environment & Atmosphere
- [ ] Add fog / atmospheric depth
- [ ] Add environment map for reflections
- [ ] Add floor rug geometry
- [ ] Add large plant in corner
- [ ] Improve window glass effect

### PHASE 4 — Hero Wall Polish
- [ ] Load custom font (Geist) for drei Text
- [ ] Add subtle scroll indicator animation
- [ ] Position typography precisely for cinematic view

### PHASE 5 — Project Frames Polish
- [ ] Add proper frame lighting (point light per frame)
- [ ] Test frame hover interaction
- [ ] Add project image textures when available

### PHASE 6 — Scroll Camera Fine-tuning
- [ ] Tune camera keyframe positions per actual room layout
- [ ] Add subtle camera drift during idle
- [ ] Test on various scroll speeds

### PHASE 7 — Sections: About
- [ ] Design and implement About section overlay
- [ ] Camera keyframe for workspace focus
- [ ] Skills list integration

### PHASE 8 — Sections: Contact
- [ ] Contact section with email, GitHub, LinkedIn
- [ ] Final camera composition

### PHASE 9 — Mobile Fallback
- [ ] Detect mobile UA
- [ ] Simplified 3D composition or fallback layout
- [ ] Reduced geometry/textures on mobile

### PHASE 10 — Performance
- [ ] DPR limits verified
- [ ] Texture compression (ktx2/basis)
- [ ] Pause animations on tab hidden (visibilitychange)
- [ ] Eliminate unnecessary re-renders

### PHASE 11 — Visual Polish
- [ ] Fine-tune lighting intensity and shadows
- [ ] Add subtle desk lamp glow animation
- [ ] Add very subtle sunlight shift over time
- [ ] Refine typography scales

### PHASE 12 — Accessibility & Reduced Motion
- [ ] Full keyboard navigation test
- [ ] Screen reader test
- [ ] Skip to content link
- [ ] Reduced-motion: snap camera, disable idle animations

### PHASE 13 — Production QA
- [ ] `next build` — no errors
- [ ] Lighthouse performance audit
- [ ] Cross-browser check (Chrome, Firefox, Safari)
- [ ] Mobile device test

---

## ⚠️ KNOWN ISSUES

- None yet (Phase 1 complete)

---

## 📦 ASSETS REQUIRED

- [ ] Project screenshots for frames (placeholder colors used currently)
- [ ] Consider GLB desk model for Phase 11 polish
- [ ] Consider GLB couch model for Phase 11 polish
- [ ] Floor texture (wood grain) — Phase 11
- [ ] Wall texture (subtle plaster) — Phase 11
- [ ] Font subset files if self-hosting preferred over Google Fonts CDN

---

## 🚀 FUTURE IMPROVEMENTS

- Add GSAP ScrollTrigger for more granular scroll control
- Add ambient audio (very subtle room tone — opt-in only)
- Animate monitor screen content
- Add subtle dust particle system (performance allowing)
- Add "available for work" status indicator
- Internationalisation (EN only for now)
