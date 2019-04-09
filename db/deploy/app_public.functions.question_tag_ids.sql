-- Deploy fundamental:app_public.functions.question_tag_ids to pg

BEGIN;

create function app_public.question_tag_ids(q app_public.question)
returns integer[] as $$
  select array(
    select tag.id
    from app_public.tag
    inner join app_public.question_tag
      on (question_tag.tag_id = tag.id)
    where question_tag.question_id = q.id
  )::integer[]
$$ language sql stable;

grant execute on function app_public.question_tag_ids(q app_public.question) to fundamental_anonymous, fundamental_master;

COMMIT;
