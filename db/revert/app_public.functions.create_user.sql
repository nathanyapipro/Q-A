-- Revert fundamental:app_public.functions.create_user.sql from pg

BEGIN;

drop function app_public.create_user(username text, password text, role app_public.role_type);

COMMIT;
