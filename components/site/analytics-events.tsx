"use client";

import { useEffect } from "react";

/**
 * Global GA4 conversion-event wiring.
 *
 * The site loads GA4 via `<GoogleAnalytics>` (@next/third-parties), which
 * exposes `window.gtag`. Lead-form success fires `generate_lead` from inside
 * the form component (it's React state, not a DOM click). The two click-based
 * conversions are wired here with a single delegated listener so we don't have
 * to thread `onClick` handlers through ~25 server-rendered pages that all
 * render plain `tel:` / WhatsApp anchors.
 *
 * Event names are kept consistent across the Berne sites:
 *   - phone_call      → any `tel:` link / call button
 *   - whatsapp_click  → any WhatsApp link (the floating FAB fires its own, so
 *                       it is excluded here to avoid double-counting)
 *
 * Mirrors the existing delegated-listener pattern in meta-pixel.tsx.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    // Test/diagnostic hook: lets e2e specs wait for hydration before clicking.
    (window as unknown as { __aeMounted?: boolean }).__aeMounted = true;
    function onClick(e: MouseEvent) {
      const el = e.target instanceof Element ? e.target : null;
      const anchor = el?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || typeof window.gtag !== "function") return;

      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        window.gtag("event", "phone_call", {
          event_category: "engagement",
          event_label: location.pathname,
          phone_number: href.slice("tel:".length),
        });
        return;
      }

      // WhatsApp links. The floating FAB already fires whatsapp_click in its
      // own onClick, so skip it here to avoid a duplicate event.
      const isWhatsApp = /(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)/i.test(href);
      if (isWhatsApp && anchor.getAttribute("data-analytics") !== "whatsapp-fab") {
        window.gtag("event", "whatsapp_click", {
          event_category: "engagement",
          event_label: location.pathname,
        });
      }
    }

    // Capture phase so we still record the click even if a handler upstream
    // calls stopPropagation before the navigation begins.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
