-- Revert fundamental:app_public.functions.create_answer from pg

BEGIN;

drop function app_public.create_answer(
  question_id integer,
  content text
);

COMMIT;
