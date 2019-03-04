/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RoleType } from "./index";

// ====================================================
// GraphQL query operation: Answers
// ====================================================

export interface Answers_answers_nodes_user {
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
   * role of the user.
   */
  role: RoleType;
}

export interface Answers_answers_nodes {
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
  user: Answers_answers_nodes_user | null;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface Answers_answers {
  __typename: "AnswersConnection";
  /**
   * A list of `Answer` objects.
   */
  nodes: Answers_answers_nodes[];
}

export interface Answers {
  /**
   * Reads and enables pagination through a set of `Answer`.
   */
  answers: Answers_answers | null;
}

export interface AnswersVariables {
  questionId: number;
}
