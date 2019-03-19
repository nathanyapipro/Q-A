/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WorkspaceTags
// ====================================================

export interface WorkspaceTags_workspaceTags_nodes_tag {
  __typename: "Tag";
  /**
   *  unique identifier for the tag.
   */
  id: number;
  /**
   * name of the tag.
   */
  name: string;
  /**
   * color of the tag.
   */
  color: string;
}

export interface WorkspaceTags_workspaceTags_nodes {
  __typename: "WorkspaceTag";
  /**
   *  unique identifier for the workspace_tag.
   */
  id: number;
  /**
   * Reads a single `Tag` that is related to this `WorkspaceTag`.
   */
  tag: WorkspaceTags_workspaceTags_nodes_tag | null;
  /**
   * determines if the workspace_tag is available.
   */
  isEnabled: boolean;
}

export interface WorkspaceTags_workspaceTags {
  __typename: "WorkspaceTagsConnection";
  /**
   * A list of `WorkspaceTag` objects.
   */
  nodes: WorkspaceTags_workspaceTags_nodes[];
}

export interface WorkspaceTags {
  /**
   * Reads and enables pagination through a set of `WorkspaceTag`.
   */
  workspaceTags: WorkspaceTags_workspaceTags | null;
}

export interface WorkspaceTagsVariables {
  workspaceId: number;
  onlyEnabled?: boolean | null;
}
