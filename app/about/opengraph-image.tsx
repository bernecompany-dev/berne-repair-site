import { ImageResponse } from "next/og";
import { COMPANY } from "@/data/company";

export const runtime = "nodejs";
export const alt = "About Berne Appliance Repair — 11 years, 18 technicians, South Florida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
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

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
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
            About Berne
          </div>
          <div
            style={{
              fontSize: 86,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              maxWidth: 1040,
            }}
          >
            11 years. 18 W-2 technicians. One Berne.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#94a3b8",
              maxWidth: 1000,
              lineHeight: 1.35,
            }}
          >
            29,000+ South Florida service tickets — premium appliance repair done by a single in-house team.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#cbd5e1",
          }}
        >
          <span>{COMPANY.phone.display}</span>
          <span>4.79/5 on 871 reviews · Licensed & insured</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
