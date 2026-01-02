-- Enable Row Level Security
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- 1. PROYECTOS (Projects)
-- Centraliza la información de las obras (Asana + SQL Obras)
create table projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  client_name text,
  status text default 'active' check (status in ('active', 'completed', 'on_hold', 'planning')),
  
  -- Campos de Integración
  asana_project_gid text unique, -- ID de Asana
  sql_obras_id text unique,      -- ID del ERP
  
  -- KPIs Financieros y Operativos (Actualizados por N8N)
  budget_total numeric default 0,
  cost_accumulated numeric default 0,
  progress_percentage numeric default 0, -- 0 a 100
  start_date date,
  end_date_estimated date
);

-- 2. TRANSACCIONES (Finanzas)
-- Movimientos de caja, cobros y pagos (Bancos + Facturación)
create table transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references projects(id),
  
  amount numeric not null, -- Positivo = Ingreso, Negativo = Gasto
  date date not null,
  description text,
  category text, -- 'materials', 'labor', 'milestone_payment', etc.
  
  -- Estado
  status text default 'pending' check (status in ('pending', 'completed', 'failed', 'forecast')),
  
  -- Origen
  source text default 'manual' check (source in ('manual', 'bank_feed', 'erp_invoice')),
  n8n_processed boolean default false
);

-- 3. ALARMAS (Alerts)
-- Notificaciones generadas por Gemini o N8N sobre riesgos
create table alerts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references projects(id),
  
  title text not null,
  message text,
  severity text default 'info' check (severity in ('info', 'warning', 'critical')),
  
  is_read boolean default false,
  source text default 'system' -- 'gemini', 'system', 'asana'
);

-- Habilitar RLS (Seguridad)
alter table projects enable row level security;
alter table transactions enable row level security;
alter table alerts enable row level security;

-- Políticas de Acceso (Por defecto, permitir todo a usuarios autenticados para v1)
create policy "Allow all access for authenticated users" on projects
  for all using (auth.role() = 'authenticated');
  
create policy "Allow all access for authenticated users" on transactions
  for all using (auth.role() = 'authenticated');
  
create policy "Allow all access for authenticated users" on alerts
  for all using (auth.role() = 'authenticated');
