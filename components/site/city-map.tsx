import { MapPin } from "lucide-react";

/**
 * Google Maps embed with a pin at the city's geo coordinates.
 * Uses the keyless /maps?output=embed endpoint — no API key, free.
 * For higher-fidelity embeds (search box, custom styling) we'd switch to
 * Maps JS API with `NEXT_PUBLIC_GMAPS_KEY` and the Maps Embed API.
 */
export function CityMap({
  cityName,
  lat,
  lng,
  zoom = 12,
  className,
}: {
  cityName: string;
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
}) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`;
  return (
    <div className={className}>
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="size-4 text-brand" aria-hidden />
        <span>Service coverage centered on {cityName}, FL</span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <iframe
          title={`${cityName}, FL — Berne Appliance Repair service area`}
          src={src}
          width="100%"
          height="380"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          className="block w-full"
        />
      </div>
    </div>
  );
}
