export interface DoorItem {
  slug: string;
  title: string;
  plateTitle: string;
  blurb: string;
  subtitle: string;
  image: string;
  accent: string;
  accentColor: string;
  doorColor: string;
  projectCount: number;
  disciplines: readonly string[];
  checklist: readonly string[];
}

export const doors: readonly DoorItem[] = [
  {
    slug: "full-stack-products",
    title: "Full-Stack Development",
    plateTitle: "FULL-STACK DEVELOPER",
    blurb: "High-performance web apps, interactive front-ends, and robust backend APIs.",
    subtitle: "END TO END, FROM SKETCH TO PRODUCTION",
    image: "/images/doors/door-fullstack.svg",
    accent: "amber",
    accentColor: "#F59E0B",
    doorColor: "#1C3554", // Deep Navy Blue (matching Screenshot 2 Door 1)
    projectCount: 2,
    disciplines: ["Next.js", "React", "REST APIs", "TypeScript", "Node"],
    checklist: [
      "System design & scalable architecture",
      "Full-stack Next.js, React & FastAPI builds",
      "Interactive motion & micro-interactions",
      "API performance & low-latency execution",
      "Launch, analytics & production maintenance",
    ],
  },
  {
    slug: "agentic-systems",
    title: "Agentic & LLM Systems",
    plateTitle: "AGENTIC SYSTEMS",
    blurb: "Multi-agent orchestration, GraphRAG retrieval, and autonomous tool workflows.",
    subtitle: "AUTONOMOUS AGENTS, GRAPH RAG & REASONING",
    image: "/images/doors/door-agents.svg",
    accent: "violet",
    accentColor: "#A855F7",
    doorColor: "#352033", // Deep Eggplant Plum (matching Screenshot 2 Door 2)
    projectCount: 2,
    disciplines: ["Multi-Agent", "GraphRAG", "Intent Routing", "LangGraph"],
    checklist: [
      "Multi-agent task decomposition & routing",
      "Knowledge graph indexing & vector retrieval",
      "Deterministic guardrails & schema enforcement",
      "Latency profiling & token cost optimization",
      "Real-time evaluation & trace telemetry",
    ],
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning",
    plateTitle: "AI/ML ENGINEER",
    blurb: "Predictive modeling, regression pipelines, and agricultural yield analytics.",
    subtitle: "DATA PIPELINES, MODELS & PREDICTION ENGINES",
    image: "/images/doors/door-ai-ml.svg",
    accent: "cyan",
    accentColor: "#00F0FF",
    doorColor: "#314634", // Deep Forest Sage (matching Screenshot 2 Door 3)
    projectCount: 2,
    disciplines: ["Forecasting", "AgriTech", "scikit-learn", "PyTorch"],
    checklist: [
      "Feature engineering & data pipeline hygiene",
      "Model training, cross-validation & tuning",
      "FastAPI inference microservice deployment",
      "Model drift monitoring & re-training triggers",
      "Clear documentation & reproducible benchmarks",
    ],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision & Research",
    plateTitle: "COMPUTER VISION",
    blurb: "Image segmentation, lesion diagnostic suite, and visual perception AI.",
    subtitle: "IMAGE SEGMENTATION & DEEP CONVNETS",
    image: "/images/doors/door-vision.svg",
    accent: "rose",
    accentColor: "#F43F5E",
    doorColor: "#733F24", // Warm Terracotta Rust (matching Screenshot 2 Door 4)
    projectCount: 1,
    disciplines: ["OpenCV", "Diagnostic AI (Research)", "Classification"],
    checklist: [
      "Medical & visual dataset preprocessing",
      "CNN & transformer segmentation backbones",
      "Explainability heatmaps & Grad-CAM tooling",
      "Non-clinical research evaluation boundaries",
      "Optimized inference pipelines for edge or cloud",
    ],
  },
  {
    slug: "engineering-labs",
    title: "Engineering Labs",
    plateTitle: "ENGINEERING LABS",
    blurb: "DevOps, systems experiments, tests, and academic coursework.",
    subtitle: "SYSTEMS, INFRASTRUCTURE & EXPERIMENTS",
    image: "/images/doors/door-labs.svg",
    accent: "green",
    accentColor: "#10B981",
    doorColor: "#2C3E48", // Slate teal
    projectCount: 3,
    disciplines: ["Docker", "Git/CI", "Algorithms", "Testing"],
    checklist: [
      "Containerization & reproducible dev environments",
      "Automated CI/CD test suites & linting",
      "Algorithmic problem-solving & data structures",
      "Network analysis & packet sniffing tools",
      "System security & verification audits",
    ],
  },
] as const;
