-- Deploy fundamental:app_public.tables.vote to pg

BEGIN;

create table app_public.vote (
  id serial primary key,
  user_id integer not null references app_public.user(id),
  question_id integer not null references app_public.question(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."vote"("user_id");
create index on "app_public"."vote"("question_id");

alter table app_public.vote enable row level security;

create policy select_all on app_public.vote for select using (true);

grant select on app_public.vote to fundamental_authenticated;

comment on table app_public.vote is
  E'@omit create,delete,update\n  vote on a question in the application.';
comment on column app_public.vote.id is
  E'unique identifier for the vote.';
comment on column app_public.vote.user_id is
  E'owner of the vote.';
comment on column app_public.vote.question_id is
  E'question being voted on.';
comment on column app_public.vote.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.vote.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_vote_timestamps
  before insert or update on app_public.vote
  for each row
  execute procedure app_private.tg__timestamps();


create function app_private.tg_vote__increment_question_vote_count() returns trigger as $$
begin
  update app_public.question as q
    set vote_count = vote_count + 1
    where q.id = NEW.question_id;
    return NEW;
end;
$$ language plpgsql volatile set search_path from current;

create function app_private.tg_vote__decrement_question_vote_count() returns trigger as $$
begin
  update app_public.question as q
    set vote_count = vote_count - 1
    where q.id = OLD.question_id;
    return OLD;
end;
$$ language plpgsql volatile set search_path from current;

create trigger _200_increment_question_vote_count after insert on app_public.vote
  for each row execute procedure app_private.tg_vote__increment_question_vote_count();

create trigger _200_decrement_question_vote_count after delete on app_public.vote
  for each row execute procedure app_private.tg_vote__decrement_question_vote_count();

COMMIT;
