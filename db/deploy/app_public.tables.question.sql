-- Deploy fundamental:app_public.tables.question to pg

BEGIN;

create table app_public.question (
  id serial primary key,
  content text not null,
  user_id integer not null references app_public.user(id),
  status_id integer not null references app_public.status(id) default 1,
  vote_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."question"("user_id");
create index on "app_public"."question"("status_id");
create index on "app_public"."question"("vote_count");
create index on "app_public"."question"("created_at");

alter table app_public.question enable row level security;

create policy select_all on app_public.question for select using (true);
create policy insert_all on app_public.question for insert with check (true);
create policy update_all on app_public.question for update using (true);
create policy delete_all on app_public.question for delete using (true);

grant select on app_public.question to fundamental_visitor;
grant insert on app_public.question to fundamental_visitor;
grant update(content, status_id) on app_public.question to fundamental_visitor;
grant delete on app_public.question to fundamental_visitor;

comment on table app_public.question is
  E'@omit create,update\nA question in the application.';

comment on column app_public.question.id is
  E'@omit update\n unique identifier for the question.';
comment on column app_public.question.content is
  E'content of the question.';
comment on column app_public.question.user_id is
  E'@omit update\n owner of the question.';
comment on column app_public.question.status_id is
  E'status of the question';
comment on column app_public.question.vote_count is
  E'@omit update\n vote count of the question';
comment on column app_public.question.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.question.updated_at is
  E'@omit update\n timestamp of last update';


create trigger _100_timestamps
  after insert or update on app_public.question
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
