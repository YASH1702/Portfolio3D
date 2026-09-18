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

  // Base warm Golden Brown Persian coat underlayer (luminous golden honey palette)
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  baseGrad.addColorStop(0, "#b86828");    // Dorsal spine (warm golden russet)
  baseGrad.addColorStop(0.22, "#cf823a"); // Upper shoulders (rich honey amber)
  baseGrad.addColorStop(0.48, "#e29d4e"); // Flanks (radiant golden apricot)
  baseGrad.addColorStop(0.78, "#f0bc76"); // Lower belly (soft warm gold)
  baseGrad.addColorStop(1, "#fff9f0");   // Chest bib & paws (plush ivory cream)
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Silky Persian micro-fur strands & hair texture
  ctx.save();
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 55000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const len = 4 + Math.random() * 9;
    const rand = Math.random();
    ctx.strokeStyle = rand > 0.6 ? "#8d4514" : rand > 0.3 ? "#e2a050" : "#fff8ea";
    ctx.lineWidth = 0.8 + Math.random() * 0.9;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 2.5, y + len);
    ctx.stroke();
  }
  ctx.restore();

  // Gentle warm golden-chestnut dorsal contouring (no dark muddy bands)
  ctx.save();
  ctx.globalAlpha = 0.10;
  ctx.fillStyle = "#8a4214";

  // Central dorsal blend
  ctx.fillRect(470, 0, 84, 1024);

  for (let y = 140; y < 900; y += 55) {
    const thickness = 20 + Math.sin(y * 0.04) * 8;
    ctx.beginPath();
    ctx.ellipse(512, y, 380 + Math.sin(y * 0.08) * 40, thickness, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Luxurious warm cream chest & throat ruff (Persian lion-like mane)
  ctx.save();
  const bibGrad = ctx.createRadialGradient(512, 860, 50, 512, 860, 360);
  bibGrad.addColorStop(0, "rgba(255, 250, 242, 0.98)");
  bibGrad.addColorStop(0.55, "rgba(252, 242, 228, 0.78)");
  bibGrad.addColorStop(1, "rgba(252, 242, 228, 0)");
  ctx.fillStyle = bibGrad;
  ctx.fillRect(160, 480, 704, 544);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  cachedFurTexture = texture;
  return texture;
}
