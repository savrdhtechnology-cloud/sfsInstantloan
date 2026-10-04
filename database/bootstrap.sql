-- Run once in a NEW, dedicated SFS Instant Loan Supabase project.
-- This is a reviewed bootstrap script, not an applied migration.
begin;
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, service_role;
create table public.staff (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null check(length(full_name) between 1 and 100),
 role text not null check(role in ('admin','manager','agent','finance')),
 active boolean not null default true,
 created_at timestamptz not null default now()
);
alter table public.staff enable row level security;
create function private.staff_role() returns text language sql stable security definer set search_path='' as $$
 select s.role from public.staff s where s.id=(select auth.uid()) and s.active=true and auth.uid() is not null;
$$;
revoke all on function private.staff_role() from public, anon;
grant execute on function private.staff_role() to authenticated, service_role;
create policy staff_read on public.staff for select to authenticated using ((select private.staff_role()) is not null);
grant select on public.staff to authenticated;
revoke all on public.staff from anon;
create table public.applications (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null unique,
 reference text not null unique,
 tracking_hash text not null,
 ip_hash text not null,
 full_name text not null check(length(full_name) between 2 and 100),
 phone text not null check(phone ~ '^[6-9][0-9]{9}$'),
 email text not null check(length(email)<=254),
 city text not null,
 employment text not null check(employment in ('Salaried','Self-employed','Business owner','Professional','Other')),
 monthly_income numeric not null check(monthly_income>=0),
 product text not null check(product in ('Personal Loan','Business Loan','Professional Loan','Loan Against Property')),
 amount numeric not null check(amount between 25000 and 100000000),
 tenure integer not null check(tenure between 6 and 240),
 purpose text not null default '' check(length(purpose)<=1000),
 status text not null default 'New' check(status in ('New','Contacted','Documents Pending','Under Review','Approved','Disbursed','Closed')),
 assignee uuid references public.staff(id),
 follow_up_at timestamptz,
 consent_at timestamptz not null default now(),
 consent_version text not null default '2026-10-v1',
 disbursement_reference text,
 disbursed_amount numeric,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint disbursement_evidence check(status<>'Disbursed' or (disbursement_reference is not null and disbursed_amount is not null and length(trim(disbursement_reference))>0 and disbursed_amount>0))
);
create unique index applications_active_phone on public.applications(phone) where status not in ('Closed','Disbursed');
create unique index applications_transaction_unique on public.applications(lower(trim(disbursement_reference))) where disbursement_reference is not null;
create index applications_assignee on public.applications(assignee);
create index applications_follow_up on public.applications(follow_up_at) where follow_up_at is not null;
create index applications_created on public.applications(created_at desc);
create index applications_ip_created on public.applications(ip_hash,created_at);
create table public.activity (
 id uuid primary key default gen_random_uuid(),
 application_id uuid not null references public.applications(id) on delete cascade,
 actor_id uuid references auth.users(id),
 body text not null check(length(body) between 1 and 2000),
 created_at timestamptz not null default now()
);
create index activity_application_date on public.activity(application_id,created_at desc);
create index activity_actor on public.activity(actor_id);
alter table public.applications enable row level security;
alter table public.activity enable row level security;
create policy applications_read on public.applications for select to authenticated using (
 (select private.staff_role()) in ('admin','manager','finance') or ((select private.staff_role())='agent' and assignee=(select auth.uid()))
);
create policy applications_update on public.applications for update to authenticated using (
 (select private.staff_role()) in ('admin','manager','finance') or ((select private.staff_role())='agent' and assignee=(select auth.uid()))
) with check (
 (select private.staff_role()) in ('admin','manager','finance') or ((select private.staff_role())='agent' and assignee=(select auth.uid()))
);
create policy activity_read on public.activity for select to authenticated using (exists(select 1 from public.applications a where a.id=application_id));
create policy activity_insert on public.activity for insert to authenticated with check (actor_id=(select auth.uid()) and exists(select 1 from public.applications a where a.id=application_id));
revoke all on public.applications,public.activity from anon,authenticated;
grant select(id,reference,full_name,phone,email,city,employment,monthly_income,product,amount,tenure,purpose,status,assignee,follow_up_at,created_at,updated_at,disbursement_reference,disbursed_amount) on public.applications to authenticated;
grant update(status,assignee,follow_up_at,disbursement_reference,disbursed_amount) on public.applications to authenticated;
grant select on public.activity to authenticated;
grant insert(application_id,actor_id,body) on public.activity to authenticated;
grant all on public.staff,public.applications,public.activity to service_role;
create function private.guard_application() returns trigger language plpgsql security invoker set search_path='' as $$
declare staff_role text;
begin
 staff_role:=private.staff_role();
 if auth.uid() is not null then
   if staff_role is null then raise exception 'STAFF_REQUIRED'; end if;
   if new.assignee is distinct from old.assignee and staff_role not in ('admin','manager') then raise exception 'ASSIGNMENT_RESTRICTED'; end if;
   if new.assignee is not null and not exists(select 1 from public.staff where id=new.assignee and active=true) then raise exception 'INACTIVE_ASSIGNEE'; end if;
   if (new.status='Disbursed' or old.status='Disbursed' or new.disbursement_reference is distinct from old.disbursement_reference or new.disbursed_amount is distinct from old.disbursed_amount) and staff_role not in ('admin','finance') then raise exception 'FINANCE_REQUIRED'; end if;
   if old.status='Disbursed' and (new.status is distinct from old.status or new.disbursement_reference is distinct from old.disbursement_reference or new.disbursed_amount is distinct from old.disbursed_amount) then raise exception 'VERIFIED_RECORD_IMMUTABLE'; end if;
 end if;
 new.updated_at:=now(); return new;
