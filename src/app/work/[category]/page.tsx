import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Sparkles } from "lucide-react";
import { doors } from "@/content/doors";
import { projects } from "@/content/projects";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return doors.map((d) => ({
    category: d.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const door = doors.find((d) => d.slug === category);

  if (!door) {
    notFound();
  }

  // Filter projects belonging to this category
  const categoryProjects = projects.filter((p) => p.category === category);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Breadcrumb & Return Link */}
      <div className="flex items-center justify-between border-b border-line pb-6">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono text-fg-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO DOORS WALL</span>
        </Link>
        <span className="text-xs font-mono text-accent uppercase">
          DISCIPLINE: {door.accent}
        </span>
      </div>

      {/* Category Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-bg-elev text-xs font-mono text-fg-muted">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: door.accentColor }}
          />
          <span>CATEGORY PORTAL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-fg">
          {door.title}
        </h1>

        <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
          {door.blurb}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {door.disciplines.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-md border border-line bg-bg-elev text-xs font-mono text-fg-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Projects Grid for this Category */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-line/60 pb-3">
          <span className="text-xs font-mono text-fg-muted">
            AVAILABLE WORK IN THIS DOMAIN
          </span>
          <span className="text-xs font-mono text-accent">
            {categoryProjects.length} Repositories
          </span>
        </div>

        {categoryProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryProjects.map((project) => (
              <div
                key={project.slug}
                className="p-6 rounded-2xl border border-line bg-bg-elev/60 hover:border-accent/60 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-fg">
                      {project.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-line text-accent uppercase">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                    {project.summary}
                  </p>

                  {project.disclaimer && (
                    <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-[11px] font-mono text-amber-300">
                      ⚠️ {project.disclaimer}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded border border-line bg-bg text-[10px] font-mono text-fg-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-fg-muted">
                    Year: {project.year}
                  </span>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-line bg-bg-elev/30 text-center space-y-3">
            <Sparkles className="w-6 h-6 text-accent mx-auto" />
            <p className="text-sm font-semibold text-fg">Active Engineering Labs Exploration</p>
            <p className="text-xs text-fg-muted max-w-md mx-auto">
              Additional experiments and lab code from this domain are documented in the main GitHub repository overview.
            </p>
            <div className="pt-2">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline"
              >
                <span>Return to Doors Wall</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
