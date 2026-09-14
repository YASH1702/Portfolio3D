"use client";

import { Project } from "@/data/projects";

interface MockupProps {
  project: Project;
}

export default function ProjectPreviewMockup({ project }: MockupProps) {
  if (project.id === "jobpilot-ai") {
    return <JobPilotMockup />;
  } else if (project.id === "businessflow") {
    return <BusinessFlowMockup />;
  } else {
    return <AIAutomationMockup />;
  }
}

// ── JOBPILOT AI MOCKUP ──
function JobPilotMockup() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "6px",
        overflow: "hidden",
        border: "1px solid #334155",
        background: "#090d16",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.4)",
        marginBottom: "56px",
        fontFamily: "var(--font-geist-sans, sans-serif)",
      }}
    >
      {/* Browser Bar */}
      <div
        style={{
          background: "#0f172a",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
        </div>
        <div
          style={{
            background: "#1e293b",
            padding: "4px 16px",
            borderRadius: "4px",
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono, monospace)",
            color: "#94a3b8",
            flexGrow: 1,
            maxWidth: "380px",
          }}
        >
          app.jobpilot.ai/pipeline/active-applications
        </div>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "var(--font-geist-mono, monospace)",
            color: "#38bdf8",
            padding: "2px 8px",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            borderRadius: "3px",
          }}
        >
          AI COPILOT ACTIVE
        </span>
      </div>

      {/* Main App Content */}
      <div style={{ padding: "24px", color: "#f8fafc" }}>
        {/* Metric Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <MetricCard title="CANDIDATE MATCH" value="98.4%" sub="Profile vs Vacancy" color="#38bdf8" />
          <MetricCard title="PIPELINE STAGE" value="Technical Screen" sub="Linear App • Round 2" color="#4ade80" />
          <MetricCard title="AUTO-TAILOR LATENCY" value="1.4s" sub="Wasm Document Engine" color="#c084fc" />
        </div>

        {/* Live Application Stream */}
        <div
          style={{
            background: "#0f172a",
            borderRadius: "4px",
            border: "1px solid #1e293b",
            padding: "16px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono, monospace)",
              color: "#64748b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Autonomous Application Queue
          </div>

          {[
            { company: "Linear App", role: "Staff Frontend Engineer", status: "Interview Round 3", color: "#4ade80" },
            { company: "Stripe", role: "Full-Stack Engineer (Next.js)", status: "Technical Screen", color: "#38bdf8" },
            { company: "Vercel", role: "Design Systems Specialist", status: "Review in Progress", color: "#f59e0b" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: i < 2 ? "1px solid #1e293b" : "none",
                fontSize: "13px",
              }}
            >
              <div>
                <span style={{ fontWeight: 600, color: "#f8fafc" }}>{item.company}</span>
                <span style={{ color: "#64748b", marginLeft: "10px" }}>{item.role}</span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  color: item.color,
                }}
              >
                ● {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BUSINESSFLOW MOCKUP ──
function BusinessFlowMockup() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "6px",
        overflow: "hidden",
        border: "1px solid #166534",
        background: "#06140b",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.4)",
        marginBottom: "56px",
        fontFamily: "var(--font-geist-sans, sans-serif)",
      }}
    >
      <div
        style={{
          background: "#0c2415",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #14532d",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
        </div>
        <div
          style={{
            background: "#14532d",
            padding: "4px 16px",
            borderRadius: "4px",
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono, monospace)",
            color: "#86efac",
            flexGrow: 1,
            maxWidth: "380px",
          }}
        >
          businessflow.io/calendar/dispatch
        </div>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "var(--font-geist-mono, monospace)",
            color: "#4ade80",
            padding: "2px 8px",
            border: "1px solid rgba(74, 222, 128, 0.3)",
            borderRadius: "3px",
          }}
        >
          STRIPE CONNECTED
        </span>
      </div>

      <div style={{ padding: "24px", color: "#f0fdf4" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <MetricCard title="PROCESSED REVENUE" value="$24,850" sub="Stripe verified transactions" color="#4ade80" />
          <MetricCard title="BOOKINGS CONFIRMED" value="164" sub="Zero double-bookings (Redis locked)" color="#86efac" />
          <MetricCard title="BACKGROUND JOBS" value="99.9%" sub="Inngest confirmation triggers" color="#38bdf8" />
        </div>

        {/* Calendar Schedule Snippet */}
        <div
          style={{
            background: "#0c2415",
            borderRadius: "4px",
            border: "1px solid #14532d",
            padding: "16px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono, monospace)",
              color: "#86efac",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Live Availability &amp; Booking Dispatch
          </div>

          {[
            { time: "09:00 AM", event: "Strategy Architecture Intensive", client: "Acme Digital", status: "Confirmed ($1,200)" },
            { time: "01:30 PM", event: "Product Scoping Session", client: "Starlight SaaS", status: "Deposit Received ($450)" },
            { time: "04:00 PM", event: "Engineering Review", client: "Kinetix Team", status: "Invoice Settled ($750)" },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: i < 2 ? "1px solid #14532d" : "none",
                fontSize: "13px",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--font-geist-mono, monospace)", color: "#86efac", marginRight: "12px" }}>
                  {row.time}
                </span>
                <span style={{ fontWeight: 600, color: "#f0fdf4" }}>{row.event}</span>
                <span style={{ color: "#4ade80", opacity: 0.7, marginLeft: "8px" }}>— {row.client}</span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  color: "#86efac",
                }}
              >
                ● {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── AI AUTOMATION PLATFORM MOCKUP ──
function AIAutomationMockup() {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "6px",
        overflow: "hidden",
        border: "1px solid #4c1d95",
        background: "#0e0717",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.4)",
        marginBottom: "56px",
        fontFamily: "var(--font-geist-sans, sans-serif)",
      }}
    >
      <div
        style={{
          background: "#1c0c2e",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid #3b0764",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
        </div>
        <div
          style={{
            background: "#3b0764",
            padding: "4px 16px",
            borderRadius: "4px",
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono, monospace)",
            color: "#d8b4fe",
            flexGrow: 1,
            maxWidth: "380px",
          }}
        >
          workflow.ai/builder/pipeline-graph
        </div>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "var(--font-geist-mono, monospace)",
            color: "#c084fc",
            padding: "2px 8px",
            border: "1px solid rgba(192, 132, 252, 0.3)",
            borderRadius: "3px",
          }}
        >
          NODE ENGINE ONLINE
        </span>
      </div>

      <div style={{ padding: "24px", color: "#faf5ff" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <MetricCard title="AVG EXECUTION" value="420ms" sub="Distributed Redis queue" color="#c084fc" />
          <MetricCard title="WORKFLOW RUNS" value="1,240 / day" sub="99.99% success rate" color="#4ade80" />
          <MetricCard title="ACTIVE MODELS" value="GPT-4o + Claude" sub="Automatic fallback routing" color="#38bdf8" />
        </div>

        {/* Visual Pipeline Graph Preview */}
        <div
          style={{
            background: "#180a29",
            borderRadius: "4px",
            border: "1px solid #3b0764",
            padding: "18px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono, monospace)",
              color: "#c084fc",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Visual Node Execution Pipeline
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            <NodeBadge tag="TRIGGER" name="POST Webhook" color="#38bdf8" />
            <span style={{ color: "#7c3aed" }}>→</span>
            <NodeBadge tag="OPENAI" name="GPT-4o Extraction" color="#c084fc" />
            <span style={{ color: "#7c3aed" }}>→</span>
            <NodeBadge tag="DATABASE" name="PostgreSQL Store" color="#4ade80" />
            <span style={{ color: "#7c3aed" }}>→</span>
            <NodeBadge tag="NOTIFY" name="Slack Alert Stream" color="#ec4899" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  sub,
  color,
}: {
  title: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "4px",
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "10px",
          letterSpacing: "0.12em",
          color: "#94a3b8",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "22px", fontWeight: 700, color, marginBottom: "4px" }}>
        {value}
      </div>
      <div style={{ fontSize: "11px", color: "#64748b" }}>{sub}</div>
    </div>
  );
}

function NodeBadge({
  tag,
  name,
  color,
}: {
  tag: string;
  name: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.3)",
        border: `1px solid ${color}`,
        borderRadius: "4px",
        padding: "8px 12px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          color,
          letterSpacing: "0.12em",
          marginBottom: "2px",
        }}
      >
        {tag}
      </div>
      <div style={{ color: "#f8fafc", fontWeight: 600 }}>{name}</div>
    </div>
  );
}
