-- Revert fundamental:app_public.tables.status from pg

BEGIN;

drop table app_public.status;

COMMIT;
