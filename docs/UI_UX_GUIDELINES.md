# UI_UX_GUIDELINES.md

## 1. Design Principles
1. **Calm confidence**: large type, generous space, few colours, one accent.
2. **Motion with meaning**: every animation explains, guides, or delights; never decorates for its own sake.
3. **Fast beats fancy**: if it janks on a mid-range phone, simplify it.
4. **Recruiter-scannable**: key info (role, skills, contact) reachable in ≤ 2 interactions.
5. **Original**: borrow patterns, not visuals, from any reference.

## 2. Design Tokens (CSS variables in `tokens.css`)
```css
:root {
  /* Dark default (change hexes to your brand) */
  --bg: #0E0E10;
  --bg-elev: #17171A;
  --fg: #F4F2EE;
  --fg-muted: #A09C94;
  --line: rgba(255,255,255,.08);
  --accent: #[YOUR_ACCENT];       /* single accent, e.g. #FF5A36 */
  --accent-fg: #0E0E10;
  --success: #3DDC97; --danger: #FF5A5F;

  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 28px; --radius-pill: 999px;
  --space: 4px;                    /* 4pt scale: 4,8,12,16,24,32,48,64,96,128 */
  --ease-out: cubic-bezier(.22,1,.36,1);      /* primary */
  --ease-inout: cubic-bezier(.65,0,.35,1);
  --dur-fast: 180ms; --dur-base: 400ms; --dur-slow: 900ms;
}
[data-theme="light"] {
  --bg:#F6F4F0; --bg-elev:#FFFFFF; --fg:#121212; --fg-muted:#6B675F; --line:rgba(0,0,0,.08);
}
```
Contrast: body text ≥ 4.5:1, large text ≥ 3:1 (verify both themes).

## 3. Typography
| Role | Font | Size (clamp) | Weight | Tracking |
|---|---|---|---|---|
| Display / hero | [Display serif or grotesk] | `clamp(3rem, 9vw, 9rem)` | 400-500 | -0.03em |
| H2 | same | `clamp(2rem, 5vw, 4.5rem)` | 400 | -0.02em |
| H3 | Body font | `clamp(1.25rem, 2vw, 1.75rem)` | 600 | -0.01em |
| Body | Inter/Geist | 16-18px | 400 | 0 |
| Label/mono | Geist Mono | 12-13px uppercase | 500 | .08em |
Line-height: display 1.0-1.1, body 1.6. Max line length 65ch.

## 4. Layout
12-col grid, max-width 1440px, gutters 24px (mobile 16px). Breakpoints: 360 / 640 / 768 / 1024 / 1280 / 1536. Sections separated by 96-160px vertical rhythm.

## 5. Motion System
| Token | Use | Spec |
|---|---|---|
| Reveal | Text/blocks entering | translateY 24→0, opacity 0→1, 700ms ease-out, stagger 60ms; split text by line/word |
| Hover | Buttons/links | 180ms; magnetic pull ≤ 12px on primary CTAs (desktop, pointer:fine only) |
| Page transition | Route change | 600ms wipe/fade with shared element for doors |
| Scroll | Lenis `lerp: 0.1`, `smoothWheel`, touch native | GSAP ticker synced |
| Cursor | Custom follower (desktop only) | scale on interactive, hidden on touch |
| Preloader | 0→100% counter | 1.2-3s, exit reveals hero with clip-path |
**Rules:** animate `transform`/`opacity`/`clip-path` only; durations 150-900ms; one hero moment per viewport; `prefers-reduced-motion` → instant or fade only, no parallax/pin/tilt.

## 6. Signature Components
### 6.1 Ability Card (hero)
Credit-card/ID-badge shape (aspect 5:7), holographic gradient edge, photo (`hero.png`), name, role, 5 skill chips, status dot. Tilt ±12° following pointer, specular highlight follows cursor, idle float (±4px, 6s loop). Click → "enter" transition. Mobile: gyro (permission) or auto-sway.
### 6.2 Doors Wall
Wall texture/gradient background; doors 3:5 aspect, 280-420px wide; label plaque + number; hover: door swings (rotateY -18° with perspective) revealing cover image + "Enter →". Draggable with inertia and edge-snap; progress bar below; arrow-key support.
### 6.3 Story Timeline
Pinned 100vh section. Left: giant rolling counter `01/05` + date range. Right: active card (title, org, bullets) crossfade-slides. Progress line on the side. Mobile: vertical stack with sticky counter.
### 6.4 Contact Flow Modal
Slide-in panel (right on desktop, bottom sheet on mobile). Step 1 chips with progress `1 of 3`; Step 2 fields with inline validation; Step 3 success with confetti-lite and "reply within X". Focus trap, Esc, back button between steps.
### 6.5 Nav
Left: name. Center (desktop): rotating role text. Right: availability pill (pulsing green dot), live clock, Menu button. Hide on scroll-down, show on up; blur backdrop.
### 6.6 Footer
Three columns (Work / Navigate / Status), giant name wordmark, back-to-top.

## 7. Page Wireframes (order)
**Home:** Preloader → Hero (card + headline + CTAs + availability) → Doors wall → Selected work (3 featured) → Story → Contact CTA → Footer.
**Category:** Hero title + blurb → filter chips → project grid → CTA.
**Project:** Cover → meta row (role/year/stack) → problem → process → visuals → outcome → next project.

## 8. Imagery Rules
- Use `next/image`, `aspect-ratio` wrappers, `object-fit: cover`.
- Consistent colour grading across all photos; rounded `--radius-md`.
- Placeholder names (see `PROJECT_CHUNKS.md`); replace without code changes.

## 9. Microcopy Tone
Short, warm, confident, first person. Example CTAs: "Hire me", "See my work", "Let's talk". Status: "Available for work". Avoid jargon and filler.

## 10. Accessibility Checklist
Skip link · landmark roles · visible focus (2px accent ring) · hit areas ≥ 44px · labels on every input · errors announced (`aria-live`) · alt text · no motion-only meaning · test with VoiceOver/NVDA · 200% zoom OK.

## 11. 21st.dev Selection Criteria
Prefer components that: are accessible (Radix/Aria based), use Tailwind + CSS vars, don't ship heavy deps, and animate with transform/opacity. After install: swap colours to tokens, set easing/durations to §5, remove unused variants.


## Candidate-specific visual adaptation
- Keep the supplied cinematic experience, but theme it as an applied-AI engineering portfolio: graphite surfaces, warm paper text, one cyan/amber accent, subtle node/graph motifs.
- Use a clean recruiter-first information path: role and skills first; featured projects and GitHub links next; experience/education and resume; contact.
- The 3D Ability Card should show Python, AI/ML, React, FastAPI, and PostgreSQL only after validating current proficiency.
- Door categories should be AI/ML, Agentic Systems, Full-Stack Products, Computer Vision, and Engineering Labs rather than generic design/photography categories.
