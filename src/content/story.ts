export type StoryEntry = { type: "education" | "work" | "community"; period: string; title: string; organisation: string; location?: string; bullets: string[]; status: "confirmed" | "confirm" };

// Only render entries with status: "confirmed". Add exact dates after checking the resume.
export const story: StoryEntry[] = [
  { type: "education", period: "CONFIRM DATES", title: "B.E. — Computer Science & Engineering (AI specialisation)", organisation: "Maharaja Institute of Technology Mysore · VTU", location: "Mysuru, India", bullets: ["Engineering student focused on AI/ML and software development."], status: "confirm" },
  { type: "work", period: "CONFIRM DATES", title: "Territory Sales Manager — Admixture Division", organisation: "Employer to confirm", location: "Odisha, India", bullets: ["Prior professional experience supplied in resume context; add only if relevant to the portfolio narrative."], status: "confirm" },
  { type: "community", period: "CONFIRM DATES", title: "Student coordination & workshop mentoring", organisation: "Maharaja Institute of Technology Mysore", location: "Mysuru, India", bullets: ["Student Coordinator", "Workshop Mentor / event coordination — exact titles and dates to confirm."], status: "confirm" },
];
