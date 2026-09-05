import { NextResponse, type NextRequest } from 'next/server';
import { isLocale } from '@/lib/i18n';
import { localizedUrls, marketingRoutes } from '@/lib/seo';

const publicPaths = new Set<string>(marketingRoutes.map((route) => route || '/'));

function withLanguageHeaders(response: NextResponse, path: string, locale = 'en-US') {
  const urls = localizedUrls(path === '/' ? '' : path);
  response.headers.set(
    'Link',
    Object.entries(urls)
      .map(([language, href]) => `<${href}>; rel="alternate"; hreflang="${language}"`)
      .join(', '),
  );
  response.headers.set('Content-Language', locale);
  return response;
}

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('lang');
  if (!publicPaths.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nexavoris-path', request.nextUrl.pathname);
  if (!isLocale(locale) || locale === 'en') {
    return withLanguageHeaders(
      NextResponse.next({ request: { headers: requestHeaders } }),
      request.nextUrl.pathname,
    );
  }

  const url = request.nextUrl.clone();
  url.pathname = `/localized-content/${locale}${request.nextUrl.pathname === '/' ? '' : request.nextUrl.pathname}`;
  requestHeaders.set('x-nexavoris-locale', locale);
  return withLanguageHeaders(
    NextResponse.rewrite(url, { request: { headers: requestHeaders } }),
    request.nextUrl.pathname,
    locale === 'zh-cn' ? 'zh-CN' : locale === 'zh-tw' ? 'zh-TW' : 'es',
  );
}

export const config = {
  matcher: ['/((?!_next/|favicon.svg|robots.txt|sitemap.xml|.*\\..*).*)'],
};
