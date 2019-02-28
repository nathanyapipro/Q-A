/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DeleteCommentByIdInput } from "./index";

// ====================================================
// GraphQL mutation operation: DeleteCommentById
// ====================================================

export interface DeleteCommentById_deleteCommentById_comment {
  __typename: "Comment";
  /**
   *  unique identifier for the comment.
   */
  id: number;
}

export interface DeleteCommentById_deleteCommentById {
  __typename: "DeleteCommentPayload";
  /**
   * The `Comment` that was deleted by this mutation.
   */
  comment: DeleteCommentById_deleteCommentById_comment | null;
}

export interface DeleteCommentById {
  /**
   * Deletes a single `Comment` using a unique key.
   */
  deleteCommentById: DeleteCommentById_deleteCommentById | null;
}

export interface DeleteCommentByIdVariables {
  deleteCommentByIdInput: DeleteCommentByIdInput;
}
