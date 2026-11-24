/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { MonitorMockup } from "@/components/sections/MonitorMockup";

export interface ScrollingProjectItem {
  title: string;
  src?: string;
  cover?: string;
  slug?: string;
  category?: string;
  role?: string;
  summary?: string;
  tags?: string[];
  repoUrl?: string;
  repo?: string;
  liveUrl?: string;
  disclaimer?: string;
  stack?: string[];
}

const defaultProjects: ScrollingProjectItem[] = [
  {
    title: "Project 1",
    src: "https://cdn.21st.dev/assets/mirror/6e/6ee7e225e62a880a4bb73ba9adcb4995e65b1d9c3e05d4facc9bb99c2f73bd97.jpg",
  },
  {
    title: "Project 2",
    src: "https://cdn.21st.dev/assets/mirror/44/4419aecb9623ba4f4412fc979676f380c9e584cb96b0e89c4705b63c597474df.jpg",
  },
  {
    title: "Project 3",
    src: "https://cdn.21st.dev/assets/mirror/12/12f8c3902d4e6935ce10be85aa1a2dcb21a9acb6e162c363c33f92aa2f3f8d34.jpg",
  },
  {
    title: "Project 4",
    src: "https://cdn.21st.dev/assets/mirror/03/031548ce19b4429a024c3c4725e44e5ba5c355bcae331a46db54b6409a91c918.jpg",
  },
  {
    title: "Project 5",
    src: "https://cdn.21st.dev/assets/mirror/f1/f1944c255c497719164cb3c7f073fcf223a94f83677b04ab76c16dbfb6d9f094.jpg",
  },
];

export interface StickyCardProps {
  i: number;
  title: string;
  src?: string;
  cover?: string;
  video?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  slug?: string;
  category?: string;
  role?: string;
  summary?: string;
  tags?: string[];
  repoUrl?: string;
  repo?: string;
  liveUrl?: string;
  disclaimer?: string;
  stack?: string[];
  isExpandedMode?: boolean;
}

const StickyCard_001 = ({
  i,
  title,
  src,
  cover,
  video,
  progress,
  range,
  targetScale,
  slug,
  category,
  role,
  summary,
  tags = [],
  repoUrl,
  repo,
  liveUrl,
  disclaimer,
  isExpandedMode = false,
}: StickyCardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  const imageSrc = cover || src || "/placeholder.svg";
  const repositoryUrl = repoUrl || repo;

  // Rich portfolio project card mode
  if (isExpandedMode || summary || category) {
    return (
      <div
        ref={container}
        className="sticky top-20 sm:top-24 flex items-center justify-center px-2 sm:px-4 lg:px-6 w-full max-w-6xl mx-auto my-4 sm:my-6"
      >
        <motion.div
          style={{
            scale,
            top: `calc(8vh + ${i * 24}px)`,
          }}
          className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] bg-[#161414] border border-[#262222] p-6 sm:p-10 lg:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden transition-colors duration-300 hover:border-white/20 origin-top"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (Cols 1-5): Project Metadata */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  {category ? category.toUpperCase().replace(/-/g, " ") : "PROJECT"}
                  {role ? ` • ${role.toUpperCase()}` : ""}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
                  {title}
                </h2>
                {tags.length > 0 && (
                  <p className="text-xs font-mono text-fg-muted">
                    {tags.slice(0, 3).join(" · ")}
                  </p>
                )}
              </div>

              {summary && (
                <p className="text-sm text-[#C4BFB6] leading-relaxed font-normal">
                  {summary}
                </p>
              )}

              {/* Responsible non-clinical disclaimer */}
              {disclaimer && (
                <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-[11px] font-mono text-amber-300">
                  ⚠️ {disclaimer}
                </div>
              )}

              {/* Tech stack badges */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full border border-white/10 bg-[#1E1B1B] text-[11px] font-mono text-[#A8A196]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {slug && category ? (
                  <Link
                    href={`/work/${category}/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-xs shadow-md hover:bg-white transition-all active:scale-95"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                ) : null}

                {repositoryUrl && (
                  <a
                    href={repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-[#1E1B1B] text-xs font-medium text-white hover:border-white/30 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}

                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-[#1E1B1B] text-xs font-medium text-white hover:border-white/30 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Visit Live Site</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column (Cols 6-12): Apple Studio Display Monitor Mockup */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <MonitorMockup
                image={imageSrc}
                video={video}
                title={title}
                subtitle={summary}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Minimal 21st.dev raw image card mode
  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 15 + 200}px)`,
        }}
        className="rounded-2xl sm:rounded-3xl lg:rounded-4xl relative -top-1/4 flex origin-top flex-col overflow-hidden
                   h-[200px] w-[280px] 
                   sm:h-[240px] sm:w-[360px] 
                   md:h-[280px] md:w-[420px] 
                   lg:h-[300px] lg:w-[500px]"
      >
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export interface ImagesScrollingAnimationProps {
  projects?: ScrollingProjectItem[];
  className?: string;
}

const ImagesScrollingAnimation = ({
  projects: customProjects,
  className = "",
}: ImagesScrollingAnimationProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const items = customProjects && customProjects.length > 0 ? customProjects : defaultProjects;

  const isResizeObserverAvailable =
    typeof window !== "undefined" && typeof window.ResizeObserver !== "undefined";

  const content = (
    <main
      ref={container}
      className={`relative flex w-full flex-col items-center justify-center 
                 pb-[35vh] sm:pb-[45vh] pt-[2vh] sm:pt-[4vh] ${className}`}
    >
      {items.map((project, i) => {
        const targetScale = Math.max(0.78, 1 - (items.length - i - 1) * 0.05);
        const rangeStep = items.length > 1 ? 0.75 / items.length : 0.5;
        const start = i * rangeStep;

        return (
          <StickyCard_001
            key={`p_${project.slug || i}`}
            i={i}
            {...project}
            src={project.src || project.cover || ""}
            progress={scrollYProgress}
            range={[start, 1]}
            targetScale={targetScale}
            isExpandedMode={Boolean(project.summary || project.category)}
          />
        );
      })}
    </main>
  );

  if (!isResizeObserverAvailable) {
    return content;
  }

  return (
    <ReactLenis root={false}>
      {content}
    </ReactLenis>
  );
};

export { ImagesScrollingAnimation, StickyCard_001 };
