/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LoginInput, RoleType } from "./index";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_auth_currentUser {
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

export interface Login_login_auth {
  __typename: "Auth";
  jwtToken: any | null;
  currentUser: Login_login_auth_currentUser | null;
}

export interface Login_login {
  __typename: "LoginPayload";
  auth: Login_login_auth | null;
}

export interface Login {
  /**
   * Returns a user that matches the username/password combo, or null on failure.
   */
  login: Login_login | null;
}

export interface LoginVariables {
  loginInput: LoginInput;
}
