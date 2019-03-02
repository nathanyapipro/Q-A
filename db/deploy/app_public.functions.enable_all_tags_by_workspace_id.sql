-- Deploy fundamental:app_public.functions.enable_all_tags_by_workspace_id to pg

BEGIN;

create function app_public.enable_all_tags_by_workspace_id(
  workspace_id integer
)
returns app_public.workspace
as $$
  declare
    workspace app_public.workspace;
    tag_ids integer[];
    tag_id integer;
  begin

    select * into workspace 
      from app_public.workspace as w
      where w.id = $1;

    if not (workspace is null) then
      select into tag_ids array(
        select tag.id
        from app_public.tag
      )::integer[];

      foreach tag_id in array tag_ids loop
        insert into app_public.workspace_tag(workspace_id, tag_id)
          values ($1, tag_id)
        on conflict ON CONSTRAINT workspace_tag_workspace_id_tag_id_key 
        do nothing;
      end loop;
      
      return workspace;
    else
      return null;
    end if;

  end;
$$ language plpgsql volatile strict set search_path from current;

comment on function app_public.enable_all_tags_by_workspace_id(workspace_id integer) is
  E'Creates all existing tags for given workspace.';

COMMIT;
