import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { toCanonicalPath, toLocalizedPath } from "@/i18n/routes";

const PUBLIC_FILE = /\.(?:[a-z0-9]+)$/i;

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, q] = part.trim().split(";q=");
        return { tag: tag.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);
    for (const { tag } of preferred) {
      if (isLocale(tag)) return tag;
    }
  }
  return defaultLocale;
}

function withLocaleHeaders(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  headers.set("x-pathname", request.nextUrl.pathname);
  return headers;
}

/** Admin oturumunu tazeler ve giriş yapmamış kullanıcıları login sayfasına gönderir. */
async function handleAdmin(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: withLocaleHeaders(request, defaultLocale) },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginRoute = request.nextUrl.pathname === "/admin/giris";

  if (!user && !isLoginRoute) {
    const loginUrl = new URL("/admin/giris", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return handleAdmin(request);
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // Dil öneki yoksa: tercih edilen dile yönlendir.
  if (!isLocale(maybeLocale)) {
    const locale = detectLocale(request);
    const target = new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url);
    return NextResponse.redirect(target);
  }

  const locale = maybeLocale;
  const rest = segments.slice(1).join("/");

  // Canonical yolla doğrudan gelinmişse dile ait adrese kalıcı yönlendirme.
  const localized = toLocalizedPath(locale, rest);
  if (localized) {
    return NextResponse.redirect(new URL(`/${locale}/${localized}${search}`, request.url), 308);
  }

  const canonical = toCanonicalPath(locale, rest);
  const headers = withLocaleHeaders(request, locale);

  if (canonical !== null && canonical !== rest) {
    const rewriteUrl = new URL(`/${locale}/${canonical}${search}`, request.url);
    return NextResponse.rewrite(rewriteUrl, { request: { headers } });
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
