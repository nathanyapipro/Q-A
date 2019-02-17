-- Revert fundamental:app_public.functions.current_user from pg

BEGIN;

drop function app_public.current_user();

COMMIT;
