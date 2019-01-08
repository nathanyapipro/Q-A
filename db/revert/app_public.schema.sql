-- Revert fundamental:app_public.schema from pg

BEGIN;

drop schema app_public;

COMMIT;
