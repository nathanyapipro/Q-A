-- Deploy fundamental:app_public.functions.login_anonymous.sql to pg

BEGIN;

create function app_public.login_anonymous(username text) returns app_public.user as $$
declare
  v_user app_public.user;
  v_username text;
begin

  -- Crypt username
  v_username = crypt(username, gen_salt('bf'));

  select * into v_user
  from app_public.user
  where
    -- Match username against user username
    (
      users.username = v_username
    );

  if not (v_user is null) then
    return v_user;
  else
    -- No user with that username was found
    return null;
  end if;
end;
$$ language plpgsql strict security definer volatile set search_path from current;

comment on function app_public.login_anonymous(username text) is
  E'Returns a user that matches the crypt username, or null on failure.';


COMMIT;
