-- Deploy fundamental:app_private.types.jwt_token to pg

BEGIN;

create type app_private.jwt_token as (
  user_id integer,
  user_role text
);

COMMIT;
