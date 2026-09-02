import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sagar-intelligence.com"),
  title: { default: "Sagar Infrastructure Signal — Evidence before readiness", template: "%s — Sagar Labs" },
  description: "Sagar Labs turns public infrastructure signals into evidence boundaries, decision gates and the next document worth requesting.",
  keywords: ["decision intelligence", "infrastructure decision intelligence", "AI infrastructure", "infrastructure due diligence", "Power-to-Compute", "site decision intelligence", "inteligencia de decisiones", "diligencia de infraestructura"],
  robots: { index: true, follow: true },
  openGraph: { title: "Sagar Infrastructure Signal — Evidence before readiness", description: "Public signals are not the same as readiness. See what the evidence supports, what it cannot support and what should happen next.", type: "website", images: [{ url: "/og.png", width: 1731, height: 909, alt: "Sagar Infrastructure Signal — Evidence before readiness" }] },
  twitter: { card: "summary_large_image", title: "Sagar Infrastructure Signal — Evidence before readiness", description: "Public signals are not the same as readiness.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#030509", colorScheme: "dark light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
