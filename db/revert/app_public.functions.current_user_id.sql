-- Revert fundamental:app_public.functions.current_user_id from pg

BEGIN;

drop function app_public.current_user_id();

COMMIT;
