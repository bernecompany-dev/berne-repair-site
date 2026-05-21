"use client";

import { usePathname } from "next/navigation";

/**
 * Floating WhatsApp click-to-chat button.
 *
 * - Fixed bottom-right (16px), z-index 9998 (below cookie banner at 9999).
 * - On mobile we shift to bottom-left so we don't collide with the sticky
 *   phone CTA bar which fills the bottom on small screens.
 * - Pre-fills a context-aware greeting derived from the current pathname.
 * - Tracks clicks via gtag (`whatsapp_click`) + fbq (`Contact` custom event)
 *   when those globals are present.
 *
 * Phase 1 (free): targets Eugene's personal WhatsApp number — no API,
 * no WhatsApp Business app, just wa.me deep-link.
 */

const PHONE = "17869447518"; // E.164 minus the "+", WhatsApp-only

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const APPLIANCE_GREETINGS: Array<{ match: RegExp; greeting: (locale: "en" | "es") => string }> = [
  { match: /refrigerator/, greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con el refrigerador" : "Hi! I have a refrigerator issue" },
  { match: /freezer/,      greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con el congelador" : "Hi! I have a freezer issue" },
  { match: /washer/,       greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con la lavadora" : "Hi! I have a washer issue" },
  { match: /dryer/,        greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con la secadora" : "Hi! I have a dryer issue" },
  { match: /dishwasher/,   greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con el lavavajillas" : "Hi! I have a dishwasher issue" },
  { match: /oven/,         greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con el horno" : "Hi! I have an oven issue" },
  { match: /stove|range|cooktop/, greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con la estufa" : "Hi! I have a stove/range issue" },
  { match: /microwave/,    greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con el microondas" : "Hi! I have a microwave issue" },
  { match: /ice[-_]?maker/,greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con el fabricador de hielo" : "Hi! I have an ice maker issue" },
  { match: /wine[-_]?cooler/, greeting: (l) => l === "es" ? "¡Hola! Tengo un problema con el enfriador de vinos" : "Hi! I have a wine cooler issue" },
];

const BRAND_LABELS: Record<string, string> = {
  "sub-zero": "Sub-Zero", "wolf": "Wolf", "viking": "Viking", "thermador": "Thermador",
  "miele": "Miele", "bosch": "Bosch", "kitchenaid": "KitchenAid", "ge-monogram": "GE Monogram",
};

function pickGreeting(rawPath: string): string {
  const path = rawPath.toLowerCase().replace(/\/+$/, "");
  const locale: "en" | "es" = path.startsWith("/es") ? "es" : "en";
  const p = locale === "es" ? path.replace(/^\/es/, "") : path;

  if (p === "" || p === "/") {
    return locale === "es"
      ? "¡Hola! Me gustaría programar servicio premium de electrodomésticos"
      : "Hi! I'd like to schedule premium appliance service";
  }

  // Brand pages — promote premium tone.
  for (const [slug, label] of Object.entries(BRAND_LABELS)) {
    if (new RegExp(`(^|/)${slug}(/|-|$)`).test(p)) {
      return locale === "es"
        ? `¡Hola! Quiero programar servicio premium para mi electrodoméstico ${label}`
        : `Hi! I'd like to schedule premium ${label} appliance service`;
    }
  }

  // Appliance hubs.
  for (const { match, greeting } of APPLIANCE_GREETINGS) {
    if (match.test(p)) {
      return greeting(locale);
    }
  }

  // Service-area / city pages.
  const cityMatch = p.match(/(?:areas?|service-areas?)\/([a-z][a-z-]+)/);
  if (cityMatch) {
    const city = cityMatch[1].split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return locale === "es"
      ? `¡Hola! Necesito servicio premium de electrodomésticos en ${city}`
      : `Hi! I need premium appliance service in ${city}`;
  }

  if (/contact/.test(p)) {
    return locale === "es"
      ? "¡Hola! Tengo una pregunta sobre reparación de electrodomésticos"
      : "Hi! I have a question about appliance repair";
  }
  if (/request-dispatch|dispatch/.test(p)) {
    return locale === "es"
      ? "¡Hola! Me gustaría solicitar un técnico"
      : "Hi! I'd like to request a technician";
  }

  return locale === "es"
    ? "¡Hola! Me gustaría programar servicio premium de electrodomésticos"
    : "Hi! I'd like to schedule premium appliance service";
}

export function WhatsAppFab() {
  const pathname = usePathname() ?? "/";
  const message = pickGreeting(pathname);
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  function handleClick() {
    try {
      window.gtag?.("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: pathname,
      });
      window.fbq?.("trackCustom", "Contact", {
        method: "whatsapp",
        page: pathname,
      });
    } catch {
      /* swallow analytics errors */
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Chat with Berne Appliance Repair on WhatsApp"
      data-analytics="whatsapp-fab"
      onClick={handleClick}
      className="berne-whatsapp-fab fixed bottom-4 z-[9998] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-150 ease-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 right-4 lg:right-4 max-lg:left-4 max-lg:right-auto motion-reduce:transition-none motion-reduce:hover:scale-100"
      style={{ backgroundColor: "#25D366" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1ebe57")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
    >
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[30px] w-[30px] fill-white"
      >
        <path d="M19.11 17.62c-.27-.13-1.58-.78-1.83-.87-.25-.09-.42-.13-.6.14-.18.27-.69.87-.84 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.33-.79-.71-1.33-1.58-1.48-1.85-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.83-1.99-.22-.52-.44-.45-.6-.46-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.62 1.11 2.8.13.18 1.91 2.91 4.62 4.08.65.28 1.15.44 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.58-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31zM16.05 26.13h-.01c-1.83 0-3.62-.49-5.18-1.42l-.37-.22-3.86 1.01 1.03-3.76-.24-.39a10.05 10.05 0 0 1-1.55-5.35c0-5.55 4.52-10.07 10.18-10.07 2.72 0 5.27 1.06 7.19 2.98a10.07 10.07 0 0 1 2.98 7.18c0 5.55-4.52 10.04-10.17 10.04zm8.66-18.7A12.04 12.04 0 0 0 16.05 4C9.36 4 3.92 9.44 3.92 16.13c0 2.14.56 4.22 1.63 6.06L3.8 28l5.99-1.57a12.07 12.07 0 0 0 5.78 1.47h.01c6.69 0 12.13-5.44 12.13-12.13 0-3.24-1.26-6.29-3.55-8.58z" />
      </svg>
    </a>
  );
}
