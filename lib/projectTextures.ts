import * as THREE from "three";
import { Project } from "@/data/projects";

/**
 * Procedural texture generator for project artwork displays.
 * Generates high-resolution (1024x720) canvas textures depicting
 * realistic, modern UI screenshots for each project.
 *
 * Runs client-side in the browser. Zero network requests, zero broken links.
 */

const textureCache: Record<string, THREE.CanvasTexture> = {};

export function getProjectTexture(project: Project): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  if (textureCache[project.id]) {
    return textureCache[project.id];
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  if (project.id === "jobpilot-ai") {
    drawJobPilotUI(ctx, canvas.width, canvas.height);
  } else if (project.id === "businessflow") {
    drawBusinessFlowUI(ctx, canvas.width, canvas.height);
  } else if (project.id === "ai-automation-platform") {
    drawAIAutomationUI(ctx, canvas.width, canvas.height);
  } else {
    drawDefaultUI(ctx, canvas.width, canvas.height, project);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  textureCache[project.id] = texture;
  return texture;
}

// ── PROJECT 01: JOBPILOT AI ──
function drawJobPilotUI(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, "#080c14");
  bgGrad.addColorStop(1, "#0f172a");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Top window header
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, w, 56);

  // Window dots
  drawWindowDots(ctx, 24, 28);

  // Title in header
  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 16px monospace";
  ctx.fillText("jobpilot-ai.app/dashboard — Autonomous Career Copilot", 100, 34);

  // Live status badge
  drawBadge(ctx, w - 180, 16, "● AI COPILOT ACTIVE", "#10b981", "#064e3b");

  // Left sidebar
  ctx.fillStyle = "#0b1329";
  ctx.fillRect(0, 56, 220, h - 56);
  ctx.strokeStyle = "#1e293b";
  ctx.strokeRect(0, 56, 220, h - 56);

  // Sidebar items
  const menu = ["Overview", "Job Tracker", "Resume Tailor", "Cover Letters", "Chrome Ext", "Settings"];
  menu.forEach((item, i) => {
    const isSelected = i === 2;
    if (isSelected) {
      ctx.fillStyle = "#1e3a8a";
      ctx.fillRect(12, 86 + i * 44, 196, 34);
      ctx.fillStyle = "#93c5fd";
    } else {
      ctx.fillStyle = "#64748b";
    }
    ctx.font = "500 15px sans-serif";
    ctx.fillText(item, 32, 108 + i * 44);
  });

  // Main content area
  const mx = 244;
  const my = 80;

  // Header in main
  ctx.fillStyle = "#f8fafc";
  ctx.font = "700 24px sans-serif";
  ctx.fillText("Automated Application Pipeline", mx, my + 10);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "14px monospace";
  ctx.fillText("OpenAI GPT-4o • Tailoring candidate profile to 24 matching vacancies", mx, my + 34);

  // 3 Metric Cards
  const cards = [
    { title: "MATCH SCORE", val: "98.4%", sub: "+12% vs standard", color: "#38bdf8" },
    { title: "APPLICATIONS SENT", val: "148", sub: "34 interview invites", color: "#4ade80" },
    { title: "AVG TAILOR SPEED", val: "1.4s", sub: "Wasm accelerated", color: "#a855f7" },
  ];
  cards.forEach((card, i) => {
    const cx = mx + i * 248;
    ctx.fillStyle = "#131e36";
    ctx.strokeStyle = "#1e293b";
    roundRect(ctx, cx, my + 54, 230, 94, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "600 11px monospace";
    ctx.fillText(card.title, cx + 16, my + 78);

    ctx.fillStyle = card.color;
    ctx.font = "700 26px sans-serif";
    ctx.fillText(card.val, cx + 16, my + 112);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px sans-serif";
    ctx.fillText(card.sub, cx + 16, my + 134);
  });

  // Large Interactive Pipeline Table
  const ty = my + 170;
  ctx.fillStyle = "#111b33";
  ctx.strokeStyle = "#1e293b";
  roundRect(ctx, mx, ty, 740, 420, 8);
  ctx.fill();
  ctx.stroke();

  // Table header
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(mx, ty, 740, 44);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 12px monospace";
  ctx.fillText("COMPANY & ROLE", mx + 24, ty + 27);
  ctx.fillText("MATCH", mx + 280, ty + 27);
  ctx.fillText("DOCUMENTS", mx + 400, ty + 27);
  ctx.fillText("STATUS", mx + 570, ty + 27);

  // Table rows
  const rows = [
    { company: "Linear App", role: "Staff Frontend Engineer", match: "99%", docs: "Tailored Resume v3", status: "Interview Round 3", sColor: "#22c55e" },
    { company: "Stripe", role: "Full-Stack Engineer (Next.js)", match: "97%", docs: "AI Cover Letter + CV", status: "Technical Screen", sColor: "#38bdf8" },
    { company: "Vercel", role: "Design Systems Engineer", match: "96%", docs: "Tailored Portfolio Spec", status: "Review in Progress", sColor: "#f59e0b" },
    { company: "OpenAI", role: "Frontend Platform Engineer", match: "95%", docs: "Resume + AI Reasoning", status: "Application Submitted", sColor: "#94a3b8" },
    { company: "Supabase", role: "Developer Experience Lead", match: "94%", docs: "Tailored Cover Letter", status: "Application Submitted", sColor: "#94a3b8" },
  ];

  rows.forEach((row, i) => {
    const ry = ty + 44 + i * 56;
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)";
    ctx.fillRect(mx, ry, 740, 56);
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.beginPath();
    ctx.moveTo(mx, ry + 56);
    ctx.lineTo(mx + 740, ry + 56);
    ctx.stroke();

    // Company & Role
    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 14px sans-serif";
    ctx.fillText(row.company, mx + 24, ry + 25);
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.fillText(row.role, mx + 24, ry + 44);

    // Match
    ctx.fillStyle = "#38bdf8";
    ctx.font = "700 14px monospace";
    ctx.fillText(row.match, mx + 280, ry + 33);

    // Docs
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "13px sans-serif";
    ctx.fillText(row.docs, mx + 400, ry + 33);

    // Status pill
    drawBadge(ctx, mx + 564, ry + 16, row.status, row.sColor, "rgba(0,0,0,0.3)");
  });

  // Footer bar inside mock
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.fillRect(mx, ty + 380, 740, 40);
  ctx.fillStyle = "#64748b";
  ctx.font = "12px monospace";
  ctx.fillText("Synced with PostgreSQL & Chrome Extension • Realtime WebSockets", mx + 20, ty + 404);
}

