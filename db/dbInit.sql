create database fundamental;

create role fundamental_admin with login superuser password '12345678';
grant all PRIVILEGES on DATABASE fundamental to fundamental_admin;

create role fundamental_visitor with login superuser password '12345678';
grant all PRIVILEGES on DATABASE fundamental to fundamental_visitor;
