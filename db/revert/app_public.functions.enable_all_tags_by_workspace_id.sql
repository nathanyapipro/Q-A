-- Revert fundamental:app_public.functions.enable_all_tags_by_workspace_id from pg

BEGIN;

drop function app_public.enable_all_tags_by_workspace_id(workspace_id integer);

COMMIT;
