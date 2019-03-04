-- Revert fundamental:app_public.tables.user from pg

BEGIN;

drop trigger _100_user_timestamps ON app_public.user;
drop table app_public.user;
drop type app_public.role_type;

COMMIT;
