# API_DOCUMENTATION.md

Base URL: `https://[YOUR_DOMAIN]/api` · Format: JSON · Auth: none (public, protected by Turnstile + rate limit)

## Conventions
- Success: `2xx` with `{ "ok": true, ... }`
- Error: `{ "ok": false, "error": { "code": "STRING", "message": "Human readable", "fields"?: { "email": "Invalid" } } }`
- All inputs validated with Zod server-side. Never trust client validation.

---

## 1. POST `/api/contact`
Submit the "What do you need?" flow.

**Request**
```json
{
  "need": "web",                // web | app | uiux | graphic | photo | question | other
  "name": "Jane Doe",
  "email": "jane@company.com",
  "message": "We need a marketing site...",
  "budget": "$2k-5k",           // optional
  "consent": true,
  "turnstileToken": "xxxx",
  "company": ""                 // HONEYPOT: must be empty
}
```
**Rules:** name 2-80, message 10-2000, valid email, `consent` must be `true`, honeypot empty.

**Responses**
| Status | Meaning | Body |
|---|---|---|
| 201 | Stored + emails queued | `{ "ok": true, "id": "uuid" }` |
| 400 | Validation failed | `{ "ok": false, "error": { "code": "VALIDATION", "fields": {...} } }` |
| 403 | Turnstile failed / honeypot filled | `{ "ok": false, "error": { "code": "BOT_SUSPECTED" } }` |
| 429 | Rate limited (5/hour/IP) | `Retry-After` header set |
| 500 | Server error (message still saved if DB insert succeeded) | `{ "ok": false, "error": { "code": "SERVER" } }` |

**Server algorithm**
1. Parse + Zod validate → 2. honeypot check → 3. Upstash rate limit by hashed IP → 4. verify Turnstile → 5. insert row → 6. send owner notification + auto-reply (Resend) → 7. mark `notified` → 8. `201`.

---

## 2. POST `/api/event`
Optional first-party analytics event (cookieless).

**Request**
```json
{ "name": "resume_download", "path": "/", "meta": { "source": "footer" } }
```
Allowed `name`: `hire_click`, `resume_download`, `door_open`, `contact_start`, `contact_submit`, `outbound_click`.
**Responses:** `204` on success · `400` invalid · `429` rate limited (60/min/IP).

---

## 3. GET `/api/og`
Dynamic Open Graph image (Edge runtime, `@vercel/og`).

**Query:** `title` (≤ 80 chars), `subtitle` (≤ 120), `theme` (`dark|light`)
**Response:** `image/png` 1200x630, `Cache-Control: public, max-age=31536000, immutable` (cache-bust via query).

---

## 4. GET `/resume.pdf`
Static file in `/public`. Client fires `POST /api/event` with `resume_download` before navigation.

---

## 5. Internal Server Utilities (not public)
| Function | Purpose |
|---|---|
| `verifyTurnstile(token, ip)` | Calls Cloudflare siteverify |
| `hashIp(ip)` | `sha256(ip + IP_SALT)` |
| `sendContactEmails(msg)` | Owner notification + sender auto-reply via Resend |
| `ratelimit.limit(key)` | Upstash sliding window |

## 6. Email Templates (React Email)
- **Owner notification:** subject `New enquiry: {need} from {name}`; body: all fields, reply-to = sender.
- **Auto-reply:** subject `Got your message, [YOUR NAME]`; body: thanks, summary, "I reply within [X]".

## 7. Security Headers (applied by `next.config.ts`)
`Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

## 8. cURL Example
```bash
curl -X POST https://[YOUR_DOMAIN]/api/contact \
  -H "Content-Type: application/json" \
  -d '{"need":"web","name":"Jane","email":"jane@x.com","message":"Hello there, need a site","consent":true,"turnstileToken":"test","company":""}'
```
