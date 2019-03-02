import gql from "graphql-tag";

export interface Auth {
  __typename: "Auth";
  jwtToken?: string | null;
  email?: string | null;
}

export const INITIAL_STATE: Auth = {
  __typename: "Auth",
  jwtToken: localStorage.getItem("jwtToken"),
  email: localStorage.getItem("email")
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
      email
    }
  }
`;

export type UpdateAuthVariables = Pick<Auth, "jwtToken" | "email">;

export const UPDATE_AUTH_MUTATION = gql`
  mutation UpdateAuthMutation($jwtToken: String, $email: String) {
    updateAuth(jwtToken: $jwtToken, email: $email) @client
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
    if (variables.jwtToken && variables.email) {
      localStorage.setItem("jwtToken", variables.jwtToken);
      localStorage.setItem("email", variables.email);
    } else {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("email");
    }
    return null;
  }
};
