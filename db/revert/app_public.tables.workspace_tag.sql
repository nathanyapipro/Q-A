-- Revert fundamental:app_public.tables.workspace_tag from pg

BEGIN;

drop trigger _100_workspace_tag_timestamps ON app_public.workspace_tag;
drop table app_public.workspace_tag;

COMMIT;
