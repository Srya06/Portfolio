"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Sparkles } from "lucide-react";
import { PortfolioProject } from "@/content/types";

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
    <div className="space-y-8">
      {/* Filter Chips Bar */}
      {allTags.length > 2 && (
        <div className="flex items-center gap-2 flex-wrap pb-2">
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

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="group p-6 rounded-3xl border border-line bg-bg-elev/60 hover:border-accent/60 transition-all duration-300 space-y-5 flex flex-col justify-between shadow-lg backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-accent uppercase tracking-wider">
                      {project.role}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border border-line text-accent uppercase bg-bg">
                    {project.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {project.summary}
                </p>

                {project.disclaimer && (
                  <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-[11px] font-mono text-amber-300">
                    ⚠️ {project.disclaimer}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md border border-line bg-bg text-[10px] font-mono text-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-line/60 flex items-center justify-between gap-4">
                <Link
                  href={`/work/${categorySlug}/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-xs font-mono transition-transform hover:scale-105"
                >
                  <span>Case Study & Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-fg-muted hover:text-fg transition-colors"
                  aria-label={`Open ${project.title} GitHub repository`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Source</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-line bg-bg-elev/30 text-center space-y-3">
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
    </div>
  );
}
