/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UpdateAnswerByIdInput, RoleType } from "./index";

// ====================================================
// GraphQL mutation operation: UpdateAnswerById
// ====================================================

export interface UpdateAnswerById_updateAnswerById_answer_user_role {
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
  /**
   * Reads a single `Role` that is related to this `User`.
   */
  role: UpdateAnswerById_updateAnswerById_answer_user_role | null;
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
