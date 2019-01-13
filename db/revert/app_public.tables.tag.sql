-- Revert fundamental:app_public.tables.tag from pg

BEGIN;

drop table app_public.tag;

COMMIT;
