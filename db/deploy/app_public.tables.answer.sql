-- Deploy fundamental:app_public.tables.answer to pg

BEGIN;

create table app_public.answer (
  id serial primary key,
  content text not null,
  user_id integer not null references app_public.user(id),
  question_id integer not null references app_public.question(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on "app_public"."answer"("user_id");
create index on "app_public"."answer"("question_id");
create index on "app_public"."answer"("created_at");

alter table app_public.answer enable row level security;

create policy select_all on app_public.answer for select using (true);
create policy insert_all on app_public.answer for insert with check (true);
create policy update_all on app_public.answer for update using (true);
create policy delete_all on app_public.answer for delete using (true);

grant select on app_public.answer to fundamental_anonymous, fundamental_master;
grant insert on app_public.answer to fundamental_master;
grant update(content) on app_public.answer to fundamental_master;
grant delete on app_public.answer to fundamental_master;

comment on table app_public.answer is
  E'@omit create\n answer in the application.';

comment on column app_public.answer.id is
  E'@omit update\n unique identifier for the answer.';
comment on column app_public.answer.content is
  E'content of the answer.';
comment on column app_public.answer.user_id is
  E'@omit update\n owner of the answer.';
comment on column app_public.answer.question_id is
  E'@omit update\n question being answered';
comment on column app_public.answer.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.answer.updated_at is
  E'@omit update\n timestamp of last update';


create trigger _100_answer_timestamps
  before insert or update on app_public.answer
  for each row
  execute procedure app_private.tg__timestamps();

COMMIT;
