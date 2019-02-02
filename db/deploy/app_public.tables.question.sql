-- Deploy fundamental:app_public.tables.question to pg

BEGIN;

create type app_public.question_status as enum ('NEW', 'UNDER_REVIEW', 'ANSWERED');

create table app_public.question (
  id serial primary key,
  content text not null,
  user_id int not null references app_public.user(id),
  status app_public.question_status not null default 'NEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."question"("user_id");

alter table app_public.question enable row level security;

create policy select_all on app_public.question for select using (true);
create policy insert_all on app_public.question for insert with check (true);
create policy update_all on app_public.question for update using (true);
create policy delete_all on app_public.question for delete using (true);

grant select on app_public.question to fundamental_visitor;
grant insert on app_public.question to fundamental_visitor;
grant update(content, status) on app_public.question to fundamental_visitor;
grant delete on app_public.question to fundamental_visitor;

comment on table app_public.question is
  E'question in the application.';

comment on column app_public.question.id is
  E'unique identifier for the question.';
comment on column app_public.question.content is
  E'content of the question.';
comment on column app_public.question.user_id is
  E'owner of the question.';
comment on column app_public.question.status is
  E'status of the question';


create trigger _100_timestamps
  after insert or update on app_public.question
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
