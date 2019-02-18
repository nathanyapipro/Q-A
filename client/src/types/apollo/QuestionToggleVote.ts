/* tslint:disable */
// This file was automatically generated and should not be edited.

import { QuestionToggleVoteInput, StatusNameType } from "./index";

// ====================================================
// GraphQL mutation operation: QuestionToggleVote
// ====================================================

export interface QuestionToggleVote_questionToggleVote_question_status {
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

export interface QuestionToggleVote_questionToggleVote_question_questionTags_nodes_tag {
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

export interface QuestionToggleVote_questionToggleVote_question_questionTags_nodes {
  __typename: "QuestionTag";
  /**
   * unique identifier for the question_tag.
   */
  id: number;
  /**
   * Reads a single `Tag` that is related to this `QuestionTag`.
   */
  tag: QuestionToggleVote_questionToggleVote_question_questionTags_nodes_tag | null;
}

export interface QuestionToggleVote_questionToggleVote_question_questionTags {
  __typename: "QuestionTagsConnection";
  /**
   * A list of `QuestionTag` objects.
   */
  nodes: QuestionToggleVote_questionToggleVote_question_questionTags_nodes[];
  /**
   * The count of *all* `QuestionTag` you could get from the connection.
   */
  totalCount: number | null;
}

export interface QuestionToggleVote_questionToggleVote_question_comments {
  __typename: "CommentsConnection";
  /**
   * The count of *all* `Comment` you could get from the connection.
   */
  totalCount: number | null;
}

export interface QuestionToggleVote_questionToggleVote_question {
  __typename: "Question";
  /**
   *  unique identifier for the question.
   */
  id: number;
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
  status: QuestionToggleVote_questionToggleVote_question_status | null;
  /**
   * Reads and enables pagination through a set of `QuestionTag`.
   */
  questionTags: QuestionToggleVote_questionToggleVote_question_questionTags;
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
  comments: QuestionToggleVote_questionToggleVote_question_comments;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface QuestionToggleVote_questionToggleVote {
  __typename: "QuestionToggleVotePayload";
  question: QuestionToggleVote_questionToggleVote_question | null;
}

export interface QuestionToggleVote {
  /**
   * Toggles User vote on a question.
   */
  questionToggleVote: QuestionToggleVote_questionToggleVote | null;
}

export interface QuestionToggleVoteVariables {
  questionToggleVoteInput: QuestionToggleVoteInput;
}
