/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateQuestionInput, StatusType } from "./index";

// ====================================================
// GraphQL mutation operation: CreateQuestion
// ====================================================

export interface CreateQuestion_createQuestion_question_status {
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

export interface CreateQuestion_createQuestion_question_questionTags_nodes_tag {
  __typename: "Tag";
  /**
   * name of the tag.
   */
  name: string;
  /**
   * color of the tag.
   */
  color: string;
  /**
   * description of the tag.
   */
  description: string | null;
}

export interface CreateQuestion_createQuestion_question_questionTags_nodes {
  __typename: "QuestionTag";
  /**
   * unique identifier for the question_tag.
   */
  id: number;
  /**
   * Reads a single `Tag` that is related to this `QuestionTag`.
   */
  tag: CreateQuestion_createQuestion_question_questionTags_nodes_tag | null;
}

export interface CreateQuestion_createQuestion_question_questionTags {
  __typename: "QuestionTagsConnection";
  /**
   * A list of `QuestionTag` objects.
   */
  nodes: CreateQuestion_createQuestion_question_questionTags_nodes[];
  /**
   * The count of *all* `QuestionTag` you could get from the connection.
   */
  totalCount: number | null;
}

export interface CreateQuestion_createQuestion_question_comments {
  __typename: "CommentsConnection";
  /**
   * The count of *all* `Comment` you could get from the connection.
   */
  totalCount: number | null;
}

export interface CreateQuestion_createQuestion_question {
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
  status: CreateQuestion_createQuestion_question_status | null;
  tagIds: (number | null)[] | null;
  /**
   * Reads and enables pagination through a set of `QuestionTag`.
   */
  questionTags: CreateQuestion_createQuestion_question_questionTags;
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
  comments: CreateQuestion_createQuestion_question_comments;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface CreateQuestion_createQuestion {
  __typename: "CreateQuestionPayload";
  question: CreateQuestion_createQuestion_question | null;
}

export interface CreateQuestion {
  /**
   * Creates a question.
   */
  createQuestion: CreateQuestion_createQuestion | null;
}

export interface CreateQuestionVariables {
  createQuestionInput: CreateQuestionInput;
}
