-- ==============================================
-- PITCH MARKETING AGENCY - MULTI-TENANT SCHEMA
-- ==============================================
-- Run this in Supabase SQL Editor
-- This creates the entire database structure for
-- Pitch Market Strategies & Pitch Modular Spaces
-- ==============================================

-- 1. ORGANIZATIONS (Tenants)
-- Each organization is a separate tenant in the system
-- ==============================================
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  logo_url text,
  website text,
  stripe_account_id text, -- For marketplace payouts
  stripe_customer_id text, -- For billing the org itself
  plan text default 'starter',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  owner uuid not null references auth.users(id)
);

-- 2. ORGANIZATION MEMBERS
-- Links users to organizations with roles
-- ==============================================
create table if not exists organization_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member', 'agent', 'client')),
  created_at timestamptz default now()
);

create unique index if not exists org_member_unique on organization_members (org_id, user_id);

-- 3. INVITATIONS
-- ==============================================
create table if not exists invitations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  email text not null,
  role text not null,
  token text not null unique,
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '7 days'),
  accepted boolean default false
);

-- 4. CUSTOMERS (Multi-tenant)
-- Customers belong to an organization
-- ==============================================
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  stripe_customer_id text unique,
  email text,
  name text,
  phone text,
  address jsonb,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. SUBSCRIPTIONS (Multi-tenant)
