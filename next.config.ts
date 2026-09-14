import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js to work correctly in Next.js
  experimental: {
    // Optimize package imports for Three.js sub-path imports
    optimizePackageImports: ["three", "@react-three/fiber", "@react-three/drei"],
  },

  // Turbopack config (Next.js 16+ default bundler)
  turbopack: {
    // GLB/GLTF files handled by Next.js static file serving from /public
  },
};

export default nextConfig;
