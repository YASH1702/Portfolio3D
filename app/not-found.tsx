import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0ebe0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-geist-sans, sans-serif)",
        color: "#1a1a18",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "10px",
          letterSpacing: "0.24em",
          color: "#8b7355",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: "12px",
        }}
      >
        Page Not Found
      </h1>
      <p style={{ color: "#6a6858", marginBottom: "36px", fontSize: "15px" }}>
        This room doesn&apos;t exist in the studio.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#1a1a18",
          textDecoration: "none",
          padding: "12px 24px",
          border: "1px solid #1a1a18",
        }}
      >
        ← Back to Studio
      </Link>
    </div>
  );
}
