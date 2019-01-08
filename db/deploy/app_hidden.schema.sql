-- Deploy fundamental:app_hidden.schema to pg

BEGIN;

create schema app_hidden;
grant usage on schema app_hidden to fundamental_visitor;
alter default privileges in schema app_hidden grant usage, select on sequences to fundamental_visitor;

COMMIT;
