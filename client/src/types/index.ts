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
  user?: UserFilter | null;
  status?: StatusFilter | null;
  and?: QuestionFilter[] | null;
  or?: QuestionFilter[] | null;
  not?: QuestionFilter | null;
}

/**
 * A filter to be used against `Role` object types. All fields are combined with a logical ‘and.’
 */
export interface RoleFilter {
  id?: IntFilter | null;
  name?: StringFilter | null;
  and?: RoleFilter[] | null;
  or?: RoleFilter[] | null;
  not?: RoleFilter | null;
}

/**
 * A filter to be used against `Status` object types. All fields are combined with a logical ‘and.’
 */
export interface StatusFilter {
  id?: IntFilter | null;
  and?: StatusFilter[] | null;
  or?: StatusFilter[] | null;
  not?: StatusFilter | null;
}

/**
 * A filter to be used against String fields. All fields are combined with a logical ‘and.’
 */
export interface StringFilter {
  isNull?: boolean | null;
  equalTo?: string | null;
  notEqualTo?: string | null;
  distinctFrom?: string | null;
  notDistinctFrom?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  lessThan?: string | null;
  lessThanOrEqualTo?: string | null;
  greaterThan?: string | null;
  greaterThanOrEqualTo?: string | null;
  includes?: string | null;
  notIncludes?: string | null;
  includesInsensitive?: string | null;
  notIncludesInsensitive?: string | null;
  startsWith?: string | null;
  notStartsWith?: string | null;
  startsWithInsensitive?: string | null;
  notStartsWithInsensitive?: string | null;
  endsWith?: string | null;
  notEndsWith?: string | null;
  endsWithInsensitive?: string | null;
  notEndsWithInsensitive?: string | null;
  like?: string | null;
  notLike?: string | null;
  likeInsensitive?: string | null;
  notLikeInsensitive?: string | null;
  similarTo?: string | null;
  notSimilarTo?: string | null;
}

/**
 * A filter to be used against `User` object types. All fields are combined with a logical ‘and.’
 */
export interface UserFilter {
  id?: IntFilter | null;
  username?: StringFilter | null;
  roleId?: IntFilter | null;
  role?: RoleFilter | null;
  and?: UserFilter[] | null;
  or?: UserFilter[] | null;
  not?: UserFilter | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
