-- Deploy fundamental:app_public.functions.login to pg

BEGIN;

create type app_public.auth as (
  jwt_token app_private.jwt_token,
  "current_user" app_public.user
);

create function app_public.login(username text, password text)
returns app_public.auth
as $$
  declare
    jwt_token app_private.jwt_token;
    v_user app_public.user;
    v_user_secret app_private.user_secret;
  begin
    select * into v_user
    from app_public.user as u
    where
      -- Match username against user username
      (
        u.username = $1
      );

    if not (v_user is null) then

      select * into v_user_secret from app_private.user_secret
      where user_secret.user_id = v_user.id;

      if v_user_secret.password_hash = crypt(password, v_user_secret.password_hash) then
        jwt_token = (v_user.id, v_user.role)::app_private.jwt_token;
        return (jwt_token, v_user)::app_public.auth;
      else
        return null;
      end if;
    else
      -- No user with that username was found
      return null;
    end if;
  end;
$$ language plpgsql strict security definer volatile set search_path from current;

comment on function app_public.login(username text, password text) is
  E'Returns a user that matches the username/password combo, or null on failure.';

COMMIT;
