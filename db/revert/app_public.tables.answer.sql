-- Revert fundamental:app_public.tables.answer from pg

BEGIN;

drop trigger _100_answer_timestamps ON app_public.answer;
drop table app_public.answer;

COMMIT;
