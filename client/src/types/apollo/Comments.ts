/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Comments
// ====================================================

export interface Comments_comments_nodes_user {
  __typename: "User";
  /**
   * unique identifier for the user.
   */
  id: number;
  /**
   * public-facing username (or 'handle') of the user.
   */
  username: string;
}

export interface Comments_comments_nodes {
  __typename: "Comment";
  /**
   * unique identifier for the comment.
   */
  id: number;
  /**
   * question being commented
   */
  questionId: number;
  /**
   * Reads a single `User` that is related to this `Comment`.
   */
  user: Comments_comments_nodes_user | null;
  /**
   * content of the comment.
   */
  content: string;
  updatedAt: any;
  createdAt: any;
}

export interface Comments_comments {
  __typename: "CommentsConnection";
  /**
   * A list of `Comment` objects.
   */
  nodes: Comments_comments_nodes[];
  /**
   * The count of *all* `Comment` you could get from the connection.
   */
  totalCount: number | null;
}

export interface Comments {
  /**
   * Reads and enables pagination through a set of `Comment`.
   */
  comments: Comments_comments | null;
}

export interface CommentsVariables {
  questionId: number;
  first: number;
  offset: number;
}
