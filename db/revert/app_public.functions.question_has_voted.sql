-- Revert fundamental:app_public.functions.question_has_voted from pg

BEGIN;

drop function app_public.question_has_voted(q app_public.question);

COMMIT;
