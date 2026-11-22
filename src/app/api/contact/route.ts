import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";

// In-memory rate limiter: IP -> timestamps array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps older than 1 hour
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "127.0.0.1";

    // 1. Rate Limit Gate
    const allowed = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many submissions. Please try again in an hour or email directly.",
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": "3600",
          },
        }
      );
    }

    const body = await req.json();

    // 2. Honeypot Bot Gate
    if (body.company && body.company.trim().length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "BOT_SUSPECTED",
            message: "Automated submission rejected.",
          },
        },
        { status: 403 }
      );
    }

    // 3. Zod Server Validation
    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parseResult.error.issues) {
        const fieldName = issue.path[0]?.toString() || "form";
        fieldErrors[fieldName] = issue.message;
      }

      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "VALIDATION",
            fields: fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const validData = parseResult.data;
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Optional Supabase persistence if credentials are configured
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: messageId,
            need: validData.need,
            name: validData.name,
            email: validData.email,
            message: validData.message,
            budget: validData.budget || null,
            consent: validData.consent,
            user_agent: req.headers.get("user-agent") || null,
            status: "new",
          }),
        });
      } catch (dbErr) {
        // Log DB warning without failing user flow
        console.warn("[Contact API] Supabase insert note:", dbErr);
      }
    }

    // Optional Resend email notification if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_TO_EMAIL || "sryaraj06@gmail.com",
            reply_to: validData.email,
            subject: `Portfolio Inquiry: ${validData.need} from ${validData.name}`,
            text: `Name: ${validData.name}\nEmail: ${validData.email}\nNeed: ${validData.need}\nBudget: ${validData.budget || "N/A"}\n\nMessage:\n${validData.message}`,
          }),
        });
      } catch (emailErr) {
        console.warn("[Contact API] Resend email note:", emailErr);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        id: messageId,
        message: "Your message has been safely received. Surya will reply shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "SERVER",
          message: "Internal server error. Please email directly at sryaraj06@gmail.com",
        },
      },
      { status: 500 }
    );
  }
}
