-- Revert fundamental:app_public.tables.question from pg

BEGIN;

drop table app_public.question;

COMMIT;
