-- Revert fundamental:app_public.tables.role.sql from pg

BEGIN;

drop table app_public.role;

COMMIT;
