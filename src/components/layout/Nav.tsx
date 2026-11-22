"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Menu as MenuIcon } from "lucide-react";
import { site } from "@/content/site";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Clock } from "@/components/layout/Clock";
import { AvailabilityPill } from "@/components/layout/AvailabilityPill";
import { RoleRotator } from "@/components/layout/RoleRotator";
import { Menu } from "@/components/layout/Menu";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { theme, toggleTheme } = useTheme();

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
        } ${isAtTop ? "bg-bg/40 backdrop-blur-sm" : "bg-bg/80 backdrop-blur-md border-b border-line/60"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1"
            aria-label="Surya D Portfolio Home"
          >
            <span className="w-7 h-7 rounded-md bg-bg-elev border border-line flex items-center justify-center font-mono text-xs font-bold text-accent group-hover:border-accent transition-colors">
              S
            </span>
            <span className="font-semibold text-sm tracking-tight text-fg group-hover:text-accent transition-colors">
              {site.name}
            </span>
          </Link>

          {/* Center: Dynamic Role Rotator (hidden on small screens) */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-sm">
            <RoleRotator />
          </div>

          {/* Right: Actions, Clock, Theme, Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <AvailabilityPill />
            </div>

            <div className="hidden sm:block">
              <Clock />
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-line bg-bg-elev/70 text-fg-muted hover:text-fg hover:border-line/80 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-accent" />
              ) : (
                <Moon className="w-4 h-4 text-fg" />
              )}
            </button>

            {/* Menu Open Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-bg-elev/90 text-xs font-mono text-fg hover:text-accent hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Open full-screen navigation menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon className="w-3.5 h-3.5" />
              <span className="font-medium">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Menu Component */}
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
