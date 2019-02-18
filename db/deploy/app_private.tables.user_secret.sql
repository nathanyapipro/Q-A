-- Deploy fundamental:app_private.tables.user_secret to pg

BEGIN;

create table app_private.user_secret (
  user_id integer not null primary key references app_public.user(id) on delete cascade,
  password_hash text
);
alter table app_private.user_secret enable row level security;
comment on table app_private.user_secret is
  E'The contents of this table should never be visible to the user. Contains data mostly related to authentication.';

create function app_private.tg_user_secret__insert_with_user() returns trigger as $$
begin
  insert into app_private.user_secret(user_id) values(NEW.id);
  return NEW;
end;
$$ language plpgsql volatile set search_path from current;

create trigger _500_insert_secret
  after insert on app_public.user
  for each row
  execute procedure app_private.tg_user_secret__insert_with_user();
comment on function app_private.tg_user_secret__insert_with_user() is
  E'Ensures that every user record has an associated user_secret record.';

COMMIT;
