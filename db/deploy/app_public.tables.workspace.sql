-- Deploy fundamental:app_public.tables.workspace to pg

BEGIN;

create table app_public.workspace (
  id serial primary key,
  name text unique not null,
  is_public boolean not null,
  users text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."workspace"("is_public");
create index on "app_public"."workspace"("users");

alter table app_public.workspace enable row level security;

create policy select_all on app_public.workspace for select using (true);
create policy insert_all on app_public.workspace for insert with check (true);
create policy update_all on app_public.workspace for update using (true);
create policy delete_all on app_public.workspace for delete using (true);

grant select on app_public.workspace to fundamental_visitor;
grant insert on app_public.workspace to fundamental_visitor;
grant update(name, is_public, users) on app_public.workspace to fundamental_visitor;
grant delete on app_public.workspace to fundamental_visitor;

comment on table app_public.workspace is
  E'@omit all\nA workspace in the application.';

comment on column app_public.workspace.id is
  E'@omit update\n unique identifier for the workspace.';
comment on column app_public.workspace.name is
  E'name of the workspace.';
comment on column app_public.workspace.is_public is
  E'determines if workspace is publically accessible';
comment on column app_public.workspace.users is
  E'list of user email who have acces to this workspace';
comment on column app_public.workspace.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.workspace.updated_at is
  E'@omit update\n timestamp of last update';


create trigger _100_workspace_timestamps
  before insert or update on app_public.workspace
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
