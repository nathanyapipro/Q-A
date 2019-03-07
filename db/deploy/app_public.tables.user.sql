-- Deploy fundamental:app_public.tables.user to pg

BEGIN;

create type app_public.role_type as enum ('ADMIN', 'MANAGER', 'ANONYMOUS');

create table app_public.user (
  id serial primary key,
  username text not null unique,
  role app_public.role_type not null,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.user enable row level security;

create policy select_all on app_public.user for select using (true);
create policy update_self on app_public.user for update using (id = app_public.current_user_id());
create policy delete_self on app_public.user for delete using (id = app_public.current_user_id());
grant select on app_public.user to fundamental_visitor;
-- NOTE: `insert` is not granted, because we'll handle that separately
grant update(username) on app_public.user to fundamental_visitor;
grant delete on app_public.user to fundamental_visitor;

-- By doing `@omit all` we prevent the `allUser` field from appearing in our
-- GraphQL schema.  User discovery is still possible by browsing the rest of
-- the data, but it makes it harder for people to receive a `totalCount` of
-- user, or enumerate them fully.
comment on table app_public.user is
  E'@omit all,create\nA user who can log in to the application.';

comment on column app_public.user.id is
  E'@omit update\n unique identifier for the user.';
comment on column app_public.user.username is
  E'public-facing username (or ''handle'') of the user.';
comment on column app_public.user.role is
  E'role of the user.';
comment on column app_public.user.is_enabled is
  E'determines if the user is enabled';
comment on column app_public.user.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.user.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_user_timestamps
  before insert or update on app_public.user
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
