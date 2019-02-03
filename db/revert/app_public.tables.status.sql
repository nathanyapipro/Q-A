-- Revert fundamental:app_public.tables.status from pg

BEGIN;

drop table app_public.status;

drop type app_public.status_name_type;

COMMIT;
