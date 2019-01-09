-- Deploy fundamental:app_private.functions.create_user to pg

BEGIN;

create function app_private.create_user(
  username text,
  password text default null,
  is_anonymous boolean default true
) returns app_public.user as $$
declare
  v_user app_public.user;
  v_username text;
begin
  -- Crypt username if anonymous user
  if is_anonymous is null then
    v_username = crypt(username, gen_salt('bf'));
  else
    v_username = username;
  end if;

  -- Insert the new user
  insert into app_public.user (username) values
    (v_username)
    returning * into v_user;

  -- Store the password
  if password is not null then
    update app_private.user_secret
    set password_hash = crypt(password, gen_salt('bf'))
    where user_id = v_user.id;
  end if;

  return v_user;
end;
$$ language plpgsql volatile set search_path from current;

comment on function app_private.create_user(username text, password text, is_anonymous boolean) is
  E'Creates a user account.';

COMMIT;
