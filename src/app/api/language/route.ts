import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { href, routeMap, toCanonicalPath, type RouteKey } from "@/i18n/routes";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { getLocaleContent } from "@/content";

type ContentTable = "services" | "blog_posts" | "blog_categories";

/** Bir slug'ın hedef dildeki karşılığını bulur. */
async function translateSlug(
  table: ContentTable,
  from: Locale,
  to: Locale,
  slug: string,
): Promise<string | null> {
  const supabase = getSupabasePublicClient();
  if (supabase) {
    const { data } = await supabase
      .from(table)
      .select("translation_key")
      .eq("locale", from)
      .eq("slug", slug)
      .maybeSingle();

    if (data?.translation_key) {
      const { data: target } = await supabase
        .from(table)
        .select("slug")
        .eq("locale", to)
        .eq("translation_key", data.translation_key)
        .maybeSingle();
      if (target?.slug) return target.slug;
    }
  }

  const sourceContent = getLocaleContent(from);
  const targetContent = getLocaleContent(to);

  if (table === "services") {
    const key = sourceContent.services.find((item) => item.slug === slug)?.translation_key;
    return targetContent.services.find((item) => item.translation_key === key)?.slug ?? null;
  }
  if (table === "blog_posts") {
    const key = sourceContent.blogPosts.find((item) => item.slug === slug)?.translation_key;
    return targetContent.blogPosts.find((item) => item.translation_key === key)?.slug ?? null;
  }
  const key = sourceContent.blogCategories.find((item) => item.slug === slug)?.translation_key;
  return targetContent.blogCategories.find((item) => item.translation_key === key)?.slug ?? null;
}

function routeKeyForCanonical(canonical: string): { key: RouteKey; rest: string } | null {
  const entries = (Object.keys(routeMap) as RouteKey[])
    .filter((key) => key !== "home")
    .sort((a, b) => routeMap[b].canonical.length - routeMap[a].canonical.length);

  for (const key of entries) {
    const value = routeMap[key].canonical;
    if (canonical === value) return { key, rest: "" };
    if (canonical.startsWith(`${value}/`)) return { key, rest: canonical.slice(value.length + 1) };
  }
  return null;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const to = params.get("to");
  const rawPath = params.get("path") ?? "/";

  if (!isLocale(to)) {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const [pathname, query] = rawPath.split("?");
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = isLocale(segments[0]);
  const from: Locale = hasLocale ? (segments[0] as Locale) : defaultLocale;
  const rest = segments.slice(hasLocale ? 1 : 0).join("/");

  let target = href(to, "home");

  if (rest) {
    const canonical = toCanonicalPath(from, rest) ?? rest;
    const match = routeKeyForCanonical(canonical);

    if (match) {
      if (match.rest) {
        const table: ContentTable =
          match.key === "services"
            ? "services"
            : match.key === "blogCategory"
              ? "blog_categories"
              : "blog_posts";
        const translated = await translateSlug(table, from, to, match.rest);
        target = translated ? href(to, match.key, translated) : href(to, match.key);
      } else {
        target = href(to, match.key);
      }
    }
  }

  const url = new URL(`${target}${query ? `?${query}` : ""}`, request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", to, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}
