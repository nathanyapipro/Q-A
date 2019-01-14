-- Deploy fundamental:app_public.functions.login_anonymous.sql to pg

BEGIN;

create function app_public.login_anonymous(username text) returns app_private.jwt_token as $$
declare
  v_user app_public.user;
  v_username text;
begin

  v_username = username;

  select * into v_user
  from app_public.user as u
  where
    -- Match username against user username
    (
      u.username = crypt(v_username, u.username)
    );

  if(v_user is null) then
    v_user = app_private.create_anonymous_user(v_username);
  end if;

  return (v_user.id, v_user.role_id)::app_private.jwt_token;
end;
$$ language plpgsql strict security definer volatile set search_path from current;

comment on function app_public.login_anonymous(username text) is
  E'Returns a user that matches the crypt username, or null on failure.';


COMMIT;
