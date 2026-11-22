# TESTING.md

## 1. Strategy
Test pyramid: many fast unit tests → targeted component tests → a handful of high-value E2E flows → automated perf/a11y gates. Manual device checks before launch.

## 2. Unit & Component (Vitest + Testing Library)
| Target | Cases |
|---|---|
| `validators.ts` (Zod) | valid payload; short name; bad email; message too short/long; consent false; honeypot filled |
| `hashIp`, `seo` helpers | deterministic hash; metadata builder output |
| `useLocalTime` | formats in `NEXT_PUBLIC_MY_TIMEZONE`; updates on tick (fake timers) |
| `Clock`, `AvailabilityPill` | renders text; aria-live not noisy |
| `StoryTimeline` data → UI | renders N items; counter shows `01/0N`; reduced-motion renders list |
| `ContactFlow` | step progression; back button; inline errors; disabled submit while pending; success + error states |
| `Menu` | opens/closes; Esc closes; focus trap; returns focus |
Coverage target: ≥ 80% on `/lib`, `/hooks`, form logic.

## 3. API Tests (Vitest, mocked Supabase/Resend/Upstash/Turnstile)
| Case | Expect |
|---|---|
| Valid submit | 201, row inserted, 2 emails sent |
| Invalid body | 400 + `fields` |
| Honeypot filled | 403, no insert |
| Turnstile fails | 403 |
| 6th request in 1h | 429 + `Retry-After` |
| Email provider throws | row kept, 500 or 201 with `status=new` (per ADR), error logged |
| Oversized payload | 413/400 |

## 4. E2E (Playwright: Chromium, WebKit, Firefox; Pixel 7 + iPhone 14 viewports)
1. **Home loads:** preloader reaches 100% → hero visible → no console errors.
2. **Hire flow:** click "Hire me" → choose need → fill form → submit (mock API) → success state.
3. **Doors:** drag/keyboard to a door → click → category page → open project → "next project".
4. **Story:** scroll → counter advances 01→05.
5. **Menu:** open, navigate to each link, Esc/close, focus returns.
6. **Theme:** toggle persists after reload, no flash.
7. **Resume:** click triggers download + event call.
8. **404:** unknown route shows custom 404 with home link.
9. **Reduced motion:** emulate `prefers-reduced-motion: reduce` → no pin/tilt, content fully usable.

## 5. Accessibility
- `@axe-core/playwright` on every route in both themes: **0 serious/critical violations**.
- Keyboard-only pass through every interaction.
- Screen reader smoke test (VoiceOver iOS + NVDA).
- 200% zoom and 320px width: no clipped content.
- Contrast check on both themes.

## 6. Performance (Lighthouse CI budgets, mobile)
| Metric | Budget |
|---|---|
| Performance / A11y / Best Practices / SEO | ≥ 95 each |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP / TBT | < 200ms / < 200ms |
| Initial JS (gzip) | < 170KB |
| Hero image | < 150KB (AVIF/WebP) |
Manual: Chrome Performance panel while scrolling doors + story on a throttled (4x CPU) profile: sustained ≥ 55fps.

## 7. Visual Regression (optional)
Playwright screenshots of hero, doors, story, contact modal at 3 breakpoints; review diffs on PRs.

## 8. Security Checks
`npm audit`, header scan (securityheaders.com), try XSS payloads in the form, confirm service key is absent from client bundle, confirm RLS blocks anon reads on `contact_messages`.

## 9. Cross-Browser/Device Matrix
Chrome, Safari (macOS + iOS), Firefox, Edge; one low-end Android. Verify Lenis, 3D transforms, `100dvh`, gyro permission flow.

## 10. CI Pipeline
`lint → typecheck → unit → build → e2e → lhci`. Block merge on failure.

## 11. Pre-Launch Manual Checklist
- [ ] All links work (internal + social) · [ ] No placeholder text/images · [ ] Forms deliver to real inbox + spam folder checked
- [ ] OG previews correct · [ ] Favicon/PWA icons · [ ] Print-friendly resume · [ ] 404/500 pages · [ ] Console clean
