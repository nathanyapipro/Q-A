import { graphql, MutationFn } from "react-apollo";
import { Login, LoginVariables } from "../types/apollo/Login";
import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      auth {
        jwtToken
        currentUser {
          id
          username
          role
        }
      }
    }
  }
`;

export type InputProps = {};

type Response = Login;

type Variables = LoginVariables;

export type ChildProps = {
  login: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  LOGIN_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        login: mutate
      };
    }
  }
);
