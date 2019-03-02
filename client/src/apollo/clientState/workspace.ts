import gql from "graphql-tag";

export interface Workspace {
  __typename: "Workspace";
  workspaceId: number;
}

export const INITIAL_STATE: Workspace = {
  __typename: "Workspace",
  workspaceId: 1
};

export interface Defaults {
  workspace: Workspace;
}

export const defaults = {
  workspace: INITIAL_STATE
};

export const WORKSPACE_QUERY = gql`
  query Workspace {
    workspace @client {
      __typename
      workspaceId
    }
  }
`;

export type UpdateWorkspaceVariables = Pick<Workspace, "workspaceId">;

export const UPDATE_WORKSPACE_MUTATION = gql`
  mutation UpdateWorkspaceMutation($workspaceId: Int!) {
    updateWorkspace(workspaceId: $workspaceId) @client
  }
`;

export const Mutation = {
  updateWorkspace: (
    _: any,
    variables: UpdateWorkspaceVariables,
    { cache }: any
  ) => {
    const previousState = cache.readQuery({ query: WORKSPACE_QUERY });
    const data = {
      ...previousState,
      workspace: {
        ...previousState.workspace,
        ...variables
      }
    };
    cache.writeQuery({ query: WORKSPACE_QUERY, data });
    return null;
  }
};
