create database fundamental;

create role fundamental_admin with login superuser password '12345678';
grant all privileges on database fundamental to fundamental_admin;

create role fundamental_visitor with login superuser password '12345678';
-- grant all privileges on database fundamental to fundamental_visitor;

create role fundamental_unauthenticated;
create role fundamental_authenticated;

grant fundamental_unauthenticated to fundamental_visitor;
grant fundamental_authenticated to fundamental_visitor;

alter default privileges revoke execute on functions from public;
