-- ═══════════════════════════════════════════
-- Assembly Line — Supabase Database Schema
-- Multi-tenant SaaS with Row-Level Security
-- ═══════════════════════════════════════════

-- ─── Extensions ─────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles (linked to Supabase Auth) ──
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Auto-create profile on signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Organizations (Tenants) ────────────
create table public.organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ─── Organization Members (Multi-Tenant Join) ──
create table public.organization_members (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('owner', 'admin', 'member')) default 'member' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (organization_id, user_id)
);

-- ─── Pipelines ─────────────────────────
create table public.pipelines (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references public.organizations(id) on delete cascade not null,
  name text not null,
  description text,
  stages jsonb default '[]'::jsonb not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ─── Jobs ──────────────────────────────
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references public.organizations(id) on delete cascade not null,
  pipeline_id uuid references public.pipelines(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null,
  brief jsonb default '{}'::jsonb not null,
  status text check (status in ('queued', 'running', 'awaiting_approval', 'completed', 'failed', 'cancelled')) default 'queued' not null,
  current_stage integer default 0 not null,
  total_stages integer default 0 not null,
  cost numeric(10,4) default 0 not null,
  duration_seconds numeric(10,2),
  qc_score numeric(5,2),
  output_asset_id uuid,
  error_message text,
  inngest_run_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ─── Job Stage Logs ─────────────────────
create table public.job_stage_logs (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references public.jobs(id) on delete cascade not null,
  stage_index integer not null,
  stage_name text not null,
  status text check (status in ('pending', 'running', 'completed', 'failed', 'skipped')) default 'pending' not null,
  model_used text,
  cost numeric(10,4),
  duration_seconds numeric(10,2),
  input_data jsonb,
  output_data jsonb,
  error_message text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ─── Assets ─────────────────────────────
create table public.assets (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references public.organizations(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete set null,
  pipeline_id uuid references public.pipelines(id) on delete set null,
  filename text not null,
  storage_path text not null,
  mime_type text not null,
  size_bytes bigint not null,
  duration_seconds numeric(10,2),
  resolution text,
  thumbnail_url text,
  tags text[],
  version integer default 1 not null,
  status text check (status in ('draft', 'approved', 'published', 'archived')) default 'draft' not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FK for output_asset_id (added after assets table creation)
alter table public.jobs add constraint fk_output_asset
  foreign key (output_asset_id) references public.assets(id) on delete set null;

-- ─── Brand Kits ─────────────────────────
create table public.brand_kits (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references public.organizations(id) on delete cascade not null,
  name text not null,
  logo_url text,
  colors jsonb default '{}'::jsonb not null,
  fonts jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ─── Credit Balances ────────────────────
create table public.credit_balances (
  organization_id uuid references public.organizations(id) on delete cascade primary key,
  credits_remaining integer default 0 not null,
  credits_used_this_month integer default 0 not null,
  plan_tier text check (plan_tier in ('free', 'pro', 'team', 'enterprise')) default 'free' not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ═══════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.pipelines enable row level security;
alter table public.jobs enable row level security;
alter table public.job_stage_logs enable row level security;
alter table public.assets enable row level security;
alter table public.brand_kits enable row level security;
alter table public.credit_balances enable row level security;

-- ─── Helper: Get user's organizations ───
create function public.get_user_org_ids()
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $$
  select organization_id
  from public.organization_members
  where user_id = auth.uid();
$$;

-- ─── Profiles ───────────────────────────
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ─── Organizations ──────────────────────
create policy "Members can view their organizations"
  on public.organizations for select
  using (id in (select public.get_user_org_ids()));

create policy "Owners can update organizations"
  on public.organizations for update
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = organizations.id
      and user_id = auth.uid()
      and role = 'owner'
    )
  );

-- ─── Organization Members ───────────────
create policy "Members can view membership"
  on public.organization_members for select
  using (organization_id in (select public.get_user_org_ids()));

-- ─── Pipelines ──────────────────────────
create policy "Org members can view pipelines"
  on public.pipelines for select
  using (organization_id in (select public.get_user_org_ids()));

create policy "Org members can create pipelines"
  on public.pipelines for insert
  with check (organization_id in (select public.get_user_org_ids()));

create policy "Org members can update pipelines"
  on public.pipelines for update
  using (organization_id in (select public.get_user_org_ids()));

create policy "Org admins can delete pipelines"
  on public.pipelines for delete
  using (
    organization_id in (
      select organization_id from public.organization_members
      where user_id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- ─── Jobs ───────────────────────────────
create policy "Org members can view jobs"
  on public.jobs for select
  using (organization_id in (select public.get_user_org_ids()));

create policy "Org members can create jobs"
  on public.jobs for insert
  with check (organization_id in (select public.get_user_org_ids()));

create policy "Org members can update jobs"
  on public.jobs for update
  using (organization_id in (select public.get_user_org_ids()));

-- ─── Job Stage Logs ─────────────────────
create policy "Org members can view stage logs"
  on public.job_stage_logs for select
  using (
    job_id in (
      select id from public.jobs
      where organization_id in (select public.get_user_org_ids())
    )
  );

create policy "Service can insert stage logs"
  on public.job_stage_logs for insert
  with check (true); -- Gated by Inngest using service role

-- ─── Assets ─────────────────────────────
create policy "Org members can view assets"
  on public.assets for select
  using (organization_id in (select public.get_user_org_ids()));

create policy "Org members can create assets"
  on public.assets for insert
  with check (organization_id in (select public.get_user_org_ids()));

create policy "Org members can update assets"
  on public.assets for update
  using (organization_id in (select public.get_user_org_ids()));

-- ─── Brand Kits ─────────────────────────
create policy "Org members can view brand kits"
  on public.brand_kits for select
  using (organization_id in (select public.get_user_org_ids()));

create policy "Org members can manage brand kits"
  on public.brand_kits for insert
  with check (organization_id in (select public.get_user_org_ids()));

-- ─── Credit Balances ────────────────────
create policy "Org members can view credits"
  on public.credit_balances for select
  using (organization_id in (select public.get_user_org_ids()));

-- ═══════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════

create index idx_org_members_user on public.organization_members(user_id);
create index idx_org_members_org on public.organization_members(organization_id);
create index idx_pipelines_org on public.pipelines(organization_id);
create index idx_jobs_org on public.jobs(organization_id);
create index idx_jobs_pipeline on public.jobs(pipeline_id);
create index idx_jobs_status on public.jobs(status);
create index idx_jobs_created on public.jobs(created_at desc);
create index idx_assets_org on public.assets(organization_id);
create index idx_assets_job on public.assets(job_id);
create index idx_assets_status on public.assets(status);
create index idx_job_stage_logs_job on public.job_stage_logs(job_id);
create index idx_brand_kits_org on public.brand_kits(organization_id);

-- ═══════════════════════════════════════════
-- UPDATED_AT TRIGGERS
-- ═══════════════════════════════════════════

create function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger update_organizations_updated_at
  before update on public.organizations
  for each row execute function public.update_updated_at();

create trigger update_pipelines_updated_at
  before update on public.pipelines
  for each row execute function public.update_updated_at();

create trigger update_jobs_updated_at
  before update on public.jobs
  for each row execute function public.update_updated_at();

create trigger update_assets_updated_at
  before update on public.assets
  for each row execute function public.update_updated_at();

create trigger update_credit_balances_updated_at
  before update on public.credit_balances
  for each row execute function public.update_updated_at();
