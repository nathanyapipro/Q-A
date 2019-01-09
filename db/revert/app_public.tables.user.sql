-- Revert fundamental:app_public.tables.user from pg

BEGIN;

drop table app_public.user;

COMMIT;
