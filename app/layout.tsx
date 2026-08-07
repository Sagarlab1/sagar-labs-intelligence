import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sagar-intelligence.com"),
  title: { default: "Sagar Labs Beta — Decision Intelligence for Humanity", template: "%s — Sagar Labs Beta" },
  description: "Sagar Labs private beta: transform complex infrastructure uncertainty into evidence-backed strategic decisions.",
  keywords: ["decision intelligence", "infrastructure decision intelligence", "AI infrastructure", "infrastructure due diligence", "Power-to-Compute", "site decision intelligence", "inteligencia de decisiones", "diligencia de infraestructura"],
  robots: { index: true, follow: true },
  openGraph: { title: "Sagar Labs Beta — Decision Intelligence for Humanity", description: "Every great decision begins with evidence.", type: "website", images: [{ url: "/og.png", width: 1731, height: 909, alt: "Sagar Labs Beta — Decision Intelligence for Humanity" }] },
  twitter: { card: "summary_large_image", title: "Sagar Labs Beta — Decision Intelligence for Humanity", description: "Every great decision begins with evidence.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#030509", colorScheme: "dark light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
