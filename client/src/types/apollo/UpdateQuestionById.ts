/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UpdateQuestionByIdInput } from "./index";

// ====================================================
// GraphQL mutation operation: UpdateQuestionById
// ====================================================

export interface UpdateQuestionById_updateQuestionById_question {
  __typename: "Question";
  /**
   *  unique identifier for the question.
   */
  id: number;
}

export interface UpdateQuestionById_updateQuestionById {
  __typename: "UpdateQuestionPayload";
  /**
   * The `Question` that was updated by this mutation.
   */
  question: UpdateQuestionById_updateQuestionById_question | null;
}

export interface UpdateQuestionById {
  /**
   * Updates a single `Question` using a unique key and a patch.
   */
  updateQuestionById: UpdateQuestionById_updateQuestionById | null;
}

export interface UpdateQuestionByIdVariables {
  updateQuestionInput: UpdateQuestionByIdInput;
}
