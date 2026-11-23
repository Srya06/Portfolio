export type ProjectStatus = "featured" | "supporting" | "prototype" | "academic";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  repo: string;
  stack: string[];
  tags: string[];
  status: ProjectStatus;
  role: string;
  year: number;
  cover: string;
  problem: string;
  context: string;
  architecture: string[];
  implementedFeatures: string[];
  plannedRoadmap: string[];
  evaluation: string;
  limitations: string;
  evidenceNeeded: string[];
  disclaimer?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type DoorCategory = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  accent: string;
  accentColor: string;
  projectCount: number;
  disciplines: readonly string[];
};

export type StoryEntry = {
  id: string;
  type: "education" | "work" | "community" | "ai" | "product";
  period: string;
  year?: string;
  category: string;
  title: string;
  organisation: string;
  location: string;
  bullets: string[];
  status: "confirmed" | "confirm";
};

export type SkillGroup = {
  name: string;
  skills: readonly string[];
};
