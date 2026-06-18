"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full interactive Service Map — KPI cards + a MapLibre GL map of every
 * completed service call (offset to neighborhood level for privacy), with a
 * Pins/Heatmap toggle and fitBounds to the whole coverage footprint.
 *
 * Ported from berne-commercial's components/service-map.tsx. The MapLibre
 * logic is framework-agnostic and copied verbatim; the styling is reworked to
 * match the berne-repair dark-navy / blue-brand theme (brand pins, not the
 * commercial orange). MapLibre CSS is injected via a CDN <link> and the
 * library is dynamically imported so it never weighs on initial JS / LCP.
 */

type Kpis = {
  completed: number;
  totalJobs: number;
  citiesServed: string | number;
  zipsCovered: number;
  avgTicketUsd: number;
  repeatCustomers: number;
  customers: number;
  sinceYear: string;
  lastMonthCount: number | null;
};
type MapData = {
  kpis: Kpis;
  cities: { name: string; count: number }[];
  zipMarkers: { zip: string; count: number; lat: number; lng: number; city?: string }[];
  points: [number, number][];
};

const fmt = (n: number) => n.toLocaleString("en-US");

function Kpi({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5 text-center">
      <div className="text-3xl font-semibold tracking-tight text-brand">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      {sub ? <div className="mt-0.5 text-xs text-muted-foreground/70">{sub}</div> : null}
    </div>
  );
}

export function ServiceMap() {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [d, setD] = useState<MapData | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [mode, setMode] = useState<"pins" | "heat">("pins");

  useEffect(() => {
    let map: any;
    let cancelled = false;
    (async () => {
      try {
        if (!document.getElementById("maplibre-css")) {
          const l = document.createElement("link");
          l.id = "maplibre-css";
          l.rel = "stylesheet";
          l.href = "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css";
          document.head.appendChild(l);
        }
        const data: MapData = await (await fetch("/service-map.json")).json();
        if (cancelled) return;
        setD(data);
        const maplibregl: any = (await import("maplibre-gl")).default;
        if (cancelled || !ref.current) return;
        map = new maplibregl.Map({
          container: ref.current,
          style: "https://tiles.openfreemap.org/styles/liberty",
          center: [-80.22, 26.05],
          zoom: 8.6,
        });
        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        map.on("load", () => {
          const fc = {
            type: "FeatureCollection",
            features: data.points.map((p) => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: p },
              properties: {},
            })),
          };
          map.addSource("pts", { type: "geojson", data: fc });

          // PINS — thousands of individual service locations (the "swarm")
          map.addLayer({
            id: "dots",
            type: "circle",
            source: "pts",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 2, 11, 3.2, 15, 5],
              "circle-color": "#2563eb",
              "circle-opacity": 0.55,
              "circle-stroke-color": "#1e40af",
              "circle-stroke-width": 0.4,
            },
          });

          // HEATMAP — hidden by default; toggled on
          map.addLayer({
            id: "heat",
            type: "heatmap",
            source: "pts",
            maxzoom: 15,
            layout: { visibility: "none" },
            paint: {
              "heatmap-weight": 0.5,
              "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 8, 1, 15, 3],
              "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 8, 14, 15, 34],
              "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0.85, 14, 0.5],
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(0,0,0,0)",
                0.2, "#bfdbfe",
                0.4, "#60a5fa",
                0.6, "#3b82f6",
                0.8, "#2563eb",
                1, "#1e40af",
              ],
            },
          });

          // Frame ALL coverage (South FL + Tampa/Sarasota/West coast), not a fixed center.
          if (data.points.length) {
            let minX = 180, minY = 90, maxX = -180, maxY = -90;
            for (const [x, y] of data.points) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
            map.fitBounds([[minX, minY], [maxX, maxY]], { padding: 50, duration: 0, maxZoom: 11 });
          }
        });
      } catch (e: any) {
        if (!cancelled) setErr(String(e?.message || e));
      }
    })();
    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, []);

  // toggle layer visibility
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer || !map.getLayer("dots")) return;
    try {
      map.setLayoutProperty("dots", "visibility", mode === "pins" ? "visible" : "none");
      map.setLayoutProperty("heat", "visibility", mode === "heat" ? "visible" : "none");
    } catch {}
  }, [mode, d]);

  const k = d?.kpis;

  return (
    <section className="container-prose py-12 sm:py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Kpi value={k ? fmt(k.totalJobs) + "+" : "—"} label="Service calls" sub="records since 2023" />
        <Kpi value={k && k.lastMonthCount != null ? fmt(k.lastMonthCount) : "—"} label="Last 30 days" />
        <Kpi value={k ? String(k.citiesServed) : "—"} label="Cities served" />
        <Kpi value={k ? String(k.zipsCovered) : "—"} label="ZIP codes covered" />
        <Kpi value={k ? fmt(k.repeatCustomers) : "—"} label="Repeat customers" />
      </div>

      <div className="mt-8">
        <div className="mb-3 inline-flex rounded-lg border border-border bg-card/40 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("pins")}
            className={`rounded-md px-4 py-1.5 font-medium transition ${mode === "pins" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"}`}
          >
            Pins
          </button>
          <button
            type="button"
            onClick={() => setMode("heat")}
            className={`rounded-md px-4 py-1.5 font-medium transition ${mode === "heat" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"}`}
          >
            Heatmap
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border">
          <div
            ref={ref}
            className="h-[480px] w-full sm:h-[600px]"
            aria-label="Map of completed appliance repairs across South Florida"
          />
          {err ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 p-6 text-center text-sm text-muted-foreground">
              Map failed to load ({err}). Coverage spans Miami-Dade, Broward, Palm Beach, plus Tampa Bay and Sarasota.
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Each pin marks a service call, offset to the neighborhood level for customer
        privacy — no exact addresses.{" "}
        {k ? fmt(k.totalJobs) + "+ service calls since " + (k.sinceYear || "2022") + "." : ""}
      </p>
    </section>
  );
}
