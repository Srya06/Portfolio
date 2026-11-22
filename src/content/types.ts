export type ProjectStatus = "featured" | "supporting" | "prototype" | "academic";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  repo: string;
  stack: string[];
  status: ProjectStatus;
  role: string;
  year: number;
  cover: string;
  evidenceNeeded: string[];
  disclaimer?: string;
};

export type DoorCategory = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  accent: string;
};

export type StoryEntry = {
  type: "education" | "work" | "community";
  period: string;
  title: string;
  organisation: string;
  location?: string;
  bullets: string[];
  status: "confirmed" | "confirm";
};

export type SkillGroup = {
  name: string;
  skills: readonly string[];
};