-- ==============================================
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid references customers(id),
  stripe_subscription_id text unique,
  status text not null check (status in ('active', 'past_due', 'canceled', 'trialing', 'incomplete', 'incomplete_expired', 'paused')),
  plan_name text,
  plan_price integer,
  interval text check (interval in ('month', 'year')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. INVOICES (Multi-tenant)
-- ==============================================
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid references customers(id),
  stripe_invoice_id text unique,
  amount integer,
  status text,
  url text,
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- 7. PRODUCTS (Multi-tenant)
-- For custom products per organization
-- ==============================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  stripe_product_id text,
  stripe_price_id text,
  name text not null,
  description text,
  category text,
  price integer not null, -- in cents
  interval text, -- 'month', 'year', or null for one-time
  metadata jsonb default '{}',
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. ORDERS (Multi-tenant)
-- For one-time purchases and print orders
-- ==============================================
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid references customers(id),
  stripe_payment_intent_id text,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
  total integer not null,
  items jsonb not null default '[]',
  shipping_address jsonb,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 9. PROJECTS (Multi-tenant)
-- Project management for agency work
-- ==============================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid references customers(id),
  name text not null,
  description text,
  status text default 'open' check (status in ('open', 'in_progress', 'review', 'completed', 'cancelled')),
  due_date timestamptz,
  assigned_to uuid references auth.users(id),
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. PROJECT BOARDS (Kanban)
-- ==============================================
create table if not exists project_boards (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

-- 11. PROJECT COLUMNS
-- ==============================================
create table if not exists project_columns (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references project_boards(id) on delete cascade,
  title text not null,
  position int not null,
  created_at timestamptz default now()
);

-- 12. PROJECT CARDS
-- ==============================================
create table if not exists project_cards (
  id uuid primary key default gen_random_uuid(),
  column_id uuid not null references project_columns(id) on delete cascade,
  org_id uuid not null references organizations(id) on delete cascade,
  project_id uuid references projects(id),
  title text not null,
  description text,
  position int not null,
  assigned_to uuid references auth.users(id),
  due_date timestamptz,
  labels text[] default '{}',
  created_at timestamptz default now()
);

-- 13. SUPPORT TICKETS (Multi-tenant)
-- ==============================================
create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  customer_id uuid references customers(id),
  title text not null,
  status text not null default 'open' check (status in ('open', 'in_progress', 'waiting', 'resolved', 'closed')),
  priority text default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  created_by uuid not null references auth.users(id),
  assigned_to uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 14. TICKET MESSAGES
-- ==============================================
create table if not exists ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  sender uuid not null references auth.users(id),
  message text,
  attachments jsonb default '[]',
  created_at timestamptz default now()
);

-- 15. AGENT PAYOUTS (Multi-tenant)
-- Tracking marketplace payouts to agents
-- ==============================================
create table if not exists payouts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  stripe_transfer_id text,
  agent_account_id text not null,
  agent_user_id uuid references auth.users(id),
  amount integer not null,
  memo text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- 16. PRINT PRODUCTS (Specific for Pitch Market Strategies)
-- ==============================================
create table if not exists print_products (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  stripe_product_id text,
  stripe_price_id text,
  name text not null,
  category text not null, -- 'banners', 'stickers', 'signs', 'cards', etc.
  size text,
  material text,
  finish text,
  base_price integer not null, -- in cents
  quantity_pricing jsonb default '[]', -- [{qty: 100, price: 500}, {qty: 500, price: 2000}]
  turnaround_days integer default 5,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ==============================================
alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table invitations enable row level security;
alter table customers enable row level security;
alter table subscriptions enable row level security;
alter table invoices enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table projects enable row level security;
alter table project_boards enable row level security;
alter table project_columns enable row level security;
alter table project_cards enable row level security;
alter table tickets enable row level security;
alter table ticket_messages enable row level security;
alter table payouts enable row level security;
alter table print_products enable row level security;

-- ==============================================
-- RLS POLICIES - MULTI-TENANT LOCKDOWN
-- ==============================================

-- Helper function to get user's org_ids
create or replace function get_user_org_ids()
returns setof uuid as $$
  select org_id from organization_members where user_id = auth.uid()
$$ language sql security definer;

-- ORGANIZATIONS
create policy "org_read" on organizations for select
  using (id in (select get_user_org_ids()));

create policy "org_insert" on organizations for insert
  with check (auth.uid() = owner);

create policy "org_update" on organizations for update
  using (id in (select org_id from organization_members where user_id = auth.uid() and role in ('owner', 'admin')));

-- ORGANIZATION MEMBERS
create policy "members_read" on organization_members for select
  using (org_id in (select get_user_org_ids()));

create policy "members_write" on organization_members for all
  using (org_id in (select org_id from organization_members where user_id = auth.uid() and role in ('owner', 'admin')));

-- INVITATIONS
create policy "invitations_read" on invitations for select
  using (org_id in (select get_user_org_ids()) or email = auth.email());

create policy "invitations_write" on invitations for all
  using (org_id in (select org_id from organization_members where user_id = auth.uid() and role in ('owner', 'admin')));

-- CUSTOMERS
create policy "customers_read" on customers for select
  using (org_id in (select get_user_org_ids()));

create policy "customers_write" on customers for all
  using (org_id in (select get_user_org_ids()));

-- SUBSCRIPTIONS
create policy "subscriptions_read" on subscriptions for select
  using (org_id in (select get_user_org_ids()));

create policy "subscriptions_write" on subscriptions for all
  using (org_id in (select get_user_org_ids()));

-- INVOICES
create policy "invoices_read" on invoices for select
  using (org_id in (select get_user_org_ids()));

create policy "invoices_write" on invoices for all
  using (org_id in (select get_user_org_ids()));

-- PRODUCTS
create policy "products_read" on products for select
  using (org_id in (select get_user_org_ids()));

create policy "products_write" on products for all
  using (org_id in (select get_user_org_ids()));

-- ORDERS
create policy "orders_read" on orders for select
  using (org_id in (select get_user_org_ids()));

create policy "orders_write" on orders for all
  using (org_id in (select get_user_org_ids()));

-- PROJECTS
create policy "projects_read" on projects for select
  using (org_id in (select get_user_org_ids()));

create policy "projects_write" on projects for all
  using (org_id in (select get_user_org_ids()));

-- PROJECT BOARDS
create policy "boards_read" on project_boards for select
  using (org_id in (select get_user_org_ids()));

create policy "boards_write" on project_boards for all
  using (org_id in (select get_user_org_ids()));

-- PROJECT COLUMNS
create policy "columns_read" on project_columns for select
  using (board_id in (select id from project_boards where org_id in (select get_user_org_ids())));

create policy "columns_write" on project_columns for all
  using (board_id in (select id from project_boards where org_id in (select get_user_org_ids())));

-- PROJECT CARDS
create policy "cards_read" on project_cards for select
  using (org_id in (select get_user_org_ids()));

create policy "cards_write" on project_cards for all
  using (org_id in (select get_user_org_ids()));

-- TICKETS
create policy "tickets_read" on tickets for select
  using (org_id in (select get_user_org_ids()));

create policy "tickets_write" on tickets for all
  using (org_id in (select get_user_org_ids()));

-- TICKET MESSAGES
create policy "ticket_messages_read" on ticket_messages for select
  using (ticket_id in (select id from tickets where org_id in (select get_user_org_ids())));

create policy "ticket_messages_write" on ticket_messages for all
  using (ticket_id in (select id from tickets where org_id in (select get_user_org_ids())));

-- PAYOUTS
create policy "payouts_read" on payouts for select
  using (org_id in (select get_user_org_ids()));

create policy "payouts_write" on payouts for all
  using (org_id in (select org_id from organization_members where user_id = auth.uid() and role in ('owner', 'admin')));

-- PRINT PRODUCTS
create policy "print_products_read" on print_products for select
  using (org_id in (select get_user_org_ids()));

create policy "print_products_write" on print_products for all
  using (org_id in (select org_id from organization_members where user_id = auth.uid() and role in ('owner', 'admin')));

-- ==============================================
-- INDEXES FOR PERFORMANCE
-- ==============================================
create index if not exists idx_customers_org on customers(org_id);
create index if not exists idx_customers_email on customers(email);
create index if not exists idx_subscriptions_org on subscriptions(org_id);
create index if not exists idx_subscriptions_status on subscriptions(status);
create index if not exists idx_invoices_org on invoices(org_id);
create index if not exists idx_orders_org on orders(org_id);
create index if not exists idx_projects_org on projects(org_id);
create index if not exists idx_tickets_org on tickets(org_id);
create index if not exists idx_tickets_status on tickets(status);
create index if not exists idx_print_products_org on print_products(org_id);
create index if not exists idx_print_products_category on print_products(category);

-- ==============================================
-- ENABLE REALTIME FOR SUPPORT TICKETS
-- ==============================================
alter publication supabase_realtime add table ticket_messages;
alter publication supabase_realtime add table tickets;
alter publication supabase_realtime add table project_cards;
