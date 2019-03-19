-- Revert fundamental:app_public.functions.workspaces from pg

BEGIN;

drop function app_public.workspaces(email text);

COMMIT;
