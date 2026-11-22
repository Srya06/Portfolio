import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

describe("POST /api/contact Route Handler", () => {
  const createRequest = (body: Record<string, unknown>, ip = "127.0.0.1") => {
    return new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify(body),
    });
  };

  const validPayload = {
    need: "ai-ml",
    name: "Dr. Evelyn Reed",
    email: "evelyn.reed@example.org",
    message: "Inquiring about collaboration on deep learning time-series models.",
    budget: "$2,000 — $5,000",
    consent: true,
    company: "",
  };

  it("returns 201 and an id when given valid payload", async () => {
    const req = createRequest(validPayload, "10.0.0.1");
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.ok).toBe(true);
    expect(data.id).toMatch(/^msg_/);
  });

  it("returns 403 BOT_SUSPECTED when honeypot field 'company' is filled", async () => {
    const req = createRequest(
      {
        ...validPayload,
        company: "SpamBot 3000",
      },
      "10.0.0.2"
    );
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe("BOT_SUSPECTED");
  });

  it("returns 400 VALIDATION when required fields are missing or invalid", async () => {
    const req = createRequest(
      {
        need: "ai-ml",
        name: "E", // Too short
        email: "not-an-email",
        message: "Hi", // Too short
        consent: false,
      },
      "10.0.0.3"
    );
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe("VALIDATION");
    expect(data.error.fields).toBeDefined();
  });

  it("returns 429 when IP rate limit is exceeded", async () => {
    const uniqueIp = "192.168.100.50";

    // Exhaust the 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const r = createRequest(validPayload, uniqueIp);
      await POST(r);
    }

    // 6th request must trigger rate limit
    const blockedReq = createRequest(validPayload, uniqueIp);
    const response = await POST(blockedReq);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe("RATE_LIMITED");
    expect(response.headers.get("Retry-After")).toBe("3600");
  });
});
