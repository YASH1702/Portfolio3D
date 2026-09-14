import Link from "next/link";
import PrintButton from "@/components/ui/PrintButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Yashwant Kariha | Full-Stack Developer",
  description:
    "Curriculum Vitae of Yashwant Kariha. Full-Stack Developer building digital products, AI systems & modern web experiences.",
};

export default function ResumePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3ede4",
        fontFamily: "var(--font-geist-sans, sans-serif)",
        color: "#18180f",
        padding: "48px 24px",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto 36px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8b7355",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ← Back to Studio
        </Link>
        <div style={{ display: "flex", gap: "12px" }}>
          <PrintButton />
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "clamp(32px, 6vw, 64px)",
          borderRadius: "3px",
          boxShadow: "0 20px 40px -15px rgba(24, 20, 16, 0.08)",
          border: "1px solid rgba(196, 168, 130, 0.3)",
        }}
      >
        {/* Header */}
        <header style={{ borderBottom: "2px solid #18180f", paddingBottom: "24px", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            Yashwant Kariha
          </h1>
          <div
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "13px",
              letterSpacing: "0.16em",
              color: "#8b7355",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            Full-Stack &amp; Frontend Developer
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
              fontSize: "12px",
              color: "#5c584d",
              fontFamily: "var(--font-geist-mono, monospace)",
            }}
          >
            <span>Location: Remote / Open to Relocation</span>
            <span>·</span>
            <span>Email: yashwant.kariha@gmail.com</span>
            <span>·</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: "#18180f" }}>GitHub</a>
            <span>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#18180f" }}>LinkedIn</a>
          </div>
        </header>

        {/* Executive Summary */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={sectionHeadingStyle}>Summary</h2>
          <p style={{ lineHeight: 1.7, color: "#3a382e", fontSize: "14px" }}>
            Full-Stack Developer specializing in high-performance web applications,
            modern React/Next.js architectures, and autonomous AI-driven automation systems.
            Demonstrated track record of delivering end-to-end digital products from visual
            user interfaces down to distributed Redis queues and PostgreSQL databases.
          </p>
        </section>

        {/* Core Competencies */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={sectionHeadingStyle}>Technical Competencies</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
            <SkillBox title="Frontend" items="Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, WebAssembly" />
            <SkillBox title="Backend & Systems" items="Node.js, Express, Prisma ORM, REST APIs, WebSockets, Inngest" />
            <SkillBox title="Databases & Caching" items="PostgreSQL, MongoDB, Redis Distributed Locking, Supabase" />
            <SkillBox title="AI & Tooling" items="OpenAI APIs, Anthropic Claude, Chrome Extensions, Docker, Git" />
          </div>
        </section>

        {/* Featured Projects */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={sectionHeadingStyle}>Featured Engineering Projects</h2>

          <ProjectEntry
            title="JobPilot AI"
            role="Autonomous Job Application & Career Copilot"
            tech="Next.js 15, TypeScript, PostgreSQL, Prisma, OpenAI API, WebAssembly"
            points={[
              "Engineered an autonomous career copilot matching candidate profiles against job descriptions with 98% accuracy scoring.",
              "Constructed a WebAssembly-accelerated document parsing engine to parse and tailor resumes in under 1.4s.",
              "Built a Chrome extension enabling 1-click vacancy capture and real-time pipeline status synchronization.",
            ]}
          />

          <ProjectEntry
            title="BusinessFlow"
            role="Business Operations Website + Booking Platform"
            tech="Next.js, React, TypeScript, PostgreSQL, Prisma, Stripe, Inngest, Redis"
            points={[
              "Architected a unified business booking and payment platform with real-time calendar availability checking.",
              "Implemented Redis distributed locking mechanism to eliminate double-booking concurrency race conditions.",
              "Automated background scheduling, email confirmations, and reminders using Inngest serverless workflow queues.",
            ]}
          />

          <ProjectEntry
            title="AI Automation Platform"
            role="Visual AI-Powered Workflow Pipeline Engine"
            tech="Next.js, React, TypeScript, Node.js, OpenAI API, Anthropic API, Redis"
            points={[
              "Designed a drag-and-drop node graph canvas for visual workflow assembly connecting webhooks, LLMs, and databases.",
              "Implemented automated failover routing between OpenAI GPT-4o and Anthropic Claude 3.5 models.",
              "Achieved sub-450ms execution latency backed by a high-throughput Redis job queue with 99.99% uptime.",
            ]}
          />
        </section>

        {/* Education */}
        <section>
          <h2 style={sectionHeadingStyle}>Education &amp; Credentials</h2>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "4px" }}>
            <span style={{ fontWeight: 700 }}>Bachelor of Technology / Computer Science</span>
            <span style={{ fontFamily: "var(--font-geist-mono, monospace)", color: "#8b7355" }}>Graduate</span>
          </div>
          <p style={{ color: "#645d52", fontSize: "13px", margin: 0 }}>
            Focus on Software Engineering, Data Structures, Algorithms, and Distributed Systems.
          </p>
        </section>
      </main>
    </div>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono, monospace)",
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#8b7355",
  borderBottom: "1px solid #e8e0d4",
  paddingBottom: "8px",
  marginBottom: "16px",
};

function SkillBox({ title, items }: { title: string; items: string }) {
  return (
    <div style={{ background: "#fbf9f6", padding: "12px 14px", borderRadius: "2px", border: "1px solid #eee8de" }}>
      <div style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: "10px", color: "#8b7355", textTransform: "uppercase", marginBottom: "4px" }}>
        {title}
      </div>
      <div style={{ fontSize: "12.5px", color: "#22201b", lineHeight: 1.5 }}>
        {items}
      </div>
    </div>
  );
}

function ProjectEntry({
  title,
  role,
  tech,
  points,
}: {
  title: string;
  role: string;
  tech: string;
  points: string[];
}) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "3px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>{title}</h3>
        <span style={{ fontFamily: "var(--font-geist-mono, monospace)", fontSize: "10px", color: "#8b7355" }}>
          {tech}
        </span>
      </div>
      <div style={{ fontSize: "12px", color: "#645d52", marginBottom: "8px", fontStyle: "italic" }}>
        {role}
      </div>
      <ul style={{ margin: 0, paddingLeft: "18px", color: "#3a382e", fontSize: "13px", lineHeight: 1.6 }}>
        {points.map((pt, i) => (
          <li key={i} style={{ marginBottom: "4px" }}>{pt}</li>
        ))}
      </ul>
    </div>
  );
}
