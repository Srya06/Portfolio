# MASTER PROMPT — SURYA D PERSONAL PORTFOLIO

You are a senior creative developer, product designer, and technical writer. Build a distinctive, recruiter-focused portfolio for **Surya D**, positioned as an **AI/ML Engineer and Full-Stack Developer focused on applied AI products and agentic systems**.

## Portfolio objective
A recruiter should understand the candidate's technical direction, strongest skills, best projects, and contact/resume links within 60 seconds. Prioritise proof and clarity over visual gimmicks.

## Candidate identity (source from `/docs/PROFILE_AND_POSITIONING.md`)
- Name: Surya D
- Role: AI/ML Engineer | Full-Stack Developer | Applied AI & Agentic Systems
- Location: Mysuru / Bengaluru, India — confirm public display preference
- Timezone: Asia/Kolkata
- GitHub: https://github.com/Srya06
- LinkedIn: https://www.linkedin.com/in/surya-d-a285b2374
- Email: `sryaraj06@gamil.com` is a supplied value that must be verified; do not publish until confirmed.
- Tagline: “Building useful AI products from models, data, and software.”
- Availability: open to internships and entry-level opportunities — confirm current status.

## What makes the candidate strongest
1. Applied AI/ML and Python projects.
2. Full-stack web application development and API integration.
3. Agentic / LLM-powered product concepts and practical orchestration.
4. Ability to connect project requirements, architecture, implementation, testing, and user experience.

## Featured projects
Use `/docs/SELECTED_PROJECTS.md` as the source of truth. Recommended order: HireTrack, DEFEND-X, Krishi Sakhi, DermaAI, AI-Powered Public Transport Demand Forecasting, Campus AI Assistant. Do not invent features, benchmarks, deployments, team roles, or project completion states. Distinguish implemented functionality from planned architecture. Use clear prototype/academic labels when needed.

## Design direction
Retain the supplied portfolio concept's cinematic “ability card”, preloader, role rotator, draggable doors wall, story timeline, full-screen menu, project case-study pages, multi-step contact flow, live Asia/Kolkata clock, and expressive footer. Make the visual identity original: dark graphite + warm off-white + one restrained electric-cyan or amber accent; editorial display typography; restrained gradients; generous spacing. Do not copy the reference site's exact layout, assets, text, or identity.

The portfolio should feel like a modern AI product engineer's workbench: polished, technical, confident, and human. Visual motifs can subtly reference nodes, graph connections, data flows, and system maps.

## Technical requirements
Follow `/docs/TECH_STACK.md`, `/docs/ARCHITECTURE.md`, `/docs/SRS.md`, `/docs/PRD.md`, `/docs/TESTING.md`, `/docs/UI_UX_GUIDELINES.md`, `/docs/AGENTS.md`, `/docs/API_DOCUMENTATION.md`, `/docs/DATABASE_SCHEMA.md`, `/docs/DEVELOPMENT_ROADMAP.md`, and `/docs/PROJECT_CHUNKS.md`.
Use Next.js App Router + strict TypeScript + Tailwind CSS + shadcn/ui, Motion, GSAP/ScrollTrigger, Lenis, Zod, React Hook Form, Supabase, Resend, Upstash, Vercel. Verify currently supported package versions before install.

## Content architecture
All text, skills, project records, doors, and timeline items must live in typed data files under `/src/content`. Components must not hardcode candidate copy. Case-study pages need problem, context, role, approach, architecture, implementation, evaluation, outcome, limitations, links, and next project.

## Important integrity rules
- No fabricated metrics, performance figures, model accuracy, user counts, production claims, endorsements, or employment.
- Clearly flag unknown details with `CONFIRM:` in working copy; do not surface placeholders to public users.
- Medical AI projects require a prominent educational/research-only disclaimer.
- Keep contact email unpublished until confirmed.
- The portfolio describes projects; it does not imply that every planned feature is completed.

## Chunk protocol
Work in ordered chunks defined in `/docs/PROJECT_CHUNKS.md`. After each chunk run lint, typecheck, and relevant tests; summarise files changed and verification; stop for user review. Before coding, read every document in `/docs`, produce a 10-point plan, and log decisions in `/docs/DECISIONS.md`.
