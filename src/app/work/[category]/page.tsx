import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { doors } from "@/content/doors";
import { projects } from "@/content/projects";
import { CategoryFilterGrid } from "@/components/sections/CategoryFilterGrid";

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

      {/* Interactive Tag Filter & Projects Grid */}
      <div className="space-y-6 pt-4">
        <CategoryFilterGrid projects={categoryProjects} categorySlug={category} />
      </div>
    </div>
  );
}
