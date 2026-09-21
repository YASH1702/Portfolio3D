import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById, projects } from "@/data/projects";
import ProjectScreenshotGallery from "@/components/ui/ProjectScreenshotGallery";
import ProjectPreviewMockup from "@/components/ui/ProjectPreviewMockup";
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
          padding: "20px clamp(20px, 4vw, 44px)",
          borderBottom: "1px solid #e0d8cc",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          position: "sticky",
          top: 0,
          background: "rgba(240, 235, 224, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8b7355",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ← Studio
        </Link>
        <span style={{ color: "#d4c8b4", fontSize: "12px" }}>/</span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#1a1a18",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {project.number} {project.title}
        </span>
      </nav>

      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "48px clamp(18px, 4vw, 36px) 80px" }}>

        {/* ── PROJECT NUMBER & STATUS PILL ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "12px",
              letterSpacing: "0.22em",
              color: "#8b7355",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Project {project.number}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                letterSpacing: "0.15em",
                color: "#166534",
                background: "rgba(22, 101, 52, 0.1)",
                textTransform: "uppercase",
                padding: "3px 8px",
                border: "1px solid rgba(22, 101, 52, 0.3)",
                borderRadius: "3px",
                fontWeight: 700,
              }}
            >
              {project.status === "live" ? "✓ SHIPPED & LIVE" : project.status}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                letterSpacing: "0.15em",
                color: "#8b7355",
                textTransform: "uppercase",
                padding: "3px 8px",
                border: "1px solid #d4c8b4",
                borderRadius: "3px",
                fontWeight: 700,
              }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* ── TITLE ── */}
        <h1
          style={{
            fontSize: "clamp(28px, 5.5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            marginBottom: "12px",
            color: "#1a1a18",
          }}
        >
          {project.title}
        </h1>

        {/* ── SUBTITLE ── */}
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 19px)",
            color: "#5a5850",
            marginBottom: "36px",
            lineHeight: 1.5,
          }}
        >
          {project.subtitle}
        </p>

        {/* ── PRODUCTION METRICS STRIP ── */}
        {project.metrics && project.metrics.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              marginBottom: "44px",
            }}
          >
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: "16px 18px",
                  background: "#e8e0d4",
                  borderRadius: "6px",
                  border: "1px solid #d4c8b4",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#8b7355",
                    marginBottom: "6px",
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: "26px",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: m.color || "#1a1a18",
                    lineHeight: 1.1,
                  }}
                >
                  {m.value}
                </div>
                {m.subtext && (
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "10.5px",
                      color: "#6b665c",
                      marginTop: "4px",
                    }}
                  >
                    {m.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── INTERACTIVE SCREENSHOT GALLERY (IF AVAILABLE) OR HERO MOCKUP ── */}
        {project.screenshots && project.screenshots.length > 0 ? (
          <ProjectScreenshotGallery
            screenshots={project.screenshots}
            projectTitle={project.title}
          />
        ) : (
          <ProjectPreviewMockup project={project} />
        )}

        {/* ── OVERVIEW ── */}
        <Section title="Executive Summary">
          <p style={{ lineHeight: 1.8, color: "#3a3830", fontSize: "15.5px" }}>
            {project.description}
          </p>
        </Section>

        {/* ── PROBLEM ── */}
        <Section title="Problem & Market Need">
          <p style={{ lineHeight: 1.8, color: "#3a3830", fontSize: "15.5px" }}>
            {project.problem}
          </p>
        </Section>

        {/* ── SOLUTION ── */}
        <Section title="Architectural Solution">
          <p style={{ lineHeight: 1.8, color: "#3a3830", fontSize: "15.5px" }}>
            {project.solution}
          </p>
        </Section>

        {/* ── ARCHITECTURE HIGHLIGHTS (IF AVAILABLE) ── */}
        {project.architectureHighlights && project.architectureHighlights.length > 0 && (
          <Section title="System Architecture & Core Mechanisms">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "14px",
              }}
            >
              {project.architectureHighlights.map((arch, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "16px 18px",
                    background: "#faf7f2",
                    borderRadius: "6px",
                    border: "1px solid #dcd4c6",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontSize: "9.5px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#8b7355",
                        marginBottom: "6px",
                      }}
                    >
                      {arch.tag}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-geist-sans, sans-serif)",
                        fontSize: "14.5px",
                        fontWeight: 700,
                        color: "#1a1a18",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {arch.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-geist-sans, sans-serif)",
                        fontSize: "12.5px",
                        color: "#4a463c",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {arch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── KEY FEATURES ── */}
        <Section title="Key Implemented Capabilities">
          <ul style={{ paddingLeft: "0", listStyle: "none", margin: 0 }}>
            {project.features.map((feature, i) => (
              <li
                key={i}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e8e0d4",
                  color: "#3a3830",
                  lineHeight: 1.6,
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#8b7355",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: "14.5px" }}>{feature}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── DEEP DIVE SECTIONS (IF AVAILABLE) ── */}
        {project.deepDiveSections && project.deepDiveSections.length > 0 && (
          <Section title="Engineering Deep Dives">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {project.deepDiveSections.map((dive, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "20px 22px",
                    background: "#faf7f2",
                    borderRadius: "6px",
                    border: "1px solid #dcd4c6",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-geist-sans, sans-serif)",
                      fontSize: "15.5px",
                      fontWeight: 700,
                      color: "#1a1a18",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {dive.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-sans, sans-serif)",
                      fontSize: "13.5px",
                      color: "#5a564c",
                      lineHeight: 1.65,
                      margin: "0 0 14px 0",
                    }}
                  >
                    {dive.summary}
                  </p>
                  <ul
                    style={{
                      paddingLeft: "18px",
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {dive.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        style={{
                          fontFamily: "var(--font-geist-sans, sans-serif)",
                          fontSize: "13px",
                          color: "#3a3830",
                          lineHeight: 1.55,
                        }}
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── TECHNOLOGY CATEGORIZED ── */}
        <Section title="Technology Stack Breakdown">
          {project.techCategories && Object.keys(project.techCategories).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {Object.entries(project.techCategories).map(([category, techs]) => {
                if (!techs || techs.length === 0) return null;
                return (
                  <div key={category}>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#8b7355",
                        marginBottom: "8px",
                      }}
                    >
                      {category}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontFamily: "var(--font-geist-mono, monospace)",
                            fontSize: "11px",
                            letterSpacing: "0.08em",
                            color: "#3a3830",
                            padding: "5px 12px",
                            background: "#e8e0d4",
                            borderRadius: "4px",
                            border: "1px solid #d4c8b4",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
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
                    borderRadius: "4px",
                    border: "1px solid #d4c8b4",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </Section>

        {/* ── WHAT I BUILT ── */}
        <Section title="What I Built">
          <p style={{ lineHeight: 1.8, color: "#3a3830", fontSize: "15px" }}>
            {project.whatIBuilt}
          </p>
        </Section>

        {/* ── CHALLENGES & SOLUTIONS ── */}
        <Section title="Engineering Challenges & Solutions">
          <p style={{ lineHeight: 1.8, color: "#3a3830", fontSize: "15px" }}>
            {project.challenges}
          </p>
        </Section>

        {/* ── BACK + NEXT PROJECT ── */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid #e0d8cc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "11.5px",
              fontWeight: 700,
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
                  fontSize: "11.5px",
                  fontWeight: 700,
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
