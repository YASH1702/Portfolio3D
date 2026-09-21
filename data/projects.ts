// ==================================================
// PROJECT DATA — Single source of truth
// High-fidelity production project showcases
// ==================================================

export interface ProjectScreenshot {
  url: string;
  caption: string;
  tag: string;
  isAnimated?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
  subtext?: string;
  color?: string;
}

export interface ArchitectureHighlight {
  title: string;
  desc: string;
  tag: string;
}

export interface DeepDiveSection {
  title: string;
  summary: string;
  points: string[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  techCategories: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    ai?: string[];
    other?: string[];
  };
  metrics?: ProjectMetric[];
  screenshots?: ProjectScreenshot[];
  architectureHighlights?: ArchitectureHighlight[];
  deepDiveSections?: DeepDiveSection[];
  challenges: string;
  whatIBuilt: string;
  image: string; // primary hero screenshot
  github?: string;
  demo?: string;
  status: "live" | "in-progress" | "private";
  year: string;
  // Position on the left wall for the 3D scene
  wallPosition: [number, number, number];
  frameRotation: [number, number, number];
}

export const projects: Project[] = [
  {
    id: "jobpilot-ai",
    number: "01",
    title: "JobPilot AI",
    subtitle: "Autonomous Job Application & Career Copilot with Anti-Hallucination AI",
    description:
      "A production-grade AI co-pilot that automates the entire job application workflow — from discovering relevant vacancies to running 2-pass deep fit evaluation, generating strictly truthful tailored resumes, crafting dynamic cover letters, capturing job board listings with a Chrome extension, and tracking applications through an interactive Kanban pipeline.",
    problem:
      "Job hunting is exhausting and error-prone. Software engineers spend 40–60 hours per month manually reading job listings, copy-pasting descriptions, rewriting resumes, and formatting cover letters. Generic AI tools frequently hallucinate false experience, exaggerated metrics, or non-existent companies, ruining candidate credibility and failing strict ATS scans.",
    solution:
      "Engineered an end-to-end autonomous agent with strict anti-hallucination verification rules enforced at both prompt and post-processing AST validation layers. JobPilot combines SHA-256 deduplication and deterministic pre-filtering (saving 74% token spend) with GPT-4o deep matching, dynamic cover letter generation, a Manifest V3 Chrome extension for 1-click job ingestion, and Inngest-powered automated morning digests.",
    features: [
      "2-Pass AI Matching Engine (GPT-4o-mini fast extraction + GPT-4o deep evaluation)",
      "Strict Anti-Hallucination Validation (zero fabricated skills, dates, or companies)",
      "Deterministic Pre-Filtering & SHA-256 Deduplication Hashing across job boards",
      "Dynamic Cover Letter Generator with 4 selectable tones (Professional, Startup, Enthusiastic, Executive)",
      "Interactive Kanban Pipeline Tracker (Ready to Apply, Applied, Interviewing, Offer, Archived)",
      "Manifest V3 Chrome Extension for 1-click job capture & portal autofill",
      "Inngest Event-Driven Background Crons for daily 8:00 AM match digests",
      "Standardized, single-page ATS-compliant resume layout with 1-click Print to PDF",
    ],
    technologies: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript (Strict)",
      "PostgreSQL (Neon Serverless)",
      "Prisma v7",
      "NextAuth.js v5",
      "OpenAI GPT-4o",
      "OpenAI GPT-4o-mini",
      "Upstash Redis",
      "Inngest",
      "Tailwind CSS v4",
      "Chrome Extension (MV3)",
    ],
    techCategories: {
      frontend: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Lucide React"],
      backend: ["Server Actions", "Inngest Background Automations", "NextAuth.js v5", "Prisma v7 ORM"],
      database: ["PostgreSQL (Neon Serverless)", "Upstash Redis (Rate Limiting & Cache)"],
      ai: ["OpenAI GPT-4o (Deep Evaluation)", "OpenAI GPT-4o-mini (Extraction)", "Anti-Hallucination Validator"],
      other: ["Manifest V3 Chrome Extension", "SHA-256 Deduplication", "ATS PDF Export"],
    },
    metrics: [
      { label: "Match Precision", value: "98.4%", subtext: "Profile vs Vacancy Alignment", color: "#38bdf8" },
      { label: "Tailor Latency", value: "1.4s", subtext: "2-Pass Optimized Pipeline", color: "#4ade80" },
      { label: "Token Cost Savings", value: "74%", subtext: "Deterministic Pre-Filtering", color: "#fbbf24" },
      { label: "Hallucination Rate", value: "0.0%", subtext: "Strict AST Claim Verification", color: "#a855f7" },
    ],
    screenshots: [
      {
        url: "/images/projects/jobpilot/dashboard.png",
        caption: "Application Tracking Pipeline Dashboard with funnel conversion metrics and stage breakdown",
        tag: "Dashboard",
      },
      {
        url: "/images/projects/jobpilot/myjobs.png",
        caption: "Active Applications Kanban Board with priority flags, company notes, and stage management",
        tag: "Kanban",
      },
      {
        url: "/images/projects/jobpilot/jobtracker.png",
        caption: "Comprehensive Market Skill Gap Radar & Company Intelligence Tracking",
        tag: "Analytics",
      },
      {
        url: "/images/projects/jobpilot/jobsync-ai-jobmatch.gif",
        caption: "Live 2-Pass AI Fit Evaluation displaying verified strengths, missing skills, and match scoring",
        tag: "AI Engine",
        isAnimated: true,
      },
      {
        url: "/images/projects/jobpilot/jobsync-ai.gif",
        caption: "Live AI Resume Tailoring & Bullet Point Rewriter with strict zero-hallucination verification",
        tag: "Tailoring",
        isAnimated: true,
      },
    ],
    architectureHighlights: [
      {
        title: "2-Pass AI Matching Engine",
        desc: "GPT-4o-mini extracts raw unstructured job requirements into typed schemas, followed by GPT-4o computing a 0–100% weighted fit score based on verified background.",
        tag: "AI Pipeline",
      },
      {
        title: "Anti-Hallucination Safety Guard",
        desc: "Code-level validation cross-checks tailored resumes against the canonical user profile, rejecting any fabricated skills, dates, or non-existent companies.",
        tag: "Safety",
      },
      {
        title: "Deterministic Pre-Filter & Deduplication",
        desc: "SHA-256 content hashing detects duplicate listings across portals, while deterministic salary and remote filters reject unfitting jobs before spending AI tokens.",
        tag: "Cost Control",
      },
      {
        title: "Manifest V3 Chrome Extension",
        desc: "Captures jobs directly from LinkedIn and job board pages in 1-click, with DOM content scripts supporting automated application form autofill.",
        tag: "Extension",
      },
      {
        title: "Inngest Event Automations",
        desc: "Scheduled background crons execute daily 8:00 AM match digests and trigger follow-up reminders across the active Kanban pipeline.",
        tag: "Background Jobs",
      },
      {
        title: "Single-Page ATS Resume Export",
        desc: "Generates clean, standardized single-page ATS-compliant resume layouts formatted for instant 1-click browser Print-to-PDF.",
        tag: "Export",
      },
    ],
    deepDiveSections: [
      {
        title: "Anti-Hallucination Verification Architecture",
        summary: "How JobPilot guarantees 100% truthful resume tailoring without sacrificing ATS relevance.",
        points: [
          "Enforces strict JSON schema contracts with zero-temperature extraction on candidate profile data.",
          "Validates generated strength claims against the user's canonical profile skills set using set-difference algorithms.",
          "Reorganizes, rewords, and emphasizes verified accomplishments rather than injecting synthetic facts or exaggerated metrics.",
          "Automated unit tests assert rejection of any ungrounded entities or exaggerated timelines before database persistence.",
        ],
      },
      {
        title: "Chrome Extension & Portal DOM Bridge",
        summary: "Seamless cross-browser job ingestion without brittle scraping hacks.",
        points: [
          "Manifest V3 service worker communicating securely with Next.js backend via JWT-authenticated API endpoints.",
          "Content script injects an unintrusive floating dock on LinkedIn & job portal vacancies.",
          "Extracts structured job posting data without violating platform policies or triggering rate limits.",
          "Pre-populates application fields using structured profile mappings directly into third-party portals.",
        ],
      },
    ],
    challenges:
      "Guaranteeing that AI models never fabricate claims on resumes; solved using strict prompt contracts combined with post-generation AST/JSON set-difference validation against the user's verified profile data. Solved job board rate limits and token costs through SHA-256 deduplication and deterministic pre-filtering.",
    whatIBuilt:
      "Full-stack Next.js 16 web application with Server Actions, Prisma v7 PostgreSQL schema, dual-pass OpenAI GPT-4o agent, Chrome extension with background service worker and content scripts, Inngest event functions, and Upstash Redis rate limiting.",
    image: "/images/projects/jobpilot/dashboard.png",
    github: undefined,
    demo: undefined,
    status: "live",
    year: "2024",
    wallPosition: [-4.5, 2.2, -1.5],
    frameRotation: [0, Math.PI / 2, 0],
  },
  {
    id: "businessflow",
    number: "02",
    title: "BusinessFlow",
    subtitle: "Business Website + Booking Platform",
    description:
      "A full-featured business platform combining a marketing website with an integrated booking system, payment processing, and background job scheduling.",
    problem:
      "Small and medium businesses need a professional online presence with integrated booking and payment capabilities, but most solutions are fragmented and expensive.",
    solution:
      "BusinessFlow unifies a polished marketing website with a booking engine, Stripe-powered payments, and Inngest for reliable background jobs — all in a single deployable application.",
    features: [
      "Service booking with calendar availability",
      "Stripe payment integration",
      "Automated email confirmations via Inngest",
      "Redis-cached availability engine",
      "Admin dashboard for business owners",
      "Mobile-responsive booking flow",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Inngest",
      "Redis",
      "Tailwind CSS",
    ],
    techCategories: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Prisma", "Inngest"],
      database: ["PostgreSQL", "Redis"],
      other: ["Stripe"],
    },
    challenges:
      "Preventing double-bookings under concurrent requests using Redis locking. Designing a smooth booking UX that works across all device sizes.",
    whatIBuilt:
      "End-to-end booking platform with real-time availability checking, payment flows, and a reliable background job system for notifications and reminders.",
    image: "/textures/project-02-placeholder.jpg",
    github: undefined,
    demo: undefined,
    status: "in-progress",
    year: "2024",
    wallPosition: [-4.5, 2.2, 0],
    frameRotation: [0, Math.PI / 2, 0],
  },
  {
    id: "ai-automation-platform",
    number: "03",
    title: "AI Automation Platform",
    subtitle: "Enterprise Social Media Automation SaaS with Drag-and-Drop Scheduling & Analytics",
    description:
      "A production-ready AI SaaS platform engineered across 15 complete phases. Enables creators, agencies, and marketing teams to generate platform-optimized content across Instagram, Twitter/X, LinkedIn, and TikTok using GPT-4o, plan schedules on an interactive drag-and-drop calendar, publish automatically via serverless cron jobs, and analyze reach with an extensive Recharts visualization suite.",
    problem:
      "Managing multi-channel social media requires constantly adapting copy and tone for different algorithms, juggling scheduling spreadsheets, and manually compiling fragmented analytics across multiple disconnected platforms.",
    solution:
      "Developed a unified, high-performance platform featuring GPT-4o multi-channel content generation with tone and platform controls, an HTML5 drag-and-drop calendar scheduler, automated cron publishing, team role-based collaboration, and an advanced analytics dashboard featuring geographic reach maps, activity density, and engagement trend lines.",
    features: [
      "Multi-Platform AI Generation Studio (GPT-4o) with tone & hashtag calibration",
      "Interactive Month & Week Calendar Views with HTML5 drag-and-drop rescheduling",
      "Automated Serverless Post Publishing via Vercel Cron & node-cron with Bearer security",
      "Comprehensive Recharts Analytics Suite (KPI cards, time-series area charts, platform donut charts)",
      "Global Audience Demographics & Reach Map with peak engagement hours",
      "Content Library with debounced search, platform filters, and in-place editing",
      "Team Workspace Management with role-based access control (Admin, Editor, Viewer)",
      "Liquid Glass Design System with Deep Vintage Mood palette and custom cursor",
    ],
    technologies: [
      "Next.js 14 (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth.js v4",
      "OpenAI GPT-4o",
      "Recharts",
      "node-cron / Vercel Cron",
      "bcrypt",
    ],
    techCategories: {
      frontend: ["Next.js 14 (App Router)", "React", "TypeScript", "Tailwind CSS", "Liquid Glass System"],
      backend: ["Next.js API Routes", "NextAuth.js v4", "node-cron / Vercel Cron", "Prisma ORM"],
      database: ["PostgreSQL (Supabase/Railway)", "Prisma Data Layer"],
      ai: ["OpenAI GPT-4o", "Multi-Platform Copywriting Prompts", "Hashtag Optimizer"],
      other: ["Recharts Data Visualization", "HTML5 Drag-and-Drop", "Role-Based Access Control"],
    },
    metrics: [
      { label: "Delivery Status", value: "15 / 15", subtext: "Phases 100% Production-Ready", color: "#10b981" },
      { label: "Time Saved / Post", value: "~45m", subtext: "Automated Multi-Channel Copywriting", color: "#38bdf8" },
      { label: "Content Score", value: "88/100", subtext: "Algorithmic Post Health Rating", color: "#c084fc" },
      { label: "Networks Unified", value: "4", subtext: "Instagram, X, LinkedIn, TikTok", color: "#f59e0b" },
    ],
    screenshots: [
      {
        url: "/images/projects/ai-automation/ai_content.png",
        caption: "AI Generation Studio with topic prompt, tone selection, and multi-platform preview cards",
        tag: "AI Studio",
      },
      {
        url: "/images/projects/ai-automation/scheduling.png",
        caption: "Interactive Month Calendar Scheduler with HTML5 drag-and-drop rescheduling",
        tag: "Scheduler",
      },
      {
        url: "/images/projects/ai-automation/predictive.png",
        caption: "Predictive Analytics Dashboard with impressions, engagement trends, and KPI cards",
        tag: "Analytics",
      },
      {
        url: "/images/projects/ai-automation/audience.png",
        caption: "Global Audience Demographics & Reach Map tracking regional engagement and peak time windows",
        tag: "Audience",
      },
      {
        url: "/images/projects/ai-automation/optimization.png",
        caption: "Posting Activity Density Heatmap (52 weeks) and Content Score Health Card (88/100)",
        tag: "Heatmap",
      },
      {
        url: "/images/projects/ai-automation/cross_platform.png",
        caption: "Multi-Channel Distribution Matrix optimizing copy constraints for X, LinkedIn, IG, and TikTok",
        tag: "Distribution",
      },
    ],
    architectureHighlights: [
      {
        title: "Multi-Platform AI Generation Studio",
        desc: "GPT-4o chat completions calibrated with custom system prompts for 4 platforms (Instagram, Twitter/X, LinkedIn, TikTok) and 4 tones.",
        tag: "AI Engine",
      },
      {
        title: "Interactive Drag-and-Drop Scheduler",
        desc: "Month and week views powered by HTML5 native drag-and-drop with instant optimistic UI updates and server synchronization.",
        tag: "UX Architecture",
      },
      {
        title: "Serverless Background Publishing",
        desc: "Vercel Cron and self-hosted node-cron triggers /api/cron/publish every minute with Bearer token authentication.",
        tag: "Cron Engine",
      },
      {
        title: "Comprehensive Recharts Analytics",
        desc: "Time-series Area charts for impressions and engagement, platform breakdown Donut charts, geographic world map, and 52-week activity heatmap.",
        tag: "Data Viz",
      },
      {
        title: "Multi-Tenant Team Workspace",
        desc: "Role-based access control (Admin, Editor, Viewer) with secure email invitation tokens and granular permission gates.",
        tag: "Security",
      },
      {
        title: "Liquid Glass Design System",
        desc: "Deep Vintage Mood color palette (#0F0F1A), custom glow cursor, frosted glass cards, and skeleton loading states.",
        tag: "Design System",
      },
    ],
    deepDiveSections: [
      {
        title: "15-Phase Production SaaS Roadmap",
        summary: "Delivered cleanly in isolated, fully tested phases from DB schema to automated publishing.",
        points: [
          "Phase 1-4: Foundation, PostgreSQL Prisma schema, NextAuth credentials/OAuth, and layout shell.",
          "Phase 5-8: Metric dashboard, GPT-4o generator backend/frontend, and Content Library with debounced search.",
          "Phase 9-11: Drag-and-drop calendar scheduler, Inngest/cron publishing worker, and team role management.",
          "Phase 12-15: Recharts analytics suite, audience demographics map, activity heatmap, and Liquid Glass design system.",
        ],
      },
      {
        title: "Automated Publishing & Idempotent Scheduling",
        summary: "How scheduled posts are safely dispatched across global timezones.",
        points: [
          "Posts stored in PostgreSQL with UTC timestamps and SCHEDULED status.",
          "Minute-resolution cron worker pulls pending posts with scheduledAt <= now and atomically transitions them to PUBLISHED.",
          "Bearer token secret authentication prevents unauthorized invocation.",
          "Optimistic client rescheduling with automatic rollback on network failure.",
        ],
      },
    ],
    challenges:
      "Designing a normalized database schema and prompt pipeline that accommodates the starkly different formatting constraints of Twitter (280 chars), LinkedIn (longform + hashtag blocks), Instagram (caption + first comment tags), and TikTok. Implemented robust drag-and-drop calendar rescheduling with instant optimistic UI updates and server synchronization.",
    whatIBuilt:
      "15 complete architecture phases encompassing full authentication (Credentials + Google OAuth), Prisma relational database schema, AI copywriting engine with streaming JSON responses, drag-and-drop calendar scheduler, cron background publisher, Recharts visualization suite, and team workspace management.",
    image: "/images/projects/ai-automation/ai_content.png",
    github: undefined,
    demo: undefined,
    status: "live",
    year: "2024",
    wallPosition: [-4.5, 2.2, 1.5],
    frameRotation: [0, Math.PI / 2, 0],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
