import { graphql, MutationFn } from "react-apollo";
import { LOGIN_MUTATION } from "../queries";
import { Login, LoginVariables } from "../types/queries/Login";

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
