import * as THREE from "three";

/**
 * Procedural scenery generator for the window exterior view.
 * Renders a tranquil rainy / misty outdoor atmosphere:
 * - Overcast sky gradient
 * - Distant rain-washed tree silhouettes and misty skyline
 * - Soft glowing warm window lights in the distant buildings
 */

let dayTextureCache: THREE.CanvasTexture | null = null;
let nightTextureCache: THREE.CanvasTexture | null = null;

export function getWindowSceneryTexture(isNight: boolean): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  if (isNight && nightTextureCache) return nightTextureCache;
  if (!isNight && dayTextureCache) return dayTextureCache;

  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;

  if (!isNight) {
    // ── VIBRANT DAY RAINY / STORMY NATURE SCENERY ──
    // Dramatic atmospheric sky gradient (rich moody slate-teal to misty horizon)
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    sky.addColorStop(0, "#2b3d4f");    // deep storm slate
    sky.addColorStop(0.35, "#3d546b"); // atmospheric blue
    sky.addColorStop(0.65, "#5f7991"); // soft rainy azure
    sky.addColorStop(1, "#8fa3b5");    // misty horizon glow
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Dramatic rolling rain clouds with silver-lit edges
    drawStormCloud(ctx, w * 0.15, h * 0.18, 220, "#364a5c", "#6c859c");
    drawStormCloud(ctx, w * 0.52, h * 0.14, 260, "#2f4253", "#5d768d");
    drawStormCloud(ctx, w * 0.82, h * 0.22, 240, "#3a4f62", "#718b9f");
    drawStormCloud(ctx, w * 0.35, h * 0.32, 190, "#485f74", "#849caf");

    // Distant soft blue mountain ridges
    ctx.fillStyle = "#4a6377";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.52);
    ctx.lineTo(w * 0.18, h * 0.44);
    ctx.lineTo(w * 0.38, h * 0.49);
    ctx.lineTo(w * 0.58, h * 0.42);
    ctx.lineTo(w * 0.78, h * 0.47);
    ctx.lineTo(w, h * 0.43);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Misty mountain fog layer
    const fogGrad = ctx.createLinearGradient(0, h * 0.42, 0, h * 0.56);
    fogGrad.addColorStop(0, "rgba(180, 202, 220, 0.0)");
    fogGrad.addColorStop(0.6, "rgba(195, 215, 230, 0.45)");
    fogGrad.addColorStop(1, "rgba(180, 202, 220, 0.1)");
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, h * 0.42, w, h * 0.18);

    // Midground pine ridge (deep forest slate)
    ctx.fillStyle = "#27433c";
    drawPineForest(ctx, w, h * 0.46, 55, 75);

    // Cozy studio / cabin rooftops peeking through the trees with glowing warm lights
    drawCozyCabins(ctx, w, h);

    // Foreground lush evergreen / pine tree canopy (reaching high into the window frame!)
    ctx.fillStyle = "#1b3528";
    drawPineForest(ctx, w, h * 0.56, 80, 115);

    // Deep rich wet pine branches right in the foreground
    ctx.fillStyle = "#12251c";
    drawPineForest(ctx, w, h * 0.68, 105, 145);

    // Atmospheric rain mist bands
    ctx.fillStyle = "rgba(235, 245, 255, 0.08)";
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(0, h * 0.38 + i * 85, w, 28);
    }

    // Backdrop rain streaks (diagonal wind slant)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const len = 18 + Math.random() * 32;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 4, ry + len);
      ctx.stroke();
    }
  } else {
    // ── VIBRANT NIGHT RAINY SKYLINE & NATURE SCENERY ──
    // Deep midnight indigo sky with city glow reflection
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#050912");    // deep void
    sky.addColorStop(0.5, "#0b1424");   // twilight indigo
    sky.addColorStop(0.85, "#182336");  // warm ambient city haze
    sky.addColorStop(1, "#121b2a");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Ambient night rain clouds
    drawStormCloud(ctx, w * 0.25, h * 0.16, 250, "#070c18", "#121d30");
    drawStormCloud(ctx, w * 0.72, h * 0.18, 280, "#080e1c", "#142238");

    // Atmospheric city glow in distant rain haze
    const glow = ctx.createRadialGradient(w * 0.5, h * 0.65, 50, w * 0.5, h * 0.65, 450);
    glow.addColorStop(0, "rgba(255, 175, 75, 0.18)");
    glow.addColorStop(0.5, "rgba(60, 140, 220, 0.12)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, h * 0.3, w, h * 0.6);

    // Distant illuminated skyscrapers & architectural towers
    const buildings = [
      { x: 50,  w: 110, h: 420 },
      { x: 190, w: 140, h: 540 },
      { x: 360, w: 120, h: 380 },
      { x: 510, w: 160, h: 620 },
      { x: 700, w: 130, h: 460 },
      { x: 860, w: 170, h: 560 },
      { x: 1060, w: 140, h: 410 },
      { x: 1230, w: 180, h: 520 },
      { x: 1430, w: 100, h: 360 },
    ];

    buildings.forEach((b) => {
      // Building facade silhouette
      ctx.fillStyle = "#070d18";
      ctx.fillRect(b.x, h - b.h, b.w, b.h);

      // Antenna beacon light
      ctx.fillStyle = "#ff4444";
      ctx.beginPath();
      ctx.arc(b.x + b.w / 2, h - b.h - 12, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Glowing warm amber and electric cyan windows
      for (let wx = b.x + 12; wx < b.x + b.w - 12; wx += 20) {
        for (let wy = h - b.h + 24; wy < h - 120; wy += 26) {
          const rand = Math.random();
          if (rand > 0.42) {
            if (rand > 0.8) {
              ctx.fillStyle = "rgba(100, 215, 255, 0.85)"; // cyan office glow
            } else if (rand > 0.55) {
              ctx.fillStyle = "rgba(255, 210, 120, 0.9)";  // warm amber window
            } else {
              ctx.fillStyle = "rgba(255, 245, 220, 0.75)"; // bright white-gold
            }
            ctx.fillRect(wx, wy, 10, 15);
          }
        }
      }
    });

    // Dark wet evergreen tree silhouettes in foreground
    ctx.fillStyle = "#04080e";
    drawPineForest(ctx, w, h * 0.62, 85, 120);
    ctx.fillStyle = "#020408";
    drawPineForest(ctx, w, h * 0.72, 110, 150);

    // Night rain streaks
    ctx.strokeStyle = "rgba(190, 225, 255, 0.22)";
    ctx.lineWidth = 1.3;
    for (let i = 0; i < 480; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const len = 20 + Math.random() * 36;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 4, ry + len);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  if (isNight) {
    nightTextureCache = texture;
  } else {
    dayTextureCache = texture;
  }

  return texture;
}

/** Draws soft puffy storm cloud cluster */
function drawStormCloud(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  baseColor: string,
  edgeColor: string
) {
  const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
  grad.addColorStop(0, baseColor);
  grad.addColorStop(0.75, baseColor);
  grad.addColorStop(1, edgeColor);
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.arc(cx - r * 0.45, cy + r * 0.1, r * 0.42, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.45, cy + r * 0.08, r * 0.44, 0, Math.PI * 2);
  ctx.arc(cx - r * 0.2, cy - r * 0.25, r * 0.48, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.25, cy - r * 0.2, r * 0.45, 0, Math.PI * 2);
  ctx.fill();
}

/** Draws a layered ridge of triangular evergreen/pine trees */
function drawPineForest(
  ctx: CanvasRenderingContext2D,
  w: number,
  baseY: number,
  treeWidth: number,
  treeHeight: number
) {
  for (let x = -20; x < w + 60; x += treeWidth * 0.55) {
    const hVar = treeHeight * (0.8 + Math.random() * 0.4);
    const wVar = treeWidth * (0.8 + Math.random() * 0.4);
    const yOffset = (Math.random() - 0.5) * 20;
    const topY = baseY - hVar + yOffset;
    const botY = baseY + 40 + yOffset;

    // 3 layered tiers of pine branches
    for (let tier = 0; tier < 3; tier++) {
      const tierTop = topY + tier * (hVar * 0.25);
      const tierBot = tierTop + hVar * 0.45;
      const tierHalfW = (wVar * 0.5) * (0.6 + tier * 0.22);

      ctx.beginPath();
      ctx.moveTo(x, tierTop);
      ctx.lineTo(x + tierHalfW, tierBot);
      ctx.lineTo(x - tierHalfW, tierBot);
      ctx.closePath();
      ctx.fill();
    }
  }
}

/** Draws distant cozy studio / cabin rooftops with glowing warm windows */
function drawCozyCabins(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cabins = [
    { x: w * 0.24, y: h * 0.47, w: 65, h: 42 },
    { x: w * 0.62, y: h * 0.45, w: 75, h: 48 },
    { x: w * 0.84, y: h * 0.49, w: 58, h: 38 },
  ];

  cabins.forEach((c) => {
    // Cabin silhouette
    ctx.fillStyle = "#1e2e28";
    ctx.fillRect(c.x, c.y, c.w, c.h);

    // Pitched roof
    ctx.fillStyle = "#15221d";
    ctx.beginPath();
    ctx.moveTo(c.x - 8, c.y);
    ctx.lineTo(c.x + c.w / 2, c.y - 18);
    ctx.lineTo(c.x + c.w + 8, c.y);
    ctx.closePath();
    ctx.fill();

    // Warm glowing cabin windows
    ctx.fillStyle = "rgba(255, 205, 90, 0.92)";
    ctx.fillRect(c.x + 12, c.y + 12, 14, 14);
    ctx.fillRect(c.x + c.w - 26, c.y + 12, 14, 14);

    // Warm window glow reflection
    const winGlow = ctx.createRadialGradient(
      c.x + c.w / 2,
      c.y + 18,
      4,
      c.x + c.w / 2,
      c.y + 18,
      35
    );
    winGlow.addColorStop(0, "rgba(255, 190, 70, 0.45)");
    winGlow.addColorStop(1, "rgba(255, 190, 70, 0)");
    ctx.fillStyle = winGlow;
    ctx.fillRect(c.x - 10, c.y, c.w + 20, c.h + 10);
  });
}
