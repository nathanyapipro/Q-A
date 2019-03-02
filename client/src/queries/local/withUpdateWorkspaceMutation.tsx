import { graphql, MutationFn } from "react-apollo";
import {
  UPDATE_WORKSPACE_MUTATION,
  UpdateWorkspaceVariables
} from "../../apollo/clientState/workspace";

export type InputProps = {};

type Response = {};

type Variables = UpdateWorkspaceVariables;

export type ChildProps = {
  updateWorkspace: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  UPDATE_WORKSPACE_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        updateWorkspace: mutate
      };
    }
  }
);
