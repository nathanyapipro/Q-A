-- Deploy fundamental:app_public.tables.workspace_workspace_tag to pg

BEGIN;

create table app_public.workspace_tag (
  id serial primary key,
  workspace_id integer not null references app_public.workspace(id),
  tag_id integer not null references app_public.tag(id),
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, tag_id)
);
alter table app_public.workspace_tag enable row level security;

create index on "app_public"."workspace_tag"("workspace_id");
create index on "app_public"."workspace_tag"("tag_id");

create policy select_all on app_public.workspace_tag for select using (true);
create policy create_all on app_public.workspace_tag for insert with check (true);
create policy update_all on app_public.workspace_tag for update using (true);
create policy delete_all on app_public.workspace_tag for delete using (true);

grant select on app_public.workspace_tag to fundamental_visitor;
grant insert on app_public.workspace_tag to fundamental_visitor;
grant update(is_enabled) on app_public.workspace_tag to fundamental_visitor;
grant delete on app_public.workspace_tag to fundamental_visitor;

comment on table app_public.workspace_tag is
  E'workspace_tag in the application.';

comment on column app_public.workspace_tag.id is
  E'@omit update\n unique identifier for the workspace_tag.';
comment on column app_public.workspace_tag.workspace_id is
  E'id of the workspace.';
comment on column app_public.workspace_tag.tag_id is
  E'id of the tag.';
comment on column app_public.workspace_tag.is_enabled is
  E'determines if the workspace_tag is available.';
comment on column app_public.workspace_tag.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.workspace_tag.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_workspace_tag_timestamps
  before insert or update on app_public.workspace_tag
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
