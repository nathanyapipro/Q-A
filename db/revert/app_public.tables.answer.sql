-- Revert fundamental:app_public.tables.answer from pg

BEGIN;

drop table app_public.answer;

COMMIT;
