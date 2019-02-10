import gql from "graphql-tag";

export interface Auth {
  __typename: "Auth";
  jwtToken: string | null;
  userId: number | null;
}

export const INITIAL_STATE: Auth = {
  __typename: "Auth",
  jwtToken: localStorage.getItem("jwtToken"),
  userId: null
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
      jwtToken
      userId
    }
  }
`;

export type UpdateAuthVariables = Pick<Auth, "jwtToken" | "userId">;

export const UPDATE_AUTH_MUTATION = gql`
  mutation UpdateAuthMutation($jwtToken: String, $userId: Int) {
    updateAuth(jwtToken: $jwtToken, userId: $userId) @client
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
