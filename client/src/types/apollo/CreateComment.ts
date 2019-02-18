/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CreateCommentInput, RoleNameType } from "./index";

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_createComment_comment_user_role {
  __typename: "Role";
  /**
   * unique identifier for the role.
   */
  id: number;
  /**
   * name of the role.
   */
  name: RoleNameType;
}

export interface CreateComment_createComment_comment_user {
  __typename: "User";
  /**
   *  unique identifier for the user.
   */
  id: number;
  /**
   * public-facing username (or 'handle') of the user.
   */
  username: string;
  /**
   * Reads a single `Role` that is related to this `User`.
   */
  role: CreateComment_createComment_comment_user_role | null;
}

export interface CreateComment_createComment_comment {
  __typename: "Comment";
  /**
   *  unique identifier for the comment.
   */
  id: number;
  /**
   *  question being commented
   */
  questionId: number;
  /**
   * Reads a single `User` that is related to this `Comment`.
   */
  user: CreateComment_createComment_comment_user | null;
  /**
   * content of the comment.
   */
  content: string;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
  /**
   *  timestamp of create
   */
  createdAt: any;
}

export interface CreateComment_createComment {
  __typename: "CreateCommentPayload";
  comment: CreateComment_createComment_comment | null;
}

export interface CreateComment {
  /**
   * Creates a comment.
   */
  createComment: CreateComment_createComment | null;
}

export interface CreateCommentVariables {
  createCommentInput: CreateCommentInput;
}
