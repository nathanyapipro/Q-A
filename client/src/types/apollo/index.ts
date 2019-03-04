/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Methods to use when ordering `Question`.
 */
export enum QuestionsOrderBy {
  CREATED_AT_ASC = "CREATED_AT_ASC",
  CREATED_AT_DESC = "CREATED_AT_DESC",
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  NATURAL = "NATURAL",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
  STATUS_ID_ASC = "STATUS_ID_ASC",
  STATUS_ID_DESC = "STATUS_ID_DESC",
  USER_ID_ASC = "USER_ID_ASC",
  USER_ID_DESC = "USER_ID_DESC",
  VOTE_COUNT_ASC = "VOTE_COUNT_ASC",
  VOTE_COUNT_DESC = "VOTE_COUNT_DESC",
  WORKSPACE_ID_ASC = "WORKSPACE_ID_ASC",
  WORKSPACE_ID_DESC = "WORKSPACE_ID_DESC"
}

export enum RoleType {
  ADMIN = "ADMIN",
  ANONYMOUS = "ANONYMOUS",
  MANAGER = "MANAGER"
}

export enum StatusType {
  ANSWERED = "ANSWERED",
  DISMISSED = "DISMISSED",
  NEW = "NEW",
  UNDER_REVIEW = "UNDER_REVIEW"
}

/**
 * Represents an update to a `Answer`. Fields that are set will be updated.
 */
export interface AnswerPatch {
  content?: string | null;
}

/**
 * A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’
 */
export interface BooleanFilter {
  isNull?: boolean | null;
  equalTo?: boolean | null;
  notEqualTo?: boolean | null;
  distinctFrom?: boolean | null;
  notDistinctFrom?: boolean | null;
  in?: boolean[] | null;
  notIn?: boolean[] | null;
  lessThan?: boolean | null;
  lessThanOrEqualTo?: boolean | null;
  greaterThan?: boolean | null;
  greaterThanOrEqualTo?: boolean | null;
}

/**
 * Represents an update to a `Comment`. Fields that are set will be updated.
 */
export interface CommentPatch {
  content?: string | null;
}

/**
 * All input for the `createAnswer` mutation.
 */
export interface CreateAnswerInput {
  clientMutationId?: string | null;
  questionId: number;
  content: string;
}

/**
 * All input for the `createComment` mutation.
 */
export interface CreateCommentInput {
  clientMutationId?: string | null;
  questionId: number;
  content: string;
}

/**
 * All input for the `createQuestion` mutation.
 */
export interface CreateQuestionInput {
  clientMutationId?: string | null;
  workspaceId: number;
  content: string;
  tagIds: (number | null)[];
}

/**
 * All input for the `deleteAnswerById` mutation.
 */
export interface DeleteAnswerByIdInput {
  clientMutationId?: string | null;
  id: number;
}

/**
 * All input for the `deleteCommentById` mutation.
 */
export interface DeleteCommentByIdInput {
  clientMutationId?: string | null;
  id: number;
}

/**
 * All input for the `deleteQuestionById` mutation.
 */
export interface DeleteQuestionByIdInput {
  clientMutationId?: string | null;
  id: number;
}

/**
 * A filter to be used against Int fields. All fields are combined with a logical ‘and.’
 */
export interface IntFilter {
  isNull?: boolean | null;
  equalTo?: number | null;
  notEqualTo?: number | null;
  distinctFrom?: number | null;
  notDistinctFrom?: number | null;
  in?: number[] | null;
  notIn?: number[] | null;
  lessThan?: number | null;
  lessThanOrEqualTo?: number | null;
  greaterThan?: number | null;
  greaterThanOrEqualTo?: number | null;
}

/**
 * A filter to be used against Int List fields. All fields are combined with a logical ‘and.’
 */
export interface IntListFilter {
  isNull?: boolean | null;
  equalTo?: (number | null)[] | null;
  notEqualTo?: (number | null)[] | null;
  distinctFrom?: (number | null)[] | null;
  notDistinctFrom?: (number | null)[] | null;
  lessThan?: (number | null)[] | null;
  lessThanOrEqualTo?: (number | null)[] | null;
  greaterThan?: (number | null)[] | null;
  greaterThanOrEqualTo?: (number | null)[] | null;
  contains?: (number | null)[] | null;
  containedBy?: (number | null)[] | null;
  overlaps?: (number | null)[] | null;
  anyEqualTo?: number | null;
  anyNotEqualTo?: number | null;
  anyLessThan?: number | null;
  anyLessThanOrEqualTo?: number | null;
  anyGreaterThan?: number | null;
  anyGreaterThanOrEqualTo?: number | null;
}

/**
 * All input for the `loginAnonymous` mutation.
 */
export interface LoginAnonymousInput {
  clientMutationId?: string | null;
  username: string;
}

/**
 * All input for the `login` mutation.
 */
export interface LoginInput {
  clientMutationId?: string | null;
  username: string;
  password?: string | null;
}

/**
 * A filter to be used against `Question` object types. All fields are combined with a logical ‘and.’
 */
export interface QuestionFilter {
  id?: IntFilter | null;
  workspaceId?: IntFilter | null;
  userId?: IntFilter | null;
  statusId?: IntFilter | null;
  voteCount?: IntFilter | null;
  hasVoted?: BooleanFilter | null;
  tagIds?: IntListFilter | null;
  and?: QuestionFilter[] | null;
  or?: QuestionFilter[] | null;
  not?: QuestionFilter | null;
}

/**
 * An input for mutations affecting `QuestionPatchRecord`
 */
export interface QuestionPatchRecordInput {
  statusId?: number | null;
  content?: string | null;
  tagIds?: (number | null)[] | null;
}

/**
 * All input for the `questionToggleVote` mutation.
 */
export interface QuestionToggleVoteInput {
  clientMutationId?: string | null;
  questionId: number;
}

/**
 * All input for the `updateAnswerById` mutation.
 */
export interface UpdateAnswerByIdInput {
  clientMutationId?: string | null;
  patch: AnswerPatch;
  id: number;
}

/**
 * All input for the `updateCommentById` mutation.
 */
export interface UpdateCommentByIdInput {
  clientMutationId?: string | null;
  patch: CommentPatch;
  id: number;
}

/**
 * All input for the `updateQuestionById` mutation.
 */
export interface UpdateQuestionByIdInput {
  clientMutationId?: string | null;
  id: number;
  patch: QuestionPatchRecordInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
