/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Workspaces
// ====================================================

export interface Workspaces_workspaces_nodes {
  __typename: "Workspace";
  /**
   *  unique identifier for the workspace.
   */
  id: number;
  /**
   * name of the workspace.
   */
  name: string;
}

export interface Workspaces_workspaces {
  __typename: "WorkspacesConnection";
  /**
   * A list of `Workspace` objects.
   */
  nodes: Workspaces_workspaces_nodes[];
}

export interface Workspaces {
  /**
   * Queries workspaces
   */
  workspaces: Workspaces_workspaces;
}

export interface WorkspacesVariables {
  email?: string | null;
}
