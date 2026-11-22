# DEVELOPMENT_ROADMAP.md

Total: ~4 weeks part-time (adjust to your pace). Each phase ends with a deployable preview.

| Phase | Days | Goal | Exit Criteria |
|---|---|---|---|
| 0. Setup | 1-2 | Repo, tooling, tokens, docs in `/docs`, CI | `npm run build` green; Vercel preview live |
| 1. Foundation | 3-4 | Layout, fonts, theme, Lenis, nav/menu shell, footer | Smooth scroll + theme works; Lighthouse ≥ 95 on empty shell |
| 2. Hero | 5-8 | Preloader, Ability Card, headline, CTAs, availability + clock | F1, F2, F3 acceptance met |
| 3. Doors | 9-12 | Doors wall + category pages + routing + transitions | F5, F7 met; 60fps on mid phone |
| 4. Story | 13-15 | Timeline + counter + data | F6 met; reduced-motion fallback |
| 5. Projects | 16-18 | Project grid, case-study template, content for 3+ projects | F8 met |
| 6. Contact | 19-21 | Flow UI, API, DB, email, Turnstile, rate limit | F9 met; E2E passes |
| 7. Polish | 22-25 | Cursor, magnetics, page transitions, micro-interactions, copy pass | Design review checklist ✔ |
| 8. SEO/A11y/Perf | 26-27 | Metadata, JSON-LD, OG, axe, bundle diet | Lighthouse ≥ 95; axe 0 violations |
| 9. Launch | 28 | Domain, analytics, Sentry, resume, share | Prod live, monitored |

## Milestone Gates
- **M1 (end Ph 2):** "Wow" first screen demo.
- **M2 (end Ph 4):** Home complete.
- **M3 (end Ph 6):** Feature complete.
- **M4 (end Ph 9):** Public launch.

## Post-Launch (v2 backlog)
Blog (MDX), ⌘K command palette, case-study CMS, testimonials carousel, guestbook, i18n, newsletter, easter eggs.

## Launch Checklist
- [ ] Real photos replace all placeholders
- [ ] Resume PDF updated
- [ ] All `[PLACEHOLDER]` removed (`grep -r "\[YOUR" src`)
- [ ] OG image checked in LinkedIn/WhatsApp/X debuggers
- [ ] Domain + HTTPS + www redirect
- [ ] Search Console + sitemap submitted
- [ ] Contact flow tested end-to-end in prod
- [ ] Share on LinkedIn, GitHub README, resume header, email signature


## Portfolio-specific execution notes
- Populate typed project and profile content from `PROFILE_AND_POSITIONING.md` and `SELECTED_PROJECTS.md`.
- Do not generate three placeholder projects per category once the selected real project catalogue is available; display categories only when there are real entries.
- Create project case-study templates with explicit `Prototype`, `Academic`, `In progress`, or `Completed` statuses.
- Before launch, audit all six featured repository READMEs/source trees and replace every `CONFIRM` item.
