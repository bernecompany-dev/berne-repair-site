"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight, LCP-safe service-map embed for city / area pages.
 *
 * Unlike the full <ServiceMap />, this renders ONLY the pin "swarm" centered
 * on a city ([lng,lat], zoom 11) — no KPIs, no Pins/Heatmap toggle, no
 * fitBounds. It does NOT load maplibre-gl until the section actually scrolls
 * into view (IntersectionObserver) and then dynamically imports the library +
 * injects its CSS via a CDN <link>. Nothing here can affect initial render or
 * LCP. The /service-map.json fetch reuses the browser's HTTP cache, so a user
 * who later visits /service-map pays no extra download.
 */

type MapData = { points: [number, number][] };

export function ServiceMapEmbed({
  center,
  zoom,
  heightClass = "h-[320px] sm:h-[380px]",
}: {
  center: [number, number];
  zoom: number;
  heightClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Only start loading once the container is near/within the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
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
        const maplibregl: any = (await import("maplibre-gl")).default;
        if (cancelled || !ref.current) return;
        map = new maplibregl.Map({
          container: ref.current,
          style: "https://tiles.openfreemap.org/styles/liberty",
          center,
          zoom,
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        map.on("load", () => {
          map.addSource("pts", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: data.points.map((p) => ({
                type: "Feature",
                geometry: { type: "Point", coordinates: p },
                properties: {},
              })),
            },
          });
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
        });
      } catch {
        // Silent — the labeled section + /service-map link still convey coverage.
      }
    })();
    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [visible, center, zoom]);

  return (
    <div
      ref={ref}
      className={`${heightClass} w-full overflow-hidden rounded-2xl border border-border bg-card`}
      aria-label="Map of nearby completed appliance repairs"
    />
  );
}
