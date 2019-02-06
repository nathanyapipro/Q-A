import { graphql, MutationFn } from "react-apollo";
import { Login, LoginVariables } from "../types/apollo/Login";
import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      jwtToken
    }
  }
`;

type InputProps = {};

type Response = Login;

type Variables = LoginVariables;

type ChildProps = {
  login: MutationFn<Response, Variables>;
};

export const withLoginMutation = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(LOGIN_MUTATION, {
  props: ({ mutate }) => {
    if (!mutate) {
      throw new Error("No mutate prop found");
    }

    return {
      login: mutate
    };
  }
});

export type WithLoginMutation = ChildProps;
