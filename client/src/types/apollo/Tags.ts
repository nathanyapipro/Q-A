/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tags
// ====================================================

export interface Tags_tags_nodes {
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

export interface Tags_tags {
  __typename: "TagsConnection";
  /**
   * A list of `Tag` objects.
   */
  nodes: Tags_tags_nodes[];
}

export interface Tags {
  /**
   * Reads and enables pagination through a set of `Tag`.
   */
  tags: Tags_tags | null;
}
