# SRS: Software Requirements Specification

## 1. Introduction
**Purpose:** Define functional and non-functional requirements for the portfolio web app.
**Audience:** Developer (me) and AI coding agents.
**Definitions:** *Door* = a skill-category entry on the home wall. *Ability Card* = interactive hero card. *Chunk* = unit of delivery.

## 2. Overall Description
- Public, read-mostly website with one write endpoint (contact).
- Runs in modern evergreen browsers (last 2 versions Chrome, Safari, Firefox, Edge; iOS Safari 16+).
- Single owner; admin via DB dashboard (Supabase) in v1.

## 3. Functional Requirements
### 3.1 Preloader
- FR-1.1 Track loading of critical assets (fonts, hero image, card assets) and display percentage.
- FR-1.2 Show once per session (`sessionStorage`).
- FR-1.3 Exit animation reveals hero.

### 3.2 Navigation
- FR-2.1 Logo/name, role rotator, availability pill, live clock, Menu button.
- FR-2.2 Clock uses `Intl.DateTimeFormat` with `timeZone: [MY_TZ]`, updates every 30s.
- FR-2.3 Menu overlay: focus trap, `aria-modal`, Esc to close, scroll lock.

### 3.3 Hero / Ability Card
- FR-3.1 Card renders name, role, 5 skill tags, status, photo (`hero.png`).
- FR-3.2 Pointer-driven 3D tilt; device-orientation on mobile (permission-gated).
- FR-3.3 CTA buttons: "Hire me" (opens contact flow) and "See my work" (scrolls to doors).

### 3.4 Doors Wall
- FR-4.1 N doors from `content/doors.ts` (title, slug, cover image, accent colour).
- FR-4.2 Horizontal pan via drag, touch, trackpad, arrow keys; snap to door.
- FR-4.3 Hover/focus animates door open; click navigates with shared-element transition.

### 3.5 Story Timeline
- FR-5.1 Items from `content/story.ts` (type: work|education, dates, title, org, bullets).
- FR-5.2 Section pinned during scroll; active item index drives counter and content swap.
- FR-5.3 Fallback: stacked list when reduced-motion or JS disabled.

### 3.6 Category & Project Pages
- FR-6.1 Static generation (`generateStaticParams`).
- FR-6.2 Tag filter without page reload.
- FR-6.3 Project page contains: title, summary, role, year, stack chips, gallery, sections, links, next project.

### 3.7 Contact Flow
- FR-7.1 Step 1: choose project type (chips from `content/contact.ts`).
- FR-7.2 Step 2: name, email, message (10-2000 chars), budget (optional), consent checkbox.
- FR-7.3 Client + server validation (Zod).
- FR-7.4 Submit → `POST /api/contact` → insert row, send notification email to owner, auto-reply to sender.
- FR-7.5 Honeypot field + Cloudflare Turnstile + IP rate limit (5/hour).
- FR-7.6 Failure → show error + "Email me directly" mailto link.

### 3.8 Misc
- FR-8.1 Resume download `GET /resume.pdf` with event tracking.
- FR-8.2 Theme toggle (dark/light/system), no FOUC.
- FR-8.3 404 page, error boundary, Privacy page.
- FR-8.4 `sitemap.xml`, `robots.txt`, OG image per route.

## 4. Non-Functional Requirements
| ID | Category | Requirement |
|---|---|---|
| NFR-1 | Performance | LCP < 2.0s, CLS < 0.05, INP < 200ms on 4G mid-tier mobile |
| NFR-2 | Animation | 60fps; animate only transform/opacity; long tasks < 50ms |
| NFR-3 | Bundle | Initial JS < 170KB gzip; heavy libs dynamically imported |
| NFR-4 | Accessibility | WCAG 2.2 AA; all interactions keyboard-operable |
| NFR-5 | Security | HTTPS, CSP, HSTS, input sanitisation, no secrets client-side |
| NFR-6 | Privacy | No third-party cookies; analytics cookieless |
| NFR-7 | SEO | Lighthouse SEO 100; structured data valid |
| NFR-8 | Maintainability | TS strict, ESLint, Prettier, ≥ 80% coverage on logic |
| NFR-9 | Compatibility | See §2 |
| NFR-10 | Reliability | Contact never loses a message (DB insert before email) |

## 5. Interfaces
- **UI:** per `UI_UX_GUIDELINES.md`.
- **External:** Supabase (Postgres), Resend (email), Cloudflare Turnstile, Vercel Analytics, Upstash Redis (rate limit).
- **API:** per `API_DOCUMENTATION.md`.

## 6. Data Requirements
See `DATABASE_SCHEMA.md`. Retain contact messages 24 months; no PII beyond name/email/message/IP-hash.

## 7. Constraints & Assumptions
- Content owned by me; placeholders named per `PROJECT_CHUNKS.md`.
- Budget: free/hobby tiers.
- One language (English).

## 8. Candidate-Specific Content Requirements
- Hero identifies Surya D as AI/ML-focused and full-stack, without claiming a professional title not held.
- Project cards and case studies use `/docs/SELECTED_PROJECTS.md`; implemented and planned capabilities must be separated.
- Skills are drawn from `/docs/PROFILE_AND_POSITIONING.md`; unverified tools are marked for confirmation and excluded from final public copy.
- Email, location display, availability, education dates, and work history require confirmation before deployment.

## 9. Traceability
PRD F1-F14 → FR-1…FR-8 above. Tests in `TESTING.md` reference FR IDs.
