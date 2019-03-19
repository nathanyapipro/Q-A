-- Deploy fundamental:app_private.functions.create_anonymous_user to pg

BEGIN;

create function app_private.create_anonymous_user(
  username text
) returns app_public.user as $$
declare
  v_user app_public.user;
  v_username text;
begin
  -- Crypt username
  v_username = crypt(username, gen_salt('bf', 8));

  -- Insert the new user
  insert into app_public.user (username, role) values
    (v_username, 'ANONYMOUS')
    returning * into v_user;

  return v_user;
end;
$$ language plpgsql volatile set search_path from current;

comment on function app_private.create_anonymous_user(username text) is
  E'Creates an anonymous user account.';

COMMIT;
