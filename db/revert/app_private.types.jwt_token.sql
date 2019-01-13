-- Revert fundamental:app_private.types.jwt_token from pg

BEGIN;

drop type app_private.jwt_token;

COMMIT;
