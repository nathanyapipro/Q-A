-- Deploy fundamental:app_public.functions.login to pg

BEGIN;

create function app_public.login(username text, password text default null) returns app_public.user as $$
declare
  v_user app_public.user;
begin
  select * into v_user
  from app_public.user
  where
    -- Match username against user username
    (
      users.username = login.username
    );

  if not (v_user is null) then
    if v_user_secret.password_hash = crypt(password, v_user_secret.password_hash) then
      return v_user;
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
