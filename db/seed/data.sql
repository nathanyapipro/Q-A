BEGIN;

select * from app_public.create_user('admin', '12345678', 'ADMIN');

insert into app_public.tag (id, name, color) values
  (1, 'Culture', '#FF7F41'),
  (2, 'Funding', '#FF7F41'),
  (3, 'HR', '#FF7F41'),
  (4, 'Office', '#FF7F41'),
  (5, 'Products', '#FF7F41'),
  (6, 'WishList', '#FF7F41'),


  (21, 'Academic Relations', '#3A79E2'),
  (22, 'Accounting', '#3A79E2'),
  (23, 'Advisory', '#3A79E2'),
  (24, 'AI for Good', '#3A79E2'),
  (25, 'Appiled Research', '#3A79E2'),
  (26, 'Delivery', '#3A79E2'),
  (27, 'Design', '#3A79E2'),
  (28, 'Facilities', '#3A79E2'),
  (29, 'Fundamental Research', '#3A79E2'),
  (30, 'Go to Market', '#3A79E2'),
  (31, 'Goverment Relations', '#3A79E2'),
  (32, 'Industry Products', '#3A79E2'),
  (33, 'Intellectual Property', '#3A79E2'),
  (34, 'International Sales', '#3A79E2'),
  (35, 'IT', '#3A79E2'),
  (36, 'IT & Infrastructure', '#3A79E2'),
  (37, 'Legal', '#3A79E2'),
  (38, 'Marketing & Comms', '#3A79E2'),
  (39, 'OCSO', '#3A79E2'),
  (40, 'Operations', '#3A79E2'),
  (41, 'People', '#3A79E2'),
  (42, 'Platform', '#3A79E2'),
  (43, 'Product OPS', '#3A79E2'),
  (44, 'Sales', '#3A79E2'),
  (45, 'Sales OPS', '#3A79E2'),
  (46, 'Strategy & Corp Dev', '#3A79E2'),
  (47, 'Techinical OPS', '#3A79E2'),


  (70, '@JF Gagné', '#3CBB53'),
  (71, '@Anne Martel', '#3CBB53'),
  (72, '@Gabriel Duford', '#3CBB53'),
  (73, '@Philippe Beaudoin', '#3CBB53'),
  (74, '@Nicolas Chapados', '#3CBB53'),
  (75, '@Jeremy Barnes', '#3CBB53'),
  (76, '@Omar Dhalla', '#3CBB53'),
  (77, '@Alexandre Shee', '#3CBB53'),
  (78, '@Sabina Dessertine', '#3CBB53')
  ;

alter sequence app_public.tag_id_seq restart with 100;

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

drop trigger _200_workspace_setup ON app_public.workspace;
drop function app_private.tg__workspace_setup();

COMMIT;