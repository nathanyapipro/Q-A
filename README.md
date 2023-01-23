# QA

# Goals

Database:

- [x] Sqitch Migration Setup
- [x] JWT based authentication claimed at DB Level
- [x] Basic Schema Design
- [ ] Query questions by content similarity

Client:

- [x] Typescript
- [x] Apollo
  - [x] Basic Conguration
  - [x] ClientState configuration
  - [x] Cache configuration (add cache resolvers to reduce queries executed if data is allready in cache)
  - [x] Handle Errors (Unauthorized)
  - [x] Reset Cache on Logout
- [x] App Layout
  - [x] Header
  - [x] Sidebar
    - [x] App logo
    - [x] Page Navigation
    - [x] Change Workscaces
    - [x] Footer (Creds ect..)
- [x] Anonymous Login Page
  - [x] Google Auth Button
- [x] User Login Page
  - [x] Standard Username/Password Form
- [x] Ask a Question Page
  - [x] Basic Form
  - [ ] Related Questions (WISHLIST)
- [x] Questions Page
  - [x] Filters
    - [ ] Fuzzy search (WISHLIST)
    - [x] Status
    - [x] Tags
    - [x] OrderBy
    - [ ] Vote Count (WISHLIST)
    - [x] Reset Filters
  - [x] Questions Table
    - [x] Pagination
    - [x] Toggle Vote
- [x] Question Page (question, comments)
  - [x] Question
    - [x] Static Render
    - [x] Inline Edit on Status, Content, TagIds
    - [x] Create Answer
    - [x] Inline Edit Answer
    - [x] Delete Answer
    - [x] Delete Question
  - [x] Comments
    - [x] Conversation
    - [x] Create Comment
    - [x] Inline Edit Comment
    - [x] Delete Comment
- [ ] Profile Page
  - [ ] User Info
  - [ ] Edit Username/Password
  - [ ] News Feed (WISHLIST)
    - [ ] Curated list of recent activity on questions the User is "watching" (Asked, CommentedOn, Answered)
- [ ] Settings Page (WISHLIST)
  - [ ] CRUD Users
  - [ ] CRUD Tags
- [ ] User Roles
  - [ ] Role Inheritance Admin > Responder > Anonymous
  - [ ] Admin
    - [ ] Can CRUD Users
    - [ ] Can CRUD Tags
  - [ ] Responder
    - [x] Can Update username/password
    - [x] Can Update Status on any question
    - [x] Can Update Tags on any question
    - [x] Can Update Answer on any question
    - [x] Can Create/Update(his) Comments on any question
  - [ ] Anonymous
    - [x] Can ask a question
    - [x] Can Update his question (Update only if no Votes)
    - [x] Can Delete his question
    - [x] Can Create/Update/Delete his comments on any question
- [ ] Responsive Design
  - [x] Support small layout (sm/md)
  - [x] Support lg layout
  - [ ] Support xxl layout
- [ ] PWA Setup (WISHLIST)
  - [ ] Download as APP
- [ ] Test Suite

Server:

- [x] PostGraphile server, with Express
- [x] Development: GraphiQL (enhanced)
- [x] Development: watch DB for changes, no need to restart server
- [ ] Prodcution: Add Static Client Bundle
- [ ] Typescript ?

General:

- [ ] CI/CD Setup

# Layout

- `/db` - everything related to the database: migrations, unit tests, etc
- `/client` - everything related to the web browser: the react components, routes, etc
- `/server` - everything related to running the server: the middlewares, PostGraphile configuration, SSR, integration tests, etc

# Stack & Tooling

- Typescript
- React for rendering client (preferably hook based patterns)
- Apollo Client to consume this GraphQL API and manage caching
- Apollo CLI to autogen the clients graphql data Types
- Express to implement server
- PostGraphile (obviously) to turn our database into a GraphQL API, and to output the GraphQL schema for other tools
- Sqitch for performing db migrations
- Prettier for consistent code formatting
- Commitizen for consistent git commits

# Getting Started

### Pre-requisites

- **Node**

  ```
  brew install npm
  ```

- **PostgreSQL 10**

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

# Contribute

### DB Info

Deploy db migrations: `cd ./db && sqitch deploy`
Revert db migrations: `cd ./db && sqitch revert`

If the db has changed too much since last `git pull`:

- Drop database: `dropdb fundamental`
- Drop users: `dropuser fundamental_admin && dropuser fundamental_visitor`
- Enter psql shell as admin user (postgres): `psql postgres`
- Initilise db: `\i db/dbInit.sql`
- Exit shell using CRTL+D

### Development Environment

In dev mode the client and backend run in 2 distict servers and therefore require two open terminal windows

- Start Backend: `npm run dev`

- Start Frontend: `cd ./client && npm run start`

Backend server also exposed a graphiQL interface: [http://localhost:5000/graphiql](http://localhost:5000/graphiql)

### Workflow Scripts

Runs prettier and Commitizen [global] (after staging files): `npm run cz`
Pull Down Schema from server [client/ only]: `npm run schema`
Auto Gen Client Appollo Query Types [client/ only]: `npm run types`

# Production

### Production Environment

In prod mode the client is a static bundle served by the backend

Start Server: `npm run prod`

# Usefull Resources

- [PostgreSQL (https://www.postgresql.org/docs/10/index.html)](https://www.postgresql.org/docs/10/index.html)
- [Sqitch (https://metacpan.org/pod/sqitchtutorial)](https://metacpan.org/pod/sqitchtutorial)
- [React (https://reactjs.org/docs/getting-started.html)](https://reactjs.org/docs/getting-started.html)
- [Typescript (https://www.typescriptlang.org/docs/home.html)](https://www.typescriptlang.org/docs/home.html)
- [Postgraphile (https://www.graphile.org/postgraphile/introduction/)](https://www.graphile.org/postgraphile/introduction/)
- [Apollo (https://www.apollographql.com/docs/react/)](https://www.apollographql.com/docs/react/)
- [Material-UI (https://material-ui.com/)](https://material-ui.com/)
- [JSS (https://cssinjs.org/react-jss?v=v10.0.0-alpha.10)](https://cssinjs.org/react-jss?v=v10.0.0-alpha.10)
