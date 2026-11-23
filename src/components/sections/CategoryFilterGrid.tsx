"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { PortfolioProject } from "@/content/types";
import { MonitorMockup } from "@/components/sections/MonitorMockup";

interface CategoryFilterGridProps {
  projects: PortfolioProject[];
  categorySlug: string;
}

export function CategoryFilterGrid({ projects }: CategoryFilterGridProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <div className="space-y-12 select-none">
      {/* Filter Chips Bar */}
      {allTags.length > 2 && (
        <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-line/40">
          <span className="text-xs font-mono text-fg-muted mr-2">Filter by Tech:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${selectedTag === tag
                ? "bg-accent text-accent-fg font-semibold"
                : "border border-line bg-bg-elev/70 text-fg-muted hover:text-fg hover:border-accent/40"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Stacked Project Cards matching frames (frame-00-30.0.png, frame-00-35.0.png) */}
      {filteredProjects.length > 0 ? (
        <div className="space-y-12">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="rounded-[2.5rem] bg-[#161414] border border-[#262222] p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300 hover:border-white/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column (Cols 1-5): Project Metadata */}
                <div className="lg:col-span-5 space-y-5 text-left">
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      {project.category.toUpperCase().replace("-", " ")} • {project.role.toUpperCase()}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-xs font-mono text-fg-muted">
                      {project.tags.slice(0, 3).join(" · ")}
                    </p>
                  </div>

                  <p className="text-sm text-[#C4BFB6] leading-relaxed font-normal">
                    {project.summary}
                  </p>

                  {/* Disclaimer if medical / non-clinical */}
                  {project.disclaimer && (
                    <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-[11px] font-mono text-amber-300">
                      ⚠️ {project.disclaimer}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full border border-white/10 bg-[#1E1B1B] text-[11px] font-mono text-[#A8A196]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions / Links matching frames */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/work/${project.category}/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-xs shadow-md hover:bg-white transition-all active:scale-95"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-[#1E1B1B] text-xs font-medium text-white hover:border-white/30 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
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

                {/* Right Column (Cols 6-12): Apple Studio Display Monitor */}
                <div className="lg:col-span-7 flex justify-center items-center">
                  <MonitorMockup
                    image={project.cover}
                    title={project.title}
                    subtitle={project.summary}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl border border-line bg-bg-elev/40">
          <p className="text-sm font-mono text-fg-muted">
            No projects found matching the selected tag.
          </p>
        </div>
      )}
    </div>
  );
}
