-- Deploy fundamental:app_public.tables.status to pg

BEGIN;

create type app_public.status_type as enum ('NEW', 'UNDER_REVIEW', 'ADDRESSED', 'DISMISSED');

create table app_public.status (
  id serial primary key,
  status app_public.status_type not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.status enable row level security;

create policy select_all on app_public.status for select using (true);

grant select on app_public.status to fundamental_anonymous, fundamental_master;

comment on table app_public.status is
  E'@omit create,update,delete\nA status of a question in the application.';

comment on column app_public.status.id is
  E'unique identifier for the status.';
comment on column app_public.status.status is
  E'status of the status.';
comment on column app_public.status.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.status.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_status_timestamps
  before insert or update on app_public.status
  for each row
  execute procedure app_private.tg__timestamps();

insert into app_public.status (id, status) values
  (1,'NEW'),
  (2, 'UNDER_REVIEW'),
  (3, 'ADDRESSED'),
  (4, 'DISMISSED');

alter sequence app_public.status_id_seq restart with 5;

COMMIT;
