-- Deploy fundamental:app_public.tables.status to pg

BEGIN;

create table app_public.status (
  id serial primary key,
  name text not null unique,
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

create trigger _100_timestamps
  after insert or update on app_public.status
  for each row
  execute procedure app_private.tg__timestamps();

insert into app_public.status (id, name) values
  (1,'New'),
  (2, 'Under Review'),
  (3, 'Answered');

alter sequence app_public.role_id_seq restart with 4;

COMMIT;
