"use client";

import * as THREE from "three";

/**
 * catTexture.ts — Procedural realistic feline fur texture generator.
 *
 * Generates an organic ginger tabby coat texture with:
 * - Natural directional fur grain and micro-strands
 * - Soft cream throat, chest bib, and underbelly shading
 * - Warm terracotta mackerel tabby spine and flank stripes
 * - Soft pink ear and nose skin tones
 */

let cachedFurTexture: THREE.CanvasTexture | null = null;

export function getCatFurTexture(): THREE.CanvasTexture | null {
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  if (cachedFurTexture) return cachedFurTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  // Base warm ginger undercoat
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  baseGrad.addColorStop(0, "#d96f24");    // Top of head & spine (richer darker orange)
  baseGrad.addColorStop(0.4, "#e88032");  // Mid flanks
  baseGrad.addColorStop(0.75, "#f09b52"); // Lower flanks
  baseGrad.addColorStop(1, "#faf4ea");   // Belly / throat (cream white)
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Procedural soft fur noise & micro-strands
  ctx.save();
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 45000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const len = 3 + Math.random() * 7;
    const isDark = Math.random() > 0.45;
    ctx.strokeStyle = isDark ? "#7a2f02" : "#fef0d8";
    ctx.lineWidth = 0.75 + Math.random() * 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 2, y + len);
    ctx.stroke();
  }
  ctx.restore();

  // Tabby tiger/mackerel stripes
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "#8a3504";

  // Spine central dorsal band
  ctx.fillRect(480, 0, 64, 1024);

  // Transverse body stripes
  for (let y = 120; y < 900; y += 42) {
    const thickness = 14 + Math.sin(y * 0.05) * 8;
    ctx.beginPath();
    ctx.ellipse(512, y, 420 + Math.sin(y * 0.1) * 60, thickness, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // White chest & throat bib mask
  ctx.save();
  const bibGrad = ctx.createRadialGradient(512, 850, 40, 512, 850, 320);
  bibGrad.addColorStop(0, "rgba(255, 250, 242, 0.95)");
  bibGrad.addColorStop(0.5, "rgba(252, 242, 228, 0.7)");
  bibGrad.addColorStop(1, "rgba(252, 242, 228, 0)");
  ctx.fillStyle = bibGrad;
  ctx.fillRect(200, 500, 624, 524);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  cachedFurTexture = texture;
  return texture;
}
