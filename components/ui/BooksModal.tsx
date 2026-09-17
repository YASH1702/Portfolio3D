"use client";

import { useStudio } from "@/context/StudioContext";

interface Book {
  title: string;
  author: string;
  category: string;
  color: string;
  takeaway: string;
}

const BOOKS: Book[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Distributed Systems & Scalability",
    color: "#3b82f6",
    takeaway:
      "Deep understanding of replication logs, consensus algorithms, partition tolerance, and building resilient high-throughput data pipelines.",
  },
  {
    title: "Building LLM & Autonomous AI Agent Systems",
    author: "Modern AI Engineering",
    category: "AI & Multi-Agent Architecture",
    color: "#10b981",
    takeaway:
      "Architecting stateful agent graphs, hybrid vector search (RAG), tool execution loops, and strict runtime evaluation guardrails.",
  },
  {
    title: "Clean Architecture & Domain-Driven Design",
    author: "Robert C. Martin & Eric Evans",
    category: "Software Architecture",
    color: "#ef4444",
    takeaway:
      "Enforcing strict dependency inversion, domain isolation, and modular abstractions that withstand long-term product evolution.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "Engineering Craftsmanship",
    color: "#f59e0b",
    takeaway:
      "Orthogonality, relentless DRY refactoring, tracer bullet prototypes, and taking pride in resilient, readable codebase craft.",
  },
  {
    title: "Refactoring UI",
    author: "Steve Schoger & Adam Wathan",
    category: "Visual Design & UX Hierarchy",
    color: "#8b5cf6",
    takeaway:
      "Systematic spacing scales, deliberate typographic hierarchy, elevation depth, and modern component composition.",
  },
];

export default function BooksModal() {
  const { isBooksModalOpen, toggleBooksModal, isNightMode } = useStudio();

  if (!isBooksModalOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={() => toggleBooksModal(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          maxHeight: "85vh",
          background: isNightMode ? "rgba(14, 18, 28, 0.96)" : "rgba(255, 255, 255, 0.96)",
          borderRadius: "20px",
          border: isNightMode
            ? "1px solid rgba(224, 184, 116, 0.35)"
            : "1px solid rgba(210, 180, 140, 0.5)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 16px 24px",
            borderBottom: isNightMode
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: isNightMode ? "#dfba74" : "#8a5e28",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              📚 Engineering Bookshelf
            </div>
            <h3
              style={{
                fontFamily: "var(--font-geist-sans, sans-serif)",
                fontSize: "18px",
                fontWeight: 800,
                color: isNightMode ? "#ffffff" : "#0d0c09",
                margin: 0,
              }}
            >
              Core Reading &amp; Architectural Influences
            </h3>
          </div>
          <button
            onClick={() => toggleBooksModal(false)}
            style={{
              background: isNightMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
              border: "none",
              color: isNightMode ? "#ffffff" : "#1a1a1a",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 600,
            }}
            title="Close [ESC]"
          >
            ✕
          </button>
        </div>

        {/* Book List */}
        <div
          style={{
            padding: "20px 24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {BOOKS.map((book) => (
            <div
              key={book.title}
              style={{
                display: "flex",
                gap: "16px",
                padding: "14px 16px",
                borderRadius: "12px",
                background: isNightMode
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.02)",
                border: isNightMode
                  ? "1px solid rgba(255, 255, 255, 0.06)"
                  : "1px solid rgba(0, 0, 0, 0.06)",
                borderLeft: `4px solid ${book.color}`,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-sans, sans-serif)",
                      fontSize: "14.5px",
                      fontWeight: 700,
                      color: isNightMode ? "#ffffff" : "#11110e",
                    }}
                  >
                    {book.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono, monospace)",
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "6px",
                      background: isNightMode
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.06)",
                      color: isNightMode ? "#d4c8b6" : "#4a4238",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {book.category}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: isNightMode ? "#dfba74" : "#8a5e28",
                    marginBottom: "8px",
                  }}
                >
                  by {book.author}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans, sans-serif)",
                    fontSize: "12.5px",
                    color: isNightMode ? "#cbd5e1" : "#334155",
                    lineHeight: 1.55,
                  }}
                >
                  {book.takeaway}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
