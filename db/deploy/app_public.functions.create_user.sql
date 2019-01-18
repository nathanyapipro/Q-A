-- Deploy fundamental:app_public.functions.create_user.sql to pg

BEGIN;

create function app_public.create_user(
  username text,
  password text,
  role_id integer
) returns app_public.user as $$
declare
  v_user app_public.user;
begin

  -- Insert the new user
  insert into app_public.user (username, role_id) values
    (username, role_id)
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

comment on function app_public.create_user(username text, password text, role_id integer) is
  E'Creates a user account.';

COMMIT;