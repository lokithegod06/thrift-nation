-- =========================================
-- THRIFT NATION — Database schema
-- Run in Supabase SQL Editor
-- =========================================

-- Profiles (one per user, acts as their "store")
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,             -- e.g. "corz" → store = thriftnationXcorz
  display_name text not null,
  bio text default 'Vintage curator.',
  avatar_url text,
  is_verified boolean default false,
  created_at timestamptz default now()
);

-- Products / drops
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  price integer not null,                    -- in INR paise, or whole rupees — we use whole
  size text,
  condition text,
  category text,                              -- T-Shirts, Shirts, Pants, etc.
  image_url text not null,
  status text default 'available',           -- available | sold
  created_at timestamptz default now()
);
create index if not exists products_created_idx on public.products (created_at desc);
create index if not exists products_seller_idx on public.products (seller_id);

-- Follows
create table if not exists public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null,
  status text default 'pending',             -- pending | paid | shipped | delivered
  full_name text,
  phone text,
  address text,
  pincode text,
  created_at timestamptz default now()
);
alter table public.orders add column if not exists tracking_number text;

-- =========================================
-- Row Level Security
-- =========================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.follows enable row level security;
alter table public.orders enable row level security;

-- Profiles: everyone can read, only owner writes
create policy "profiles readable" on public.profiles for select using (true);
create policy "profiles insert self" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles update self" on public.profiles for update using (auth.uid() = id);

-- Products: everyone reads; sellers write their own
create policy "products readable" on public.products for select using (true);
create policy "products insert own" on public.products for insert with check (auth.uid() = seller_id);
create policy "products update own" on public.products for update using (auth.uid() = seller_id);
create policy "products delete own" on public.products for delete using (
  auth.uid() = seller_id
  and not exists (select 1 from public.orders where orders.product_id = products.id)
);

-- Follows: everyone reads; user manages own follow edges
create policy "follows readable" on public.follows for select using (true);
create policy "follows insert self" on public.follows for insert with check (auth.uid() = follower_id);
create policy "follows delete self" on public.follows for delete using (auth.uid() = follower_id);

-- Orders: buyer sees own orders; seller sees orders for their products
create policy "orders buyer read" on public.orders for select using (auth.uid() = buyer_id or auth.uid() = seller_id);
create policy "orders buyer insert" on public.orders for insert with check (auth.uid() = buyer_id);
create policy "orders seller update shipment" on public.orders for update
  using (auth.uid() = seller_id)
  with check (
    auth.uid() = seller_id
    and status = 'shipped'
    and tracking_number is not null
    and btrim(tracking_number) <> ''
  );
revoke update on public.orders from authenticated;
grant update (status, tracking_number) on public.orders to authenticated;

-- =========================================
-- Auto-create profile on signup
-- =========================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();