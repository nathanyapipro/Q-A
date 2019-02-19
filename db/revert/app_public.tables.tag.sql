-- Revert fundamental:app_public.tables.tag from pg

BEGIN;

drop trigger _100_tag_timestamps ON app_public.tag;
drop table app_public.tag;

COMMIT;
