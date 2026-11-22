# AGENTS.md: Rules for AI Coding Agents

> Place a copy of this file in the **repo root** (Claude Code also reads `CLAUDE.md`; you can symlink). Read all `/docs/*.md` before coding.

## Project
Award-level personal portfolio for **[YOUR NAME]**. Goal: land jobs/clients. Priorities in order: **(1) smooth performance, (2) polished UX, (3) accessibility, (4) clean code**.

## Commands
```bash
npm run dev          # local dev
npm run build        # production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest
npm run e2e          # playwright
npm run lhci         # lighthouse budgets
```
Run `lint`, `typecheck`, `test` before declaring any task done.

## Stack (do not swap without asking)
Next.js App Router · TypeScript strict · Tailwind v4 · shadcn/ui + 21st.dev components · Motion · GSAP + ScrollTrigger · Lenis · Zod · RHF · Supabase · Resend · Upstash · Vercel.

## Code Rules
1. **Server Components by default.** Add `"use client"` only where hooks/events/animation are required; keep client islands small.
2. **No `any`.** Strict types; share types in `/src/types` or `/src/content/types.ts`.
3. **Content is data.** Text, links, projects, story, doors live in `/src/content/*`. Components never hardcode copy.
4. **Styling:** Tailwind + CSS variables from `tokens.css`. No inline hex colours; no magic numbers for spacing/duration (use tokens).
5. **Animations:** only `transform`, `opacity`, `clip-path`. Wrap in `useReducedMotion` guards. Clean up GSAP contexts (`gsap.context().revert()`) and Lenis in effects.
6. **Dynamic import** heavy modules (GSAP plugins, three/R3F, confetti) and below-the-fold sections.
7. **Images:** `next/image` only; use paths from `PROJECT_CHUNKS.md` asset manifest; wrap in aspect-ratio containers; always `alt`.
8. **Forms:** RHF + Zod; the same schema is shared by client and server (`/src/lib/validators.ts`).
9. **Accessibility is a requirement**, not polish: semantic HTML, labels, focus-visible, keyboard paths, `aria-*` where needed.
10. **File naming:** components `PascalCase.tsx`, hooks `useThing.ts`, utils `camelCase.ts`, routes lowercase.
11. **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `perf:`). One logical change per commit.
12. **No new dependency** without justification in `/docs/DECISIONS.md` (size, alternatives).

## 21st.dev Protocol
1. Before building any UI primitive/effect, search 21st.dev (Magic MCP `/ui` or the website).
2. Install via `npx shadcn@latest add "<url>"`, then **restyle to tokens**, strip unused variants, ensure a11y.
3. Log in `/docs/COMPONENT_LOG.md`: `name | author | URL | used in | modifications`.
4. If nothing fits, build custom following `UI_UX_GUIDELINES.md`.

## Do
- Plan in bullets first; work chunk by chunk (`PROJECT_CHUNKS.md`); stop after each chunk for review.
- Keep PRs/diffs small and explain trade-offs.
- Measure performance after each chunk (bundle size, Lighthouse).
- Write tests alongside features (`TESTING.md`).
- Record decisions in `/docs/DECISIONS.md`.

## Don't
- Don't copy text, images, logos, or exact visual identity from the reference site or any other site.
- Don't use `localStorage` for anything but non-critical UI flags (theme, preloader-seen).
- Don't expose secrets or the Supabase service key to the client.
- Don't add autoplay audio/video with sound, or scroll-jacking that breaks native feel on touch.
- Don't leave `console.log`, `TODO` without owner, or unused code.
- Don't hardcode image dimensions that break when I replace placeholders.
- Don't ship animation without a reduced-motion alternative.

## Definition of Done (per chunk)
- [ ] Meets acceptance criteria (PRD/SRS IDs referenced in the commit)
- [ ] Lint, typecheck, tests pass
- [ ] Responsive 360 → 1920, no horizontal overflow
- [ ] Keyboard + reduced-motion verified
- [ ] No console errors; Lighthouse budgets still green
- [ ] Docs/ADR updated

## Communication
At the end of each chunk reply with: **Summary · Files changed · How to verify · Risks/Decisions · Next chunk**. Ask questions only if blocked; otherwise choose a sensible default and log it.


## Candidate Content Guardrails
- Candidate identity and skills are defined in `PROFILE_AND_POSITIONING.md`.
- Project claims must be supported by `SELECTED_PROJECTS.md` and verified source evidence.
- Never invent project metrics or list a technology solely because it appeared in a conversation; confirm it was used in the specific project.
- Keep health-related AI prototypes explicitly non-clinical.
