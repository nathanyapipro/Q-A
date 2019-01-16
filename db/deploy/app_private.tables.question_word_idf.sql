-- Deploy fundamental:app_private.tables.question_word_idf to pg

BEGIN;

create table app_private.question_word_idf (
  id serial primary key,
  question_id int not null references app_public.question(id),
  word_id int not null references app_private.word(id),
  count int not null,
  idf real not null
);
alter table app_private.question_word_idf enable row level security;

create index on "app_private"."question_word_idf"("question_id");
create index on "app_private"."question_word_idf"("word_id");

comment on table app_private.question_word_idf is
  E'idf of each word in the question';

comment on column app_private.question_word_idf.id is
  E'unique identifier for the question_word_idf.';

comment on column app_private.question_word_idf.question_id is
  E'question in which the word was found.';

comment on column app_private.question_word_idf.word_id is
  E'word on which the idf is being calculated.';

comment on column app_private.question_word_idf.count is
  E'count of the word in the question.';

comment on column app_private.question_word_idf.idf is
  E'idf of the word.';

COMMIT;
