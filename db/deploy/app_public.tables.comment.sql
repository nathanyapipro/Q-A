-- Deploy fundamental:app_public.tables.comment to pg

BEGIN;

create table app_public.comment (
  id serial primary key,
  content text not null,
  user_id integer not null references app_public.user(id),
  question_id integer not null references app_public.question(id) on delete cascade,
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

grant select on app_public.comment to fundamental_authenticated;
grant insert on app_public.comment to fundamental_authenticated;
grant update(content) on app_public.comment to fundamental_authenticated;
grant delete on app_public.comment to fundamental_authenticated;

comment on table app_public.comment is
  E'@omit create\nA comment in the application.';

comment on column app_public.comment.id is
  E'@omit update\n unique identifier for the comment.';
comment on column app_public.comment.content is
  E'content of the comment.';
comment on column app_public.comment.user_id is
  E'@omit update\n owner of the comment.';
comment on column app_public.comment.question_id is
  E'@omit update\n question being commented';
comment on column app_public.comment.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.comment.updated_at is
  E'@omit update\n timestamp of last update';


create trigger _100_comment_timestamps
  before insert or update on app_public.comment
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
