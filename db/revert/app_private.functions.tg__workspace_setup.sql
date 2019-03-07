-- Revert fundamental:app_private.functions.tg__workspace_setup from pg

BEGIN;

drop trigger _200_workspace_setup ON app_public.workspace;
drop function app_private.tg__workspace_setup();

COMMIT;
