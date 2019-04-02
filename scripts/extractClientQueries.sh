
awk '/gql\`/,/\`;/' ./client/src/queries/*.tsx > ./server/utils/queries.graphql
