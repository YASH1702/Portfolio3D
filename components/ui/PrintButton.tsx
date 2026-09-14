"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      style={{
        fontFamily: "var(--font-geist-mono, monospace)",
        fontSize: "11px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "8px 16px",
        background: "#18180f",
        color: "#f8fafc",
        border: "none",
        borderRadius: "2px",
        cursor: "pointer",
        transition: "opacity 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.opacity = "1";
      }}
    >
      Print / Save as PDF
    </button>
  );
}
