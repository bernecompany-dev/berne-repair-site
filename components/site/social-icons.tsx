import type { Locale } from "@/lib/i18n";

type SocialLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const Icon = (path: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden focusable="false">
    {path}
  </svg>
);

const ICONS = {
  google: Icon(
    <path d="M21.35 11.1H12v3.21h5.39c-.23 1.43-1.65 4.2-5.39 4.2A6.3 6.3 0 0 1 5.7 12 6.3 6.3 0 0 1 12 5.7c1.83 0 3.06.78 3.77 1.45l2.57-2.48C16.83 3.18 14.66 2.2 12 2.2 6.55 2.2 2.2 6.55 2.2 12s4.35 9.8 9.8 9.8c5.66 0 9.4-3.97 9.4-9.56 0-.64-.07-1.13-.05-1.14Z" />,
  ),
  yelp: Icon(
    <path d="M13.5 2.06v8.83l-.01.05c0 .69.49 1.27 1.13 1.41l8.45 1.61c.69.13 1.36-.38 1.34-1.09-.05-2.16-.62-4.27-1.7-6.16a12.45 12.45 0 0 0-4.5-4.5C16.7 1.21 14.95.92 13.5.86v1.2ZM10.8 2.42c-.97.59-1.84 1.32-2.6 2.18a13.25 13.25 0 0 0-1.86 2.8c-.27.55.04 1.2.62 1.4l6.1 2c.5.16 1-.21 1-.74v-6.4c0-.7-.6-1.24-1.27-1.24-.66 0-1.32 0-1.99.0ZM5.7 11.5c-1.4.85-2.6 2-3.46 3.4-.32.5.06 1.17.64 1.27l5.9 1.05c.6.1 1.06-.5.83-1.06l-1.3-3.07c-.3-.7-1.07-1.04-1.78-.78ZM12 14a.6.6 0 0 0-.56.37l-2.05 5.32c-.18.47.13.97.61 1.05a11.7 11.7 0 0 0 4.85.04c.6-.13.92-.78.62-1.32l-2.86-5.05A.6.6 0 0 0 12 14ZM18.2 13.3a.62.62 0 0 0-.36 1.07l4.34 4.16c.41.4 1.08.27 1.32-.25a11.5 11.5 0 0 0 1-3.5c.07-.55-.37-1-.92-1.06l-5.38-.42Z" />,
  ),
  facebook: Icon(
    <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93Z" />,
  ),
  instagram: Icon(
    <>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.06 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.25 1.81-.42 2.23a3.72 3.72 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.17-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.81-.25-2.23-.42a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.17-.42-.36-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.06-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.36 2.23-.42C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.12 1.39A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91a5.88 5.88 0 0 0 1.39 2.12c.66.66 1.32 1.07 2.12 1.39.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.12-1.39c.66-.66 1.07-1.32 1.39-2.12.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.39-2.12A5.88 5.88 0 0 0 19.86.63C19.1.33 18.23.13 16.95.07 15.67.01 15.26 0 12 0Z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.17 6.17 0 0 0 12 5.84M12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </>,
  ),
  tiktok: Icon(
    <path d="M19.6 6.32a4.79 4.79 0 0 1-2.93-1 4.78 4.78 0 0 1-1.86-3.51h-3.18v13.7a2.85 2.85 0 0 1-2.86 2.78 2.85 2.85 0 0 1-2.86-2.85 2.85 2.85 0 0 1 2.86-2.85 2.7 2.7 0 0 1 .87.14V9.43a6.13 6.13 0 0 0-.87-.06 6.06 6.06 0 1 0 6.06 6.06V8.96a8 8 0 0 0 4.68 1.51V7.29a4.76 4.76 0 0 1-.91-.07" />,
  ),
  appleMaps: Icon(
    <path d="M12 2C7.6 2 4 5.6 4 10c0 5.5 7.2 11.5 7.5 11.8.3.2.7.2 1 0C12.8 21.5 20 15.5 20 10c0-4.4-3.6-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />,
  ),
};

const LINKS: SocialLink[] = [
  { href: "https://g.co/kgs/6Y1RBpp", label: "Google reviews", icon: ICONS.google },
  { href: "https://www.yelp.com/biz/berne-appliance-repair-hallandale-beach-4", label: "Yelp", icon: ICONS.yelp },
  { href: "https://www.facebook.com/bernerepair", label: "Facebook", icon: ICONS.facebook },
  { href: "https://www.instagram.com/bernerepair/", label: "Instagram", icon: ICONS.instagram },
  { href: "https://www.tiktok.com/@berne.repair", label: "TikTok", icon: ICONS.tiktok },
  { href: "https://maps.apple.com/p/7r_.dJpYdb5n6V", label: "Apple Maps", icon: ICONS.appleMaps },
];

export function SocialIcons({ locale = "en" }: { locale?: Locale }) {
  const label = locale === "es" ? "Síguenos" : "Follow us";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <ul className="flex flex-wrap items-center gap-2">
        {LINKS.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
            >
              {s.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
