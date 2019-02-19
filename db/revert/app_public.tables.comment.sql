-- Revert fundamental:app_public.tables.comment from pg

BEGIN;

drop trigger _100_comment_timestamps ON app_public.comment;
drop table app_public.comment;

COMMIT;
