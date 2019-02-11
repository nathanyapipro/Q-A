/* tslint:disable */
// This file was automatically generated and should not be edited.

import { StatusNameType } from "./index";

// ====================================================
// GraphQL query operation: QuestionById
// ====================================================

export interface QuestionById_questionById_status {
  __typename: "Status";
  /**
   * unique identifier for the status.
   */
  id: number;
  /**
   * name of the status.
   */
  name: StatusNameType;
}

export interface QuestionById_questionById_questionTags_nodes_tag {
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

export interface QuestionById_questionById_questionTags_nodes {
  __typename: "QuestionTag";
  /**
   * unique identifier for the question_tag.
   */
  id: number;
  /**
   * Reads a single `Tag` that is related to this `QuestionTag`.
   */
  tag: QuestionById_questionById_questionTags_nodes_tag | null;
}

export interface QuestionById_questionById_questionTags {
  __typename: "QuestionTagsConnection";
  /**
   * A list of `QuestionTag` objects.
   */
  nodes: QuestionById_questionById_questionTags_nodes[];
  /**
   * The count of *all* `QuestionTag` you could get from the connection.
   */
  totalCount: number | null;
}

export interface QuestionById_questionById_comments {
  __typename: "CommentsConnection";
  /**
   * The count of *all* `Comment` you could get from the connection.
   */
  totalCount: number | null;
}

export interface QuestionById_questionById {
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
   * Reads a single `Status` that is related to this `Question`.
   */
  status: QuestionById_questionById_status | null;
  /**
   * Reads and enables pagination through a set of `QuestionTag`.
   */
  questionTags: QuestionById_questionById_questionTags;
  voteCount: number;
  /**
   * indicates if the user has voted
   */
  hasVoted: boolean | null;
  /**
   * Reads and enables pagination through a set of `Comment`.
   */
  comments: QuestionById_questionById_comments;
  createdAt: any;
  updatedAt: any;
}

export interface QuestionById {
  questionById: QuestionById_questionById | null;
}

export interface QuestionByIdVariables {
  questionId: number;
}
