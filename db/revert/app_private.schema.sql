-- Revert fundamental:app_private.schema from pg

BEGIN;

drop schema app_private;

COMMIT;
