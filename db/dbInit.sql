create database fundamental;

create extension if not exists "plpgsql";
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

create role fundamental_admin with login superuser password '12345678';
grant all PRIVILEGES on DATABASE fundamental to fundamental_admin;

create role fundamental_visitor with login superuser password '12345678';
grant all PRIVILEGES on DATABASE fundamental to fundamental_visitor;
