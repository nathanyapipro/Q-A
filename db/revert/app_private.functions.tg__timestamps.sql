-- Revert fundamental:app_private.functions.tg__timestamps from pg

BEGIN;

drop function app_private.tg__timestamps();

COMMIT;
