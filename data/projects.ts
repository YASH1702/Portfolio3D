// ==================================================
// PROJECT DATA — Single source of truth
// Modify this file to add, remove, or update projects
// ==================================================

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
  challenges: string;
  whatIBuilt: string;
  image: string; // path to placeholder image or real screenshot
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
    subtitle: "Autonomous Job Application & Career Copilot",
    description:
      "An AI-powered career copilot that automates the entire job application workflow — from discovering relevant jobs to tailoring resumes, writing cover letters, and tracking applications.",
    problem:
      "Job searching is an exhausting, repetitive process. Candidates spend hours customising resumes and writing cover letters for each role, leading to burnout and missed opportunities.",
    solution:
      "JobPilot AI uses OpenAI APIs to intelligently match jobs to a user's profile, auto-generate tailored application materials, and provides a Chrome extension for one-click job capture from any job board.",
    features: [
      "AI-powered resume tailoring per job description",
      "Automated cover letter generation",
      "Chrome extension for job capture from any board",
      "Application tracking dashboard",
      "Job match scoring with AI reasoning",
      "WebAssembly-accelerated document parsing",
    ],
    technologies: [
      "Next.js 15",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Prisma",
      "OpenAI API",
      "Chrome Extension",
      "WebAssembly",
    ],
    techCategories: {
      frontend: ["Next.js 15", "React", "TypeScript"],
      backend: ["Node.js", "Prisma"],
      database: ["PostgreSQL"],
      ai: ["OpenAI API"],
      other: ["Chrome Extension", "WebAssembly"],
    },
    challenges:
      "Maintaining high-quality AI output at scale while keeping latency low. Parsing diverse resume formats reliably across different file types.",
    whatIBuilt:
      "Full-stack application with a React frontend, Next.js API routes, PostgreSQL database with Prisma ORM, Chrome extension, and WebAssembly modules for fast document processing.",
    image: "/textures/project-01-placeholder.jpg",
    github: undefined,
    demo: undefined,
    status: "in-progress",
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
    subtitle: "AI-powered business & workflow automation",
    description:
      "A platform that lets businesses design, deploy, and monitor AI-driven automation workflows — connecting APIs, databases, and AI models in a visual pipeline editor.",
    problem:
      "Businesses need to automate repetitive processes involving AI, but existing tools require expensive subscriptions or technical expertise to configure.",
    solution:
      "A visual workflow builder backed by a Node.js execution engine, AI API integrations, and a PostgreSQL workflow store — enabling non-technical users to design powerful automations.",
    features: [
      "Visual workflow pipeline editor",
      "AI model integration (OpenAI, Anthropic)",
      "Webhook triggers and API connections",
      "Real-time execution monitoring",
      "Redis-backed job queue",
      "Role-based access control",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "AI APIs",
      "PostgreSQL",
      "Redis",
    ],
    techCategories: {
      frontend: ["Next.js", "React", "TypeScript"],
      backend: ["Node.js"],
      database: ["PostgreSQL", "Redis"],
      ai: ["OpenAI API", "Anthropic API"],
    },
    challenges:
      "Building a reliable execution engine that handles long-running AI tasks with proper error recovery, retries, and real-time status streaming.",
    whatIBuilt:
      "Full-stack automation platform with a drag-and-drop workflow editor, Node.js execution runtime, AI integrations, and a robust job queue system.",
    image: "/textures/project-03-placeholder.jpg",
    github: undefined,
    demo: undefined,
    status: "in-progress",
    year: "2024",
    wallPosition: [-4.5, 2.2, 1.5],
    frameRotation: [0, Math.PI / 2, 0],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
