-- Deploy fundamental:app_public.tables.role.sql to pg

BEGIN;

create type app_public.role_name_type as enum ('ADMIN', 'RESPONDER', 'ANONYMOUS');

create table app_public.role (
  id serial primary key,
  name app_public.role_name_type not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.role enable row level security;

create policy select_all on app_public.role for select using (true);

grant select on app_public.role to fundamental_visitor;

comment on table app_public.role is
  E'@omit create,update,delete\nA role in the application.';

comment on column app_public.role.id is
  E'unique identifier for the role.';
comment on column app_public.role.name is
  E'name of the role.';

create trigger _100_timestamps
  after insert or update on app_public.role
  for each row
  execute procedure app_private.tg__timestamps();

insert into app_public.role (id, name) values
  (1,'ADMIN'),
  (2, 'RESPONDER'),
  (3, 'ANONYMOUS');

alter sequence app_public.role_id_seq restart with 4;

COMMIT;
