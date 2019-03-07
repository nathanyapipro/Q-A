/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LoginAnonymousInput, RoleType } from "./index";

// ====================================================
// GraphQL mutation operation: LoginAnonymous
// ====================================================

export interface LoginAnonymous_loginAnonymous_auth_currentUser {
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

export interface LoginAnonymous_loginAnonymous_auth {
  __typename: "Auth";
  jwtToken: any | null;
  currentUser: LoginAnonymous_loginAnonymous_auth_currentUser | null;
}

export interface LoginAnonymous_loginAnonymous {
  __typename: "LoginAnonymousPayload";
  auth: LoginAnonymous_loginAnonymous_auth | null;
}

export interface LoginAnonymous {
  /**
   * Returns a user that matches the crypt username, or null on failure.
   */
  loginAnonymous: LoginAnonymous_loginAnonymous | null;
}

export interface LoginAnonymousVariables {
  loginAnonymousInput: LoginAnonymousInput;
}
