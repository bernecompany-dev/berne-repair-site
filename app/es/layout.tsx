/**
 * Spanish-locale segment layout.
 *
 * WHY THIS EXISTS — `<html lang>` without killing static generation:
 * The `<html>` element can only be rendered by the ROOT layout, and the root
 * layout must stay free of per-request APIs (`headers()`, `cookies()`) or the
 * ENTIRE site loses static prerendering (see the contract comment in
 * `app/layout.tsx`). The /es tree is a literal segment (not a `[locale]`
 * param), so the root layout cannot know the locale at build time either.
 *
 * Documented workaround: the root layout statically prerenders
 * `lang="en-US"`, and this layout injects a tiny inline script into the
 * static HTML of every /es page. It executes synchronously while the parser
 * is still streaming the document — before first paint and long before
 * hydration — so assistive tech and translation tooling see `es-US`.
 * `LangSync` (mounted in the root layout) then keeps the attribute correct
 * across client-side navigations in both directions.
 *
 * SEO note: Google ranks the EN/ES variants via the per-page hreflang
 * alternates emitted from `lib/seo.ts`; it does not rely on the raw `lang`
 * attribute, so the prerendered `en-US` in the static shell is harmless.
 */

const ES_LANG_SCRIPT = `document.documentElement.lang="es-US";`;

export default function EsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: ES_LANG_SCRIPT }} />
      {children}
    </>
  );
}
