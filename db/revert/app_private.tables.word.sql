-- Revert fundamental:app_private.tables.word from pg

BEGIN;

drop table app_private.word;

COMMIT;
