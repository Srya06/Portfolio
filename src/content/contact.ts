import { ProjectNeed } from "@/lib/validators";

export interface NeedOption {
  id: ProjectNeed;
  label: string;
  blurb: string;
  accent: string;
}

export const needOptions: NeedOption[] = [
  {
    id: "ai-ml",
    label: "Applied AI / Machine Learning",
    blurb: "Predictive pipelines, scikit-learn models, forecasting",
    accent: "cyan",
  },
  {
    id: "agentic-systems",
    label: "Agentic Systems & LLMs",
    blurb: "Multi-agent coordination, document retrieval, assistants",
    accent: "violet",
  },
  {
    id: "full-stack",
    label: "Full-Stack Development",
    blurb: "React, Next.js, Node.js, FastAPI, REST architecture",
    accent: "amber",
  },
  {
    id: "computer-vision",
    label: "Computer Vision Exploration",
    blurb: "Image classification, OpenCV, deep learning models",
    accent: "rose",
  },
  {
    id: "recruitment",
    label: "Recruitment / Full-Time Role",
    blurb: "Engineering placement, graduate engineer trainee",
    accent: "green",
  },
  {
    id: "internship",
    label: "Internship Opportunity",
    blurb: "Applied AI, full-stack, software engineering intern",
    accent: "cyan",
  },
  {
    id: "other",
    label: "General Technical Inquiry",
    blurb: "Consultation, peer review, research questions",
    accent: "violet",
  },
];

export const budgetOptions = [
  "Not specified / Exploratory",
  "Internship / Entry-Level Role",
  "< $2,000",
  "$2,000 — $5,000",
  "> $5,000",
] as const;
