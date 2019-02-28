/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DeleteAnswerByIdInput } from "./index";

// ====================================================
// GraphQL mutation operation: DeleteAnswerById
// ====================================================

export interface DeleteAnswerById_deleteAnswerById_answer {
  __typename: "Answer";
  /**
   *  unique identifier for the answer.
   */
  id: number;
}

export interface DeleteAnswerById_deleteAnswerById {
  __typename: "DeleteAnswerPayload";
  /**
   * The `Answer` that was deleted by this mutation.
   */
  answer: DeleteAnswerById_deleteAnswerById_answer | null;
}

export interface DeleteAnswerById {
  /**
   * Deletes a single `Answer` using a unique key.
   */
  deleteAnswerById: DeleteAnswerById_deleteAnswerById | null;
}

export interface DeleteAnswerByIdVariables {
  deleteAnswerByIdInput: DeleteAnswerByIdInput;
}
