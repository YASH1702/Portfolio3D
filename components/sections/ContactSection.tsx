"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";

interface ContactSectionProps {
  visible: boolean;
}

/**
 * ContactSection — final section overlay.
 *
 * Appears as a centred-bottom panel when scroll reaches 88–100%.
 * Direct, architectural — LET'S BUILD SOMETHING. + 5 primary links.
 * Dynamically adapts to Day and Night studio lighting.
 */
export default function ContactSection({ visible }: ContactSectionProps) {
  const { isNightMode } = useStudio();

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="contact"
          initial={{ opacity: 0, y: 28 }}
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
            paddingBottom: "clamp(24px, 6vh, 60px)",
            pointerEvents: "all",
          }}
        >
          <div
            style={{
              background: isNightMode
                ? "rgba(15, 19, 28, 0.94)"
                : "rgba(242, 237, 228, 0.95)",
              backdropFilter: "blur(14px)",
              border: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.28)"
                : "1px solid rgba(196, 168, 130, 0.38)",
              padding: "36px clamp(24px, 5vw, 56px)",
              textAlign: "center",
              maxWidth: "680px",
              width: "calc(100vw - 32px)",
              boxShadow: isNightMode
                ? "0 24px 48px -15px rgba(0, 0, 0, 0.7)"
                : "0 24px 48px -15px rgba(24, 20, 16, 0.1)",
              transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Section Tag */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10px",
                letterSpacing: "0.26em",
                color: isNightMode ? "#dfba74" : "#8b7355",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              04 · Contact &amp; Inquiry
            </div>

            {/* CTA */}
            <h2
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "clamp(24px, 4.5vw, 38px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: isNightMode ? "#f8f6f0" : "#18180f",
                lineHeight: 1.1,
                marginBottom: "10px",
                transition: "color 0.3s ease",
              }}
            >
              Let&apos;s Build Something.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "13.5px",
                color: isNightMode ? "#d8d2c6" : "#5c584d",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "480px",
                margin: "0 auto 28px auto",
                transition: "color 0.3s ease",
              }}
            >
              Available for full-stack engineering roles, technical advisory,
              and selective high-impact digital product builds.
            </p>

            {/* Real Contact / Social Links */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <ContactLink
                href="mailto:yashwantkariha1@gmail.com"
                label="Email"
                mono="yashwantkariha1"
                isNightMode={isNightMode}
              />
              <ContactLink
                href="tel:+916375278279"
                label="Phone"
                mono="+91 6375278279"
                isNightMode={isNightMode}
              />
              <ContactLink
                href="https://github.com/yashwantkariha"
                label="GitHub"
                mono="View Repos"
                external
                isNightMode={isNightMode}
              />
              <ContactLink
                href="https://linkedin.com/in/yashwant-kariha"
                label="LinkedIn"
                mono="Connect"
                external
                isNightMode={isNightMode}
              />
              <ContactLink
                href="/resume"
                label="Resume"
                mono="Full CV &amp; Print"
                isNightMode={isNightMode}
              />
            </div>

            {/* Minimal Footer */}
            <div
              style={{
                marginTop: "26px",
                paddingTop: "20px",
                borderTop: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.2)"
                  : "1px solid rgba(196, 168, 130, 0.25)",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: isNightMode ? "#b0a490" : "#9c8d78",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span>Yashwant Kariha · {new Date().getFullYear()}</span>
              <span>Shortcuts: [1-4] Navigate · [N] Day/Night · [L] Lamp</span>
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
  isNightMode,
}: {
  href: string;
  label: string;
  mono: string;
  external?: boolean;
  isNightMode: boolean;
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
        gap: "4px",
        padding: "12px 14px",
        border: isNightMode
          ? "1px solid rgba(224, 184, 116, 0.25)"
          : "1px solid rgba(139, 115, 85, 0.35)",
        textDecoration: "none",
        background: isNightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.4)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isNightMode ? "#dfba74" : "#8b7355";
        el.style.background = isNightMode ? "rgba(224, 184, 116, 0.18)" : "rgba(196, 168, 130, 0.18)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isNightMode
          ? "rgba(224, 184, 116, 0.25)"
          : "rgba(139, 115, 85, 0.35)";
        el.style.background = isNightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.4)";
        el.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-sans, sans-serif)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isNightMode ? "#f8f6f0" : "#18180f",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9px",
          color: isNightMode ? "#dfba74" : "#8b7355",
          letterSpacing: "0.06em",
          transition: "color 0.2s ease",
        }}
      >
        {mono}
      </span>
    </a>
  );
}
