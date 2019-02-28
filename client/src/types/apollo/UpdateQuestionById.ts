/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UpdateQuestionByIdInput, StatusType } from "./index";

// ====================================================
// GraphQL mutation operation: UpdateQuestionById
// ====================================================

export interface UpdateQuestionById_updateQuestionById_question_status {
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

export interface UpdateQuestionById_updateQuestionById_question_questionTags_nodes_tag {
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

export interface UpdateQuestionById_updateQuestionById_question_questionTags_nodes {
  __typename: "QuestionTag";
  /**
   * unique identifier for the question_tag.
   */
  id: number;
  /**
   * Reads a single `Tag` that is related to this `QuestionTag`.
   */
  tag: UpdateQuestionById_updateQuestionById_question_questionTags_nodes_tag | null;
}

export interface UpdateQuestionById_updateQuestionById_question_questionTags {
  __typename: "QuestionTagsConnection";
  /**
   * A list of `QuestionTag` objects.
   */
  nodes: UpdateQuestionById_updateQuestionById_question_questionTags_nodes[];
  /**
   * The count of *all* `QuestionTag` you could get from the connection.
   */
  totalCount: number | null;
}

export interface UpdateQuestionById_updateQuestionById_question_answers_nodes_user {
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

export interface UpdateQuestionById_updateQuestionById_question_answers_nodes {
  __typename: "Answer";
  /**
   *  unique identifier for the answer.
   */
  id: number;
  /**
   * content of the answer.
   */
  content: string;
  /**
   * Reads a single `User` that is related to this `Answer`.
   */
  user: UpdateQuestionById_updateQuestionById_question_answers_nodes_user | null;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface UpdateQuestionById_updateQuestionById_question_answers {
  __typename: "AnswersConnection";
  /**
   * A list of `Answer` objects.
   */
  nodes: UpdateQuestionById_updateQuestionById_question_answers_nodes[];
}

export interface UpdateQuestionById_updateQuestionById_question_comments {
  __typename: "CommentsConnection";
  /**
   * The count of *all* `Comment` you could get from the connection.
   */
  totalCount: number | null;
}

export interface UpdateQuestionById_updateQuestionById_question {
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
  status: UpdateQuestionById_updateQuestionById_question_status | null;
  tagIds: (number | null)[] | null;
  /**
   * Reads and enables pagination through a set of `QuestionTag`.
   */
  questionTags: UpdateQuestionById_updateQuestionById_question_questionTags;
  /**
   *  vote count of the question
   */
  voteCount: number;
  /**
   * indicates if the user has voted
   */
  hasVoted: boolean | null;
  /**
   * Reads and enables pagination through a set of `Answer`.
   */
  answers: UpdateQuestionById_updateQuestionById_question_answers;
  /**
   * Reads and enables pagination through a set of `Comment`.
   */
  comments: UpdateQuestionById_updateQuestionById_question_comments;
  /**
   *  timestamp of create
   */
  createdAt: any;
  /**
   *  timestamp of last update
   */
  updatedAt: any;
}

export interface UpdateQuestionById_updateQuestionById {
  __typename: "UpdateQuestionByIdPayload";
  question: UpdateQuestionById_updateQuestionById_question | null;
}

export interface UpdateQuestionById {
  /**
   * Update a question by Id.
   */
  updateQuestionById: UpdateQuestionById_updateQuestionById | null;
}

export interface UpdateQuestionByIdVariables {
  updateQuestionByIdInput: UpdateQuestionByIdInput;
}
