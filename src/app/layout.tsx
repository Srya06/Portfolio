import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@/content/site";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { BackgroundGrid } from "@/components/motion/BackgroundGrid";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Surya D",
    "AI/ML Engineer",
    "Full-Stack Developer",
    "Agentic Systems",
    "Machine Learning Portfolio",
    "Next.js Portfolio",
    "FastAPI",
    "Python",
    "Mysuru",
    "Bengaluru",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    siteName: `${site.name} Portfolio`,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: ["/api/og"],
    creator: "@Srya06",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-fg min-h-screen selection:bg-accent selection:text-accent-fg flex flex-col relative">
        <ThemeProvider>
          <SmoothScroll>
            <BackgroundGrid />
            <CustomCursor />
            <Nav />
            <main id="main-content" className="flex-1 focus:outline-none relative z-10" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
