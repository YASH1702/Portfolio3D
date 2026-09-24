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
    id: "careerpulse",
    number: "01",
    title: "CareerPulse",
    subtitle: "Career Application Copilot & Extension using Next.js, TypeScript, PostgreSQL, OpenAI",
    description:
      "A production-grade AI career application copilot and browser extension that automates the entire job application workflow — from intelligent resume tailoring and ATS scoring to multi-source job tracking, 1-click portal autofill via Chrome extension, and Inngest background event processing.",
    problem:
      "Job hunting is exhausting and error-prone. Software engineers spend 40–60 hours per month manually reading job listings, copy-pasting descriptions, rewriting resumes, and formatting cover letters. Generic AI tools frequently hallucinate false experience, exaggerated metrics, or non-existent companies, ruining candidate credibility and failing strict ATS scans.",
    solution:
      "Engineered an automated application platform with intelligent resume tailoring, ATS scoring, and multi-source job tracking. Built with strict anti-hallucination verification rules enforced at prompt and AST validation layers, combined with SHA-256 deduplication and deterministic pre-filtering (saving 74% token spend), dynamic cover letter generation, a Manifest V3 Chrome extension for 1-click job capture & portal autofill, and Inngest-powered automated morning digests.",
    features: [
      "Intelligent resume tailoring & strict ATS scoring calibrated for enterprise portals",
      "2-Pass AI Matching Engine (GPT-4o-mini fast extraction + GPT-4o deep evaluation)",
      "Strict Anti-Hallucination Validation (zero fabricated skills, dates, or companies)",
      "Manifest V3 Chrome Extension for 1-click job capture & portal autofill",
      "Interactive Kanban Pipeline Tracker (Ready to Apply, Applied, Interviewing, Offer, Archived)",
      "Deterministic Pre-Filtering & SHA-256 Deduplication Hashing across job boards",
      "Dynamic Cover Letter Generator with 4 selectable tones (Professional, Startup, Enthusiastic, Executive)",
      "Inngest Event-Driven Background Crons for daily 8:00 AM match digests",
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
        url: "/images/projects/careerpulse/dashboard.png",
        caption: "CareerPulse Application Pipeline Dashboard with funnel conversion metrics and stage breakdown",
        tag: "Dashboard",
      },
      {
        url: "/images/projects/careerpulse/myjobs.png",
        caption: "Active Applications Kanban Board with priority flags, company notes, and stage management",
        tag: "Kanban",
      },
      {
        url: "/images/projects/careerpulse/jobtracker.png",
        caption: "Comprehensive Market Skill Gap Radar & Company Intelligence Tracking",
        tag: "Analytics",
      },
      {
        url: "/images/projects/careerpulse/jobsync-ai-jobmatch.gif",
        caption: "Live 2-Pass AI Fit Evaluation displaying verified strengths, missing skills, and match scoring",
        tag: "AI Engine",
        isAnimated: true,
      },
      {
        url: "/images/projects/careerpulse/jobsync-ai.gif",
        caption: "Live AI Resume Tailoring & Bullet Point Rewriter with strict zero-hallucination verification",
        tag: "Tailoring",
        isAnimated: true,
      },
    ],
    architectureHighlights: [
      {
        title: "Intelligent Resume Tailoring & ATS Scoring",
        desc: "Analyzes candidate resume AST against vacancy requirements, computing a 0–100% ATS score and tailoring accomplishments to highlight verified relevant competencies.",
        tag: "ATS Engine",
      },
      {
        title: "Manifest V3 Chrome Extension",
        desc: "Captures vacancies from LinkedIn, Greenhouse, and Lever in 1-click; content scripts bridge DOM nodes for automated application portal autofill.",
        tag: "Browser Extension",
      },
      {
        title: "2-Pass AI Matching Pipeline",
        desc: "GPT-4o-mini rapidly extracts structured job criteria followed by GPT-4o deep evaluation to verify candidate strengths and generate custom cover letters.",
        tag: "AI Pipeline",
      },
      {
        title: "Anti-Hallucination Safety Guard",
        desc: "Enforces strict JSON schema contracts and set-difference AST validation against the canonical user profile, preventing fabricated skills or experiences.",
        tag: "Verification",
      },
      {
        title: "Deterministic Pre-Filter & Deduplication",
        desc: "SHA-256 content hashing detects duplicate listings across portals, while deterministic salary and remote filters reject unfitting jobs before spending AI tokens.",
        tag: "Cost Control",
      },
      {
        title: "Inngest Event Automations",
        desc: "Scheduled background crons execute daily 8:00 AM match digests and trigger follow-up reminders across the active Kanban pipeline.",
        tag: "Background Jobs",
      },
    ],
    deepDiveSections: [
      {
        title: "Anti-Hallucination Verification Architecture",
        summary: "How CareerPulse guarantees 100% truthful resume tailoring without sacrificing ATS relevance.",
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
    image: "/images/projects/careerpulse/dashboard.png",
    github: undefined,
    demo: undefined,
    status: "live",
    year: "2024",
    wallPosition: [-4.5, 2.2, -1.5],
    frameRotation: [0, Math.PI / 2, 0],
  },
  {
    id: "coredesk",
    number: "02",
    title: "CoreDesk",
    subtitle: "Business Operations & Subscription Platform using Next.js, TypeScript, Tailwind CSS, MongoDB, Stripe",
    description:
      "An enterprise business operations and subscription platform architected with Stripe recurring billing, webhooks, role-based access control, and an encrypted credential and password management vault utilizing PBKDF2 hashing.",
    problem:
      "Growing businesses and engineering teams struggle with fragmented SaaS tools for subscription management, client billing, access control, and secure credential storage — often compromising security by storing sensitive credentials in unencrypted or shared spaces.",
    solution:
      "Architected a unified subscription platform with Stripe integration, recurring billing, webhooks, and role-based access control. Implemented an encrypted credential and password management vault with PBKDF2 hashing and secure MongoDB CRUD workflows, providing businesses with a single, highly secure control plane.",
    features: [
      "Stripe integration with recurring billing cycles, tier upgrades, and customer portal",
      "Stripe webhook lifecycle listeners for real-time payment status and subscription synchronizations",
      "Encrypted credential and password management vault with client-side & server-side PBKDF2 hashing",
      "Secure MongoDB CRUD workflows with strict Mongoose schema validation and indexing",
      "Role-Based Access Control (RBAC) with granular admin and member permission gates",
      "Automated invoice dispatch and transaction auditing trails",
      "High-security session management with HTTP-only signed JWT cookies",
      "Responsive, sleek dashboard interface built with Next.js, TypeScript, and Tailwind CSS",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "Stripe API",
      "Node.js",
      "PBKDF2 / Web Crypto",
      "JWT Authentication",
    ],
    techCategories: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Next.js API Routes", "Stripe Webhooks", "PBKDF2 Encryption"],
      database: ["MongoDB", "Mongoose ORM"],
      other: ["Stripe API", "Role-Based Access Control", "JWT Auth"],
    },
    metrics: [
      { label: "Stripe Uptime", value: "99.99%", subtext: "Webhook Event Processing", color: "#4ade80" },
      { label: "Vault Security", value: "PBKDF2", subtext: "Zero-Knowledge Encryption", color: "#38bdf8" },
      { label: "Billing Cycle", value: "100%", subtext: "Automated Recurring Invoices", color: "#fbbf24" },
      { label: "Role Latency", value: "<15ms", subtext: "RBAC Token Verification", color: "#a855f7" },
    ],
    architectureHighlights: [
      {
        title: "Stripe Recurring Billing & Webhook Engine",
        desc: "Complete subscription lifecycle management with Stripe Checkout, tiered plans, customer portal redirects, and webhook listeners verifying signatures.",
        tag: "Fintech",
      },
      {
        title: "PBKDF2 Encrypted Credential Vault",
        desc: "End-to-end encrypted password and secret storage utilizing PBKDF2 key derivation and AES-GCM encryption before persistence in MongoDB.",
        tag: "Cryptography",
      },
      {
        title: "Role-Based Access Control (RBAC)",
        desc: "Granular authorization hierarchy separating billing administrators from team members, enforced at API gateway and middleware layers.",
        tag: "Security",
      },
      {
        title: "High-Throughput MongoDB Schemas",
        desc: "Mongoose models with compound indexes for instant sub-10ms query execution across tenant records, audit logs, and credential vaults.",
        tag: "Data Layer",
      },
    ],
    deepDiveSections: [
      {
        title: "Stripe Webhook Idempotency & Lifecycle",
        summary: "Ensuring fault-tolerant recurring billing without duplicate charge processing.",
        points: [
          "Verifies Stripe cryptographic signatures on all incoming webhook payloads before parsing.",
          "Atomic upsert operations update customer subscription status from invoice.paid and customer.subscription.updated events.",
          "Graceful handling of payment failures with automated retry notifications and grace-period account state transitions.",
          "Seamless sync between Stripe Customer IDs and MongoDB tenant documents.",
        ],
      },
      {
        title: "PBKDF2 Vault Architecture",
        summary: "Zero-knowledge architecture ensuring user credentials cannot be decrypted even in the event of a database dump.",
        points: [
          "Derives cryptographic keys using PBKDF2 with 100,000+ iterations and per-user cryptographic salts.",
          "Payloads encrypted via AES-256-GCM ensuring both confidentiality and tamper-proof authenticity.",
          "Decryption keys reside strictly in client memory and are never persisted on the server.",
          "Strict CORS and Content Security Policies prevent unauthorized cross-origin credential extraction.",
        ],
      },
    ],
    challenges:
      "Securing multi-tenant subscription states against race conditions during Stripe webhook processing, and designing a zero-knowledge credential vault where sensitive business credentials are encrypted using PBKDF2 before storage in MongoDB.",
    whatIBuilt:
      "Full-stack business platform integrating Stripe recurring billing and webhook synchronizations, PBKDF2 encrypted credential vault, role-based access control, and MongoDB data modeling with Mongoose and Next.js.",
    image: "/textures/project-02-placeholder.jpg",
    github: undefined,
    demo: undefined,
    status: "in-progress",
    year: "2024",
    wallPosition: [-4.5, 2.2, 0],
    frameRotation: [0, Math.PI / 2, 0],
  },
  {
    id: "taskforge",
    number: "03",
    title: "TaskForge",
    subtitle: "Event-Driven Workflow Automation Engine using Next.js, TypeScript, OpenAI, Prisma, PostgreSQL",
    description:
      "An event-driven AI workflow automation engine built to automate repetitive business tasks and multi-channel content workflows with asynchronous background job processing, OpenAI GPT-4o intelligence, drag-and-drop calendar scheduling, and Recharts analytics.",
    problem:
      "Modern businesses and creators face hundreds of hours of repetitive manual operations: writing platform-specific copy, synchronizing schedules across disjointed channels, and analyzing disparate analytics without centralized intelligence.",
    solution:
      "Built AI-powered workflows to automate repetitive business tasks with asynchronous background job processing. Developed responsive dashboards with authentication, automated workflows, GPT-4o multi-channel content generation, an HTML5 drag-and-drop calendar scheduler, and an advanced analytics dashboard featuring geographic reach maps, activity density, and engagement trend lines.",
    features: [
      "AI-powered workflows to automate repetitive business tasks with asynchronous background jobs",
      "Responsive dashboards with authentication and automated workflows",
      "Multi-Platform AI Generation Studio (GPT-4o) with tone & hashtag calibration",
      "Interactive Month & Week Calendar Views with HTML5 drag-and-drop rescheduling",
      "Automated Serverless Post Publishing via Vercel Cron & node-cron with Bearer security",
      "Comprehensive Recharts Analytics Suite (KPI cards, time-series area charts, platform donut charts)",
      "Global Audience Demographics & Reach Map with peak engagement hours",
      "Team Workspace Management with role-based access control (Admin, Editor, Viewer)",
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
        url: "/images/projects/taskforge/ai_content.png",
        caption: "TaskForge AI Generation Studio with topic prompt, tone selection, and multi-platform preview cards",
        tag: "AI Studio",
      },
      {
        url: "/images/projects/taskforge/scheduling.png",
        caption: "Interactive Month Calendar Scheduler with HTML5 drag-and-drop rescheduling",
        tag: "Scheduler",
      },
      {
        url: "/images/projects/taskforge/predictive.png",
        caption: "Predictive Analytics Dashboard with impressions, engagement trends, and KPI cards",
        tag: "Analytics",
      },
      {
        url: "/images/projects/taskforge/audience.png",
        caption: "Global Audience Demographics & Reach Map tracking regional engagement and peak time windows",
        tag: "Audience",
      },
      {
        url: "/images/projects/taskforge/optimization.png",
        caption: "Posting Activity Density Heatmap (52 weeks) and Content Score Health Card (88/100)",
        tag: "Heatmap",
      },
      {
        url: "/images/projects/taskforge/cross_platform.png",
        caption: "Multi-Channel Distribution Matrix optimizing copy constraints for X, LinkedIn, IG, and TikTok",
        tag: "Distribution",
      },
    ],
    architectureHighlights: [
      {
        title: "Event-Driven Workflow Automation Engine",
        desc: "Built AI-powered workflows to automate repetitive business tasks with asynchronous background job processing and webhook dispatching.",
        tag: "Workflow Engine",
      },
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
      "15 complete architecture phases encompassing full authentication (Credentials + Google OAuth), Prisma relational database schema, AI copywriting engine with streaming responses, drag-and-drop calendar scheduler, cron background publisher, Recharts visualization suite, and team workspace management.",
    image: "/images/projects/taskforge/ai_content.png",
    github: undefined,
    demo: undefined,
    status: "live",
    year: "2024",
    wallPosition: [-4.5, 2.2, 1.5],
    frameRotation: [0, Math.PI / 2, 0],
  },
];

export function getProjectById(id: string): Project | undefined {
  const normalized = id.toLowerCase();
  if (normalized === "careerpulse" || normalized === "jobpilot-ai" || normalized === "jobpilot") {
    return projects.find((p) => p.id === "careerpulse");
  }
  if (normalized === "coredesk" || normalized === "businessflow" || normalized === "cipherbox") {
    return projects.find((p) => p.id === "coredesk");
  }
  if (normalized === "taskforge" || normalized === "ai-automation-platform" || normalized === "ai-automation") {
    return projects.find((p) => p.id === "taskforge");
  }
  return projects.find((p) => p.id === normalized);
}
