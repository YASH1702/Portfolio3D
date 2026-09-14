import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById, projects } from "@/data/projects";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Yashwant Kariha`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0ebe0",
        fontFamily: "var(--font-geist-sans, sans-serif)",
        color: "#1a1a18",
      }}
    >
      {/* ── BACK NAVIGATION ── */}
      <nav
        style={{
          padding: "24px 40px",
          borderBottom: "1px solid #e0d8cc",
          display: "flex",
          alignItems: "center",
          gap: "16px",
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
        <span style={{ color: "#d4c8b4", fontSize: "12px" }}>/</span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1a1a18",
          }}
        >
          {project.number} {project.title}
        </span>
      </nav>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 40px" }}>

        {/* ── PROJECT NUMBER ── */}
        <div
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "12px",
            letterSpacing: "0.22em",
            color: "#8b7355",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Project {project.number}
        </div>

        {/* ── TITLE ── */}
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            marginBottom: "12px",
            color: "#1a1a18",
          }}
        >
          {project.title}
        </h1>

        {/* ── SUBTITLE ── */}
        <p
          style={{
            fontSize: "18px",
            color: "#5a5850",
            marginBottom: "40px",
            lineHeight: 1.5,
          }}
        >
          {project.subtitle}
        </p>

        {/* ── STATUS / YEAR ── */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "48px",
            paddingBottom: "48px",
            borderBottom: "1px solid #e0d8cc",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#8b7355",
              textTransform: "uppercase",
              padding: "4px 10px",
              border: "1px solid #d4c8b4",
              borderRadius: "2px",
            }}
          >
            {project.status}
          </span>
          <span
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#8b7355",
              textTransform: "uppercase",
              padding: "4px 10px",
              border: "1px solid #d4c8b4",
              borderRadius: "2px",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* ── PLACEHOLDER IMAGE ── */}
        <div
          aria-label={`${project.title} project preview`}
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background:
              project.id === "jobpilot-ai"
                ? "#0d1520"
                : project.id === "businessflow"
                ? "#0f1a10"
                : "#1a0d1a",
            borderRadius: "4px",
            marginBottom: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#5a5870",
              textTransform: "uppercase",
            }}
          >
            Project Preview
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#8090b0",
              textTransform: "uppercase",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "9px",
              color: "#404050",
              letterSpacing: "0.1em",
              marginTop: "4px",
            }}
          >
            Screenshot placeholder — replace with actual screenshot
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        <Section title="Overview">
          <p style={{ lineHeight: 1.8, color: "#3a3830" }}>
            {project.description}
          </p>
        </Section>

        {/* ── PROBLEM ── */}
        <Section title="Problem">
          <p style={{ lineHeight: 1.8, color: "#3a3830" }}>
            {project.problem}
          </p>
        </Section>

        {/* ── SOLUTION ── */}
        <Section title="Solution">
          <p style={{ lineHeight: 1.8, color: "#3a3830" }}>
            {project.solution}
          </p>
        </Section>

        {/* ── KEY FEATURES ── */}
        <Section title="Key Features">
          <ul style={{ paddingLeft: "0", listStyle: "none" }}>
            {project.features.map((feature, i) => (
              <li
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e8e0d4",
                  color: "#3a3830",
                  lineHeight: 1.6,
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "10px",
                    color: "#8b7355",
                    marginTop: "4px",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </Section>

        {/* ── TECHNOLOGY ── */}
        <Section title="Technology">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#5a5850",
                  padding: "5px 12px",
                  background: "#e8e0d4",
                  borderRadius: "2px",
                  border: "1px solid #d4c8b4",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* ── WHAT I BUILT ── */}
        <Section title="What I Built">
          <p style={{ lineHeight: 1.8, color: "#3a3830" }}>
            {project.whatIBuilt}
          </p>
        </Section>

        {/* ── CHALLENGES ── */}
        <Section title="Challenges">
          <p style={{ lineHeight: 1.8, color: "#3a3830" }}>
            {project.challenges}
          </p>
        </Section>

        {/* ── LINKS ── */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "56px",
            paddingTop: "40px",
            borderTop: "1px solid #e0d8cc",
          }}
        >
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              GitHub →
            </a>
          ) : (
            <span style={{ ...linkStyle, opacity: 0.4, cursor: "default" }}>
              GitHub (Private)
            </span>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              Live Demo →
            </a>
          ) : (
            <span style={{ ...linkStyle, opacity: 0.4, cursor: "default" }}>
              Demo (Coming Soon)
            </span>
          )}
        </div>

        {/* ── BACK + NEXT PROJECT ── */}
        <div
          style={{
            marginTop: "64px",
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
            }}
          >
            ← Back to Studio
          </Link>

          {/* Next project */}
          {(() => {
            const idx = projects.findIndex((p) => p.id === project.id);
            const next = projects[(idx + 1) % projects.length];
            return (
              <Link
                href={`/projects/${next.id}`}
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#8b7355",
                  textDecoration: "none",
                }}
              >
                Next: {next.title} →
              </Link>
            );
          })()}
        </div>
      </main>
    </div>
  );
}

// ── HELPERS ──

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "48px" }}>
      <h2
        style={{
          fontSize: "11px",
          fontFamily: "var(--font-geist-mono, monospace)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#8b7355",
          marginBottom: "20px",
          paddingBottom: "10px",
          borderBottom: "1px solid #e0d8cc",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono, monospace)",
  fontSize: "12px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#1a1a18",
  textDecoration: "none",
  padding: "10px 20px",
  border: "1px solid #1a1a18",
  display: "inline-block",
  transition: "all 0.2s ease",
};
