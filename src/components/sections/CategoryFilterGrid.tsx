"use client";

import { useState } from "react";
import { PortfolioProject } from "@/content/types";
import { ImagesScrollingAnimation } from "@/components/ui/images-scrolling-animation";

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
    <div className="space-y-8 select-none">
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

      {/* Sticky Stacking Project Cards from 21st.dev ImagesScrollingAnimation */}
      {filteredProjects.length > 0 ? (
        <ImagesScrollingAnimation projects={filteredProjects} />
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
