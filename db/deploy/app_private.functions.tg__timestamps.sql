-- Deploy fundamental:app_private.functions.tg__timestamps to pg

BEGIN;

create function app_private.tg__timestamps() returns trigger as $$
begin
  if (TG_OP = 'UPDATE') then

  -- MUST NOT update 'created_at'
  NEW.created_at := OLD.created_at;

  if (NEW.updated_at is null) or (NEW.updated_at = OLD.updated_at) then
    NEW.updated_at := CURRENT_TIMESTAMP;
  elsif (NEW.updated_at < OLD.created_at) then
    raise exception '"updated_at" must be equal to or greater than "created_at", but it wasn''t: ''%'' (created_at) - ''%'' (updated_at)', NEW.created_at, NEW.updated_at;
  elsif (NEW.updated_at < OLD.updated_at) then
    raise exception 'The new value of "updated_at" must be greater than its old value, but it wasn''t: ''%'' (old) - ''%'' (new)', OLD.updated_at, NEW.updated_at;
  end if;

  elsif (TG_OP = 'INSERT') then

    if (NEW.created_at IS NULL) then
      NEW.created_at := CURRENT_TIMESTAMP;
    end if;

    -- Only when inserting, 'updated_at' MUST equal 'created_at'
    -- After that, it'll always be greater
    NEW.updated_at := NEW.created_at;
  end if; 
  return NEW;
end;
$$ language plpgsql volatile set search_path from current;
comment on function app_private.tg__timestamps() is E'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';


COMMIT;
