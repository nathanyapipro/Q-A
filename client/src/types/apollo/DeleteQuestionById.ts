/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DeleteQuestionByIdInput } from "./index";

// ====================================================
// GraphQL mutation operation: DeleteQuestionById
// ====================================================

export interface DeleteQuestionById_deleteQuestionById_question {
  __typename: "Question";
  /**
   *  unique identifier for the question.
   */
  id: number;
}

export interface DeleteQuestionById_deleteQuestionById {
  __typename: "DeleteQuestionPayload";
  /**
   * The `Question` that was deleted by this mutation.
   */
  question: DeleteQuestionById_deleteQuestionById_question | null;
}

export interface DeleteQuestionById {
  /**
   * Deletes a single `Question` using a unique key.
   */
  deleteQuestionById: DeleteQuestionById_deleteQuestionById | null;
}

export interface DeleteQuestionByIdVariables {
  deleteQuestionByIdInput: DeleteQuestionByIdInput;
}
