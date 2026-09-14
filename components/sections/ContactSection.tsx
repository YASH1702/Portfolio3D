"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ContactSectionProps {
  visible: boolean;
}

/**
 * ContactSection — final section overlay.
 *
 * Appears as a centred-bottom panel when scroll reaches 75–100%.
 * Simple, direct — LET'S BUILD SOMETHING. + links.
 */
export default function ContactSection({ visible }: ContactSectionProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="contact"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Contact section"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            display: "flex",
            justifyContent: "center",
            paddingBottom: "clamp(24px, 5vh, 56px)",
            pointerEvents: "all",
          }}
        >
          <div
            style={{
              background: "rgba(240, 235, 224, 0.94)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(196, 168, 130, 0.35)",
              padding: "40px 56px",
              textAlign: "center",
              maxWidth: "580px",
              width: "90vw",
            }}
          >
            {/* Label */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.26em",
                color: "#8b7355",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              03 · Contact
            </div>

            {/* CTA */}
            <h2
              style={{
                fontSize: "clamp(22px, 4vw, 34px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#18180f",
                lineHeight: 1.1,
                marginBottom: "10px",
              }}
            >
              Let&apos;s Build Something.
            </h2>

            <p
              style={{
                fontSize: "13px",
                color: "#6a6858",
                lineHeight: 1.7,
                marginBottom: "32px",
              }}
            >
              Open to full-time roles, freelance projects, and interesting collaborations.
            </p>

            {/* Links */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <ContactLink
                href="mailto:yashwant@example.com"
                label="Email"
                mono="hello@yashwant.dev"
              />
              <ContactLink
                href="https://github.com"
                label="GitHub"
                mono="@yashwantkariha"
                external
              />
              <ContactLink
                href="https://linkedin.com"
                label="LinkedIn"
                mono="in/yashwantkariha"
                external
              />
            </div>

            {/* Footer line */}
            <div
              style={{
                marginTop: "28px",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: "#a09880",
                textTransform: "uppercase",
              }}
            >
              Yashwant Kariha · {new Date().getFullYear()} · Built with Next.js & Three.js
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function ContactLink({
  href,
  label,
  mono,
  external,
}: {
  href: string;
  label: string;
  mono: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        padding: "10px 18px",
        border: "1px solid rgba(139, 115, 85, 0.35)",
        textDecoration: "none",
        transition: "border-color 0.2s ease, background 0.2s ease",
        minWidth: "130px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#8b7355";
        (e.currentTarget as HTMLElement).style.background = "rgba(196, 168, 130, 0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(139, 115, 85, 0.35)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-sans, sans-serif)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#18180f",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          color: "#8b7355",
          letterSpacing: "0.08em",
        }}
      >
        {mono}
      </span>
    </a>
  );
}
