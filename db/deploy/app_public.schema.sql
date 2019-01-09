-- Deploy fundamental:app_public.schema to pg

BEGIN;

create extension if not exists "plpgsql";
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

create schema app_public;
grant usage on schema app_public to fundamental_visitor;
alter default privileges in schema app_public grant usage, select on sequences to fundamental_visitor;

COMMIT;
