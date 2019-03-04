/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RoleType } from "./index";

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

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
   * role of the user.
   */
  role: RoleType;
}

export interface CurrentUser {
  /**
   * Handy method to get the current user for use after authentication
   */
  currentUser: CurrentUser_currentUser | null;
}
