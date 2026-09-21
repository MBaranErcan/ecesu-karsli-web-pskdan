-- =============================================================================
-- 0002_rls.sql — Row Level Security politikaları
--
-- Genel ilke:
--   * Yayınlanmış içerik herkese açıktır (anon rolü okuyabilir).
--   * Yazma işlemleri yalnızca public.admins tablosunda kayıtlı kullanıcılara açıktır.
--   * Randevu talepleri hiçbir koşulda anonim olarak okunamaz.
-- =============================================================================

alter table public.admins              enable row level security;
alter table public.site_settings       enable row level security;
alter table public.pages               enable row level security;
alter table public.services            enable row level security;
alter table public.faqs                enable row level security;
alter table public.blog_categories     enable row level security;
alter table public.blog_posts          enable row level security;
alter table public.appointment_requests enable row level security;
alter table public.media               enable row level security;

-- --------------------------------------------------------------------- admins
-- Kullanıcı yalnızca kendi admin kaydını görebilir. Ekleme/silme service role ile.

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row"
  on public.admins for select
  to authenticated
  using (id = auth.uid());

-- ------------------------------------------------------------- site_settings

drop policy if exists "site_settings public read" on public.site_settings;
create policy "site_settings public read"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "site_settings admin write" on public.site_settings;
create policy "site_settings admin write"
  on public.site_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------- pages

drop policy if exists "pages public read" on public.pages;
create policy "pages public read"
  on public.pages for select
  to anon, authenticated
  using (true);

drop policy if exists "pages admin write" on public.pages;
create policy "pages admin write"
  on public.pages for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------------- services

drop policy if exists "services public read" on public.services;
create policy "services public read"
  on public.services for select
  to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "services admin write" on public.services;
create policy "services admin write"
  on public.services for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------- faqs

drop policy if exists "faqs public read" on public.faqs;
create policy "faqs public read"
  on public.faqs for select
  to anon, authenticated
  using (published or public.is_admin());

drop policy if exists "faqs admin write" on public.faqs;
create policy "faqs admin write"
  on public.faqs for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -------------------------------------------------------------- blog kategori

drop policy if exists "blog_categories public read" on public.blog_categories;
create policy "blog_categories public read"
  on public.blog_categories for select
  to anon, authenticated
  using (true);

drop policy if exists "blog_categories admin write" on public.blog_categories;
create policy "blog_categories admin write"
  on public.blog_categories for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------- blog yazı

drop policy if exists "blog_posts public read" on public.blog_posts;
create policy "blog_posts public read"
  on public.blog_posts for select
  to anon, authenticated
  using (
    (status = 'published' and (published_at is null or published_at <= now()))
    or public.is_admin()
  );

drop policy if exists "blog_posts admin write" on public.blog_posts;
create policy "blog_posts admin write"
  on public.blog_posts for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- --------------------------------------------------------- randevu talepleri
-- Anonim kullanıcılar için hiçbir politika tanımlanmaz: okuma da yazma da kapalıdır.
-- Form kayıtları sunucu tarafında service role anahtarıyla eklenir.

drop policy if exists "appointment_requests admin read" on public.appointment_requests;
create policy "appointment_requests admin read"
  on public.appointment_requests for select
  to authenticated
  using (public.is_admin());

drop policy if exists "appointment_requests admin update" on public.appointment_requests;
create policy "appointment_requests admin update"
  on public.appointment_requests for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "appointment_requests admin delete" on public.appointment_requests;
create policy "appointment_requests admin delete"
  on public.appointment_requests for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------- media

drop policy if exists "media public read" on public.media;
create policy "media public read"
  on public.media for select
  to anon, authenticated
  using (true);

drop policy if exists "media admin write" on public.media;
create policy "media admin write"
  on public.media for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
