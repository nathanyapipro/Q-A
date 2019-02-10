-- Deploy fundamental:app_public.functions.create_question to pg

BEGIN;

create function app_public.create_question(
  content text,
  tag_ids int[]
)
returns app_public.question
as $$
  declare
    question app_public.question;
    tag_id int;
  begin
    insert into app_public.question(content, status_id, user_id)
      values(content, 1, app_public.current_user_id())
      returning * into question;

    foreach tag_id in array tag_ids loop
      insert into app_public.question_tag(question_id, tag_id)
        values (question.id, tag_id);
    end loop;

    return question;
  end;
$$ language plpgsql volatile strict set search_path from current;

comment on function app_public.create_question(content text, tag_ids int[]) is
  E'Creates a question.';

COMMIT;
