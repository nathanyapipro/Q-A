/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_userById_role {
  __typename: "Role";
  /**
   * unique identifier for the role.
   */
  id: number;
  /**
   * name of the role.
   */
  name: string;
}

export interface CurrentUser_userById {
  __typename: "User";
  /**
   * unique identifier for the user.
   */
  id: number;
  /**
   * public-facing username (or 'handle') of the user.
   */
  username: string;
  /**
   * Reads a single `Role` that is related to this `User`.
   */
  role: CurrentUser_userById_role | null;
}

export interface CurrentUser {
  userById: CurrentUser_userById | null;
}

export interface CurrentUserVariables {
  userId: number;
}
