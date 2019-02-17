-- Deploy fundamental:app_public.tables.comment to pg

BEGIN;

create table app_public.comment (
  id serial primary key,
  content text not null,
  user_id int not null references app_public.user(id),
  question_id int not null references app_public.question(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."comment"("user_id");
create index on "app_public"."comment"("question_id");
create index on "app_public"."comment"("created_at");

alter table app_public.comment enable row level security;

create policy select_all on app_public.comment for select using (true);
create policy insert_all on app_public.comment for insert with check (true);
create policy update_all on app_public.comment for update using (true);
create policy delete_all on app_public.comment for delete using (true);

grant select on app_public.comment to fundamental_visitor;
grant insert on app_public.comment to fundamental_visitor;
grant update(content) on app_public.comment to fundamental_visitor;
grant delete on app_public.comment to fundamental_visitor;

comment on table app_public.comment is
  E'@omit create\nA comment in the application.';

comment on column app_public.comment.id is
  E'unique identifier for the comment.';
comment on column app_public.comment.content is
  E'content of the comment.';
comment on column app_public.comment.user_id is
  E'owner of the comment.';
  comment on column app_public.comment.question_id is
  E'question being commented';


create trigger _100_timestamps
  after insert or update on app_public.comment
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
