import gql from "graphql-tag";

export interface Auth {
  __typename: "Auth";
  jwtToken: string | null;
}

export const INITIAL_STATE: Auth = {
  __typename: "Auth",
  jwtToken: localStorage.getItem("jwtToken")
};

export interface Defaults {
  auth: Auth;
}

export const defaults = {
  auth: INITIAL_STATE
};

export const AUTH_QUERY = gql`
  query Auth {
    auth @client {
      __typename
      jwtToken
    }
  }
`;

export type UpdateAuthVariables = Pick<Auth, "jwtToken">;

export const UPDATE_AUTH_MUTATION = gql`
  mutation UpdateAuthMutation($jwtToken: String) {
    updateAuth(jwtToken: $jwtToken) @client
  }
`;

export const Mutation = {
  updateAuth: (_: any, variables: UpdateAuthVariables, { cache }: any) => {
    const previousState = cache.readQuery({ query: AUTH_QUERY });
    const data = {
      ...previousState,
      auth: {
        ...previousState.auth,
        ...variables
      }
    };
    cache.writeQuery({ query: AUTH_QUERY, data });
    if (variables.jwtToken) {
      localStorage.setItem("jwtToken", variables.jwtToken);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }
};
