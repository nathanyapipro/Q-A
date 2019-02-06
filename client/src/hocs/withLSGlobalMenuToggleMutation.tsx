import { graphql, MutationFn } from "react-apollo";
import { LS_GLOBAL_MENU_TOGGLE_MUTATION } from "../states/global/queries";

type InputProps = {};

type Response = {};

type Variables = {};

type ChildProps = {
  menuToggle: MutationFn<Response>;
};

export const withLSGlobalMenuToggleMutation = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(LS_GLOBAL_MENU_TOGGLE_MUTATION, {
  props: ({ mutate }) => {
    if (!mutate) {
      throw new Error("No mutate prop found");
    }

    return {
      menuToggle: mutate
    };
  }
});

export type WithLSGlobalMenuToggleMutation = ChildProps;
