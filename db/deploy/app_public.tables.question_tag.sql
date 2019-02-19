-- Deploy fundamental:app_public.tables.question_tag to pg

BEGIN;

create table app_public.question_tag (
  id serial primary key,
  question_id integer not null references app_public.question(id) on delete cascade,
  tag_id integer not null references app_public.tag(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."question_tag"("question_id");
create index on "app_public"."question_tag"("tag_id");

alter table app_public.question_tag enable row level security;

create policy select_all on app_public.question_tag for select using (true);
create policy insert_all on app_public.question_tag for insert with check (true);
create policy delete_all on app_public.question_tag for delete using (true);

grant select on app_public.question_tag to fundamental_visitor;
grant insert on app_public.question_tag to fundamental_visitor;
grant delete on app_public.question_tag to fundamental_visitor;

comment on table app_public.question_tag is
  E'@omit update\n tags on a question in the application.';
comment on column app_public.question_tag.id is
  E'unique identifier for the question_tag.';
comment on column app_public.question_tag.question_id is
  E'question being question_taged on.';
comment on column app_public.question_tag.tag_id is
  E'tag on the question';
comment on column app_public.question_tag.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.question_tag.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_question_tag_timestamps
  before insert or update on app_public.question_tag
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
