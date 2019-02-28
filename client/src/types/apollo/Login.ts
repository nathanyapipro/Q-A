/* tslint:disable */
// This file was automatically generated and should not be edited.

import { LoginInput } from "./index";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "LoginPayload";
  jwtToken: any | null;
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
