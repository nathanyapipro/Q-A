/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { QuestionsOrderBy, QuestionFilter, StatusType } from "./index";

// ====================================================
// GraphQL query operation: Questions
// ====================================================

export interface Questions_questions_nodes_status {
  __typename: "Status";
  /**
   * unique identifier for the status.
   */
  id: number;
  /**
   * status of the status.
   */
  status: StatusType;
}

export interface Questions_questions_nodes_questionTags_nodes_tag {
  __typename: "Tag";
  /**
   * name of the tag.
   */
  name: string;
  /**
   * color of the tag.
   */
  color: string;
}

export interface Questions_questions_nodes_questionTags_nodes {
  __typename: "QuestionTag";
  /**
   * unique identifier for the question_tag.
   */
  id: number;
  /**
   * Reads a single `Tag` that is related to this `QuestionTag`.
   */
  tag: Questions_questions_nodes_questionTags_nodes_tag | null;
}

export interface Questions_questions_nodes_questionTags {
  __typename: "QuestionTagsConnection";
  /**
   * A list of `QuestionTag` objects.
   */
  nodes: Questions_questions_nodes_questionTags_nodes[];
  /**
   * The count of *all* `QuestionTag` you could get from the connection.
   */
  totalCount: number | null;
}

export interface Questions_questions_nodes_comments {
  __typename: "CommentsConnection";
  /**
   * The count of *all* `Comment` you could get from the connection.
   */
  totalCount: number | null;
}

export interface Questions_questions_nodes {
  __typename: "Question";
  /**
   *  unique identifier for the question.
   */
  id: number;
  /**
   *  workspace of the question.
   */
  workspaceId: number;
  /**
   * content of the question.
   */
  content: string;
  /**
   *  owner of the question.
   */
  userId: number;
  /**
   * Reads a single `Status` that is related to this `Question`.
   */
  status: Questions_questions_nodes_status | null;
  tagIds: (number | null)[] | null;
  /**
   * Reads and enables pagination through a set of `QuestionTag`.
   */
  questionTags: Questions_questions_nodes_questionTags;
  /**
   *  vote count of the question
   */
  voteCount: number;
  /**
   * indicates if the user has voted
   */
  hasVoted: boolean | null;
  /**
   * Reads and enables pagination through a set of `Comment`.
   */
  comments: Questions_questions_nodes_comments;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface Questions_questions {
  __typename: "QuestionsConnection";
  /**
   * A list of `Question` objects.
   */
  nodes: Questions_questions_nodes[];
  /**
   * The count of *all* `Question` you could get from the connection.
   */
  totalCount: number | null;
}

export interface Questions {
  /**
   * Reads and enables pagination through a set of `Question`.
   */
  questions: Questions_questions | null;
}

export interface QuestionsVariables {
  first: number;
  offset: number;
  orderBy?: QuestionsOrderBy[] | null;
  workspaceId: number;
  filter?: QuestionFilter | null;
}
