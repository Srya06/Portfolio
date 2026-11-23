import { Preloader } from "@/components/motion/Preloader";
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

      {/* Interactive Horizontal Doors Wall */}
      <DoorsWall />

      <div className="pt-8 space-y-32">
        {/* Story Timeline (Pinned Desktop & Stacked Mobile) */}
        <StoryTimeline />

        {/* Interactive Contact Flow */}
        <ContactSection />
      </div>
    </>
  );
}
