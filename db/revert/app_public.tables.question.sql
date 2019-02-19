-- Revert fundamental:app_public.tables.question from pg

BEGIN;

drop trigger _100_question_timestamps ON app_public.question;
drop table app_public.question;

COMMIT;
