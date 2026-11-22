# PRD: Surya D — AI/ML & Full-Stack Developer Portfolio

## 1. Vision
A polished, evidence-led portfolio that presents Surya D as an AI/ML-focused full-stack developer, demonstrates applied AI and agentic product work, and converts recruiter or collaborator interest into conversations.

## 2. Goals & Success Metrics
| Goal | Metric | Target |
|---|---|---|
| Get interviews/clients | Contact-flow completions / month | ≥ 15 |
| First impression | Bounce rate | < 40% |
| Engagement | Avg. session | > 2:30 min |
| Performance | Lighthouse (mobile) | ≥ 95 all |
| Reach | Resume downloads / month | ≥ 30 |
| Discoverability | Ranks for "Surya D AI/ML developer" | Yes |

## 3. Target Users (Personas)
1. **Recruiter Riya**: 90 seconds per candidate. Needs: role, skills, experience, resume, contact. Fast scan.
2. **Hiring Manager Hari**: Wants proof. Needs: case studies with role, stack, outcome.
3. **Founder/Client Fiona**: Needs a designer-developer for a product. Wants taste + reliability + clear way to start a project.
4. **Peer/Dev Dan**: Checks craft, code quality, GitHub.

## 4. Scope
### In scope (v1)
- Preloader with % counter and intro animation
- Hero with interactive **Ability Card** (3D tilt / flip, shows role, skills, status)
- Role rotator/marquee
- **Doors wall**: horizontal draggable section, one door per skill category, opens to category pages
- Category pages (Web, App, UI/UX, Graphic, Photography; configurable)
- Project case-study pages
- **My Story** timeline (experience + education) with animated counter
- Availability badge + live local-time clock
- Full-screen animated menu
- Multi-step "What do you need?" contact flow → form submission (stored + email) with mailto fallback
- Resume download
- Footer, Privacy page, 404
- SEO, OG image, analytics, dark/light theme
### Out of scope (v1)
Blog/CMS UI, auth for visitors, i18n, e-commerce, comments.
### Later (v2)
Blog, case-study CMS dashboard, i18n, command palette (⌘K), guestbook.

## 5. Features & Acceptance Criteria
| ID | Feature | Acceptance Criteria |
|---|---|---|
| F1 | Preloader | Shows 0→100% tied to real asset load (min 1.2s, max 3s); skipped on repeat visit within session; reduced-motion = simple fade |
| F2 | Ability Card | Tilts with pointer/gyro; keyboard-focusable; click → "enter" transition into site; fallback static card on low-power devices |
| F3 | Nav | Sticky, hides on scroll-down/shows on up; availability pill + live clock (user's timezone-agnostic: shows MY local time) |
| F4 | Menu | Full-screen overlay, staggered link reveal, focus trap, Esc closes, 7 links |
| F5 | Doors wall | Drag/swipe/wheel-to-horizontal; door hover opens slightly; click opens category; snap on mobile; keyboard arrows |
| F6 | Story timeline | Scroll-pinned; active item changes with scroll; number counter animates `01/05`; each item: dates, title, org, 2 bullets |
| F7 | Category page | Hero, project grid (filter by tag), each card → case study |
| F8 | Case study | Problem, role, stack, process, visuals, outcome, live/repo links, next-project link |
| F9 | Contact flow | Step 1 pick need (chips) → Step 2 details (name, email, message, budget optional) → Step 3 success. Validates, honeypot, rate-limited, stores in DB, emails me, auto-reply to sender; mailto fallback |
| F10 | Resume | One-click PDF; tracked event |
| F11 | Theme | Dark default, light option, persists, no flash |
| F12 | SEO/Analytics | Metadata per page, JSON-LD, sitemap, privacy-friendly analytics |
| F13 | Responsive | 360px → 2560px, no horizontal scroll (except designed ones) |
| F14 | Accessibility | WCAG 2.2 AA, reduced-motion alternative for every animation |

## 6. Content Requirements
Hero line, tagline, about/story, 5 experiences, 3-8 projects, skills list, testimonials (optional), resume, social links. All placeholders in `PROJECT_CHUNKS.md`.

## 7. Non-Functional
Performance (LCP < 2.0s, CLS < 0.05, INP < 200ms), security (OWASP basics), privacy (no cookie banner needed if cookieless analytics), uptime 99.9% (Vercel).

## 8. Risks
| Risk | Mitigation |
|---|---|
| Heavy animation hurts mobile perf | Budget per page, lazy-load 3D/GSAP, device-tier fallbacks |
| Copying reference design | Original identity; reuse only patterns |
| Over-engineering | Chunked delivery; ship v1 first |
| Spam in contact form | Honeypot + Turnstile + rate limit |

## 9. Milestones
See `DEVELOPMENT_ROADMAP.md`.


## Candidate-specific Content
- Role positioning: AI/ML Engineer | Full-Stack Developer | Applied AI & Agentic Systems.
- Featured work: HireTrack, DEFEND-X, Krishi Sakhi, DermaAI, AI-Powered Public Transport Demand Forecasting, Campus AI Assistant.
- See `/docs/PROFILE_AND_POSITIONING.md` and `/docs/SELECTED_PROJECTS.md` for grounded copy and confirmation flags.
- Portfolio categories: AI & Machine Learning, LLM & Agentic Systems, Full-Stack Products, Computer Vision & Generative AI, Engineering & Experiments.
