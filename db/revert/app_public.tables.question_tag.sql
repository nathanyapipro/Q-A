-- Revert fundamental:app_public.tables.question_tag from pg

BEGIN;

drop trigger _100_question_tag_timestamps ON app_public.question_tag;
drop table app_public.question_tag;

COMMIT;
