# ARCHITECTURE

## 1. Style
Statically-generated, edge-delivered Next.js App Router site. Content-first (typed data files) with a thin serverless API for contact + analytics events. Islands of client-side interactivity (animation) inside server components.

## 2. High-Level Diagram
```
Browser ──► Vercel Edge/CDN ──► Next.js (RSC + static pages)
   │                               │
   │ (client islands:              ├─► /api/contact ─► Zod ─► Turnstile verify ─► Upstash rate-limit
   │  Lenis, GSAP, Motion, R3F)    │                      ├─► Supabase (insert)
   │                               │                      └─► Resend (owner email + auto-reply)
   └─ Vercel Analytics / Speed     └─► /api/og (OG images, edge)
```

## 3. Rendering Strategy
| Route | Strategy |
|---|---|
| `/` | Static (SSG), client islands |
| `/work/[category]` | SSG via `generateStaticParams` |
| `/work/[category]/[slug]` | SSG |
| `/about` (My story anchor on home + page) | SSG |
| `/legal` | SSG |
| `/api/*` | Node/Edge serverless |

## 4. Folder Structure
```
/docs
/public
  /images   (hero.png, doors/*, projects/*, ...)
  /fonts  /models  resume.pdf  og-default.jpg
/src
  /app
    layout.tsx  page.tsx  not-found.tsx  sitemap.ts  robots.ts
    /work/[category]/page.tsx
    /work/[category]/[slug]/page.tsx
    /legal/page.tsx
    /api/contact/route.ts   /api/og/route.tsx   /api/event/route.ts
  /components
    /ui            ← shadcn + 21st.dev components (restyled)
    /sections      ← Hero, DoorsWall, StoryTimeline, ContactCTA, Footer
    /motion        ← SmoothScroll, Preloader, PageTransition, Reveal, Magnetic, Marquee
    /three         ← AbilityCard3D (lazy)
    /layout        ← Nav, Menu, Clock, AvailabilityPill
  /content        ← site.ts, doors.ts, story.ts, projects.ts, contact.ts
  /lib            ← utils.ts, supabase.ts, resend.ts, ratelimit.ts, validators.ts, seo.ts
  /hooks          ← useReducedMotion, useMediaQuery, useLocalTime, useScrollDirection
  /styles         ← globals.css, tokens.css
  /types
/tests  (unit, e2e)
```

## 5. Key Modules
- **SmoothScroll (Lenis)**: single provider at layout; synced to GSAP ticker; disabled with reduced-motion.
- **Preloader**: tracks `document.fonts.ready` + critical images; state in a tiny Zustand store; gates hero entrance.
- **AbilityCard**: pure CSS 3D tilt by default (cheap); optional R3F version lazy-loaded on capable devices.
- **DoorsWall**: GSAP `Draggable`/Observer or Motion `drag="x"` with snap; each door is a link wrapper with `layoutId` for shared transitions.
- **StoryTimeline**: GSAP ScrollTrigger pin + progress; counter uses rolling digit component.
- **ContactFlow**: shadcn `Dialog` + stepper (React Hook Form + Zod); server action or route handler.
- **PageTransition**: Motion `AnimatePresence` + View Transitions API progressive enhancement.

## 6. Data Flow (Contact)
1. Client validates (Zod) → gets Turnstile token.
2. POST `/api/contact` → server re-validates, verifies Turnstile, checks rate limit.
3. Insert `contact_messages` (status `new`).
4. Send emails via Resend; update status `notified`.
5. Respond `201`. On email failure, row stays → retry/cron visible in dashboard.

## 7. Performance Architecture
- Server Components by default; `"use client"` only for interactive islands.
- `next/dynamic` for GSAP plugins, R3F, Lenis (after first paint).
- Fonts via `next/font` (self-hosted, `display: swap`, subset).
- Images: AVIF/WebP, `priority` only on hero, blur placeholders.
- Animations: transform/opacity, `will-change` sparingly, `content-visibility: auto` below fold.
- Prefetch category routes on door hover.

## 8. Security
CSP (nonce), HSTS, `X-Frame-Options: DENY`, `Referrer-Policy`, Zod validation, parameterized queries (Supabase), RLS on all tables, secrets only in server env, honeypot + Turnstile + rate limit.

## 9. Observability
Vercel Analytics + Speed Insights, Sentry (free) for errors, custom events (`hire_click`, `resume_download`, `contact_submit`).

## 10. Deployment & CI/CD
GitHub → Vercel (preview per PR, prod on `main`). GitHub Actions: lint, typecheck, unit, Playwright, Lighthouse CI (budgets fail the build).

## 11. Decisions (ADR summary)
| Decision | Why |
|---|---|
| Next.js over Vite | SEO, SSG, OG, API in one |
| Typed content files over CMS | Faster, zero cost; DB only for dynamic data |
| CSS-first card, 3D optional | Mobile perf |
| Supabase | Free Postgres + RLS + dashboard |
