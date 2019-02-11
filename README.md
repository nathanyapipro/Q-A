# Goals

- [ ]

# Layout

- `/db` - everything related to the database: migrations, unit tests, etc
- `/data` - generated data, such as the GraphQL and database schema dumps
- `/client` - everything related to the web browser: the react components, routes, etc
- `/server` - everything related to running the server: the middlewares, PostGraphile configuration, SSR, integration tests, etc

# Tools

- PostGraphile (obviously) to turn our database into a GraphQL API, and to output the GraphQL schema for other tools
- React for rendering
- Typescript (client only for now ^^)
- Apollo Client to consume this GraphQL API and manage caching
- Apollo CLI to autogen the clients graphql data Types
- Prettier for consistent code formatting
- Commitizen for consistent git commits
- Express.js to implement our server
- Sqitch for performing migrations

# Getting Started

### Pre-requisites

- **Node**

  ```
  brew install npm
  ```

- **PostgreSQL v10**

  ```
  brew install postgresql@10
  brew link --force postgresql@10
  echo 'export PATH="/usr/local/opt/postgresql@10/bin:$PATH"' >> ~/.bash_profile
  ```

- **Sqitch**
  ```
  brew install sqitch --with-postgres-support
  ```

### Database Setup

- Initialise DB

  ```
  cd db/
  psql postgres
  \i dbInit.sql
  ```

- Run Migrations
  ```
  cd db/
  sqitch deploy
  ```

### Server Setup

- Install Dependencies
  ```
  cd server/
  npm install
  ```
- Update .env file variables

### Client Setup

- Install Dependencies
  ```
  cd client/
  npm install
  ```
- Cope .env file to .env.local and update variables

# Scripts

### Development

In dev mode the client and backend run in 2 distict servers and therefore require two open terminal windows

Start Backend: `npm run dev`

Start Frontend: `cd ./client && npm run start`

### Production

In prod mode the client is a static bundle served by the backend

Start Server: `npm run prod`

# Usefull Resources

- [PostgreSQL](https://www.postgresql.org/docs/10/index.html)
- [Sqitch](https://metacpan.org/pod/sqitchtutorial)
- [React](https://reactjs.org/docs/getting-started.html)
- [Typescript](https://www.typescriptlang.org/docs/home.html)
- [Postgraphile](https://www.graphile.org/postgraphile/introduction/)
- [Apollo](https://www.apollographql.com/docs/react/)
- [Material-UI](https://material-ui.com/)
