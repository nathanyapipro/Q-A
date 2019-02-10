-- Revert fundamental:app_public.functions.question_toggle_vote from pg

BEGIN;

drop function app_public.question_toggle_vote(question_id integer);

COMMIT;
