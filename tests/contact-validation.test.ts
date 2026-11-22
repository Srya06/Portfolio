import { describe, it, expect } from "vitest";
import { contactFormSchema } from "@/lib/validators";

describe("Contact Form Validation Schema", () => {
  const validPayload = {
    need: "ai-ml",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    message: "We would like to discuss building an LLM agentic workflow for legal documents.",
    budget: "$2,000 — $5,000",
    consent: true as const,
    company: "",
  };

  it("accepts a valid payload", () => {
    const result = contactFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects empty or too short name", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      name: "A",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 2 characters");
    }
  });

  it("rejects invalid email address", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("valid email address");
    }
  });

  it("rejects short message under 10 characters", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      message: "Hello",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 10 characters");
    }
  });

  it("rejects missing consent", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects honeypot submission when company field is populated", () => {
    const result = contactFormSchema.safeParse({
      ...validPayload,
      company: "SpamBot Inc",
    });
    expect(result.success).toBe(false);
  });

  it("allows omitting optional budget", () => {
    const { budget: _b, ...withoutBudget } = validPayload;
    const result = contactFormSchema.safeParse(withoutBudget);
    expect(result.success).toBe(true);
  });
});
