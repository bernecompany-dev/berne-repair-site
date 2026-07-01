// Client-side marketing attribution capture.
//
// Why: HCP lead_source is empty 99.8% of the time and the team can't see which
// channel a web lead came from. This captures the real source at the browser —
// ad click IDs (gclid/Google, msclkid/Bing, fbclid/Meta), utm_* params, the
// referrer, and the landing path — so every form/quick-lead submission carries
// its true channel into the dispatch email (and, later, into HCP/CallRail
// matching for per-channel ROAS).
//
// First-touch is preserved (the channel that originally acquired the visitor)
// AND last-touch is recorded (the channel of the converting session). Stored in
// localStorage so it survives navigation from the landing page to the form page.

const KEY = "berne_attribution_v1"

type Touch = {
  gclid?: string
  msclkid?: string
  fbclid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  referrer?: string
  landing?: string
  ts?: string
}

type Stored = { first?: Touch; last?: Touch }

const PARAM_KEYS: (keyof Touch)[] = [
  "gclid",
  "msclkid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
]

function readCurrentTouch(): Touch | null {
  if (typeof window === "undefined") return null
  const sp = new URLSearchParams(window.location.search)
  const t: Touch = {}
  for (const k of PARAM_KEYS) {
    const v = sp.get(k)?.trim()
    if (v) t[k] = v.slice(0, 200)
  }
  // referrer only counts if it's external (not our own domain)
  const ref = document.referrer || ""
  if (ref && !ref.includes(window.location.host)) t.referrer = ref.slice(0, 200)
  // A touch is "real" if it carries a click id, utm, or an external referrer.
  const hasSignal = PARAM_KEYS.some((k) => t[k]) || !!t.referrer
  if (!hasSignal) return null
  t.landing = window.location.pathname.slice(0, 200)
  return t
}

/** Call on each page load / route change. Sets first-touch once, updates last. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return
  const touch = readCurrentTouch()
  if (!touch) return
  let stored: Stored = {}
  try {
    stored = JSON.parse(localStorage.getItem(KEY) || "{}") as Stored
  } catch {
    stored = {}
  }
  const stamped = { ...touch, ts: new Date().toISOString() }
  if (!stored.first) stored.first = stamped
  stored.last = stamped
  try {
    localStorage.setItem(KEY, JSON.stringify(stored))
  } catch {
    /* private mode — ignore */
  }
}

/**
 * Flat attribution fields to attach to a lead payload. Prefers first-touch for
 * the acquiring channel; falls back to last-touch. Returns {} if nothing known.
 */
export function readAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {}
  let stored: Stored = {}
  try {
    stored = JSON.parse(localStorage.getItem(KEY) || "{}") as Stored
  } catch {
    return {}
  }
  const src = stored.first || stored.last
  if (!src) return {}
  const out: Record<string, string> = {}
  for (const k of PARAM_KEYS) {
    if (src[k]) out[`attr_${k}`] = src[k] as string
  }
  if (src.referrer) out.attr_referrer = src.referrer
  if (src.landing) out.attr_landing = src.landing
  // Carry last-touch source too when it differs (multi-touch context).
  if (stored.last && stored.last.utm_source && stored.last.utm_source !== src.utm_source) {
    out.attr_last_source = stored.last.utm_source
  }
  return out
}
