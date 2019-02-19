-- Revert fundamental:app_public.tables.vote from pg

BEGIN;

drop trigger _100_vote_timestamps ON app_public.vote;
drop trigger _200_increment_question_vote_count ON app_public.vote;
drop function app_private.tg_vote__increment_question_vote_count();
drop trigger _200_decrement_question_vote_count ON app_public.vote;
drop function app_private.tg_vote__decrement_question_vote_count();
drop table app_public.vote;

COMMIT;
