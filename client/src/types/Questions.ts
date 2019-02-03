/* tslint:disable */
// This file was automatically generated and should not be edited.

import { QuestionsOrderBy, QuestionFilter, QuestionStatus } from "./index";

// ====================================================
// GraphQL query operation: Questions
// ====================================================

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

export interface Questions_questions_nodes_votes {
  __typename: "VotesConnection";
  /**
   * The count of *all* `Vote` you could get from the connection.
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
   * unique identifier for the question.
   */
  id: number;
  /**
   * content of the question.
   */
  content: string;
  /**
   * owner of the question.
   */
  userId: number;
  /**
   * status of the question
   */
  status: QuestionStatus;
  /**
   * Reads and enables pagination through a set of `QuestionTag`.
   */
  questionTags: Questions_questions_nodes_questionTags;
  /**
   * Reads and enables pagination through a set of `Vote`.
   */
  votes: Questions_questions_nodes_votes;
  /**
   * Reads and enables pagination through a set of `Comment`.
   */
  comments: Questions_questions_nodes_comments;
  createdAt: any;
  updatedAt: any;
}

export interface Questions_questions_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
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
  /**
   * Information to aid in pagination.
   */
  pageInfo: Questions_questions_pageInfo;
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
  filter?: QuestionFilter | null;
}
