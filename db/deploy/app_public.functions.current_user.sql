-- Deploy fundamental:app_public.functions.current_user to pg

BEGIN;

create function app_public.current_user()
returns app_public.user
as $$
  select *
  from app_public.user
  where
    app_public.user.id = app_public.current_user_id()
  limit 1;
$$ language sql stable set search_path from current;

grant execute on function app_public.current_user() to fundamental_authenticated;

comment on function  app_public.current_user() is
  E'Handy method to get the current user for use after authentication';
-- We've put this in public, but omitted it, because it's often useful for debugging auth issues.

COMMIT;
