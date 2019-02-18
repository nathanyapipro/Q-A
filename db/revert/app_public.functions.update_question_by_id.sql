-- Revert fundamental:app_public.functions.create_question from pg

BEGIN;

drop function app_public.update_question_by_id(
  id integer,
  patch app_public.question_patch
);

drop type app_public.question_patch;

COMMIT;
