CREATE database fundamental;

CREATE ROLE fundamental_admin with login superuser password '12345678';
GRANT ALL PRIVILEGES ON DATABASE fundamental TO fundamental_admin;

CREATE ROLE fundamental_visitor with login superuser password '12345678';
GRANT ALL PRIVILEGES ON DATABASE fundamental TO fundamental_visitor;
