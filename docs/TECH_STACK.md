# TECH STACK

## Core
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSG, SEO, API routes, image optimisation |
| Language | **TypeScript (strict)** | Safety, agent-friendly |
| Styling | **Tailwind CSS v4** + CSS variables tokens | Fast, consistent |
| Components | **shadcn/ui** + **21st.dev** community components | Copy-in, fully ownable, restyleable |
| Animation | **Motion (Framer Motion)** for UI/layout/presence | Declarative, smooth |
| Scroll/Timeline | **GSAP + ScrollTrigger** | Pinned sections, timelines |
| Smooth scroll | **Lenis** | Buttery inertia scroll |
| 3D (optional) | **three.js + @react-three/fiber + drei** (lazy) | Ability card/hero accents |
| Icons | **lucide-react** | Consistent |
| Fonts | `next/font` → display: **[e.g. Instrument Serif / Clash Display]**, body: **Inter / Geist**, mono: **Geist Mono** | Editorial + clean |

## Forms & Validation
React Hook Form + **Zod** + `@hookform/resolvers`.

## Backend & Data
| Need | Tool |
|---|---|
| DB | **Supabase (Postgres + RLS)** |
| Email | **Resend** + React Email templates |
| Bot protection | **Cloudflare Turnstile** |
| Rate limit | **Upstash Redis** (`@upstash/ratelimit`) |
| State (tiny) | **Zustand** (preloader, menu) |

## Quality
| Area | Tool |
|---|---|
| Lint/format | ESLint (next + a11y plugin), Prettier, `prettier-plugin-tailwindcss` |
| Unit | **Vitest** + Testing Library |
| E2E | **Playwright** (incl. mobile viewports) |
| A11y | **axe-core** (`@axe-core/playwright`), manual SR test |
| Perf | **Lighthouse CI**, `@next/bundle-analyzer` |
| Git hooks | Husky + lint-staged + commitlint (Conventional Commits) |

## Hosting & Ops
Vercel (hosting, analytics, speed insights), Sentry (errors), Cloudflare/Namecheap (domain DNS), GitHub Actions (CI).

## 21st.dev Workflow
1. Browse https://21st.dev → pick component → copy install command (shadcn registry URL).
2. `npx shadcn@latest add "<component-url>"` → lands in `/src/components/ui`.
3. **Or** use Magic MCP: `npx @21st-dev/cli@latest install <client>` and prompt `/ui <describe component>` inside the editor.
4. Restyle to tokens; log in `/docs/COMPONENT_LOG.md`.

**Suggested 21st.dev searches:** "navbar floating", "animated tabs", "marquee", "text reveal / split text", "magnetic button", "3d card / tilt card", "timeline", "bento grid", "dock", "animated modal / dialog", "multi-step form", "stepper", "preloader / loader", "shimmer button", "gradient / aurora / grid background", "cursor follower", "badge / availability pill", "accordion", "footer".

## Install Snapshot
```bash
npx create-next-app@latest portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd portfolio
npx shadcn@latest init
npm i motion gsap lenis zustand lucide-react zod react-hook-form @hookform/resolvers
npm i @supabase/supabase-js resend @react-email/components @upstash/redis @upstash/ratelimit
npm i three @react-three/fiber @react-three/drei
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test @axe-core/playwright \
        prettier prettier-plugin-tailwindcss husky lint-staged @commitlint/cli @commitlint/config-conventional \
        @next/bundle-analyzer @lhci/cli
```
> Pin versions after install; verify current majors before upgrading.

## Env Vars (`.env.example`)
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_MY_TIMEZONE=Asia/Kolkata
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
SENTRY_DSN=
```
