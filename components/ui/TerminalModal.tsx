"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudio } from "@/context/StudioContext";
import { playTerminalKey, playCatPurr, triggerHaptic } from "@/lib/soundEffects";

interface OutputLine {
  id: string;
  type: "command" | "output" | "error" | "matrix" | "system";
  text?: string;
  component?: React.ReactNode;
}

export default function TerminalModal() {
  const {
    isTerminalOpen,
    toggleTerminal,
    toggleNightMode,
    toggleLamp,
    toggleFocusMode,
    toggleLofi,
    isNightMode,
  } = useStudio();

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const [lines, setLines] = useState<OutputLine[]>([
    {
      id: "welcome-1",
      type: "system",
      text: "⚡ Yashwant Kariha — Interactive Engineering CLI [v2.4.0]",
    },
    {
      id: "welcome-2",
      type: "system",
      text: 'Type "help" to explore commands or press [ESC] to exit.',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto focus input when terminal opens
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isTerminalOpen]);

  // Scroll to bottom when lines change
  useEffect(() => {
    if (isTerminalOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, isTerminalOpen]);

  const availableCommands = [
    "help",
    "about",
    "skills",
    "projects",
    "contact",
    "hire",
    "cat",
    "lamp",
    "mode",
    "lofi",
    "zen",
    "matrix",
    "clear",
    "exit",
  ];

  const handleCommand = useCallback(
    (cmd: string) => {
      const cleanCmd = cmd.trim();
      const parts = cleanCmd.split(" ");
      const root = parts[0].toLowerCase();

      if (!cleanCmd) return;

      // Add to command history
      setHistory((prev) => [...prev, cleanCmd]);
      setHistoryIdx(-1);

      // Add user command line
      const cmdId = Date.now().toString();
      const newLines: OutputLine[] = [
        ...lines,
        { id: `cmd-${cmdId}`, type: "command", text: cleanCmd },
      ];

      switch (root) {
        case "help":
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            component: (
              <div style={{ padding: "4px 0" }}>
                <div style={{ color: "#dfba74", fontWeight: 700, marginBottom: "6px" }}>
                  AVAILABLE CLI COMMANDS:
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: "4px 12px",
                    color: "#e2e8f0",
                    fontSize: "12px",
                  }}
                >
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>about</span>
                  <span>Brief engineering bio & background</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>skills</span>
                  <span>Categorized technical competencies</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>projects</span>
                  <span>Selected high-impact engineering builds</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>contact</span>
                  <span>Reach out via Email, Phone, GitHub, LinkedIn</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>hire</span>
                  <span>Recruiter elevator pitch & quick brief</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>cat</span>
                  <span>Pet the studio cat & trigger 3D purr</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>lamp</span>
                  <span>Toggle the 3D desk lamp</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>mode</span>
                  <span>Toggle Day / Night atmosphere</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>lofi</span>
                  <span>Toggle procedural Lo-Fi vinyl music</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>zen</span>
                  <span>Toggle Zen focus mode</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>matrix</span>
                  <span>Digital falling green code animation</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>clear</span>
                  <span>Clear the terminal buffer</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>exit</span>
                  <span>Close developer terminal [ESC]</span>
                </div>
              </div>
            ),
          });
          break;

        case "about":
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            text: `Yashwant Kariha — Full-Stack Developer & AI Systems Engineer.
Based in India, building high-performance web applications, autonomous AI agent platforms, and scalable digital architectures with React 19, Next.js 16, TypeScript, Node.js, and PostgreSQL.`,
          });
          break;

        case "skills":
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            component: (
              <div style={{ padding: "4px 0", color: "#e2e8f0" }}>
                <div><strong style={{ color: "#38bdf8" }}>Frontend:</strong> React 19, Next.js 16, TypeScript, Three.js, R3F, Tailwind CSS</div>
                <div><strong style={{ color: "#38bdf8" }}>Backend & Cloud:</strong> Node.js, Express, PostgreSQL, Prisma, Supabase, Redis, REST/GraphQL</div>
                <div><strong style={{ color: "#38bdf8" }}>AI & Architecture:</strong> Autonomous AI Agents, RAG Pipelines, OpenAI API, LangChain, Web Audio API</div>
              </div>
            ),
          });
          break;

        case "projects":
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            component: (
              <div style={{ padding: "4px 0" }}>
                <div style={{ color: "#38bdf8", fontWeight: 700, marginBottom: "4px" }}>
                  FEATURED ENGINEERING BUILDS:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div>
                    <strong style={{ color: "#dfba74" }}>1. JobPilot AI:</strong> Multi-agent autonomous job discovery & tailored resume pipeline.
                  </div>
                  <div>
                    <strong style={{ color: "#dfba74" }}>2. BusinessFlow:</strong> Enterprise workflow automation engine with real-time telemetry.
                  </div>
                  <div>
                    <strong style={{ color: "#dfba74" }}>3. AI Automation Platform:</strong> Scalable agentic orchestration framework.
                  </div>
                </div>
              </div>
            ),
          });
          break;

        case "contact":
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            component: (
              <div style={{ padding: "4px 0", color: "#e2e8f0" }}>
                <div>📧 Email: <a href="mailto:yashwantkariha1@gmail.com" style={{ color: "#38bdf8" }}>yashwantkariha1@gmail.com</a></div>
                <div>📱 Phone: <a href="tel:+916375278279" style={{ color: "#38bdf8" }}>+91 6375278279</a></div>
                <div>🐙 GitHub: <a href="https://github.com/YASH1702" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8" }}>github.com/YASH1702</a></div>
                <div>💼 LinkedIn: <a href="https://linkedin.com/in/yashwant-kariha-740630207/" target="_blank" rel="noopener noreferrer" style={{ color: "#38bdf8" }}>linkedin.com/in/yashwant-kariha</a></div>
              </div>
            ),
          });
          break;

        case "hire":
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            component: (
              <div style={{ padding: "6px 10px", background: "rgba(56, 189, 248, 0.1)", borderLeft: "3px solid #38bdf8", borderRadius: "4px" }}>
                <div style={{ color: "#38bdf8", fontWeight: 700 }}>RECRUITER ELEVATOR BRIEF:</div>
                <div style={{ color: "#f1f5f9", marginTop: "4px", lineHeight: 1.5 }}>
                  &quot;Full-stack engineer with proven experience architecting modern web apps, distributed systems, and real-time AI agent workflows. Ready to make an immediate impact on engineering teams.&quot;
                </div>
              </div>
            ),
          });
          break;

        case "cat":
          playCatPurr();
          triggerHaptic("heavy");
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            text: "🐾 *Petting studio cat...* purr... ❤️ The cat curled closer and purred softly.",
          });
          break;

        case "lamp":
          toggleLamp();
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            text: "💡 Toggled studio desk lamp.",
          });
          break;

        case "mode":
        case "theme":
          toggleNightMode();
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            text: `🌙 Toggled studio atmosphere mode.`,
          });
          break;

        case "lofi":
        case "music":
          toggleLofi();
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            text: "🎵 Toggled procedural Lo-Fi Vinyl music.",
          });
          break;

        case "zen":
          toggleFocusMode();
          toggleTerminal(false);
          break;

        case "matrix":
          setIsMatrixActive(true);
          newLines.push({
            id: `out-${cmdId}`,
            type: "output",
            text: "🟢 Initializing digital stream...",
          });
          setTimeout(() => setIsMatrixActive(false), 4000);
          break;

        case "clear":
          setLines([]);
          return;

        case "exit":
        case "quit":
          toggleTerminal(false);
          return;

        default:
          newLines.push({
            id: `err-${cmdId}`,
            type: "error",
            text: `Command not found: "${root}". Type "help" to see available commands.`,
          });
          break;
      }

      setLines(newLines);
    },
    [
      lines,
      toggleLamp,
      toggleNightMode,
      toggleFocusMode,
      toggleLofi,
      toggleTerminal,
    ]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playTerminalKey();

    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = availableCommands.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      toggleTerminal(false);
    }
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          key="terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => toggleTerminal(false)}
        >
          <motion.div
            key="terminal-card"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{
              width: "100%",
              maxWidth: "760px",
              height: "480px",
              maxHeight: "85vh",
              background: isNightMode ? "rgba(10, 14, 23, 0.96)" : "rgba(15, 23, 42, 0.96)",
              borderRadius: "14px",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 24px rgba(56, 189, 248, 0.15)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              fontFamily: "var(--font-geist-mono, monospace)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
        {/* Title Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "rgba(0, 0, 0, 0.35)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => toggleTerminal(false)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#ef4444",
                border: "none",
                cursor: "pointer",
              }}
              title="Close Terminal [ESC]"
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#eab308",
              }}
            />
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                marginLeft: "8px",
                fontWeight: 600,
              }}
            >
              yashwant@studio: ~/portfolio-cli
            </span>
          </div>
          <div style={{ fontSize: "11px", color: "#64748b" }}>
            Press [ESC] to exit
          </div>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "13px",
            lineHeight: 1.6,
            color: "#e2e8f0",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => (
            <div key={line.id}>
              {line.type === "command" && (
                <div style={{ display: "flex", gap: "8px", color: "#38bdf8" }}>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>yashwant@studio:~$</span>
                  <span>{line.text}</span>
                </div>
              )}
              {line.type === "system" && (
                <div style={{ color: "#dfba74", fontWeight: 600 }}>{line.text}</div>
              )}
              {line.type === "error" && (
                <div style={{ color: "#f87171" }}>{line.text}</div>
              )}
              {line.type === "output" && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {line.component ? line.component : line.text}
                </div>
              )}
            </div>
          ))}

          {isMatrixActive && (
            <div
              style={{
                color: "#22c55e",
                fontFamily: "monospace",
                letterSpacing: "4px",
                opacity: 0.9,
                animation: "pulse 0.8s infinite",
              }}
            >
              01010100 01100101 01100011 01101000 00100000 01000001 01001001<br />
              01010011 01111001 01110011 01110100 01100101 01101101 01110011<br />
              01001110 01100101 01111000 01110100 00101110 01101010 01110011
            </div>
          )}

          {/* Active Input Line */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
            <span style={{ color: "#22c55e", fontWeight: 700 }}>yashwant@studio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#f8fafc",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "13px",
                caretColor: "#38bdf8",
              }}
            />
          </div>
          <div ref={bottomRef} />
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
