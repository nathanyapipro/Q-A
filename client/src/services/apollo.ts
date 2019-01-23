import ApolloClient from "apollo-boost";
import globalResolver from "../states/global/resolvers";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  clientState: {
    defaults: globalResolver.defaults,
    resolvers: globalResolver.resolvers
    // typeDefs: globalResolver.typeDefs
  }
});

export default client;
