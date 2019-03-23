BEGIN;

select * from app_public.create_user('Admin', '12345678', 'ADMIN');

insert into app_public.tag (id, name, description, color) values
  (1, 'Question', 'This is a question I’ve tried asking my manager, colleagues or Talent partner, but we couldn’t figure it out together', '#3CBB53'),
  (2, 'Statement', 'I’m not expecting an answer to this, it’s just what I’m experiencing or feeling, or something I came across that I think is interesting for execs', '#3CBB53'),
  (3, 'Wish List', 'This is something I wish we had at the office. Does anyone else agree? Is it possible?', '#3CBB53'),

  (30, 'Culture', 'Includes culture, values, ethics', '#FF7F41'),
  (31, 'FIN', 'Includes funding, financing and money -- does not include global remuneration', '#FF7F41'),
  (32, 'Knowledge', 'Includes research, discoveries, tools', '#FF7F41'),
  (33, 'P&P', 'Includes questions about products and platform from project inception to sales', '#FF7F41'),
  (34, 'People', 'Includes questions about benefits, activities, teams, interactions', '#FF7F41'),
  (35, 'Office', 'Includes logistics, food, spaces, IT, safety', '#FF7F41'),
  (36, 'Etc...', 'Not represented in fields above', '#FF7F41'),
  

  (50, 'Accounting', 'Team', '#3A79E2'),
  (51, 'Advisory & Enablement Services', 'Team', '#3A79E2'),
  (52, 'Applied Research Lab', 'Team', '#3A79E2'),
  (53, 'AI for Good', 'Team', '#3A79E2'),
  (54, 'Delivery', 'Team', '#3A79E2'),
  (55, 'Design', 'Team', '#3A79E2'),
  (56, 'Government Relations', 'Team', '#3A79E2'),
  (57, 'Information Technology (IT)', 'Team', '#3A79E2'),
  (58, 'Intellectual Property (IP)', 'Team', '#3A79E2'),
  (59, 'Legal', 'Team', '#3A79E2'),
  (60, 'Marketing', 'Team', '#3A79E2'),
  (61, 'Milieu', 'Team', '#3A79E2'),
  (62, 'OCSO', 'Team', '#3A79E2'),
  (63, 'People', 'Team', '#3A79E2'),
  (64, 'Product', 'Team', '#3A79E2'),

  (80, 'Strat Plan 2019', 'Event', '#7D55D7')
  ;

alter sequence app_public.tag_id_seq restart with 100;

insert into app_public.workspace (id, name, is_public) values
  (1,'Fusion', true),
  (2, 'Special Events', true);

alter sequence app_public.workspace_id_seq restart with 3;

insert into app_public.workspace_tag(workspace_id, tag_id, is_enabled) values
  (1, 1, true),
  (1, 2, true),
  (1, 3, true),
  (1, 30, true),
  (1, 31, true),
  (1, 32, true),
  (1, 33, true),
  (1, 34, true),
  (1, 35, true),
  (1, 36, true),
  (1, 50, true),
  (1, 51, true),
  (1, 52, true),
  (1, 53, true),
  (1, 54, true),
  (1, 55, true),
  (1, 56, true),
  (1, 57, true),
  (1, 58, true),
  (1, 59, true),
  (1, 60, true),
  (1, 61, true),
  (1, 62, true),
  (1, 63, true),
  (1, 64, true),
  (2, 1, true),
  (2, 2, true),
  (2, 3, true),
  (2, 30, true),
  (2, 31, true),
  (2, 32, true),
  (2, 33, true),
  (2, 34, true),
  (2, 35, true),
  (2, 36, true),
  (2, 50, true),
  (2, 51, true),
  (2, 52, true),
  (2, 53, true),
  (2, 54, true),
  (2, 55, true),
  (2, 56, true),
  (2, 57, true),
  (2, 58, true),
  (2, 59, true),
  (2, 60, true),
  (2, 61, true),
  (2, 62, true),
  (2, 63, true),
  (2, 64, true),
  (2, 80, false)
  ;

COMMIT;