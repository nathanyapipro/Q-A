import { graphql, MutationFn } from "react-apollo";
import {
  UPDATE_AUTH_MUTATION,
  UpdateAuthVariables
} from "../../apollo/clientState/auth";

export type InputProps = {};

type Response = {};

type Variables = UpdateAuthVariables;

export type ChildProps = {
  updateAuth: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  UPDATE_AUTH_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        updateAuth: mutate
      };
    }
  }
);
