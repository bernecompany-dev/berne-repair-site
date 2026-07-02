import { NextRequest, NextResponse } from "next/server";

/**
 * Reverse proxy for the internal Berne Ads dashboard (NYC1 cum-api :8000).
 * Gives the dashboard a branded HTTPS URL — the droplet itself has no TLS
 * and is reachable only by raw IP:
 *   https://www.berne-repair.com/ads-dash/<secret>.html
 *   → http://157.245.95.117:8000/dash/<secret>
 *
 * Auth model is unchanged: the secret filename IS the password (same as
 * hitting the IP directly), so the proxy adds no new exposure. POST is
 * forwarded for the dashboard's killswitch button. Never cached — the
 * page is regenerated server-side 3×/day and must always be fresh.
 */
const UPSTREAM = "http://157.245.95.117:8000/dash/";

export const dynamic = "force-dynamic";

async function proxy(req: NextRequest, path: string[]) {
  // Dot segments ("." / "..") survive encodeURIComponent and get collapsed
  // by URL normalization inside fetch — "/dash/../x" would escape the /dash/
  // prefix and reach arbitrary paths on the upstream. Reject them outright.
  if (path.some((seg) => seg === "." || seg === "..")) {
    return new NextResponse("Not found", { status: 404 });
  }
  const target = UPSTREAM + path.map(encodeURIComponent).join("/");
  // Review C1/H8: forward the X-Dash-Key control PIN so the upstream can
  // authenticate control actions. The proxy itself stays dumb (upstream
  // enforces), but without forwarding the header, control would 403.
  const fwd: Record<string, string> = {};
  const dashKey = req.headers.get("x-dash-key");
  if (dashKey) fwd["X-Dash-Key"] = dashKey;
  const upstream = await fetch(target, {
    method: req.method,
    cache: "no-store",
    headers: fwd,
    // body only matters for POST (killswitch) — it is empty there anyway
  });
  const body = await upstream.arrayBuffer();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, (await params).path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, (await params).path);
}
