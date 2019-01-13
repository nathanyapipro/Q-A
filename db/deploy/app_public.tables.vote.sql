-- Deploy fundamental:app_public.tables.vote to pg

BEGIN;

create table app_public.vote (
  id serial primary key,
  user_id int not null references app_public.user(id),
  question_id int not null references app_public.question(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."vote"("user_id");
create index on "app_public"."vote"("question_id");

alter table app_public.vote enable row level security;

create policy select_all on app_public.vote for select using (true);
create policy insert_all on app_public.vote for insert with check (true);
create policy update_all on app_public.vote for update using (true);
create policy delete_all on app_public.vote for delete using (true);

grant select on app_public.vote to fundamental_visitor;
grant insert on app_public.vote to fundamental_visitor;
grant update on app_public.vote to fundamental_visitor;
grant delete on app_public.vote to fundamental_visitor;

comment on table app_public.vote is
  E'vote on a question in the application.';
comment on column app_public.vote.id is
  E'unique identifier for the vote.';
comment on column app_public.vote.user_id is
  E'owner of the vote.';
comment on column app_public.vote.question_id is
  E'question being voted on.';

create trigger _100_timestamps
  after insert or update on app_public.vote
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
