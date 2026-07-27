import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sagar-intelligence.com"),
  title: { default: "Sagar Intelligence — Intelligence for Critical Infrastructure", template: "%s — Sagar Intelligence" },
  description: "Evidence-governed artificial intelligence for infrastructure, capital projects, energy, water, lithium and high-consequence decisions.",
  keywords: ["decision intelligence", "infrastructure AI", "project intelligence", "capital projects", "AI agents"],
  robots: { index: true, follow: true },
  openGraph: { title: "Sagar Intelligence", description: "Building intelligence for humanity’s greatest infrastructure challenges.", type: "website", images: [{ url: "/og.png", width: 1731, height: 909, alt: "Sagar Intelligence — Intelligence for the physical world" }] },
  twitter: { card: "summary_large_image", title: "Sagar Intelligence", description: "Decision intelligence for the physical world.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#030509", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
