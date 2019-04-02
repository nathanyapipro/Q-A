# Fundamental - Server

# Generate while list (incomplete --> WIP)

Go to /client/src/queries and run
`` awk '/gql\`/,/\`;/' ./*.tsx > queries.graphql ``

Copy queries.graphql to server/utils
Remove first and last line of each query (export... and };)

Run CMD to gen queryMap.json:

```
persistgraphql server/queries/queries.graphql --add_typename
```

# Graphiql

Explore the graphQL routes in the graphiQL playground exposed in dev mode [http://localhost:5000/graphiql](https://www.postgresql.org/docs/10/index.html)

### Tips

The db is set up to automagicaly claim the jwt's content when it is present in the request Headers. The app uses this in a number of Mutation and Queries and must therefore be set in most cases.
For Authenticated Queries/Mutations (non Login) the following Headers are expected

```
{
"Authorization": "Bearer token"
}
```

# Example Queries and Mutations

### CreateUser

Query:

```
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(input: $createUserInput) {
    user {
      id
      username
    }
  }
}
```

Variables:

```
"createUserInput": {
  "username": "Admin",
  "password": "12345678",
  "roleId": 1
},
```

### Login

Query:

```
mutation Login($loginInput: LoginInput!) {
  login(input: $loginInput) {
    jwtToken
  }
}
```

Variables:

```
"loginInput": {
  "username": "Admin",
  "password": "12345678"
},
```

### CurrentUser

Query:

```
query CurrentUser {
  currentUser {
    id
    username
    role {
      id
      role
    }
  }
}
```

Variables:

```

```
