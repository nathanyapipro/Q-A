import ApolloClient from "apollo-boost";
import { INITIAL_STATE } from "./clientState";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  clientState: {
    defaults: INITIAL_STATE,
    resolvers: {},
    typeDefs: `
    
      type Query {
        menu: Boolean
      }
    `
  }
});

export default client;
