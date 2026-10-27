-- Run once in Supabase → SQL Editor. Auth handles passwords separately.
begin;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
grant select on public.profiles to authenticated;
drop policy if exists "Customers can read own profile" on public.profiles;
create policy "Customers can read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create or replace function public.gspot_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), new.email);
  return new;
end;
$$;
revoke execute on function public.gspot_new_user() from public, anon, authenticated;
drop trigger if exists gspot_user_created on auth.users;
create trigger gspot_user_created after insert on auth.users
for each row execute procedure public.gspot_new_user();
commit;
