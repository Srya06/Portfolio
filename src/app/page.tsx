import { Code2 } from "lucide-react";
import { skillGroups } from "@/content/skills";
import { Preloader } from "@/components/motion/Preloader";
import { CardSpotlight } from "@/components/motion/CardSpotlight";
import { Hero } from "@/components/sections/Hero";
import { DoorsWall } from "@/components/sections/DoorsWall";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { ContactSection } from "@/components/sections/ContactSection";

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
        {/* Capabilities Section */}
        <section id="capabilities" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="space-y-2 border-b border-line pb-6">
            <p className="font-mono text-xs text-accent uppercase tracking-wider">02 / Technical Skills</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg">
              Demonstrated Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <CardSpotlight
                key={group.name}
                className="p-6 rounded-xl border border-line bg-bg-elev/40 space-y-4 hover:border-accent/40 transition-colors"
              >
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
              </CardSpotlight>
            ))}
          </div>
        </section>

        {/* Story Timeline (Chunk 5 - Pinned Desktop & Stacked Mobile) */}
        <StoryTimeline />

        {/* Interactive Contact Flow (Chunk 6) */}
        <ContactSection />
      </div>
    </>
  );
}
