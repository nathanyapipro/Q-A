import { graphql, MutationFn } from "react-apollo";
import {
  LoginAnonymous,
  LoginAnonymousVariables
} from "../types/apollo/LoginAnonymous";
import gql from "graphql-tag";

export const LOGIN_ANONYMOUS_MUTATION = gql`
  mutation LoginAnonymous($loginAnonymousInput: LoginAnonymousInput!) {
    loginAnonymous(input: $loginAnonymousInput) {
      jwtToken
    }
  }
`;

export type InputProps = {};

type Response = LoginAnonymous;

type Variables = LoginAnonymousVariables;

export type ChildProps = {
  loginAnonymous: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  LOGIN_ANONYMOUS_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        loginAnonymous: mutate
      };
    }
  }
);
