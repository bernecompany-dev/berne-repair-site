type Bucket = { count: number; resetAt: number };

const BUCKETS = new Map<string, Bucket>();
/** Global circuit-breaker — burst-flood from many IPs still gets capped. */
let GLOBAL = { count: 0, resetAt: 0 };

function gc(now: number) {
  // Opportunistic cleanup to avoid unbounded growth on long-lived instances.
  for (const [key, b] of BUCKETS) if (b.resetAt < now) BUCKETS.delete(key);
}

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  if (BUCKETS.size > 1000) gc(now);
  const bucket = BUCKETS.get(key);
  if (!bucket || bucket.resetAt < now) {
    const fresh = { count: 1, resetAt: now + windowMs };
    BUCKETS.set(key, fresh);
    return { ok: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }
  bucket.count += 1;
  return {
    ok: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

/** Circuit-breaker: total submissions across all IPs in a rolling window. */
export function globalRateLimit({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}): { ok: boolean } {
  const now = Date.now();
  if (GLOBAL.resetAt < now) {
    GLOBAL = { count: 1, resetAt: now + windowMs };
    return { ok: true };
  }
  GLOBAL.count += 1;
  return { ok: GLOBAL.count <= limit };
}
