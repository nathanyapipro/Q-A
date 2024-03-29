-- Deploy fundamental:app_public.functions.current_user_id to pg

BEGIN;

create function app_public.current_user_id() returns integer as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::int;
$$ language sql stable set search_path from current;
comment on function  app_public.current_user_id() is
  E'@omit\nHandy method to get the current user ID for use in RLS policies, etc; in GraphQL, use `currentUser{id}` instead.';
-- We've put this in public, but omitted it, because it's often useful for debugging auth issues.

grant execute on function app_public.current_user_id() to fundamental_anonymous, fundamental_master;

COMMIT;
