/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateAnswerInput } from "./index";

// ====================================================
// GraphQL mutation operation: CreateAnswer
// ====================================================

export interface CreateAnswer_createAnswer_answer_user {
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

export interface CreateAnswer_createAnswer_answer {
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
  user: CreateAnswer_createAnswer_answer_user | null;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface CreateAnswer_createAnswer {
  __typename: "CreateAnswerPayload";
  answer: CreateAnswer_createAnswer_answer | null;
}

export interface CreateAnswer {
  /**
   * Creates a answer.
   */
  createAnswer: CreateAnswer_createAnswer | null;
}

export interface CreateAnswerVariables {
  createAnswerInput: CreateAnswerInput;
}
