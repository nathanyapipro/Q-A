-- Deploy fundamental:app_public.workspace_user to pg

BEGIN;

create table app_public.workspace_user (
  id serial primary key,
  workspace_id integer not null references app_public.workspace(id),
  user_id integer not null references app_public.user(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);
alter table app_public.workspace_user enable row level security;

create index on "app_public"."workspace_user"("workspace_id");
create index on "app_public"."workspace_user"("user_id");

create policy select_all on app_public.workspace_user for select using (true);
create policy create_all on app_public.workspace_user for insert with check (true);
create policy delete_all on app_public.workspace_user for delete using (true);

grant select on app_public.workspace_user to fundamental_master;
grant insert on app_public.workspace_user to fundamental_master;
grant delete on app_public.workspace_user to fundamental_master;

comment on table app_public.workspace_user is
  E'@omit update\n workspace_user in the application.';

comment on column app_public.workspace_user.id is
  E'unique identifier for the workspace_user.';
comment on column app_public.workspace_user.workspace_id is
  E'id of the workspace.';
comment on column app_public.workspace_user.user_id is
  E'id of the user.';
comment on column app_public.workspace_user.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.workspace_user.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_workspace_user_timestamps
  before insert or update on app_public.workspace_user
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
