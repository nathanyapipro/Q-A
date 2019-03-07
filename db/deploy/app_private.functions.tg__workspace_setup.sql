-- Deploy fundamental:app_private.functions.tg__workspace_setup to pg

BEGIN;

create function app_private.tg__workspace_setup() 
returns trigger 
as $$
  declare
    tag_ids integer[];
    tag_id integer;
  begin
    -- Create all currently available tags on the new workspace
    select into tag_ids array(
      select tag.id
      from app_public.tag
    )::integer[];

    foreach tag_id in array tag_ids loop
      insert into app_public.workspace_tag(workspace_id, tag_id)
        values (NEW.id, tag_id);
    end loop;

    -- Apprend new workspace to current user's access list

    return NEW;
  end;
$$ language plpgsql volatile set search_path from current;
comment on function app_private.tg__workspace_setup() is 
  E'This trigger is used to setup newly created workspaces';

create trigger _200_workspace_setup after insert on app_public.workspace
  for each row execute procedure app_private.tg__workspace_setup();

insert into app_public.workspace (id, name, is_public) values
  (1,'Fusion', true);

alter sequence app_public.workspace_id_seq restart with 2;

COMMIT;
