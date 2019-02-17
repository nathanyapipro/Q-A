-- Deploy fundamental:app_public.functions.create_comment to pg

BEGIN;

create function app_public.create_comment(
  question_id integer,
  content text
)
returns app_public.comment
as $$
  declare
    comment app_public.comment;
  begin
    insert into app_public.comment(question_id, content, user_id)
      values(question_id, content, app_public.current_user_id())
      returning * into comment;

    return comment;
  end;
$$ language plpgsql volatile strict set search_path from current;

comment on function app_public.create_comment(question_id integer, content text) is
  E'Creates a comment.';

COMMIT;
