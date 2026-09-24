import Link from "next/link";
import PrintButton from "@/components/ui/PrintButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Yashwant Kariha | Web & Full-Stack Developer",
  description:
    "Curriculum Vitae of Yashwant Kariha. Full-Stack Developer with 1+ years experience in Next.js, Node.js, Express, PostgreSQL & AI workflows.",
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
      {/* Top Navigation Bar */}
      <div
        style={{
          maxWidth: "840px",
          margin: "0 auto 32px auto",
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
          maxWidth: "840px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "clamp(32px, 5vw, 64px)",
          borderRadius: "4px",
          boxShadow: "0 20px 45px -15px rgba(24, 20, 16, 0.09)",
          border: "1px solid rgba(196, 168, 130, 0.32)",
        }}
      >
        {/* Header */}
        <header
          style={{
            borderBottom: "2px solid #18180f",
            paddingBottom: "22px",
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(30px, 4.5vw, 42px)",
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
            Web Developer · Full-Stack &amp; Backend Specialist
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              fontSize: "12.5px",
              color: "#4a463c",
              fontFamily: "var(--font-geist-mono, monospace)",
            }}
          >
            <a
              href="tel:+916375278279"
              style={{ color: "#18180f", textDecoration: "none" }}
            >
              📞 +91 6375278279
            </a>
            <span>·</span>
            <a
              href="mailto:yashwantkariha1@gmail.com"
              style={{ color: "#18180f", textDecoration: "none" }}
            >
              ✉️ yashwantkariha1@gmail.com
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/yashwant-kariha-740630207/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#18180f", textDecoration: "none" }}
            >
              💼 LinkedIn
            </a>
            <span>·</span>
            <a
              href="https://github.com/YASH1702"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#18180f", textDecoration: "none" }}
            >
              💻 GitHub
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={sectionHeadingStyle}>Professional Summary</h2>
          <p style={{ lineHeight: 1.7, color: "#33312b", fontSize: "13.5px" }}>
            Full-Stack Developer with 1+ years of professional experience building responsive, secure, and scalable web applications using
            React, Next.js, TypeScript, Node.js, and PostgreSQL/MongoDB. Experienced in RESTful API architecture, Tailwind CSS, Stripe
            payment workflows, and production AI-powered tools.
          </p>
        </section>

        {/* Technical Skills */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={sectionHeadingStyle}>Technical Skills</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "12px",
            }}
          >
            <SkillBox
              title="Frontend"
              items="React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, Redux Toolkit, Zustand, Material UI, HTML5, CSS3"
            />
            <SkillBox
              title="Backend"
              items="Node.js, Express.js, RESTful APIs, JWT Authentication, WebSockets (Socket.io), Stripe API"
            />
            <SkillBox
              title="Databases & ORM"
              items="PostgreSQL, MongoDB, Prisma ORM, Mongoose, MySQL"
            />
            <SkillBox
              title="Cloud, DevOps & Tools"
              items="Docker, AWS, Linux, CI/CD Pipelines, DevOps Fundamentals, Git, GitHub, Postman, Vite, Figma"
            />
          </div>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={sectionHeadingStyle}>Experience</h2>

          {/* GYMYAK Pvt. Ltd. */}
          <div style={{ marginBottom: "22px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "2px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
                GYMYAK Pvt. Ltd.
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  color: "#8b7355",
                }}
              >
                June 2024 – Aug 2025
              </span>
            </div>
            <div
              style={{
                fontSize: "12.5px",
                color: "#645d52",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Frontend / Full Stack Developer
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "18px",
                color: "#3a382e",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              <li>
                Delivered and maintained the e-commerce website, improving load speed
                by ~20%.
              </li>
              <li>
                Converted Figma designs into a responsive interface with React +
                Tailwind CSS.
              </li>
              <li>
                Linked backend APIs via Node.js, MongoDB, and Axios to enable core
                features.
              </li>
            </ul>
            <div
              style={{
                marginTop: "6px",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                color: "#8b7355",
              }}
            >
              Tech Stack: React, Tailwind CSS, Figma, Node.js, MongoDB, Axios,
              JavaScript, HTML, CSS
            </div>
          </div>

          {/* Grras Solutions Pvt. Ltd. */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "2px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
                Grras Solutions Pvt. Ltd.
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  color: "#8b7355",
                }}
              >
                Jan 2022 – Jun 2022
              </span>
            </div>
            <div
              style={{
                fontSize: "12.5px",
                color: "#645d52",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Python Web Developer Intern
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "18px",
                color: "#3a382e",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              <li>
                Constructed efficient APIs leveraging Django and PostgreSQL for
                interactive applications.
              </li>
              <li>
                Achieved 30% faster query execution through indexing and caching on
                high-load database endpoints.
              </li>
              <li>
                Delivered interactive CRUD solutions that improved reporting workflows and overall client satisfaction.
              </li>
            </ul>
            <div
              style={{
                marginTop: "6px",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                color: "#8b7355",
              }}
            >
              Tech Stack: Python, Django, PostgreSQL, RESTful APIs
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={sectionHeadingStyle}>Projects (Client &amp; Academic)</h2>

          {/* CareerPulse */}
          <ProjectItem
            title="CareerPulse — Career Application Copilot & Extension"
            tech="Next.js, TypeScript, PostgreSQL, OpenAI"
            points={[
              "Engineered an automated application platform with intelligent resume tailoring, ATS scoring, and multi-source job tracking.",
              "Developed a Manifest V3 Chrome extension for 1-click form autofill and real-time application tracking across career portals.",
            ]}
          />

          {/* TaskForge */}
          <ProjectItem
            title="TaskForge — Event-Driven Workflow Automation Engine"
            tech="Next.js, TypeScript, OpenAI, Prisma, PostgreSQL"
            points={[
              "Built AI-powered workflows to automate repetitive business tasks with asynchronous background job processing.",
              "Developed responsive dashboards with authentication and automated workflows.",
            ]}
          />

          {/* CoreDesk */}
          <ProjectItem
            title="CoreDesk — Business Operations & Subscription Platform"
            tech="Next.js, TypeScript, Tailwind CSS, MongoDB, Stripe"
            points={[
              "Architected a subscription platform with Stripe integration, recurring billing, webhooks, and role-based access control.",
              "Implemented an encrypted credential and password management vault with PBKDF2 hashing and secure MongoDB CRUD workflows.",
            ]}
          />
        </section>

        {/* Education */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={sectionHeadingStyle}>Education</h2>

          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "14px" }}>
                KSV University
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  color: "#8b7355",
                }}
              >
                Aug 2022 – Jun 2024 · Gandhinagar, Gujarat
              </span>
            </div>
            <div style={{ color: "#544f43", fontSize: "13px" }}>
              Master of Science in Information Technology —{" "}
              <strong>8.0 CGPA</strong>
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "14px" }}>
                JECRC University
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  color: "#8b7355",
                }}
              >
                Jul 2019 – Jun 2022 · Jaipur, Rajasthan
              </span>
            </div>
            <div style={{ color: "#544f43", fontSize: "13px" }}>
              Bachelor of Computer Applications —{" "}
              <strong>8.20 CGPA</strong>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "13px" }}>
                Senior Secondary RBSE (12th) &amp; Secondary (10th)
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  color: "#8b7355",
                }}
              >
                Kekri, Rajasthan
              </span>
            </div>
            <div style={{ color: "#645d52", fontSize: "12.5px" }}>
              12th: 84.33% (2018–2019) · 10th: 85% (2016–2017)
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section>
          <h2 style={sectionHeadingStyle}>Achievements &amp; Courses</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "18px",
              color: "#3a382e",
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            <li>
              <strong>IDEATHON:</strong> Secured 3rd place in IDEATHON among 25+
              teams by building a full-stack solution in 24 hrs.
            </li>
            <li>
              <strong>Certifications &amp; Courses:</strong> 100x devs Cohort,
              Web Development Bootcamp (Udemy).
            </li>
          </ul>
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
  paddingBottom: "6px",
  marginBottom: "14px",
  fontWeight: 700,
};

function SkillBox({ title, items }: { title: string; items: string }) {
  return (
    <div
      style={{
        background: "#fbf9f6",
        padding: "12px 14px",
        borderRadius: "2px",
        border: "1px solid #ede7dc",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "10px",
          color: "#8b7355",
          textTransform: "uppercase",
          marginBottom: "4px",
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "12px", color: "#22201b", lineHeight: 1.5 }}>
        {items}
      </div>
    </div>
  );
}

function ProjectItem({
  title,
  tech,
  points,
}: {
  title: string;
  tech?: string;
  points: string[];
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "2px",
        }}
      >
        <h3 style={{ fontSize: "14.5px", fontWeight: 700, margin: 0 }}>
          {title}
        </h3>
        {tech && (
          <span
            style={{
              fontFamily: "var(--font-geist-mono, monospace)",
              fontSize: "10px",
              color: "#8b7355",
            }}
          >
            {tech}
          </span>
        )}
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: "18px",
          color: "#3a382e",
          fontSize: "12.5px",
          lineHeight: 1.55,
        }}
      >
        {points.map((pt, i) => (
          <li key={i} style={{ marginBottom: "3px" }}>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}
