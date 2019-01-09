-- Revert fundamental:app_private.tables.user_secret from pg

BEGIN;


drop trigger _500_insert_secret on app_public.user;
drop function app_private.tg_user_secret__insert_with_user();
drop table app_private.user_secret;

COMMIT;
