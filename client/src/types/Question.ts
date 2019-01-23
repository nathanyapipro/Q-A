/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Question
// ====================================================

export interface Question_questionById_user {
  __typename: "User";
  /**
   * unique identifier for the user.
   */
  id: number;
  /**
   * public-facing username (or 'handle') of the user.
   */
  username: string;
}

export interface Question_questionById_status {
  __typename: "Status";
  /**
   * unique identifier for the status.
   */
  id: number;
  /**
   * name of the status.
   */
  name: string;
}

export interface Question_questionById_questionTags_nodes_tag {
  __typename: "Tag";
  /**
   * unique identifier for the tag.
   */
  id: number;
  /**
   * name of the tag.
   */
  name: string;
  /**
   * color of the tag.
   */
  color: string;
}

export interface Question_questionById_questionTags_nodes {
  __typename: "QuestionTag";
  /**
   * Reads a single `Tag` that is related to this `QuestionTag`.
   */
  tag: Question_questionById_questionTags_nodes_tag | null;
}

export interface Question_questionById_questionTags {
  __typename: "QuestionTagsConnection";
  /**
   * A list of `QuestionTag` objects.
   */
  nodes: Question_questionById_questionTags_nodes[];
}

export interface Question_questionById_votes_nodes {
  __typename: "Vote";
  /**
   * unique identifier for the vote.
   */
  id: number;
  /**
   * owner of the vote.
   */
  userId: number;
}

export interface Question_questionById_votes {
  __typename: "VotesConnection";
  /**
   * A list of `Vote` objects.
   */
  nodes: Question_questionById_votes_nodes[];
  /**
   * The count of *all* `Vote` you could get from the connection.
   */
  totalCount: number | null;
}

export interface Question_questionById_answers_nodes_user {
  __typename: "User";
  /**
   * unique identifier for the user.
   */
  id: number;
  /**
   * public-facing username (or 'handle') of the user.
   */
  username: string;
}

export interface Question_questionById_answers_nodes {
  __typename: "Answer";
  /**
   * unique identifier for the answer.
   */
  id: number;
  /**
   * content of the answer.
   */
  content: string;
  /**
   * Reads a single `User` that is related to this `Answer`.
   */
  user: Question_questionById_answers_nodes_user | null;
  createdAt: any;
  updatedAt: any;
}

export interface Question_questionById_answers {
  __typename: "AnswersConnection";
  /**
   * A list of `Answer` objects.
   */
  nodes: Question_questionById_answers_nodes[];
}

export interface Question_questionById {
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
   * Reads a single `User` that is related to this `Question`.
   */
  user: Question_questionById_user | null;
  /**
   * Reads a single `Status` that is related to this `Question`.
   */
  status: Question_questionById_status | null;
  /**
   * Reads and enables pagination through a set of `QuestionTag`.
   */
  questionTags: Question_questionById_questionTags;
  /**
   * Reads and enables pagination through a set of `Vote`.
   */
  votes: Question_questionById_votes;
  /**
   * Reads and enables pagination through a set of `Answer`.
   */
  answers: Question_questionById_answers;
  createdAt: any;
  updatedAt: any;
}

export interface Question {
  questionById: Question_questionById | null;
}

export interface QuestionVariables {
  questionId: number;
}
