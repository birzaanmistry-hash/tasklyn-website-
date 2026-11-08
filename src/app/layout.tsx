import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationLd, SITE, websiteLd } from "@/lib/seo";
import "./globals.css";

// Typeface: San Francisco on Apple devices via the system stack (SF Pro may not
// be self-hosted under Apple's licence), Inter everywhere else. Inter is
// downloaded at build time and served from our own origin by next/font: no font
// CDN request, a metric-matched fallback (adjustFontFallback) so swapping in
// causes no layout shift. Variable font: all weights plus the optical-size axis
// in one file, so display sizes get Inter Display's tighter forms.
// The stack itself lives in globals.css (--font-sans).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
  adjustFontFallback: true,
});

const title = "Tasklyn | Enterprise AI Engineering & Products, India";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | Tasklyn",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Zoom stays available: locking it is an accessibility failure.
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
