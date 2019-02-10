-- Deploy fundamental:app_public.functions.question_toggle_vote to pg

BEGIN;

create function app_public.question_toggle_vote(
  question_id integer
)
returns app_public.question
as $$
  declare
    question app_public.question;
  begin

    if not exists (
      select *
      from app_public.vote as v
      where 
        v.question_id = $1
        and
        v.user_id = app_public.current_user_id()
      limit 1
    ) then
      insert into app_public.vote(question_id, user_id)
      values
        ($1, app_public.current_user_id());
    else
      delete 
      from app_public.vote as v
      where
        v.question_id = $1
        and
        v.user_id = app_public.current_user_id();
    end if;

    select * into question
    from app_public.question as q
    where q.id = $1;

    return question;
  end;
$$ language plpgsql volatile strict set search_path from current;

comment on function app_public.question_toggle_vote(question_id integer) is
  E'Toggles User vote on a question.';

COMMIT;
