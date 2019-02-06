import { graphql, MutationFn } from "react-apollo";
import {
  UPDATE_AUTH_MUTATION,
  UpdateAuthVariables
} from "../../apollo/clientState/auth";

type InputProps = {};

type Response = {};

type Variables = UpdateAuthVariables;

type ChildProps = {
  updateAuth: MutationFn<Response, Variables>;
};

export const withUpdateAuthMutation = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(UPDATE_AUTH_MUTATION, {
  props: ({ mutate }) => {
    if (!mutate) {
      throw new Error("No mutate prop found");
    }

    return {
      updateAuth: mutate
    };
  }
});

export type WithUpdateAuthMutation = ChildProps;
