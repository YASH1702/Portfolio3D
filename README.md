# 🏛️ Yashwant Kariha — 3D Architectural Developer Portfolio

An interactive, editorial 3D studio portfolio built with **Next.js 16 (App Router)**, **React 19**, **Three.js**, and **React Three Fiber (@react-three/fiber & @react-three/drei)**.

Designed around an architectural interior developer studio that seamlessly transitions between **Day Mode** and **Night Mode**, featuring interactive 3D components, procedural animations, dynamic camera choreography, and live UI project mockups.

---

## ✨ Features

- **Architectural 3D Studio Scene**:
  - **Developer Workstation**: Interactive monitor with multiple live display modes (Code typing stream, Live Terminal compile logs, System Architecture graph), studio audio speakers, aluminum headphone stand, and clickable desk lamp.
  - **Living Cozy Lounge**: Scandinavian sofa with draped wool throw blanket, sleeping curled ginger cat with breathing, tail swish, ear twitch, and interactive petting purr reactions.
  - **Atmospheric Greenery**: Indoor fiddle-leaf fig tree, cascading bookshelf pothos ivy, and corner floor plant with procedural wind sway.
  - **Architectural Lighting & Outside Storm**: Directional daylight sunbeams and night moonlight through a 4-pane window with dynamic multi-depth falling rain and rolling horizon mist.
  - **Bookshelf & Decor**: Hidden warm LED cove lights, curated software engineering monographs (*Clean Architecture*, *Designing Data-Intensive Apps*, *AI Systems*, *TypeScript Patterns*), and sculptural brass hourglass.
- **Dynamic Scroll Choreography**:
  - Cinematic camera waypoints interpolating through Studio, About, Projects Gallery, and Contact sections using damped exponential easing.
  - Micro-parallax responding naturally to mouse movement.
- **Frosted Glass Floating UI**:
  - High-contrast typography encased in modern frosted glass pill containers (`backdropFilter: blur(20px)`).
  - Studio controls for Desk Lamp toggle (`L`), Studio Lighting Day/Night mode (`N`), and Ambient Rain Sound toggle (`A`).
- **Interactive Project Gallery Wall**:
  - 3D gallery frames displaying vibrant, backlit procedural UI screenshots of featured full-stack and AI applications.
  - Dedicated individual project case study routes (`/projects/[id]`) with deep-dive technical architecture, engineering challenges, and interactive mockups.
- **Dedicated Print-Ready Resume Route (`/resume`)**:
  - Clean, high-density printable resume with custom print stylesheet (`@media print`).
- **60 FPS Performance Guaranteed**:
  - Zero heavy external 3D models or textures to download; built entirely with procedural geometries, canvas shaders, and instanced rendering for instant load times.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library**: [React 19](https://react.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **3D Helpers**: [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS modules
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons & Typography**: Geist Sans & Geist Mono

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YASH1702/portfolio.git

# Navigate into project directory
cd portfolio

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `1` | Navigate to **Studio** (Hero) |
| `2` | Navigate to **About** |
| `3` | Navigate to **Projects Gallery** |
| `4` | Navigate to **Contact** |
| `N` | Toggle Studio Lighting (**Day / Night Mode**) |
| `L` | Toggle **Desk Lamp** illumination |
| `A` | Toggle Ambient **Rain Audio** |

---

## 📦 Production Build

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 👤 Author

**Yashwant Kariha**
- **Email**: [yashwantkariha1@gmail.com](mailto:yashwantkariha1@gmail.com)
- **GitHub**: [@YASH1702](https://github.com/YASH1702)
- **LinkedIn**: [yashwant-kariha](https://linkedin.com/in/yashwant-kariha-740630207/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
