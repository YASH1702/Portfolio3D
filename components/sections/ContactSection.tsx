"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";
import { triggerHaptic } from "@/lib/soundEffects";

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
  const [copied, setCopied] = useState(false);
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic("success");
    setFormStatus("sending");

    // Construct mailto link with encoded content as a seamless fallback
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:yashwantkariha1@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setFormStatus("sent");
      window.location.href = mailtoUrl;
    }, 600);
  };

  const handleCopyBrief = () => {
    triggerHaptic("success");
    const briefText = `Yashwant Kariha — Full-Stack Developer & AI Systems Engineer
Email: yashwantkariha1@gmail.com | Phone: +91 6375278279
GitHub: https://github.com/YASH1702
LinkedIn: https://linkedin.com/in/yashwant-kariha-740630207/
Resume: https://yashwantkariha.com/resume
Core Stack: Next.js 16, React 19, TypeScript, Node.js, PostgreSQL, Autonomous AI Agents`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(briefText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
                ? "rgba(14, 18, 26, 0.94)"
                : "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(16px)",
              border: isNightMode
                ? "1px solid rgba(224, 184, 116, 0.35)"
                : "1px solid rgba(180, 150, 110, 0.45)",
              padding: "36px clamp(24px, 5vw, 56px)",
              textAlign: "center",
              maxWidth: "680px",
              width: "calc(100vw - 32px)",
              boxShadow: isNightMode
                ? "0 24px 48px -15px rgba(0, 0, 0, 0.7)"
                : "0 24px 48px -15px rgba(24, 20, 16, 0.12)",
              transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Section Tag */}
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "10.5px",
                fontWeight: 700,
                letterSpacing: "0.26em",
                color: isNightMode ? "#dfba74" : "#84551e",
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
                color: isNightMode ? "#ffffff" : "#0d0c09",
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
                fontWeight: 500,
                color: isNightMode ? "#eae4d8" : "#28251e",
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

            {/* Mode Switcher: Quick Links vs Direct Message */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
              <button
                onClick={() => setShowDirectForm(false)}
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "16px",
                  border: !showDirectForm
                    ? isNightMode
                      ? "1px solid #dfba74"
                      : "1px solid #8b6028"
                    : "1px solid transparent",
                  background: !showDirectForm
                    ? isNightMode
                      ? "rgba(224, 184, 116, 0.18)"
                      : "rgba(180, 140, 90, 0.2)"
                    : "transparent",
                  color: !showDirectForm
                    ? isNightMode ? "#ffffff" : "#11110e"
                    : isNightMode ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Channels &amp; Links
              </button>
              <button
                onClick={() => setShowDirectForm(true)}
                style={{
                  fontFamily: "var(--font-geist-mono, monospace)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "16px",
                  border: showDirectForm
                    ? isNightMode
                      ? "1px solid #dfba74"
                      : "1px solid #8b6028"
                    : "1px solid transparent",
                  background: showDirectForm
                    ? isNightMode
                      ? "rgba(224, 184, 116, 0.18)"
                      : "rgba(180, 140, 90, 0.2)"
                    : "transparent",
                  color: showDirectForm
                    ? isNightMode ? "#ffffff" : "#11110e"
                    : isNightMode ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                ✉ Send Direct Message
              </button>
            </div>

            {!showDirectForm ? (
              <>
                {/* Real Contact / Social Links */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
                    gap: "8px",
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
                    href="https://github.com/YASH1702"
                    label="GitHub"
                    mono="View Repos"
                    external
                    isNightMode={isNightMode}
                  />
                  <ContactLink
                    href="https://linkedin.com/in/yashwant-kariha-740630207/"
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

                {/* Recruiter Quick Action: Copy Brief */}
                <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleCopyBrief}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "9px 18px",
                      borderRadius: "10px",
                      border: isNightMode
                        ? "1px solid rgba(224, 184, 116, 0.4)"
                        : "1px solid rgba(180, 150, 110, 0.5)",
                      background: copied
                        ? isNightMode
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(34, 197, 94, 0.15)"
                        : isNightMode
                        ? "rgba(255, 255, 255, 0.06)"
                        : "rgba(0, 0, 0, 0.04)",
                      color: copied
                        ? "#22c55e"
                        : isNightMode
                        ? "#dfba74"
                        : "#6b4a1b",
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: copied ? "0 0 16px rgba(34, 197, 94, 0.3)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!copied) {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.background = isNightMode
                          ? "rgba(224, 184, 116, 0.15)"
                          : "rgba(180, 150, 110, 0.18)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!copied) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = isNightMode
                          ? "rgba(255, 255, 255, 0.06)"
                          : "rgba(0, 0, 0, 0.04)";
                      }
                    }}
                  >
                    <span>{copied ? "✓ Copied Brief to Clipboard!" : "📋 Copy Recruiter Quick-Brief"}</span>
                  </button>
                </div>
              </>
            ) : (
              /* Inline Direct Contact Form */
              <form
                onSubmit={handleSendMessage}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  maxWidth: "480px",
                  margin: "0 auto",
                  textAlign: "left",
                }}
              >
                {formStatus === "sent" ? (
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "10px",
                      background: "rgba(34, 197, 94, 0.15)",
                      border: "1px solid rgba(34, 197, 94, 0.4)",
                      color: "#22c55e",
                      textAlign: "center",
                      fontFamily: "var(--font-geist-sans, sans-serif)",
                      fontSize: "13px",
                      lineHeight: 1.5,
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: "4px" }}>✓ Message Sent Directly!</div>
                    <div style={{ fontSize: "12px", opacity: 0.9 }}>
                      Thank you for reaching out. Yashwant will respond promptly.
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label
                          htmlFor="sender-name"
                          style={{
                            display: "block",
                            fontSize: "10px",
                            fontWeight: 700,
                            fontFamily: "var(--font-geist-mono, monospace)",
                            color: isNightMode ? "#dfba74" : "#84551e",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: "4px",
                          }}
                        >
                          Your Name
                        </label>
                        <input
                          id="sender-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: isNightMode
                              ? "1px solid rgba(224, 184, 116, 0.3)"
                              : "1px solid rgba(180, 150, 110, 0.4)",
                            background: isNightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.8)",
                            color: isNightMode ? "#ffffff" : "#0d0c09",
                            fontSize: "12px",
                            outline: "none",
                            fontFamily: "var(--font-geist-sans, sans-serif)",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sender-email"
                          style={{
                            display: "block",
                            fontSize: "10px",
                            fontWeight: 700,
                            fontFamily: "var(--font-geist-mono, monospace)",
                            color: isNightMode ? "#dfba74" : "#84551e",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: "4px",
                          }}
                        >
                          Email Address
                        </label>
                        <input
                          id="sender-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@company.com"
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: isNightMode
                              ? "1px solid rgba(224, 184, 116, 0.3)"
                              : "1px solid rgba(180, 150, 110, 0.4)",
                            background: isNightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.8)",
                            color: isNightMode ? "#ffffff" : "#0d0c09",
                            fontSize: "12px",
                            outline: "none",
                            fontFamily: "var(--font-geist-sans, sans-serif)",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="sender-message"
                        style={{
                          display: "block",
                          fontSize: "10px",
                          fontWeight: 700,
                          fontFamily: "var(--font-geist-mono, monospace)",
                          color: isNightMode ? "#dfba74" : "#84551e",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "4px",
                        }}
                      >
                        Message / Project Brief
                      </label>
                      <textarea
                        id="sender-message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about the role or project you'd like to collaborate on..."
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          border: isNightMode
                            ? "1px solid rgba(224, 184, 116, 0.3)"
                            : "1px solid rgba(180, 150, 110, 0.4)",
                          background: isNightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.8)",
                          color: isNightMode ? "#ffffff" : "#0d0c09",
                          fontSize: "12px",
                          outline: "none",
                          resize: "none",
                          fontFamily: "var(--font-geist-sans, sans-serif)",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        background: isNightMode ? "#dfba74" : "#84551e",
                        color: isNightMode ? "#0e121a" : "#ffffff",
                        fontFamily: "var(--font-geist-mono, monospace)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{formStatus === "sending" ? "Dispatching..." : "Send Message Directly →"}</span>
                    </button>
                  </>
                )}
              </form>
            )}

            {/* Minimal Footer */}
            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: isNightMode
                  ? "1px solid rgba(224, 184, 116, 0.25)"
                  : "1px solid rgba(180, 150, 110, 0.35)",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: isNightMode ? "#dfba74" : "#503e28",
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
          ? "1px solid rgba(224, 184, 116, 0.30)"
          : "1px solid rgba(180, 150, 110, 0.45)",
        borderRadius: "6px",
        textDecoration: "none",
        background: isNightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.7)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isNightMode ? "#dfba74" : "#8b7355";
        el.style.background = isNightMode ? "rgba(224, 184, 116, 0.18)" : "rgba(196, 168, 130, 0.22)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = isNightMode
          ? "rgba(224, 184, 116, 0.30)"
          : "rgba(180, 150, 110, 0.45)";
        el.style.background = isNightMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.7)";
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
          color: isNightMode ? "#ffffff" : "#0d0c09",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "9.5px",
          fontWeight: 600,
          color: isNightMode ? "#dfba74" : "#7b4f1d",
          letterSpacing: "0.06em",
          transition: "color 0.2s ease",
        }}
      >
        {mono}
      </span>
    </a>
  );
}
