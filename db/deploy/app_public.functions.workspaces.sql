-- Deploy fundamental:app_public.functions.workspaces to pg

BEGIN;

-- XXX Add DDLs here.
create function app_public.workspaces(
  email text default ''
)
returns setof app_public.workspace
as $$
  declare
    user_role app_public.role_type;
    workspaces app_public.workspace[];
  begin

    select role into user_role
    from app_public.user as u
      where
        u.id=app_public.current_user_id();
    
    if(user_role = 'ANONYMOUS') then
      return query select w.*
      from app_public.workspace as w
      where
        (w.is_public=true)
      or
        (w.users @> array[$1]::text[]);

    elsif (user_role = 'MANAGER') then
      return query select w.*
      from app_public.workspace as w
      left join app_public.workspace_user as wu on(w.id=wu.workspace_id)
      where
        (w.is_public=true)
      or
        (wu.user_id = app_public.current_user_id());
    else
      return query select w.*
      from app_public.workspace as w;
    end if;
    
  end;
$$ language plpgsql stable;

grant execute on function app_public.workspaces(email text) to fundamental_anonymous, fundamental_master;

comment on function app_public.workspaces(email text) is
  E'Queries workspaces';

COMMIT;
