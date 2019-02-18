/* tslint:disable */
// This file was automatically generated and should not be edited.

import { RoleNameType } from "./index";

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser_role {
  __typename: "Role";
  /**
   * unique identifier for the role.
   */
  id: number;
  /**
   * name of the role.
   */
  name: RoleNameType;
}

export interface CurrentUser_currentUser {
  __typename: "User";
  /**
   *  unique identifier for the user.
   */
  id: number;
  /**
   * public-facing username (or 'handle') of the user.
   */
  username: string;
  /**
   * Reads a single `Role` that is related to this `User`.
   */
  role: CurrentUser_currentUser_role | null;
}

export interface CurrentUser {
  /**
   * Handy method to get the current user for use after authentication
   */
  currentUser: CurrentUser_currentUser | null;
}
