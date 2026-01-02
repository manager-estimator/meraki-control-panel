-- MERAKI CONTROL PANEL - PHASE 1: FINANCE CORE
-- Run this in Supabase SQL Editor

-- 1. Cuentas Bancarias (Treasury)
create table if not exists public.accounts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null, -- e.g. "Santander Principal", "Caixa Póliza"
  bank_name text,
  currency text default 'EUR',
  current_balance numeric default 0,
  last_synced_at timestamp with time zone,
  account_type text check (account_type in ('checking', 'savings', 'credit', 'cash')) default 'checking'
);

-- 2. Movimientos Bancarios (Source of Truth for Cash)
-- Replaces previous 'transactions' table with a more robust model
create table if not exists public.bank_transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  account_id uuid references public.accounts(id),
  date date not null,
  amount numeric not null,
  description text,
  category text, -- e.g. "Impuestos", "Nóminas", "Materiales"
  status text check (status in ('pending', 'reconciled')) default 'pending',
  external_id text unique, -- ID from Bank/GoCardless to prevent duplicates
  raw_data jsonb -- To store the full original JSON from N8N/Bank
);

-- 3. Facturas Emitidas (AR - Accounts Receivable) -> Clientes
create table if not exists public.invoices_ar (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  invoice_number text not null,
  client_name text not null, -- Link to 'clients' table in future
  project_id uuid references public.projects(id), -- Link to existing projects table
  date_issued date not null,
  date_due date,
  amount_total numeric not null,
  amount_tax numeric default 0,
  status text check (status in ('draft', 'sent', 'paid', 'overdue')) default 'sent',
  pdf_url text
);

-- 4. Facturas Recibidas (AP - Accounts Payable) -> Proveedores
create table if not exists public.invoices_ap (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  invoice_number text not null,
  vendor_name text not null, -- Link to 'vendors' table in future
  project_id uuid references public.projects(id),
  date_issued date not null,
  date_due date,
  amount_total numeric not null, -- Negative for expenses usually, but stored positive in AP
  status text check (status in ('pending', 'approved', 'paid')) default 'pending',
  category text, -- "Materiales", "Subcontrata", etc.
  pdf_url text
);

-- Enable RLS
alter table public.accounts enable row level security;
alter table public.bank_transactions enable row level security;
alter table public.invoices_ar enable row level security;
alter table public.invoices_ap enable row level security;

-- Open Access Policies (for now, to avoid "missing data" issues during dev)
-- In production, restrict this to authenticated users only.
create policy "Enable read access for all users" on public.accounts for select using (true);
create policy "Enable insert for service_role" on public.accounts for insert using (true);

create policy "Enable read access for all users" on public.bank_transactions for select using (true);
create policy "Enable insert for service_role" on public.bank_transactions for insert using (true);

create policy "Enable read access for all users" on public.invoices_ar for select using (true);
create policy "Enable insert for service_role" on public.invoices_ar for insert using (true);

create policy "Enable read access for all users" on public.invoices_ap for select using (true);
create policy "Enable insert for service_role" on public.invoices_ap for insert using (true);

-- Indexes for performance
create index if not exists idx_bank_transactions_date on public.bank_transactions(date);
create index if not exists idx_invoices_ar_status on public.invoices_ar(status);
create index if not exists idx_invoices_ap_status on public.invoices_ap(status);
