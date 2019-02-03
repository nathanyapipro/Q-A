-- Revert fundamental:app_public.tables.comment from pg

BEGIN;

drop table app_public.comment;

COMMIT;
