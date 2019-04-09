-- Deploy fundamental:app_public.functions.create_user.sql to pg

BEGIN;

create function app_public.create_user(
  username text,
  password text,
  role app_public.role_type
) returns app_public.user as $$
declare
  v_user app_public.user;
begin

  -- Insert the new user
  insert into app_public.user (username, role) values
    (username, role)
    returning * into v_user;

  -- Store the password
  if password is not null then
    update app_private.user_secret
    set password_hash = crypt(password, gen_salt('bf', 8))
    where user_id = v_user.id;
  end if;

  return v_user;
end;
$$ language plpgsql volatile set search_path from current;

grant execute on function app_public.create_user(username text, password text, role app_public.role_type) to fundamental_anonymous, fundamental_master;

comment on function app_public.create_user(username text, password text, role app_public.role_type) is
  E'Creates a user account.';

COMMIT;
