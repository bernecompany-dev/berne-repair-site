import { ImageResponse } from "next/og";
import { COMPANY } from "@/data/company";

export const runtime = "nodejs";
export const alt = "Berne Repair — premium appliance repair in South Florida";
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
                "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
            }}
          >
            B
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            <span>Berne</span>
            <span style={{ color: "#60a5fa" }}>Repair</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(96, 165, 250, 0.15)",
              border: "1px solid rgba(96, 165, 250, 0.4)",
              color: "#93c5fd",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {`$${COMPANY.serviceCallPrice} SERVICE CALL · SAME-DAY`}
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.02,
              maxWidth: 1000,
            }}
          >
            Premium appliance repair across South Florida.
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
          <div>{COMPANY.phone.display}</div>
          <div>Miami · Fort Lauderdale · West Palm Beach</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
