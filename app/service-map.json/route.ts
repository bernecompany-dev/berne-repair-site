// Edge-cached proxy for the shared service-map dataset (single source on
// bernerepair.com, regenerated weekly by the Miami cron).
//
// Replaces the old bare rewrite proxy, which was NOT edge-cached
// (X-Vercel-Cache: MISS) and re-pulled the ~526KB payload from origin on every
// map view — the dominant source of Vercel "Fast Origin Transfer". This route
// is ISR-cached + carries long s-maxage so the origin is hit ~once/day.

const SOURCE =
  "https://bernerepair.com/wp-content/uploads/data/service-map.json";

// Data changes weekly (Sunday cron) → daily revalidate is plenty fresh.
export const revalidate = 86400;

export async function GET() {
  try {
    const upstream = await fetch(SOURCE, { next: { revalidate } });
    if (!upstream.ok) {
      return new Response("[]", {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "public, max-age=300",
        },
      });
    }
    const body = await upstream.text();
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new Response("[]", {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=300",
      },
    });
  }
}
