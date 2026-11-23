"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, Sparkles } from "lucide-react";
import { PortfolioProject } from "@/content/types";
import { MonitorMockup } from "@/components/sections/MonitorMockup";

interface CategoryFilterGridProps {
  projects: PortfolioProject[];
  categorySlug: string;
}

export function CategoryFilterGrid({ projects, categorySlug }: CategoryFilterGridProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <div className="space-y-14 select-none">
      {/* Filter Chips Bar */}
      {allTags.length > 2 && (
        <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-line/40">
          <span className="text-xs font-mono text-fg-muted mr-2">Filter by Tech:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                selectedTag === tag
                  ? "bg-accent text-accent-fg font-semibold"
                  : "border border-line bg-bg-elev/70 text-fg-muted hover:text-fg hover:border-accent/40"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Stacked Project Cards matching Screenshots 4, 5, 6 */}
      {filteredProjects.length > 0 ? (
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.slug}
                className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#1E1B1B] border border-line/60 p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300 hover:border-line"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Monitor Display Column (Cols 1-7 or 6-12) */}
                  <div
                    className={`flex justify-center items-center ${
                      isEven ? "lg:col-span-7" : "lg:col-span-7 lg:order-2"
                    }`}
                  >
                    <MonitorMockup
                      image={project.cover}
                      title={project.title}
                      subtitle={project.summary}
                    />
                  </div>

                  {/* Project Metadata Column (Cols 8-12 or 1-5) */}
                  <div
                    className={`space-y-5 ${
                      isEven ? "lg:col-span-5" : "lg:col-span-5 lg:order-1"
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                        {project.role}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-fg font-sans leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-fg-muted">
                        {project.tags.slice(0, 3).join(" · ")}
                      </p>
                    </div>

                    <p className="text-sm text-fg-muted leading-relaxed font-normal">
                      {project.summary}
                    </p>

                    {/* Disclaimer if medical / non-clinical */}
                    {project.disclaimer && (
                      <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-[11px] font-mono text-amber-300">
                        ⚠️ {project.disclaimer}
                      </div>
                    )}

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full border border-line bg-bg-elev/80 text-xs font-mono text-fg-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons matching Screenshots */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <Link
                        href="/#work"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line bg-bg-elev/80 hover:bg-bg-elev text-fg-muted hover:text-fg text-xs font-medium transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to the doors</span>
                      </Link>

                      <Link
                        href={`/work/${categorySlug}/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-xs hover:bg-white transition-all shadow-md active:scale-95"
                      >
                        <span>Case study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-line bg-bg text-xs font-mono text-fg-muted hover:text-accent transition-colors"
                        aria-label={`Open ${project.title} GitHub repo`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl border border-line bg-bg-elev/30 text-center space-y-3">
          <Sparkles className="w-6 h-6 text-accent mx-auto" />
          <p className="text-sm font-semibold text-fg">No projects match &quot;{selectedTag}&quot;</p>
          <button
            onClick={() => setSelectedTag("All")}
            className="text-xs font-mono text-accent hover:underline"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Bottom CTA Section matching Screenshot 7 */}
      <div className="pt-16 pb-8 border-t border-line/60">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-success uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>AVAILABLE FOR NEW WORK</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-fg font-sans leading-tight">
              Need something built?
            </h2>
            <h3 className="text-4xl sm:text-6xl font-bold tracking-tight text-fg-muted/60 font-sans leading-tight">
              Let&apos;s make it happen.
            </h3>
          </div>

          <p className="text-base text-fg-muted leading-relaxed font-normal max-w-2xl">
            I&apos;m available for freelance work and engineering roles: applied AI pipelines, agentic orchestration, and high-performance web products. Tell me what you need and I&apos;ll get back to you within a day.
          </p>

          <div className="pt-2">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A1818] font-bold text-sm tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Hire me</span>
              <span className="w-8 h-8 rounded-full bg-[#1A1818] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
