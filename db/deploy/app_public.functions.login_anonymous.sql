-- Deploy fundamental:app_public.functions.login_anonymous.sql to pg

BEGIN;


create function app_public.login_anonymous(username text)
returns app_public.auth 
as $$
  declare
    jwt_token app_private.jwt_token;
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

    jwt_token = (v_user.id, v_user.role, 'fundamental_authenticated')::app_private.jwt_token;
    return (jwt_token, v_user)::app_public.auth;
  end;
$$ language plpgsql strict security definer volatile set search_path from current;

grant execute on function app_public.login_anonymous(username text) to fundamental_unauthenticated;

comment on function app_public.login_anonymous(username text) is
  E'Returns a user that matches the crypt username, or null on failure.';


COMMIT;
