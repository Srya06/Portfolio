import { ArrowRight, Code2 } from "lucide-react";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";
import { Preloader } from "@/components/motion/Preloader";
import { Hero } from "@/components/sections/Hero";
import { DoorsWall } from "@/components/sections/DoorsWall";

export default function HomePage() {
  return (
    <>
      {/* Session-cached 0->100% Preloader */}
      <Preloader />

      {/* Hero Section with 3D Ability Card & Role Marquee */}
      <Hero />

      {/* Interactive Horizontal Doors Wall (Chunk 3) */}
      <DoorsWall />

      <div className="pt-16 space-y-32">
        {/* Capabilities Section Shell */}
        <section id="capabilities" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="space-y-2 border-b border-line pb-6">
            <p className="font-mono text-xs text-accent uppercase tracking-wider">02 / Technical Skills</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg">
              Demonstrated Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <div key={group.name} className="p-6 rounded-xl border border-line bg-bg-elev/40 space-y-4">
                <h3 className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{group.name}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md border border-line bg-bg text-xs font-mono text-fg-muted hover:text-fg hover:border-line/80 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Story Timeline Placeholder (Chunk 5 Target) */}
        <section id="story" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="space-y-2 border-b border-line pb-6">
            <p className="font-mono text-xs text-accent uppercase tracking-wider">03 / Trajectory</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg">
              Background & Education
            </h2>
            <p className="text-sm text-fg-muted max-w-xl">
              Pinned scroll timeline detailing computer science engineering degree at MIT Mysore and applied AI initiatives.
            </p>
          </div>
        </section>

        {/* Contact Section Placeholder (Chunk 6 Target) */}
        <section id="contact" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
          <div className="p-8 md:p-12 rounded-3xl border border-line bg-bg-elev/50 text-center space-y-6">
            <span className="text-xs font-mono text-accent uppercase tracking-wider">04 / Collaboration</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-fg">
              Interested in applied AI or full-stack collaboration?
            </h2>
            <p className="text-sm text-fg-muted max-w-lg mx-auto">
              Available for internships, developer roles, and technical project partnerships.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-fg font-semibold text-sm transition-transform hover:scale-105"
              >
                <span>Initiate Contact ({site.email})</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
