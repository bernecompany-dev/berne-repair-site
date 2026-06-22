import { NextRequest, NextResponse } from "next/server";

/**
 * Reverse proxy for Angi lead delivery (push webhook). Angi POSTs each lead's
 * JSON here; we forward it to the internal cum-api receiver on NYC1 (no TLS,
 * IP-only). The secret in the path IS the auth — cum-api validates it and
 * ignores everything else:
 *   https://www.berne-repair.com/angi-lead/<secret>
 *   → http://157.245.95.117:8000/angi/lead/<secret>
 * Unlike the ads-dash proxy this one forwards the request BODY (the lead JSON).
 */
const UPSTREAM = "http://157.245.95.117:8000/angi/lead/";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const path = (await params).path ?? [];
  const target = UPSTREAM + path.map(encodeURIComponent).join("/");
  const body = await req.arrayBuffer();
  const upstream = await fetch(target, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": req.headers.get("content-type") ?? "application/json",
    },
    body,
  });
  const out = await upstream.arrayBuffer();
  return new NextResponse(out, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

// Some webhook providers GET the URL to verify reachability before enabling.
export async function GET() {
  return NextResponse.json({ ok: true }, { headers: { "x-robots-tag": "noindex, nofollow" } });
}
