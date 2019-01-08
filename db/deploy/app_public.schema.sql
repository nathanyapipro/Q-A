-- Deploy fundamental:app_public.schema to pg

BEGIN;

create schema app_public;
grant usage on schema app_public to fundamental_visitor;
alter default privileges in schema app_public grant usage, select on sequences to fundamental_visitor;

COMMIT;
