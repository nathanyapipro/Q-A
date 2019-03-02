-- Deploy fundamental:app_public.functions.create_question to pg

BEGIN;

create function app_public.create_question(
  workspace_id integer,
  content text,
  tag_ids integer[]
)
returns app_public.question
as $$
  declare
    question app_public.question;
    tag_id int;
  begin
    insert into app_public.question(workspace_id, content, status_id, user_id)
      values(workspace_id, content, 1, app_public.current_user_id())
      returning * into question;

    foreach tag_id in array tag_ids loop
      insert into app_public.question_tag(question_id, tag_id)
        values (question.id, tag_id);
    end loop;

    return question;
  end;
$$ language plpgsql volatile strict set search_path from current;

comment on function app_public.create_question(workspace_id integer, content text, tag_ids integer[]) is
  E'Creates a question.';

COMMIT;
