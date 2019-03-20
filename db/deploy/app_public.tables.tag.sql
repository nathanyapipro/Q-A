-- Deploy fundamental:app_public.tables.tag to pg

BEGIN;

create table app_public.tag (
  id serial primary key,
  name text not null unique,
  color text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.tag enable row level security;

create policy select_all on app_public.tag for select using (true);
create policy create_all on app_public.tag for insert with check (true);
create policy update_all on app_public.tag for update using (true);
create policy delete_all on app_public.tag for delete using (true);

grant select on app_public.tag to fundamental_authenticated;
grant insert on app_public.tag to fundamental_authenticated;
grant update(name, color) on app_public.tag to fundamental_authenticated;
grant delete on app_public.tag to fundamental_authenticated;

comment on table app_public.tag is
  E'tag of a question in the application.';

comment on column app_public.tag.id is
  E'@omit update\n unique identifier for the tag.';
comment on column app_public.tag.name is
  E'name of the tag.';
comment on column app_public.tag.color is
  E'color of the tag.';
comment on column app_public.tag.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.tag.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_tag_timestamps
  before insert or update on app_public.tag
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
