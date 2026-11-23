"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { Clock } from "@/components/layout/Clock";

const disciplines = [
  { href: "/work/full-stack-products", label: "Full-Stack Development" },
  { href: "/work/agentic-systems", label: "Agentic Systems" },
  { href: "/work/ai-ml", label: "AI/ML Engineering" },
  { href: "/work/computer-vision", label: "Computer Vision" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#0F0D0D] pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Status Grid matching frame-01-50.0.png */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pb-16 border-b border-white/10 text-xs">
          {/* Col 1: WORK */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-white/90 uppercase tracking-widest font-bold">
              WORK
            </p>
            <ul className="space-y-2.5">
              {disciplines.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#9E988F] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: NAVIGATE */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-white/90 uppercase tracking-widest font-bold">
              NAVIGATE
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-[#9E988F] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#story" className="text-[#9E988F] hover:text-white transition-colors">
                  My story
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[#9E988F] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: STATUS */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-white/90 uppercase tracking-widest font-bold">
              STATUS
            </p>
            <div className="space-y-2.5 text-[#9E988F]">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span>Available for work</span>
              </div>
              <div>Remote-first, worldwide</div>
              <div className="pt-1">
                <Clock />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching frame-01-50.0.png */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-[#7E7870]">
          <div>
            © 2026 <span>{site.name}</span>. Designed and built with Next.js.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/#contact" className="hover:text-white transition-colors">
              Privacy &amp; credits
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Back to top ↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
