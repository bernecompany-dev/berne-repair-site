import { ImageResponse } from "next/og";
import { articleBySlug, ARTICLES } from "@/lib/blog/articles";
import { COMPANY } from "@/data/company";

export const runtime = "nodejs";
export const alt = "Berne Appliance Repair — blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);

  const title = article?.title ?? "Berne Appliance Repair";
  const trimmedTitle =
    title.length > 110 ? `${title.slice(0, 107)}…` : title;
  const readingLine = article
    ? `${article.readingMinutes} min read · By Eugene Berne`
    : "Premium appliance repair · South Florida";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0a0f1a 0%, #0e1525 60%, #122044 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #facc15 0%, #b45309 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "#0a0f1a",
            }}
          >
            B
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            <span>Berne</span>
            <span style={{ color: "#facc15" }}>Repair</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(250, 204, 21, 0.12)",
              border: "1px solid rgba(250, 204, 21, 0.4)",
              color: "#fde68a",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Field Guide · Berne Journal
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              maxWidth: 1040,
            }}
          >
            {trimmedTitle}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              maxWidth: 980,
              lineHeight: 1.3,
            }}
          >
            {readingLine}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#cbd5e1",
          }}
        >
          <span>{COMPANY.phone.display}</span>
          <span>Same-day · 4.79/5 on 1,373 reviews</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
