/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateCommentByIdInput, RoleType } from "./index";

// ====================================================
// GraphQL mutation operation: UpdateCommentById
// ====================================================

export interface UpdateCommentById_updateCommentById_comment_user_role {
  __typename: "Role";
  /**
   * unique identifier for the role.
   */
  id: number;
  /**
   * role of the role.
   */
  role: RoleType;
}

export interface UpdateCommentById_updateCommentById_comment_user {
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
  role: UpdateCommentById_updateCommentById_comment_user_role | null;
}

export interface UpdateCommentById_updateCommentById_comment {
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
  user: UpdateCommentById_updateCommentById_comment_user | null;
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

export interface UpdateCommentById_updateCommentById {
  __typename: "UpdateCommentPayload";
  /**
   * The `Comment` that was updated by this mutation.
   */
  comment: UpdateCommentById_updateCommentById_comment | null;
}

export interface UpdateCommentById {
  /**
   * Updates a single `Comment` using a unique key and a patch.
   */
  updateCommentById: UpdateCommentById_updateCommentById | null;
}

export interface UpdateCommentByIdVariables {
  updateCommentByIdInput: UpdateCommentByIdInput;
}
