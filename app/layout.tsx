import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Yashwant Kariha — Full-Stack Developer",
  description:
    "Full-Stack Developer building digital products, AI systems & modern web experiences. React · Next.js · TypeScript · Node.js · PostgreSQL · AI.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "AI",
    "Portfolio",
    "Yashwant Kariha",
  ],
  authors: [{ name: "Yashwant Kariha" }],
  openGraph: {
    title: "Yashwant Kariha — Full-Stack Developer",
    description:
      "Building digital products, AI systems & modern web experiences.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f0ebe0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ height: "100%" }}
    >
      <body style={{ height: "100%", margin: 0, overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
