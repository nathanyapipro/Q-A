-- Revert fundamental:app_public.functions.create_question from pg

BEGIN;

drop function app_public.create_question(content text, tag_ids int[]);

COMMIT;
