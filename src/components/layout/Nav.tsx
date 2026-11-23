"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import { site } from "@/content/site";
import { doors } from "@/content/doors";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Clock } from "@/components/layout/Clock";
import { Menu } from "@/components/layout/Menu";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollDirection, isAtTop } = useScrollDirection();

  // Hide nav on scroll down, show on scroll up
  const isHidden = scrollDirection === "down" && !isAtTop && !menuOpen;

  return (
    <>
      {/* Skip to main content link for a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-accent-fg focus:font-medium focus:text-sm shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${isAtTop ? "bg-bg/40 backdrop-blur-sm" : "bg-bg/85 backdrop-blur-md border-b border-line/60"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          {/* Brand Identity / Home */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1"
            aria-label={`${site.name} Portfolio Home`}
          >
            <span className="w-8 h-8 rounded-lg bg-bg-elev border border-line flex items-center justify-center font-mono text-xs font-bold text-accent group-hover:border-accent transition-colors shadow-xs">
              S
            </span>
            <span className="font-bold text-sm tracking-tight text-fg group-hover:text-accent transition-colors hidden sm:inline-block">
              {site.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-xs font-medium text-fg-muted">
            <Link href="/" className="hover:text-fg transition-colors">
              Home
            </Link>
            {doors.map((door) => (
              <Link
                key={door.slug}
                href={`/work/${door.slug}`}
                className="hover:text-fg transition-colors"
              >
                {door.title}
              </Link>
            ))}
            <Link href="/#story" className="hover:text-fg transition-colors">
              My story
            </Link>
            <Link href="/#contact" className="hover:text-fg transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right: Clock & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Clock />
            </div>

            {/* Mobile / Tablet Menu Open Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-bg-elev/90 text-xs font-mono text-fg hover:text-accent hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon className="w-4 h-4" />
              <span className="font-medium">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Menu Component for Mobile */}
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
