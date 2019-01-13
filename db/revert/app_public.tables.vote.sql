-- Revert fundamental:app_public.tables.vote from pg

BEGIN;

drop table app_public.vote;

COMMIT;
