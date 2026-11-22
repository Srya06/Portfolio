import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Surya D — AI/ML Engineer";
  const category = searchParams.get("category") || "Applied AI & Full-Stack";
  const description =
    searchParams.get("description") ||
    "Building useful AI products from models, data, and software.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: "#0E0E10",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(0, 240, 255, 0.12), transparent 45%), radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.08), transparent 45%)",
          fontFamily: "sans-serif",
          color: "#F4F2EE",
        }}
      >
        {/* Header bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#00F0FF",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontFamily: "monospace",
                color: "#00F0FF",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Surya D // {category}
            </span>
          </div>

          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(23, 23, 26, 0.8)",
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#A09C94",
            }}
          >
            6 Verified Repositories
          </div>
        </div>

        {/* Headline & Abstract */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h1
            style={{
              fontSize: "58px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#F4F2EE",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#A09C94",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "960px",
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "32px", fontSize: "18px", color: "#A09C94" }}>
            <span>• Applied AI &amp; ML</span>
            <span>• Agentic LLM Systems</span>
            <span>• Full-Stack Web</span>
          </div>

          <span
            style={{
              fontSize: "20px",
              fontFamily: "monospace",
              color: "#00F0FF",
            }}
          >
            suryad.dev
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
