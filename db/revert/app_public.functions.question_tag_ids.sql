-- Revert fundamental:app_public.functions.question_tag_ids from pg

BEGIN;

drop function app_public.question_tag_ids(q app_public.question);

COMMIT;
