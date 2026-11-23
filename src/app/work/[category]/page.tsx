import type { Metadata } from "next";
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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const door = doors.find((d) => d.slug === category);
  if (!door) return {};

  return {
    title: `${door.title} — Surya D`,
    description: door.blurb,
    openGraph: {
      title: `${door.title} | Surya D Portfolio`,
      description: door.blurb,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(door.title)}&category=${encodeURIComponent(door.slug)}&description=${encodeURIComponent(door.blurb)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const door = doors.find((d) => d.slug === category);

  if (!door) {
    notFound();
  }

  const categoryProjects = projects.filter((p) => p.category === category);

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Category Header matching frames */}
      <div className="space-y-4 max-w-4xl pt-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.05]">
          {door.title}
        </h1>

        <p className="text-base sm:text-lg text-[#B5AFA6] leading-relaxed max-w-2xl font-normal">
          {door.blurb}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {door.disciplines.map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full border border-white/10 bg-[#161414] text-xs font-mono text-[#D8D4CE]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Projects Grid with Monitor Mockups */}
      <div className="space-y-8 pt-2">
        <CategoryFilterGrid projects={categoryProjects} categorySlug={category} />
      </div>

      {/* Floating 'Back to the doors' button at bottom-left matching frame-00-30.0.png */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#181616]/90 border border-white/15 text-white text-xs font-semibold backdrop-blur-md shadow-2xl hover:bg-white hover:text-black transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to the doors</span>
        </Link>
      </div>
    </div>
  );
}
