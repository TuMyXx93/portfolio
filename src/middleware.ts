import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, Locale } from './lib/i18n/config';

function getPreferredLocale(request: NextRequest): Locale {
  // 1. Check cookie
  const cookieLocale =
    request.cookies.get('locale')?.value ||
    request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLang = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, priority] = lang.trim().split(';q=');
        return {
          code: code.split('-')[0].toLowerCase(),
          priority: priority ? parseFloat(priority) : 1.0,
        };
      })
      .sort((a, b) => b.priority - a.priority);

    for (const lang of preferredLang) {
      if ((locales as readonly string[]).includes(lang.code)) {
        return lang.code as Locale;
      }
    }
  }

  // 3. Fallback to default
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a supported locale
  const pathnameHasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine locale and redirect
  const locale = getPreferredLocale(request);
  const targetUrl = new URL(
    pathname === '/' ? `/${locale}` : `/${locale}${pathname}`,
    request.url
  );
  targetUrl.search = request.nextUrl.search;

  return NextResponse.redirect(targetUrl, 307);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, manifest.json, sw.js, robots.txt, sitemap.xml, offline, opengraph-image
     * - static files with extensions (.svg, .png, .jpg, .jpeg, .gif, .webp, .pdf, .ico)
     */
    '/((?!api|_next/static|_next/image|images|icons|CV|favicon.ico|manifest.json|sw.js|robots.txt|sitemap.xml|offline|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)$).*)',
  ],
};
