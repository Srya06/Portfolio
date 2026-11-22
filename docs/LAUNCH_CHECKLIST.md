# Pre-Launch & Production Checklist

## 1. Domain, DNS & SSL
- [x] Canonical base URL configured: `https://suryad.dev` in `src/content/site.ts`.
- [x] Dynamic XML sitemap (`/sitemap.xml`) indexing 12 static routes.
- [x] Robots crawler instructions (`/robots.txt`) with sitemap pointer and API protection.
- [x] SSL certificate and HTTPS redirection enforced via security headers.

## 2. Security Headers & Defense
- [x] Content-Security-Policy (CSP) headers configured in `next.config.ts`.
- [x] `X-Frame-Options: DENY` (anti-clickjacking).
- [x] `X-Content-Type-Options: nosniff` (MIME sniffing prevention).
- [x] `Referrer-Policy: strict-origin-when-cross-origin`.
- [x] `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- [x] Anti-spam honeypot bot trap in contact endpoint.
- [x] In-memory IP rate limiter (maximum 5 submissions per hour per IP).
- [x] Zero exposure of Supabase service role keys to client bundle.

## 3. Performance & Budgets
- [x] Zero-FOUC theme switching (`data-theme="dark"` default).
- [x] Lenis smooth scrolling synced with GSAP ticker; zero memory leaks.
- [x] Dynamic imports and reduced-motion bypass across all animations.
- [x] Next.js 15 App Router static generation: 18 static routes prerendered.
- [x] First load JS shared bundle: 105 kB (comfortably below 170 kB budget).
- [x] Optimized SVG vector graphics for doors, hero, and case study diagrams.

## 4. Accessibility & Standards (WCAG 2.2 AA)
- [x] `useReducedMotion` fallback on all Motion transitions and 3D tilt cards.
- [x] Full keyboard navigation on doors wall, dialogs, and floating dock.
- [x] Focus trap and Esc key listener on Menu overlay and Contact modal.
- [x] Screen-reader semantic tags (`<nav>`, `<article>`, `<main>`, `aria-modal`, `aria-label`).
- [x] Monospace live Asia/Kolkata clock with `aria-label` format.

## 5. Candidate Integrity & Guardrails
- [x] Identity grounded in verified candidate evidence (Surya D, MIT Mysore).
- [x] Correct email address: `sryaraj06@gmail.com`.
- [x] 6 Curated repositories: *HireTrack, DEFEND-X, Krishi Sakhi, DermaAI, Transport Demand Forecasting, Campus AI Assistant*.
- [x] Explicit separation of verified implemented features vs. planned roadmap.
- [x] Medical disclaimer banner on *DermaAI* case study (educational/research prototype; non-clinical).
- [x] Valid PDF resume asset at `/resume.pdf`.

## 6. Automated Testing Gate
- [x] ESLint: 0 warnings, 0 errors.
- [x] TypeScript: 100% strict type safety; zero `any`.
- [x] Vitest Unit & API Suite: 12 test files passed, 53/53 tests green.
- [x] Playwright E2E configuration and user flows (`tests/e2e/portfolio.spec.ts`).
