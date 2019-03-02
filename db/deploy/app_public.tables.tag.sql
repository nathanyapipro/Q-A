-- Deploy fundamental:app_public.tables.tag to pg

BEGIN;

create table app_public.tag (
  id serial primary key,
  name text not null unique,
  color text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.tag enable row level security;

create policy select_all on app_public.tag for select using (true);
create policy create_all on app_public.tag for insert with check (true);
create policy update_all on app_public.tag for update using (true);
create policy delete_all on app_public.tag for delete using (true);

grant select on app_public.tag to fundamental_visitor;
grant insert on app_public.tag to fundamental_visitor;
grant update(name, color) on app_public.tag to fundamental_visitor;
grant delete on app_public.tag to fundamental_visitor;

comment on table app_public.tag is
  E'tag of a question in the application.';

comment on column app_public.tag.id is
  E'@omit update\n unique identifier for the tag.';
comment on column app_public.tag.name is
  E'name of the tag.';
comment on column app_public.tag.color is
  E'color of the tag.';
comment on column app_public.tag.created_at is
  E'@omit update\n timestamp of create';
comment on column app_public.tag.updated_at is
  E'@omit update\n timestamp of last update';

create trigger _100_tag_timestamps
  before insert or update on app_public.tag
  for each row
  execute procedure app_private.tg__timestamps();

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


  (70, '@JF Gagné', '#3cbb53'),
  (71, '@Anne Martel', '#3cbb53'),
  (72, '@Gabriel Duford', '#3cbb53'),
  (73, '@Philippe Beaudoin', '#3cbb53'),
  (74, '@Nicolas Chapados', '#3cbb53'),
  (75, '@Jeremy Barnes', '#3cbb53'),
  (76, '@Omar Dhalla', '#3cbb53'),
  (77, '@Alexandre Shee', '#3cbb53'),
  (78, '@Sabina Dessertine', '#3cbb53')
  ;

alter sequence app_public.role_id_seq restart with 100;

COMMIT;
