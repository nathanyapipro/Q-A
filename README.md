## Setup

### Pre-requisites

- Postgresql v10 (not 11)
- sqitch
- npm

### Database Setup

Initialise DB

```
cd db/
psql postgres
\i dbInit.sql
```

Run Migrations

```
cd db/
sqitch deploy
```

## Available Scripts

## Server

### Example Graphiql Queries/Mutations

## Client
