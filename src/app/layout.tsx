import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@/content/site";

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
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-bg text-fg min-h-screen selection:bg-accent selection:text-accent-fg">
        {children}
      </body>
    </html>
  );
}
