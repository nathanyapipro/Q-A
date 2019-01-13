-- Revert fundamental:app_public.tables.question_tag from pg

BEGIN;

drop table app_public.question_tag;

COMMIT;
