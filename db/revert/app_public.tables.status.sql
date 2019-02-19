-- Revert fundamental:app_public.tables.status from pg

BEGIN;

drop trigger _100_status_timestamps ON app_public.status;
drop table app_public.status;

drop type app_public.status_type;

COMMIT;
