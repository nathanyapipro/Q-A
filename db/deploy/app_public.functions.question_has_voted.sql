-- Deploy fundamental:app_public.functions.question_has_voted to pg

BEGIN;

create function app_public.question_has_voted(q app_public.question)
returns boolean as $$
  select exists (
    select *
    from app_public.vote as v
    where 
      v.question_id = q.id
      and
      v.user_id = app_public.current_user_id()
    limit 1
  )
$$ language sql stable;

grant execute on function app_public.question_has_voted(q app_public.question) to fundamental_anonymous, fundamental_master;

comment on function app_public.question_has_voted(q app_public.question) is
  E'indicates if the user has voted';
  

COMMIT;
