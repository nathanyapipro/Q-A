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
  and?: QuestionFilter[] | null;
  or?: QuestionFilter[] | null;
  not?: QuestionFilter | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
