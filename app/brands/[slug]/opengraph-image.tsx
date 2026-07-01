import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  RESIDENTIAL_BRAND_PROFILES,
  RESIDENTIAL_BRAND_SLUGS,
  getResidentialBrand,
} from "@/lib/data/residential-brand-profiles";
import { COMPANY } from "@/data/company";

export const runtime = "nodejs";
export const alt = "Berne Appliance Repair — brand specialists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return RESIDENTIAL_BRAND_SLUGS.map((slug) => ({ slug }));
}

const TIER_LABEL: Record<string, string> = {
  premium: "Premium tier · OEM-trained",
  "mid-premium": "Mid-premium · Stocked parts",
  mass: "Mass-market · Daily routes",
};

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getResidentialBrand(slug);
  if (!brand) notFound();

  const badge = TIER_LABEL[brand.tier] ?? "Factory-grade service";
  // best-effort short caption — first equipment series, comma-truncated
  const supportLine = brand.equipment.length
    ? `${brand.equipment
        .slice(0, 2)
        .map((e) => e.series.split("/")[0]?.trim() ?? e.series)
        .join(" · ")} and every major series.`
    : "Built-in, panel-ready and pro-style models.";

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(250, 204, 21, 0.12)",
              border: "1px solid rgba(250, 204, 21, 0.4)",
              color: "#fde68a",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.0,
              maxWidth: 1040,
            }}
          >
            {brand.name}
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 600,
              color: "#facc15",
              letterSpacing: -0.5,
            }}
          >
            Appliance Repair · South Florida
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              maxWidth: 1040,
              lineHeight: 1.35,
            }}
          >
            {supportLine}
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
          <span>{`$${COMPANY.serviceCallPrice} diagnostic · white-glove`}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

// Keep static export keyed off the data file so build-time params line up.
void RESIDENTIAL_BRAND_PROFILES;
