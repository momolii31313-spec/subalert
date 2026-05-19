-- Run this in Supabase SQL editor

-- Subscriptions table
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  service_name text not null,
  price numeric not null default 0,
  currency text default 'USD',
  billing_cycle text default 'monthly', -- monthly|yearly|weekly|trial
  trial_end_date date,
  next_billing_date date,
  auto_detected boolean default false,
  last_alert_sent date,
  active boolean default true,
  created_at timestamp default now()
);

-- User profile (stores forwarding alias)
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  forward_alias text unique not null,
  created_at timestamp default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, forward_alias)
  values (
    new.id,
    new.email,
    lower(substring(md5(random()::text), 1, 10))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Row Level Security
alter table subscriptions enable row level security;
alter table profiles enable row level security;

create policy "Users see own subs" on subscriptions
  for select using (auth.uid() = user_id);
create policy "Users insert own subs" on subscriptions
  for insert with check (auth.uid() = user_id);
create policy "Users update own subs" on subscriptions
  for update using (auth.uid() = user_id);
create policy "Users delete own subs" on subscriptions
  for delete using (auth.uid() = user_id);

create policy "Users see own profile" on profiles
  for select using (auth.uid() = id);

-- Indexes for cron performance
create index idx_subs_billing_date on subscriptions(next_billing_date) where active = true;
create index idx_subs_trial_date on subscriptions(trial_end_date) where active = true;
create index idx_profiles_alias on profiles(forward_alias);
