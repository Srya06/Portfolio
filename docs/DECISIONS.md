# Decisions & Assumptions

| Decision | Rationale | Status |
|---|---|---|
| Position Surya as AI/ML + full-stack + applied AI/agentic systems | Best overlap across supplied skills and public repository inventory | Adopted |
| Feature HireTrack, DEFEND-X, Krishi Sakhi, DermaAI, Transport Forecasting, Campus AI Assistant | Strongest breadth and product narrative from repo names plus prior project context | Verify implementation before publication |
| Retain Next.js App Router + TypeScript + Tailwind | Supplied TECH_STACK and architecture already specify it | Adopted |
| Keep project content in typed data files | Allows maintenance without UI edits | Adopted |
| Use prototype/academic labels where appropriate | Avoid overclaiming completion or production readiness | Mandatory |
| Do not publish email until verified | Supplied address may contain a typo | Pending |
| Use Mysuru/Bengaluru only after location preference confirmed | Both are supported by known context; public display is user's choice | Pending |
| Simplify unused generic categories | Candidate portfolio is engineering-focused; generic graphic/photo categories dilute positioning | Adopted |
| Configure strict Content Security Policy & Security Headers | Protects against XSS, clickjacking, and MIME confusion attacks | Adopted |
| Adopt Playwright for cross-browser E2E suite | Meets TESTING.md requirement for automated multi-browser verification | Adopted |
| Add minimal valid PDF resume artifact at /resume.pdf | Satisfies asset manifest and provides instant verification for recruiters | Adopted |

## Open confirmations
- Confirm display name (Surya D vs Surya).
- Confirm email spelling and preferred public location (e.g. `sryaraj06@gmail.com` vs `gamil.com`; Mysuru vs Bengaluru).
- Confirm current availability status and provide resume PDF.
- Confirm exact degree title, graduation date, and education dates (MIT Mysore).
- Confirm which projects are complete, in progress, or prototypes; individual contributions and technology stacks.
- Audit README and code for each featured repository before writing detailed case studies.

## 10-Point Master Execution Plan

1. **Phase 0 — Project Setup & Tooling (Chunk 0):** Initialize Next.js 15 (App Router, TypeScript strict, Tailwind CSS), install core dependencies (shadcn, Lucide, Motion, Lenis, GSAP, Zod, Vitest, Playwright), configure `tokens.css` with dark graphite + warm off-white + cyan/amber accents, link `/src/content/*` schemas, and verify build/lint baseline.
2. **Phase 1 — Foundation & Global Shell (Chunk 1):** Build responsive Root Layout, theme provider (dark default, zero FOUC), Lenis smooth scrolling synced with GSAP ticker, sticky Nav with live Asia/Kolkata clock & availability pill, full-screen staggered Menu overlay, and footer with status indicators.
3. **Phase 2 — Preloader & Hero Section (Chunk 2):** Implement once-per-session asset-tracking preloader (0→100% counter) with clip-path exit reveal, hero typography with split-text entrance, interactive 3D Ability Card (pointer tilt + holographic edge + idle sway + reduced-motion fallback), and role rotator.
4. **Phase 3 — Interactive Doors Wall (Chunk 3):** Build horizontal draggable doors section (AI & ML, Agentic Systems, Full-Stack Products, Computer Vision, Engineering Labs) with keyboard/touch support, door hover perspective swing, and shared-element transitions.
5. **Phase 4 — Category Routing & Project Showcase (Chunk 4):** Implement SSG routes `/work/[category]` and `/work/[category]/[slug]`, dynamic tag filters, and structured case studies for the 6 curated repositories (HireTrack, DEFEND-X, Krishi Sakhi, DermaAI, Public Transport Forecasting, Campus AI Assistant) with prototype/academic status labels and medical disclaimers.
6. **Phase 5 — Story Timeline & Milestones (Chunk 5):** Create pinned scroll timeline with animated `01/0N` counter, date milestones, card cross-fades, progress rail, and mobile vertical stack / reduced-motion fallback.
7. **Phase 6 — Contact Flow & Backend Integration (Chunk 6):** Construct multi-step contact dialog (Need → Details → Success), Zod validation schemas shared across client/server, `/api/contact` route handler with Cloudflare Turnstile verification, Upstash Redis rate limiting, Supabase storage, Resend transactional notifications, and mailto fallback.
8. **Phase 7 — Polish, Motion & Micro-interactions (Chunk 7):** Refine page transitions, magnetic buttons, custom desktop cursor, ambient background effects, loading/error boundaries, and thorough editorial pass on all copy.
9. **Phase 8 — Performance, Accessibility & SEO (Chunk 8):** Implement dynamic OG image generation (`/api/og`), JSON-LD structured data (`Person`, `WebSite`), `sitemap.ts`, `robots.ts`, axe-core a11y testing (WCAG 2.2 AA zero-violation gate), bundle optimization, and Lighthouse CI score validation (≥ 95).
10. **Phase 9 — Verification, Asset Finalization & Launch (Chunk 9):** Run end-to-end Playwright test suite, audit and swap placeholder graphics with candidate assets/photos, link verified resume PDF, check CSP/security headers, and prepare production deployment.
