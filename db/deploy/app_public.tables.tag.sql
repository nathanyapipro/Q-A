-- Deploy fundamental:app_public.tables.tag to pg

BEGIN;

create table app_public.tag (
  id serial primary key,
  name text not null unique,
  color text not null,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.tag enable row level security;

create policy select_all on app_public.tag for select using (true);
create policy create_all on app_public.tag for insert with check (true);
create policy update_all on app_public.tag for update using (true);
create policy delete_all on app_public.tag for delete using (true);

grant select on app_public.tag to fundamental_visitor;
grant insert on app_public.tag to fundamental_visitor;
grant update(name, color, is_enabled) on app_public.tag to fundamental_visitor;
grant delete on app_public.tag to fundamental_visitor;

comment on table app_public.tag is
  E'tag of a question in the application.';

comment on column app_public.tag.id is
  E'unique identifier for the tag.';
comment on column app_public.tag.name is
  E'name of the tag.';
comment on column app_public.tag.color is
  E'color of the tag.';
comment on column app_public.tag.is_enabled is
  E'determines if the tag is available.';

create trigger _100_timestamps
  after insert or update on app_public.tag
  for each row
  execute procedure app_private.tg__timestamps();

insert into app_public.tag (id, name, color) values
  (1,'Fusion', 'purple'),
  (2, 'HR', 'blue'),
  (3, '@JF', 'green');

alter sequence app_public.role_id_seq restart with 4;

COMMIT;
