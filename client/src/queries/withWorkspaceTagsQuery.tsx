import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  WorkspaceTagsVariables,
  WorkspaceTags,
  WorkspaceTags_workspaceTags_nodes
} from "../types/apollo/WorkspaceTags";

export const WORKSPACE_TAGS_QUERY = gql`
  query WorkspaceTags($workspaceId: Int!, $onlyEnabled: Boolean) {
    workspaceTags(
      filter: {
        workspaceId: { equalTo: $workspaceId }
        isEnabled: { equalTo: $onlyEnabled }
      }
    ) {
      nodes {
        id
        tag {
          id
          name
          color
        }
        isEnabled
      }
    }
  }
`;

export type InputProps = WorkspaceTagsVariables;

type Response = WorkspaceTags;

type Variables = WorkspaceTagsVariables;

export type ChildProps = {
  workspaceTags: Array<WorkspaceTags_workspaceTags_nodes>;
  workspaceTagsLoading: boolean;
  workspaceTagsError?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  WORKSPACE_TAGS_QUERY,
  {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({ data }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { loading, error } = data;

      return {
        workspaceTags: data.workspaceTags ? data.workspaceTags.nodes : [],
        workspaceTagsLoading: loading,
        workspaceTagsError: error
      };
    }
  }
);
