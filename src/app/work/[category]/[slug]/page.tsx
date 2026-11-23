import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Clock, Code2, Cpu, Github, ShieldAlert } from "lucide-react";
import { doors } from "@/content/doors";
import { projects } from "@/content/projects";

interface CaseStudyPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.category === category);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study | Surya D`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | Surya D`,
      description: project.summary,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}&category=${encodeURIComponent(project.role)}&description=${encodeURIComponent(project.summary)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { category, slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug && p.category === category);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const door = doors.find((d) => d.slug === category);

  // Determine next project for seamless sequential review
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between border-b border-line pb-6 text-xs font-mono text-fg-muted">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/work/${category}`} className="hover:text-accent transition-colors">
            {door?.title || "Work"}
          </Link>
          <span>/</span>
          <span className="text-accent">{project.title}</span>
        </div>

        <Link
          href={`/work/${category}`}
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Category</span>
        </Link>
      </nav>

      {/* Case Study Header & Hero */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full border border-line bg-bg-elev text-xs font-mono text-accent uppercase">
            {project.status}
          </span>
          <span className="text-xs font-mono text-fg-muted">Year: {project.year}</span>
          <span className="text-xs font-mono text-fg-muted">·</span>
          <span className="text-xs font-mono text-fg-muted">{project.role}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-fg leading-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-fg-muted leading-relaxed font-normal">
          {project.summary}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-fg font-semibold text-sm transition-transform hover:scale-105 shadow-lg shadow-cyan-500/10"
          >
            <Github className="w-4 h-4" />
            <span>Inspect GitHub Repository</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={`mailto:sryaraj06@gmail.com?subject=Inquiry regarding ${project.title}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line bg-bg-elev text-fg hover:border-accent hover:text-accent font-medium text-sm transition-colors"
          >
            <span>Discuss Architecture</span>
          </a>
        </div>
      </header>

      {/* Cover Visual Artwork */}
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-line bg-bg-elev shadow-2xl">
        <Image
          src={project.cover}
          alt={`${project.title} architectural overview and interface diagram`}
          fill
          priority
          unoptimized={project.cover.endsWith(".svg")}
          className="object-cover"
        />
      </div>

      {/* Medical/Research Disclaimer Notice if Applicable */}
      {project.disclaimer && (
        <section aria-label="Disclaimer" className="p-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
              Research &amp; Educational Prototype Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              {project.disclaimer}
            </p>
          </div>
        </section>
      )}

      {/* Deep Dive Grid: Problem & Context */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-line pt-12">
        <div className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>01 // Problem Statement</span>
          </h2>
          <h3 className="text-2xl font-bold text-fg">The Engineering Challenge</h3>
          <p className="text-sm text-fg-muted leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>02 // Application Context</span>
          </h2>
          <h3 className="text-2xl font-bold text-fg">Domain &amp; User Need</h3>
          <p className="text-sm text-fg-muted leading-relaxed">
            {project.context}
          </p>
        </div>
      </section>

      {/* Architecture & Implementation vs Roadmap */}
      <section className="space-y-8 border-t border-line pt-12">
        <div className="space-y-2">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider">
            03 // System Blueprint &amp; Data Pipeline
          </h2>
          <h3 className="text-3xl font-bold text-fg">Technical Architecture</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.architecture.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-line bg-bg-elev/50 space-y-2">
              <span className="text-xs font-mono text-accent">Stage 0{idx + 1}</span>
              <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Implemented vs Planned Split (Integrity Guardrail) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="p-6 rounded-2xl border border-line bg-bg-elev/40 space-y-4">
            <h4 className="text-xs font-mono text-success uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Implemented Functionality</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-fg-muted">
              {project.implementedFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-success mt-0.5">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-line bg-bg-elev/40 space-y-4">
            <h4 className="text-xs font-mono text-accent uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Planned Architectural Roadmap</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-fg-muted">
              {project.plannedRoadmap.map((roadmap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>{roadmap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technology Stack & Evaluation Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-line pt-12">
        <div className="space-y-4">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider">
            04 // Technology Stack
          </h2>
          <h3 className="text-xl font-bold text-fg">Libraries &amp; Frameworks</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg border border-line bg-bg-elev text-xs font-mono text-fg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-mono text-accent uppercase tracking-wider">
            05 // Evaluation &amp; Trade-offs
          </h2>
          <h3 className="text-xl font-bold text-fg">Validation &amp; Limitations</h3>
          <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
            <strong className="text-fg font-medium">Evaluation: </strong>
            {project.evaluation}
          </p>
          <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
            <strong className="text-fg font-medium">Limitations: </strong>
            {project.limitations}
          </p>
        </div>
      </section>

      {/* Sequential Next Project Transition */}
      <footer className="border-t border-line pt-12 space-y-16">
        <Link
          href={`/work/${nextProject.category}/${nextProject.slug}`}
          className="group block p-8 rounded-3xl border border-line bg-bg-elev/60 hover:border-accent/80 transition-all space-y-3"
        >
          <div className="flex items-center justify-between text-xs font-mono text-fg-muted">
            <span>NEXT PORTFOLIO CASE STUDY</span>
            <span className="text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Read Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
            {nextProject.title}
          </h3>

          <p className="text-xs sm:text-sm text-fg-muted max-w-2xl line-clamp-2">
            {nextProject.summary}
          </p>
        </Link>

        {/* Bottom CTA Section matching Screenshot 7 */}
        <div className="pt-12 border-t border-line/60">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-success uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>AVAILABLE FOR NEW WORK</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-fg font-sans leading-tight">
                Need something built?
              </h2>
              <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-fg-muted/60 font-sans leading-tight">
                Let&apos;s make it happen.
              </h3>
            </div>

            <p className="text-base text-fg-muted leading-relaxed font-normal max-w-2xl">
              I&apos;m available for engineering roles and production AI/ML implementations. Tell me what you need and I&apos;ll get back to you within a day.
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
      </footer>
    </article>
  );
}
