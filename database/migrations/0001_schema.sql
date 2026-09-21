-- =============================================================================
-- 0001_schema.sql — Tablolar, indeksler ve yardımcı fonksiyonlar
-- Supabase SQL Editor'de sırasıyla çalıştırın: 0001 → 0002 → 0003
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- Enum tipler

do $$
begin
  if not exists (select 1 from pg_type where typname = 'post_status') then
    create type public.post_status as enum ('draft', 'published');
  end if;

  if not exists (select 1 from pg_type where typname = 'meeting_preference') then
    create type public.meeting_preference as enum ('online', 'yuz-yuze-ankara', 'farketmez');
  end if;

  if not exists (select 1 from pg_type where typname = 'appointment_reason') then
    create type public.appointment_reason as enum (
      'kaygi', 'sinav-sureci', 'aile-ici-iletisim', 'ozsaygi',
      'anlam-arayisi', 'ebeveyn-danismanligi', 'diger', 'belirtmek-istemiyorum'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'appointment_status') then
    create type public.appointment_status as enum (
      'yeni', 'iletisime-gecildi', 'planlandi', 'kapandi'
    );
  end if;
end
$$;

-- ------------------------------------------------------------- Ortak yardımcı

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- --------------------------------------------------------------------- admins

create table if not exists public.admins (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

comment on table public.admins is
  'Yönetim paneline erişebilen kullanıcılar. Kayıtlar yalnızca service role ile eklenir.';

-- Yetki kontrolü. security definer olduğu için RLS politikaları içinde güvenle
-- çağrılabilir; arama yolu sabitlenmiştir.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- ------------------------------------------------------------- site_settings

create table if not exists public.site_settings (
  key text not null,
  locale text not null default '*',
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (key, locale)
);

comment on column public.site_settings.locale is
  'Dile bağlı gruplar için tr/en/de; tüm dillerde ortak gruplar için *';

-- ---------------------------------------------------------------------- pages

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  locale text not null,
  translation_key text not null,
  slug text not null,
  title text not null,
  subtitle text,
  eyebrow text,
  body text,
  seo_title text,
  seo_description text,
  og_image_url text,
  noindex boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pages_locale_translation_key_key unique (locale, translation_key),
  constraint pages_locale_slug_key unique (locale, slug)
);

drop trigger if exists pages_set_updated_at on public.pages;
create trigger pages_set_updated_at
  before update on public.pages
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------------- services

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  locale text not null,
  translation_key text not null,
  slug text not null,
  title text not null,
  short_description text not null default '',
  summary text,
  who_for text[] not null default '{}',
  process_items text[] not null default '{}',
  body text,
  order_index integer not null default 0,
  featured boolean not null default true,
  published boolean not null default true,
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint services_locale_translation_key_key unique (locale, translation_key),
  constraint services_locale_slug_key unique (locale, slug)
);

create index if not exists services_listing_idx
  on public.services (locale, published, order_index);
create index if not exists services_translation_key_idx
  on public.services (translation_key);

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------- faqs

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  locale text not null,
  translation_key text not null,
  question text not null,
  answer text not null,
  category text,
  order_index integer not null default 0,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint faqs_locale_translation_key_key unique (locale, translation_key)
);

create index if not exists faqs_listing_idx on public.faqs (locale, published, order_index);

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at
  before update on public.faqs
  for each row execute function public.set_updated_at();

-- -------------------------------------------------------------- blog kategori

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  locale text not null,
  translation_key text not null,
  slug text not null,
  name text not null,
  description text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  constraint blog_categories_locale_translation_key_key unique (locale, translation_key),
  constraint blog_categories_locale_slug_key unique (locale, slug)
);

create index if not exists blog_categories_listing_idx
  on public.blog_categories (locale, order_index);

-- ----------------------------------------------------------------- blog yazı

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  locale text not null,
  translation_key text not null,
  slug text not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  cover_image_alt text,
  category_id uuid references public.blog_categories (id) on delete set null,
  author_name text not null default 'Ecesu Karslı',
  status public.post_status not null default 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  canonical_url text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_locale_translation_key_key unique (locale, translation_key),
  constraint blog_posts_locale_slug_key unique (locale, slug)
);

create index if not exists blog_posts_listing_idx
  on public.blog_posts (locale, status, published_at desc);
create index if not exists blog_posts_category_idx on public.blog_posts (category_id);
create index if not exists blog_posts_translation_key_idx on public.blog_posts (translation_key);

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- --------------------------------------------------------- randevu talepleri

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  age integer check (age is null or (age between 12 and 110)),
  phone text not null,
  email text not null,
  meeting_preference public.meeting_preference not null,
  reason public.appointment_reason not null,
  message text,
  consent boolean not null default false,
  status public.appointment_status not null default 'yeni',
  admin_notes text,
  locale text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.appointment_requests is
  'Hassas veri içerebilir. Yalnızca admin kullanıcılar okuyabilir; kayıtlar sunucu tarafından eklenir.';

create index if not exists appointment_requests_status_idx
  on public.appointment_requests (status, created_at desc);
create index if not exists appointment_requests_email_idx
  on public.appointment_requests (email, created_at desc);

drop trigger if exists appointment_requests_set_updated_at on public.appointment_requests;
create trigger appointment_requests_set_updated_at
  before update on public.appointment_requests
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------- media

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);
