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
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;

  if (!isNight) {
    // ── DAY RAINY / MISTY SCENERY ──
    // Overcast rainy sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#7a8a9a");
    sky.addColorStop(0.5, "#9cb0c0");
    sky.addColorStop(1, "#8498a4");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Misty distant horizon fog
    ctx.fillStyle = "rgba(220, 230, 240, 0.4)";
    ctx.fillRect(0, h * 0.35, w, h * 0.3);

    // Far distant city / hill silhouettes (soft grey)
    ctx.fillStyle = "#647482";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.lineTo(120, h * 0.52);
    ctx.lineTo(240, h * 0.54);
    ctx.lineTo(380, h * 0.49);
    ctx.lineTo(520, h * 0.53);
    ctx.lineTo(660, h * 0.48);
    ctx.lineTo(820, h * 0.52);
    ctx.lineTo(w, h * 0.5);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Midground tree line (lush muted green-slate)
    ctx.fillStyle = "#3e5246";
    drawTreeLayer(ctx, w, h * 0.62, 28, 38);

    // Foreground lush foliage / wet branches
    ctx.fillStyle = "#25382b";
    drawTreeLayer(ctx, w, h * 0.72, 36, 52);

    // Subtle rain streak texture on backdrop
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 280; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const len = 15 + Math.random() * 25;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 3, ry + len);
      ctx.stroke();
    }
  } else {
    // ── NIGHT RAINY SCENERY ──
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#080c14");
    sky.addColorStop(0.6, "#0e1624");
    sky.addColorStop(1, "#141c2c");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Distant building silhouettes with glowing amber/cyan windows
    ctx.fillStyle = "#090d16";
    const buildings = [
      { x: 40, w: 80, h: 260 },
      { x: 140, w: 110, h: 320 },
      { x: 270, w: 90, h: 220 },
      { x: 380, w: 130, h: 360 },
      { x: 530, w: 100, h: 290 },
      { x: 650, w: 120, h: 340 },
      { x: 790, w: 90, h: 250 },
      { x: 900, w: 110, h: 310 },
    ];

    buildings.forEach((b) => {
      ctx.fillRect(b.x, h - b.h, b.w, b.h);

      // Random warm window dots
      for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 16) {
        for (let wy = h - b.h + 20; wy < h - 40; wy += 22) {
          if (Math.random() > 0.45) {
            ctx.fillStyle = Math.random() > 0.3 ? "rgba(255, 204, 102, 0.75)" : "rgba(100, 200, 255, 0.6)";
            ctx.fillRect(wx, wy, 8, 12);
          }
        }
      }
      ctx.fillStyle = "#090d16";
    });

    // Dark foreground trees in wet night
    ctx.fillStyle = "#04070a";
    drawTreeLayer(ctx, w, h * 0.72, 38, 55);

    // Night rain streaks
    ctx.strokeStyle = "rgba(180, 210, 255, 0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 320; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const len = 16 + Math.random() * 30;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 3, ry + len);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;

  if (isNight) {
    nightTextureCache = texture;
  } else {
    dayTextureCache = texture;
  }

  return texture;
}

function drawTreeLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  baseY: number,
  minR: number,
  maxR: number
) {
  for (let x = 0; x < width + 50; x += 35) {
    const r = minR + Math.random() * (maxR - minR);
    ctx.beginPath();
    ctx.arc(x, baseY + (Math.random() * 10 - 5), r, 0, Math.PI * 2);
    ctx.fill();
  }
}
