-- Revert fundamental:app_public.workspace_user from pg

BEGIN;

drop trigger _100_workspace_user_timestamps ON app_public.workspace_user;
drop table app_public.workspace_user;

COMMIT;
