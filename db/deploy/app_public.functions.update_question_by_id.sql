-- Deploy fundamental:app_public.functions.update_question_by_id.sql to pg

BEGIN;

create type app_public.question_patch as (
  status_id integer,
  content text,
  tag_ids integer[]
);

create function app_public.update_question_by_id(
  id integer,
  patch app_public.question_patch
)
returns app_public.question
as $$
  declare
    question app_public.question;
    tag_id int;
  begin

    update app_public.question as q
      set 
        status_id = COALESCE(patch.status_id, q.status_id),
        content = COALESCE(patch.content, q.content)
      where q.id = $1
      returning * into question;

    if not (patch.tag_ids is null) then

      -- Delete old tags
      delete 
      from app_public.question_tag as qt
      where
        qt.question_id = $1;

      -- Insert new tags
      foreach tag_id in array patch.tag_ids loop
        insert into app_public.question_tag(question_id, tag_id)
          values (question.id, tag_id);
      end loop;
    end if;

    return question;
  end;
$$ language plpgsql volatile strict set search_path from current;

comment on function app_public.update_question_by_id(id integer, patch app_public.question_patch) is
  E'Update a question by Id.';

COMMIT;
