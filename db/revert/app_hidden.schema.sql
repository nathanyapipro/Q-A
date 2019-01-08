-- Revert fundamental:app_hidden.schema from pg

BEGIN;

drop schema app_hidden;

COMMIT;
