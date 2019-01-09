-- Revert fundamental:app_private.functions.create_user from pg

BEGIN;

drop function app_private.create_user(
  username text,
  password text,
  is_anonymous boolean
);

COMMIT;
