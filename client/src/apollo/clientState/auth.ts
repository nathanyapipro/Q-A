import gql from "graphql-tag";

export const AUTH_QUERY = gql`
  query Auth {
    auth @client {
      jwt
      userId
    }
  }
`;

export interface Auth {
  __typename: "Auth";
  jwt: string | null;
  userId: number | null;
}

export const INITIAL_STATE: Auth = {
  __typename: "Auth",
  jwt: null,
  userId: null
};

export interface Defaults {
  auth: Auth;
}

export const defaults = {
  auth: INITIAL_STATE
};

export type UpdateAuthVariables = Pick<Auth, "jwt" | "userId">;

export const UPDATE_AUTH_MUTATION = gql`
  mutation UpdateAuthMutation($jwt: String!, $userId: Int!) {
    updateAuth(jwt: $jwt, userId: $userId) @client
  }
`;

export const Mutations = {
  updateAuth: (_: any, auth: UpdateAuthVariables, { cache }: any) => {
    const previousState = cache.readQuery({ query: AUTH_QUERY });
    const data = {
      auth: {
        ...previousState.auth,
        ...auth
      }
    };
    cache.writeQuery({ query: AUTH_QUERY, data });
    return null;
  }
};
