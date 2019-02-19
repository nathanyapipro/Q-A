/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateAnswerByIdInput } from "./index";

// ====================================================
// GraphQL mutation operation: UpdateAnswerById
// ====================================================

export interface UpdateAnswerById_updateAnswerById_answer_user {
  __typename: "User";
  /**
   *  unique identifier for the user.
   */
  id: number;
  /**
   * public-facing username (or 'handle') of the user.
   */
  username: string;
}

export interface UpdateAnswerById_updateAnswerById_answer {
  __typename: "Answer";
  /**
   *  unique identifier for the answer.
   */
  id: number;
  /**
   *  question being answered
   */
  questionId: number;
  /**
   * content of the answer.
   */
  content: string;
  /**
   * Reads a single `User` that is related to this `Answer`.
   */
  user: UpdateAnswerById_updateAnswerById_answer_user | null;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface UpdateAnswerById_updateAnswerById {
  __typename: "UpdateAnswerPayload";
  /**
   * The `Answer` that was updated by this mutation.
   */
  answer: UpdateAnswerById_updateAnswerById_answer | null;
}

export interface UpdateAnswerById {
  /**
   * Updates a single `Answer` using a unique key and a patch.
   */
  updateAnswerById: UpdateAnswerById_updateAnswerById | null;
}

export interface UpdateAnswerByIdVariables {
  updateAnswerByIdInput: UpdateAnswerByIdInput;
}
