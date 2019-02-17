-- Revert fundamental:app_public.functions.create_comment from pg

BEGIN;

drop function app_public.create_comment(question_id integer, content text);

COMMIT;
