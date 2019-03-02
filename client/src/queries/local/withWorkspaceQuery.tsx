import { graphql } from "react-apollo";
import {
  WORKSPACE_QUERY,
  Defaults as WorkspaceResponse,
  Workspace
} from "../../apollo/clientState/workspace";

export type InputProps = {};

type Response = WorkspaceResponse;

type Variables = {};

export type ChildProps = Pick<Workspace, "workspaceId">;

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  WORKSPACE_QUERY,
  {
    props: ({ data }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { workspace } = data;

      return {
        workspaceId: workspace ? workspace.workspaceId : 1
      };
    }
  }
);
