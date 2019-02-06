import { graphql, MutationFn } from "react-apollo";
import {
  LoginAnonymous,
  LoginAnonymousVariables
} from "../types/apollo/LoginAnonymous";
import gql from "graphql-tag";

const LOGIN_ANONYMOUS_MUTATION = gql`
  mutation LoginAnonymous($loginAnonymousInput: LoginAnonymousInput!) {
    loginAnonymous(input: $loginAnonymousInput) {
      jwtToken
    }
  }
`;

type InputProps = {};

type Response = LoginAnonymous;

type Variables = LoginAnonymousVariables;

type ChildProps = {
  loginAnonymous: MutationFn<Response, Variables>;
};

export const withLoginAnonymousMutation = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(LOGIN_ANONYMOUS_MUTATION, {
  props: ({ mutate }) => {
    if (!mutate) {
      throw new Error("No mutate prop found");
    }

    return {
      loginAnonymous: mutate
    };
  }
});

export type WithLoginAnonymousMutation = ChildProps;
