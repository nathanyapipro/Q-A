-- Revert fundamental:app_public.functions.create_question from pg

BEGIN;

drop function app_public.create_question(workspace_id integer, content text, tag_ids integer[]);

COMMIT;
