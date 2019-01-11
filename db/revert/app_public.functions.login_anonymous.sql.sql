-- Revert fundamental:app_public.functions.login_anonymous.sql from pg

BEGIN;

drop function app_public.login_anonymous(username text);

COMMIT;
