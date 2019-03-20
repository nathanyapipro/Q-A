-- Deploy fundamental:app_public.functions.create_answer to pg

BEGIN;

create function app_public.create_answer(
  question_id integer,
  content text
)
returns app_public.answer
as $$
  declare
    answer app_public.answer;
  begin
    insert into app_public.answer(question_id, content, user_id)
      values(question_id, content, app_public.current_user_id())
      returning * into answer;

    return answer;
  end;
$$ language plpgsql volatile strict set search_path from current;

grant execute on function app_public.create_answer(question_id integer, content text) to fundamental_authenticated;

comment on function app_public.create_answer(question_id integer, content text) is
  E'Creates a answer.';

COMMIT;
