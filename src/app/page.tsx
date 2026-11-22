import { site } from "@/content/site";
import { doors } from "@/content/doors";
import { projects } from "@/content/projects";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 text-center">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-bg-elev text-xs font-mono text-accent">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Chunk 0 Initialized · {site.role}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-fg">
          {site.name}
        </h1>
        <p className="text-lg md:text-xl text-fg-muted">
          {site.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {doors.map((door) => (
            <span
              key={door.slug}
              className="px-3 py-1.5 rounded-md border border-line bg-bg-elev text-xs text-fg-muted font-medium"
            >
              {door.title}
            </span>
          ))}
        </div>
        <p className="text-xs text-fg-muted font-mono pt-8">
          {projects.length} curated projects loaded · Asia/Kolkata timezone
        </p>
      </div>
    </main>
  );
}
