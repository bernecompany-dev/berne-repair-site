import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight proxy (formerly "middleware" — renamed for Next.js 16) that
 * surfaces the request pathname as a header (`x-pathname`) so server
 * components (notably `app/layout.tsx`) can server-render the correct
 * `<html lang>` per locale. Without this, the root layout cannot read the
 * URL during SSR — Next.js only exposes `headers()` and `cookies()` to
 * server components, not `useRouter`.
 *
 * We intentionally do NOT touch /api or static asset paths. The matcher
 * below is the standard Next.js exclusion list.
 */
export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-pathname", req.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - api routes
     *  - _next static assets
     *  - _next image optimization
     *  - the public favicon / sitemap / robots
     *  - opengraph-image (handled by Next at runtime)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|opengraph-image).*)",
  ],
};
