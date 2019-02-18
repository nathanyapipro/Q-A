-- Deploy fundamental:app_public.tables.status to pg

BEGIN;

create type app_public.status_name_type as enum ('NEW', 'UNDER_REVIEW', 'ANSWERED', 'DISMISSED');

create table app_public.status (
  id serial primary key,
  name app_public.status_name_type not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.status enable row level security;

create policy select_all on app_public.status for select using (true);

grant select on app_public.status to fundamental_visitor;

comment on table app_public.status is
  E'@omit create,update,delete\nA status of a question in the application.';

comment on column app_public.status.id is
  E'unique identifier for the status.';
comment on column app_public.status.name is
  E'name of the status.';
comment on column app_public.status.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.status.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_timestamps
  after insert or update on app_public.status
  for each row
  execute procedure app_private.tg__timestamps();

insert into app_public.status (id, name) values
  (1,'NEW'),
  (2, 'UNDER_REVIEW'),
  (3, 'ANSWERED'),
  (4, 'DISMISSED');

alter sequence app_public.role_id_seq restart with 5;

COMMIT;
