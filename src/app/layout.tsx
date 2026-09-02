import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Self-hosted through next/font, so there is no render-blocking request to a
// font CDN and no layout shift when the display face arrives.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

const title = "Tasklyn / AI systems that run the work inside your business";
const description =
  "Tasklyn builds AI-native systems that understand, decide and execute the work inside your business. One Core, built around your workflows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tasklyn.in"),
  title: {
    default: title,
    template: "%s / Tasklyn",
  },
  description,
  applicationName: "Tasklyn",
  authors: [{ name: "Tasklyn" }],
  keywords: [
    "AI systems",
    "AI agents",
    "business automation",
    "workflow intelligence",
    "AI operations",
    "Mumbai",
  ],
  openGraph: {
    title,
    description,
    url: "https://tasklyn.in",
    siteName: "Tasklyn",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Zoom stays available. Locking it is an accessibility failure, and this page
  // has small technical type in places.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
