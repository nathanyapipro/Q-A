-- Deploy fundamental:app_private.tables.word to pg

BEGIN;

create table app_private.word (
  id serial primary key,
  word text not null,
  count int not null
);
alter table app_private.word enable row level security;

comment on table app_private.word is
  E'word found in a question';

comment on column app_private.word.id is
  E'unique identifier for the word.';

comment on column app_private.word.count is
  E'count of the word';

COMMIT;