end;
$$;
create trigger guard_application before update on public.applications for each row execute function private.guard_application();
create function private.log_application() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if TG_OP='INSERT' then
 insert into public.activity(application_id,actor_id,body) values(new.id,auth.uid(),'Application received. Consent recorded.');
 elsif old.status is distinct from new.status then
 insert into public.activity(application_id,actor_id,body) values(new.id,auth.uid(),'Status changed from '||old.status||' to '||new.status||'.');
 end if;
 if TG_OP='UPDATE' and old.assignee is distinct from new.assignee then
 insert into public.activity(application_id,actor_id,body) values(new.id,auth.uid(),'Assignment updated to '||coalesce(new.assignee::text,'unassigned')||'.');
 end if;
 if TG_OP='UPDATE' and old.follow_up_at is distinct from new.follow_up_at then
 insert into public.activity(application_id,actor_id,body) values(new.id,auth.uid(),'Follow-up '||coalesce('scheduled for '||new.follow_up_at::text,'cleared')||'.');
 end if;
 return new;
end;
$$;
create trigger log_application after insert or update on public.applications for each row execute function private.log_application();
revoke all on function private.guard_application(),private.log_application() from public,anon,authenticated;
create function public.submit_application(payload jsonb) returns jsonb language plpgsql security invoker set search_path='' as $$
declare existing_reference text;
begin
 if payload->>'consent'<>'true' then raise exception 'CONSENT_REQUIRED'; end if;
 perform pg_advisory_xact_lock(hashtextextended(payload->>'ip_hash',0));
 perform pg_advisory_xact_lock(hashtextextended(payload->>'phone',1));
 select reference into existing_reference from public.applications where request_id=(payload->>'request_id')::uuid;
 if existing_reference is not null then return jsonb_build_object('reference',existing_reference); end if;
 if (select count(*) from public.applications where ip_hash=payload->>'ip_hash' and created_at>now()-interval '1 hour')>=5 then raise exception 'RATE_LIMIT'; end if;
 if exists(select 1 from public.applications where phone=payload->>'phone' and status not in ('Closed','Disbursed')) then raise exception 'DUPLICATE'; end if;
 insert into public.applications(request_id,reference,tracking_hash,ip_hash,full_name,phone,email,city,employment,monthly_income,product,amount,tenure,purpose)
 values((payload->>'request_id')::uuid,payload->>'reference',payload->>'tracking_hash',payload->>'ip_hash',payload->>'full_name',payload->>'phone',payload->>'email',payload->>'city',payload->>'employment',(payload->>'monthly_income')::numeric,payload->>'product',(payload->>'amount')::numeric,(payload->>'tenure')::integer,coalesce(payload->>'purpose',''));
 return jsonb_build_object('reference',payload->>'reference');
end;
$$;
revoke all on function public.submit_application(jsonb) from public,anon,authenticated;
grant execute on function public.submit_application(jsonb) to service_role;
commit;
-- Create the initial admin in Supabase Auth, then explicitly enroll that AUTH UUID:
-- insert into public.staff(id,full_name,role) values ('ACTUAL_AUTH_USER_UUID','Administrator','admin');
-- Never grant staff access based on user-editable user_metadata.
