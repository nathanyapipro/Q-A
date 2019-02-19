-- Revert fundamental:app_public.tables.role.sql from pg

BEGIN;

drop trigger _100_role_timestamps ON app_public.role;
drop table app_public.role;

drop type app_public.role_type;

COMMIT;
