-- Revert fundamental:app_private.functions.create_anonymous_user from pg

BEGIN;

drop function app_private.create_anonymous_user(
  username text
);

COMMIT;
