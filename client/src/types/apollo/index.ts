/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Methods to use when ordering `Question`.
 */
export enum QuestionsOrderBy {
  ID_ASC = "ID_ASC",
  ID_DESC = "ID_DESC",
  NATURAL = "NATURAL",
  PRIMARY_KEY_ASC = "PRIMARY_KEY_ASC",
  PRIMARY_KEY_DESC = "PRIMARY_KEY_DESC",
  STATUS_ID_ASC = "STATUS_ID_ASC",
  STATUS_ID_DESC = "STATUS_ID_DESC",
  USER_ID_ASC = "USER_ID_ASC",
  USER_ID_DESC = "USER_ID_DESC"
}

export enum StatusNameType {
  ANSWERED = "ANSWERED",
  NEW = "NEW",
  UNDER_REVIEW = "UNDER_REVIEW"
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
}

/**
 * All input for the `createQuestion` mutation.
 */
export interface CreateQuestionInput {
  clientMutationId?: string | null;
  content: string;
  tagIds: (number | null)[];
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
  anyEqualTo?: number | null;
  anyNotEqualTo?: number | null;
  lessThan?: (number | null)[] | null;
  lessThanOrEqualTo?: (number | null)[] | null;
  greaterThan?: (number | null)[] | null;
  greaterThanOrEqualTo?: (number | null)[] | null;
  contains?: (number | null)[] | null;
  containedBy?: (number | null)[] | null;
  overlaps?: (number | null)[] | null;
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
  userId?: IntFilter | null;
  statusId?: IntFilter | null;
  hasVoted?: BooleanFilter | null;
  tagIds?: IntListFilter | null;
  and?: QuestionFilter[] | null;
  or?: QuestionFilter[] | null;
  not?: QuestionFilter | null;
}

/**
 * All input for the `questionToggleVote` mutation.
 */
export interface QuestionToggleVoteInput {
  clientMutationId?: string | null;
  questionId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
