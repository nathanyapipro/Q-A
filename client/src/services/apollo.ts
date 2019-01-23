import ApolloClient from "apollo-boost";
import clientState from "../states";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  clientState
});

export default client;
