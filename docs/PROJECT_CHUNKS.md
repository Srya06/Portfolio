# PROJECT_CHUNKS.md

Execute in order. After each chunk the agent runs lint/typecheck/tests, summarises, and **stops for approval**.

---

## Chunk 0: Project Setup
- Create Next.js app, install deps (see `TECH_STACK.md`), init shadcn, ESLint/Prettier/Husky, Vitest, Playwright.
- `tokens.css`, fonts via `next/font`, folder structure, `.env.example`, CI workflow.
- Create `/src/content/*` stubs with typed placeholder data.
- Create `/docs/DECISIONS.md` and `/docs/COMPONENT_LOG.md`.
**Done when:** `npm run build` passes, blank themed page deploys to Vercel.

## Chunk 1: Foundation & Global Shell
- Root layout, theme provider (no flash), Lenis `SmoothScroll` synced with GSAP.
- `Nav` (name, role rotator, availability pill, live `Clock`, Menu button, hide/show on scroll).
- Full-screen `Menu` overlay (staggered links, focus trap).
- `Footer` (Work / Navigate / Status, giant wordmark, back-to-top).
- Custom cursor (desktop only), skip link, 404 page.
**21st.dev:** navbar, menu/overlay, button, badge, footer.

## Chunk 2: Preloader & Hero
- `Preloader` with real asset tracking, 0→100% counter, exit reveal; once per session.
- Hero headline with split-text reveal, CTAs (Hire me / See my work), "Available for work" status, scroll hint.
- **Ability Card**: CSS 3D tilt + holographic edge + idle float; "Click to enter".
- Role marquee/rotator.
**21st.dev:** loader, 3D/tilt card, text reveal, magnetic button, marquee, shimmer.

## Chunk 3: Doors Wall
- Horizontal draggable wall with N doors from `content/doors.ts`.
- Door hover/focus open animation, snap, progress bar, keyboard + touch.
- Shared-element/page transition into category routes; prefetch on hover.
**21st.dev:** carousel/drag, hover card, animated link.

## Chunk 4: Category & Project Pages
- `/work/[category]` with filter chips + project grid.
- `/work/[category]/[slug]` case-study template + next-project.
- Seed the selected real projects from `docs/SELECTED_PROJECTS.md`; do not create fabricated case studies or empty filler cards.
**21st.dev:** bento grid, tabs/filter, gallery/lightbox.

## Chunk 5: My Story Timeline
- Pinned scroll section, rolling `01/05` counter, active-card transitions, progress line.
- Mobile stacked variant + reduced-motion fallback.
**21st.dev:** timeline, number ticker/counter.

## Chunk 6: Contact Flow & Backend
- Multi-step panel/bottom sheet (need → details → success), RHF + Zod.
- `/api/contact`: validation, honeypot, Turnstile, Upstash rate limit, Supabase insert, Resend emails.
- Supabase tables + RLS (see `DATABASE_SCHEMA.md`), mailto fallback.
**21st.dev:** dialog/sheet, stepper, input, chips, toast.

## Chunk 7: Polish & Micro-interactions
- Page transitions, magnetic buttons, link hover effects, image reveals, parallax (subtle), smooth section handoffs.
- Copy pass on all content; empty/error/loading states.
**21st.dev:** background effects (grid/aurora), animated text, dock.

## Chunk 8: SEO, A11y, Performance
- Metadata, JSON-LD (`Person`, `WebSite`), `sitemap.ts`, `robots.ts`, `/api/og`.
- axe audits, keyboard/SR pass, bundle analysis, image optimisation, font subsetting.
- Lighthouse CI budgets enforced.

## Chunk 9: Testing & Launch
- Complete unit/API/E2E suites per `TESTING.md`.
- Replace placeholders with real assets and content; add resume PDF.
- Domain, Analytics, Sentry, Search Console; run launch checklist.

---

# IMAGE & ASSET MANIFEST
Replace files **keeping the same name**. Suggested sizes are for source files; the app serves optimised versions.

## Global
| File | Path | Suggested size | Notes |
|---|---|---|---|
| hero.png | `/public/images/hero.png` | 1200x1680 (5:7) | Portrait for the Ability Card, clean/transparent or solid bg |
| hero-bg.jpg | `/public/images/hero-bg.jpg` | 2400x1400 | Optional ambient background |
| about.png | `/public/images/about.png` | 1200x1500 | Candid/personal photo for story section |
| og-default.jpg | `/public/og-default.jpg` | 1200x630 | Social share image |
| favicon.ico / icon.png | `/public/` | 32 / 512 | Logo mark |
| apple-touch-icon.png | `/public/apple-touch-icon.png` | 180x180 | |
| resume.pdf | `/public/resume.pdf` | n/a | Your CV |
| logo.svg | `/public/logo.svg` | n/a | Wordmark/monogram |

## Doors (one per category; rename/add as needed)
| File | Path | Size |
|---|---|---|
| door-web.png | `/public/images/doors/door-web.png` | 900x1500 |
| door-app.png | `/public/images/doors/door-app.png` | 900x1500 |
| door-uiux.png | `/public/images/doors/door-uiux.png` | 900x1500 |
| door-graphic.png | `/public/images/doors/door-graphic.png` | 900x1500 |
| door-photo.png | `/public/images/doors/door-photo.png` | 900x1500 |
| wall-texture.jpg | `/public/images/doors/wall-texture.jpg` | 2000x1200 |

## Projects (repeat per project: replace `project-1` with slug)
| File | Path | Size |
|---|---|---|
| project-1-cover.png | `/public/images/projects/project-1/cover.png` | 1600x1000 |
| project-1-1.png … project-1-6.png | `/public/images/projects/project-1/1.png` … `6.png` | 1600x1000 |
| project-1-mobile.png | `/public/images/projects/project-1/mobile.png` | 900x1800 |
Create `project-1` to `project-6` by default.

## Story / Experience (optional logos)
| File | Path | Size |
|---|---|---|
| company-1.svg … company-4.svg | `/public/images/story/company-1.svg` … | square SVG |
| university.svg | `/public/images/story/university.svg` | square SVG |

## Photography category (if used)
`/public/images/photography/photo-1.jpg … photo-12.jpg`, 2000px long edge.

## Misc
| File | Path |
|---|---|
| texture-noise.png | `/public/images/texture-noise.png` (tileable grain, 200x200) |
| avatar.png | `/public/images/avatar.png` (square 256x256, used in emails/nav) |
| testimonial-1.png … 3.png | `/public/images/testimonials/` (square 160x160, optional) |

> The agent should generate neutral gradient/SVG placeholders with these exact filenames in Chunk 0 so the layout works before you add real photos.


## Candidate-specific content implementation
- `src/content/site.ts`: Surya D identity, positioning, social links, confirmation-gated email/location/availability.
- `src/content/projects.ts`: six featured projects and selected supporting projects from `docs/SELECTED_PROJECTS.md`.
- `src/content/doors.ts`: AI & ML, Agentic Systems, Full-Stack Products, Computer Vision, Engineering & Experiments.
- `src/content/story.ts`: education and verified experience; leave unconfirmed dates out.
- Use `CONFIRM` fields in draft content only; block them from rendering publicly.
