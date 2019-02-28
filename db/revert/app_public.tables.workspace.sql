-- Revert fundamental:app_public.tables.workspace from pg

BEGIN;

drop trigger _100_workspace_timestamps ON app_public.workspace;
drop table app_public.workspace;

COMMIT;
