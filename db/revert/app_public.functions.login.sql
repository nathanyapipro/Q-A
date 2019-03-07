-- Revert fundamental:app_public.functions.login from pg

BEGIN;

drop function app_public.login(
  username text,
  password text
);
drop type app_public.auth;

COMMIT;