// ── PROJECT 02: BUSINESSFLOW ──
function drawBusinessFlowUI(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, "#08140c");
  bgGrad.addColorStop(1, "#0c2415");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Top header
  ctx.fillStyle = "#112918";
  ctx.fillRect(0, 0, w, 56);

  drawWindowDots(ctx, 24, 28);

  ctx.fillStyle = "#86efac";
  ctx.font = "600 16px monospace";
  ctx.fillText("businessflow.io/admin — Booking Platform & Invoicing", 100, 34);

  drawBadge(ctx, w - 210, 16, "● STRIPE CONNECTED", "#4ade80", "#052e16");

  // Left sidebar
  ctx.fillStyle = "#0a1a0f";
  ctx.fillRect(0, 56, 210, h - 56);
  ctx.strokeStyle = "#173b22";
  ctx.strokeRect(0, 56, 210, h - 56);

  const menu = ["Calendar", "Bookings", "Client CRM", "Invoicing", "Stripe Payouts", "Automations"];
  menu.forEach((item, i) => {
    const isSelected = i === 0;
    if (isSelected) {
      ctx.fillStyle = "#14532d";
      ctx.fillRect(12, 86 + i * 44, 186, 34);
      ctx.fillStyle = "#86efac";
    } else {
      ctx.fillStyle = "#4ade80";
      ctx.globalAlpha = 0.6;
    }
    ctx.font = "500 15px sans-serif";
    ctx.fillText(item, 32, 108 + i * 44);
    ctx.globalAlpha = 1;
  });

  const mx = 234;
  const my = 80;

  // Title
  ctx.fillStyle = "#f0fdf4";
  ctx.font = "700 24px sans-serif";
  ctx.fillText("Real-time Availability & Booking Schedule", mx, my + 10);

  ctx.fillStyle = "#86efac";
  ctx.font = "14px monospace";
  ctx.fillText("Redis Distributed Locking • Zero Double-Bookings • Automated Inngest Reminders", mx, my + 34);

  // Metric cards
  const cards = [
    { title: "MONTHLY REVENUE", val: "$24,850", sub: "38 Stripe payments", color: "#4ade80" },
    { title: "CONFIRMED SESSIONS", val: "164", sub: "98.2% attendance", color: "#86efac" },
    { title: "AVG BOOKING TIME", val: "42 sec", sub: "Optimized mobile checkout", color: "#38bdf8" },
  ];
  cards.forEach((card, i) => {
    const cx = mx + i * 252;
    ctx.fillStyle = "#0d2816";
    ctx.strokeStyle = "#1c4a29";
    roundRect(ctx, cx, my + 54, 236, 94, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#86efac";
    ctx.font = "600 11px monospace";
    ctx.fillText(card.title, cx + 16, my + 78);

    ctx.fillStyle = card.color;
    ctx.font = "700 26px sans-serif";
    ctx.fillText(card.val, cx + 16, my + 112);

    ctx.fillStyle = "#a7f3d0";
    ctx.font = "12px sans-serif";
    ctx.fillText(card.sub, cx + 16, my + 134);
  });

  // Calendar Weekly Schedule Grid
  const ty = my + 170;
  ctx.fillStyle = "#0c2415";
  ctx.strokeStyle = "#1c4a29";
  roundRect(ctx, mx, ty, 755, 420, 8);
  ctx.fill();
  ctx.stroke();

  // Days columns
  const days = ["MON 14", "TUE 15", "WED 16", "THU 17", "FRI 18"];
  const colW = 755 / 5;
  days.forEach((day, i) => {
    ctx.fillStyle = "#11331c";
    ctx.fillRect(mx + i * colW, ty, colW, 40);
    ctx.strokeStyle = "#1c4a29";
    ctx.strokeRect(mx + i * colW, ty, colW, 40);

    ctx.fillStyle = "#86efac";
    ctx.font = "600 13px monospace";
    ctx.fillText(day, mx + i * colW + 40, ty + 25);
  });

  // Event blocks on calendar
  const events = [
    { col: 0, y: ty + 60, h: 70, title: "Discovery Session", client: "Acme Corp ($450)", color: "#166534" },
    { col: 0, y: ty + 160, h: 90, title: "Product Demo", client: "Starlight SaaS ($750)", color: "#15803d" },
    { col: 1, y: ty + 90, h: 110, title: "Consulting Intensive", client: "Northwind AI ($1,200)", color: "#166534" },
    { col: 2, y: ty + 60, h: 80, title: "Strategy Onboarding", client: "VentureWorks ($600)", color: "#14532d" },
    { col: 2, y: ty + 200, h: 80, title: "Technical Review", client: "Linear Partner ($500)", color: "#15803d" },
    { col: 3, y: ty + 110, h: 100, title: "Platform Architecture", client: "Apex Media ($950)", color: "#166534" },
    { col: 4, y: ty + 80, h: 120, title: "Executive Briefing", client: "Kinetix Global ($1,800)", color: "#15803d" },
  ];

  events.forEach((ev) => {
    const ex = mx + ev.col * colW + 8;
    ctx.fillStyle = ev.color;
    ctx.strokeStyle = "#4ade80";
    roundRect(ctx, ex, ev.y, colW - 16, ev.h, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 13px sans-serif";
    ctx.fillText(ev.title, ex + 10, ev.y + 24);

    ctx.fillStyle = "#bbf7d0";
    ctx.font = "11px sans-serif";
    ctx.fillText(ev.client, ex + 10, ev.y + 44);
  });
}

// ── PROJECT 03: AI AUTOMATION PLATFORM ──
function drawAIAutomationUI(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, "#12081c");
  bgGrad.addColorStop(1, "#1c0c2e");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Top header
  ctx.fillStyle = "#25123d";
  ctx.fillRect(0, 0, w, 56);

  drawWindowDots(ctx, 24, 28);

  ctx.fillStyle = "#d8b4fe";
  ctx.font = "600 16px monospace";
  ctx.fillText("workflow.ai/builder — Visual Multi-Model Pipeline Engine", 100, 34);

  drawBadge(ctx, w - 210, 16, "● PIPELINE RUNNING", "#c084fc", "#3b0764");

  // Main canvas area for visual workflow nodes
  const mx = 60;
  const my = 80;

  ctx.fillStyle = "#faf5ff";
  ctx.font = "700 24px sans-serif";
  ctx.fillText("Autonomous Enterprise Workflow Graph", mx, my + 10);

  ctx.fillStyle = "#c084fc";
  ctx.font = "14px monospace";
  ctx.fillText("Node.js Runtime • Redis Job Queue • Multi-Model (OpenAI / Anthropic) • 420ms Latency", mx, my + 34);

  // Node graph editor preview
  const gy = my + 60;
  ctx.fillStyle = "#180928";
  ctx.strokeStyle = "#3b1754";
  roundRect(ctx, mx, gy, w - 120, h - gy - 40, 10);
  ctx.fill();
  ctx.stroke();

  // Grid background in graph
  ctx.strokeStyle = "rgba(192, 132, 252, 0.07)";
  ctx.lineWidth = 1;
  for (let x = mx; x < w - 60; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x, h - 40);
    ctx.stroke();
  }
  for (let y = gy; y < h - 40; y += 30) {
    ctx.beginPath();
    ctx.moveTo(mx, y);
    ctx.lineTo(w - 60, y);
    ctx.stroke();
  }

  // 4 Connected Pipeline Nodes
  const nodes = [
    { x: mx + 40, y: gy + 110, title: "01 · WEBHOOK TRIGGER", desc: "POST /api/v1/inbound-lead\nPayload: JSON Validated", tag: "HTTP IN", color: "#38bdf8" },
    { x: mx + 270, y: gy + 60, title: "02 · AI PARSER (GPT-4o)", desc: "Entity Extraction\nSentiment & Intent Scoring", tag: "OPENAI", color: "#a855f7" },
    { x: mx + 270, y: gy + 220, title: "02b · RESEARCH FALLBACK", desc: "Anthropic Claude 3.5\nTechnical Spec Analysis", tag: "CLAUDE", color: "#f59e0b" },
    { x: mx + 540, y: gy + 130, title: "03 · DB PERSISTENCE", desc: "PostgreSQL Prisma Upsert\nRedis Cache Invalidation", tag: "POSTGRES", color: "#4ade80" },
    { x: mx + 730, y: gy + 130, title: "04 · NOTIFICATION", desc: "Slack Alert + Email\nLatency: 380ms", tag: "DISPATCH", color: "#ec4899" },
  ];

  // Draw connecting curved bezier wires between nodes
  ctx.strokeStyle = "#c084fc";
  ctx.lineWidth = 2.5;

  // Node 1 to 2
  drawBezierWire(ctx, nodes[0].x + 180, nodes[0].y + 40, nodes[1].x, nodes[1].y + 40);
  // Node 1 to 2b
  drawBezierWire(ctx, nodes[0].x + 180, nodes[0].y + 40, nodes[2].x, nodes[2].y + 40);
  // Node 2 to 3
  drawBezierWire(ctx, nodes[1].x + 180, nodes[1].y + 40, nodes[3].x, nodes[3].y + 40);
  // Node 2b to 3
  drawBezierWire(ctx, nodes[2].x + 180, nodes[2].y + 40, nodes[3].x, nodes[3].y + 40);
  // Node 3 to 4
  drawBezierWire(ctx, nodes[3].x + 150, nodes[3].y + 40, nodes[4].x, nodes[4].y + 40);

  // Draw nodes
  nodes.forEach((node) => {
    const nw = node.x > mx + 500 ? 150 : 180;
    ctx.fillStyle = "#220e38";
    ctx.strokeStyle = node.color;
    ctx.lineWidth = 1.5;
    roundRect(ctx, node.x, node.y, nw, 86, 8);
    ctx.fill();
    ctx.stroke();

    // Node header tag
    ctx.fillStyle = node.color;
    ctx.font = "700 10px monospace";
    ctx.fillText(node.tag, node.x + 12, node.y + 20);

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 12px sans-serif";
    ctx.fillText(node.title, node.x + 12, node.y + 38);

    ctx.fillStyle = "#d8b4fe";
    ctx.font = "11px sans-serif";
    const lines = node.desc.split("\n");
    lines.forEach((l, li) => {
      ctx.fillText(l, node.x + 12, node.y + 56 + li * 16);
    });
  });

  // Footer status bar
  ctx.fillStyle = "rgba(24, 9, 40, 0.95)";
  ctx.fillRect(mx, h - 75, w - 120, 35);
  ctx.fillStyle = "#a855f7";
  ctx.font = "12px monospace";
  ctx.fillText("Redis Queue Active • 1,240 runs today • 0 failures • 99.99% uptime", mx + 20, h - 52);
}

function drawDefaultUI(ctx: CanvasRenderingContext2D, w: number, h: number, project: Project) {
  ctx.fillStyle = "#111827";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#f9fafb";
  ctx.font = "700 28px sans-serif";
  ctx.fillText(project.title, 60, 100);
}

// ── UTILITIES ──
function drawWindowDots(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const colors = ["#ef4444", "#f59e0b", "#10b981"];
  colors.forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(x + i * 18, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
}

function drawBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string,
  bg: string
) {
  ctx.font = "600 11px monospace";
  const metrics = ctx.measureText(text);
  const pw = metrics.width + 16;
  ctx.fillStyle = bg;
  roundRect(ctx, x, y, pw, 24, 12);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.fillText(text, x + 8, y + 16);
}

function drawBezierWire(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(x1 + dx, y1, x2 - dx, y2, x2, y2);
  ctx.stroke();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
