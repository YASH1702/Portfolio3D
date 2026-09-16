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
    // ── VIBRANT DAY RAINY / OVERCAST NATURE SCENERY ──
    // Clear luminous overcast daylight sky (soft silver-azure to luminous daylight horizon)
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.72);
    sky.addColorStop(0, "#8da8c2");    // rich atmospheric blue-grey
    sky.addColorStop(0.3, "#a8c2d8");  // soft silvery daylight
    sky.addColorStop(0.6, "#c6dcf0");  // bright luminous ambient sky
    sky.addColorStop(0.85, "#e8f2fc"); // brilliant daylight horizon
    sky.addColorStop(1, "#dce7f2");    // misty ridge transition
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Soft daylight radiance / sunbeam glow breaking through upper clouds
    const sunGlow = ctx.createRadialGradient(w * 0.55, h * 0.12, 20, w * 0.55, h * 0.12, 480);
    sunGlow.addColorStop(0, "rgba(255, 250, 235, 0.45)");
    sunGlow.addColorStop(0.4, "rgba(255, 245, 220, 0.22)");
    sunGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Soft silver-rimmed daylight clouds
    drawStormCloud(ctx, w * 0.18, h * 0.16, 260, "rgba(165, 185, 205, 0.65)", "rgba(240, 248, 255, 0.85)");
    drawStormCloud(ctx, w * 0.55, h * 0.12, 300, "rgba(150, 175, 198, 0.6)", "rgba(255, 255, 255, 0.9)");
    drawStormCloud(ctx, w * 0.84, h * 0.20, 280, "rgba(160, 182, 202, 0.65)", "rgba(245, 250, 255, 0.85)");
    drawStormCloud(ctx, w * 0.36, h * 0.28, 220, "rgba(175, 195, 215, 0.55)", "rgba(250, 252, 255, 0.8)");

    // Distant layered alpine mountain ridges (aerial atmospheric perspective)
    // Mountain Ridge 1 (Far - soft misty slate blue)
    ctx.fillStyle = "#7393ac";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.50);
    ctx.lineTo(w * 0.16, h * 0.40);
    ctx.lineTo(w * 0.35, h * 0.46);
    ctx.lineTo(w * 0.54, h * 0.38);
    ctx.lineTo(w * 0.72, h * 0.44);
    ctx.lineTo(w * 0.88, h * 0.39);
    ctx.lineTo(w, h * 0.43);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Mountain Ridge 2 (Mid - lush deep alpine teal-green)
    ctx.fillStyle = "#466e66";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.lineTo(w * 0.22, h * 0.46);
    ctx.lineTo(w * 0.44, h * 0.51);
    ctx.lineTo(w * 0.68, h * 0.45);
    ctx.lineTo(w * 0.90, h * 0.49);
    ctx.lineTo(w, h * 0.47);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Luminous mountain mist valley fog
    const valleyFog = ctx.createLinearGradient(0, h * 0.44, 0, h * 0.56);
    valleyFog.addColorStop(0, "rgba(235, 245, 255, 0.0)");
    valleyFog.addColorStop(0.5, "rgba(240, 248, 255, 0.65)");
    valleyFog.addColorStop(1, "rgba(225, 238, 248, 0.2)");
    ctx.fillStyle = valleyFog;
    ctx.fillRect(0, h * 0.44, w, h * 0.14);

    // Tier 1 Pine Forest (Vibrant mid-ground alpine emerald green)
    ctx.fillStyle = "#2d684c";
    drawPineForest(ctx, w, h * 0.48, 55, 78);

    // Cozy studio / cabin rooftops with warm cedar shake roofs & bright amber windows
    drawCozyCabins(ctx, w, h);

    // Tier 2 Pine Forest (Rich lush forest green)
    ctx.fillStyle = "#1e5238";
    drawPineForest(ctx, w, h * 0.58, 80, 118);

    // Tier 3 Pine Forest (Foreground deep wet spruce with rich emerald undertones)
    ctx.fillStyle = "#143d28";
    drawPineForest(ctx, w, h * 0.70, 110, 155);

    // Glistening wet pine branch needle highlights
    ctx.fillStyle = "rgba(140, 225, 180, 0.18)";
    drawPineForest(ctx, w, h * 0.72, 105, 140);

    // Soft drifting rain mist bands across forest
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    for (let i = 0; i < 7; i++) {
      ctx.fillRect(0, h * 0.38 + i * 80, w, 32);
    }

    // Backdrop silver rain streaks (diagonal wind slant)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
    ctx.lineWidth = 1.3;
    for (let i = 0; i < 450; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const len = 20 + Math.random() * 36;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 5, ry + len);
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
    // Cabin timber log silhouette
    ctx.fillStyle = "#3d2b1f";
    ctx.fillRect(c.x, c.y, c.w, c.h);

    // Warm cedar shingle pitched roof
    ctx.fillStyle = "#8a4524";
    ctx.beginPath();
    ctx.moveTo(c.x - 10, c.y);
    ctx.lineTo(c.x + c.w / 2, c.y - 20);
    ctx.lineTo(c.x + c.w + 10, c.y);
    ctx.closePath();
    ctx.fill();

    // Stone chimney
    ctx.fillStyle = "#4a4d52";
    ctx.fillRect(c.x + c.w - 18, c.y - 26, 8, 16);

    // Bright glowing warm amber cabin windows
    ctx.fillStyle = "rgba(255, 225, 110, 0.98)";
    ctx.fillRect(c.x + 10, c.y + 10, 16, 16);
    ctx.fillRect(c.x + c.w - 28, c.y + 10, 16, 16);

    // Warm window glow reflection
    const winGlow = ctx.createRadialGradient(
      c.x + c.w / 2,
      c.y + 18,
      4,
      c.x + c.w / 2,
      c.y + 18,
      45
    );
    winGlow.addColorStop(0, "rgba(255, 205, 80, 0.55)");
    winGlow.addColorStop(1, "rgba(255, 205, 80, 0)");
    ctx.fillStyle = winGlow;
    ctx.fillRect(c.x - 10, c.y, c.w + 20, c.h + 10);
  });
}
