-- The Vitanoin Collective — applicants table
-- Safe to re-run: creates the table if missing, adds any columns added later.

create table if not exists public.vitanoin_applicants (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),

  -- Datos personales
  full_name               text not null,
  birth_date              date not null,
  city_state              text not null,
  email                   text not null unique,
  phone                   text not null,

  -- Perfil de Instagram
  instagram_handle        text not null,
  instagram_link          text not null,
  follower_count          integer not null,
  is_profile_public       boolean not null default true,

  -- Contenido
  time_creating_content   text not null,
  primary_category        text not null,
  avg_reel_views          integer default 0,
  engagement_rate         numeric(5,2),
  best_content_link       text not null,
  motivation              text not null,

  -- Colaboraciones
  active_collaborations   text,
  collaboration_brands    text,

  -- Consentimientos
  confirmed_age             boolean not null default false,
  confirmed_public_profile  boolean not null default false,
  accepted_terms            boolean not null default false,
  accepted_privacy          boolean not null default false,
  authorized_content_use    boolean not null default false,
  accepted_communications   boolean not null default false
);

-- Columns added after the first deploy.
alter table public.vitanoin_applicants
  add column if not exists collaboration_brands     text,
  add column if not exists confirmed_age            boolean not null default false,
  add column if not exists confirmed_public_profile boolean not null default false,
  add column if not exists accepted_privacy         boolean not null default false,
  add column if not exists authorized_content_use   boolean not null default false,
  add column if not exists accepted_communications  boolean not null default false;

-- TikTok profile and metrics fields, added 2026-08. Nullable because rows
-- registered before the form asked for them have no value.
alter table public.vitanoin_applicants
  add column if not exists tiktok_handle        text,
  add column if not exists tiktok_link          text,
  add column if not exists true_engagement_rate numeric(5,2);

-- Review state, used by the admin dashboard to pick the 500 selected creators.
alter table public.vitanoin_applicants
  add column if not exists status      text not null default 'pendiente',
  add column if not exists reviewed_at timestamptz,
  add column if not exists admin_notes text;

do $$
begin
  alter table public.vitanoin_applicants
    add constraint vitanoin_applicants_status_check
    check (status in ('pendiente', 'seleccionada', 'descartada'));
exception
  when duplicate_object then null;
end $$;

-- One application per email.
create unique index if not exists vitanoin_applicants_email_key
  on public.vitanoin_applicants (lower(email));

-- Indexes for the dashboard's filters and sorting.
create index if not exists vitanoin_applicants_status_idx
  on public.vitanoin_applicants (status);
create index if not exists vitanoin_applicants_followers_idx
  on public.vitanoin_applicants (follower_count desc);
create index if not exists vitanoin_applicants_created_idx
  on public.vitanoin_applicants (created_at desc);

-- Row Level Security: anonymous visitors may apply, but may not read the list.
alter table public.vitanoin_applicants enable row level security;

-- Applicants may only ever create a row in the 'pendiente' state. The anon key
-- is public, so without this an attacker could POST directly to PostgREST and
-- insert themselves as 'seleccionada', or forge review metadata.
drop policy if exists "anon can apply" on public.vitanoin_applicants;
create policy "anon can apply"
  on public.vitanoin_applicants
  for insert
  to anon
  with check (
    status = 'pendiente'
    and reviewed_at is null
    and admin_notes is null
  );

-- No select/update/delete policy exists for anon, so applications cannot be
-- read back or modified with the public key. The dashboard reads and writes
-- with the service role key, which bypasses RLS and must stay server-side.
