import ApolloClient from "apollo-boost";
import clientState from "./clientState";
import { AUTH_QUERY } from "./clientState/auth";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  clientState,
  request: async operation => {
    const { cache } = operation.getContext();
    const {
      auth: { jwtToken }
    } = cache.readQuery({ query: AUTH_QUERY });
    if (jwtToken) {
      operation.setContext({
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
    }
  }
});

export default client;
