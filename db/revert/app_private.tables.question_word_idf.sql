-- Revert fundamental:app_private.tables.word_idf from pg

BEGIN;

drop table app_private.question_word_idf;

COMMIT;
