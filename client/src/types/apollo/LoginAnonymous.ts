/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { LoginAnonymousInput } from "./index";

// ====================================================
// GraphQL mutation operation: LoginAnonymous
// ====================================================

export interface LoginAnonymous_loginAnonymous {
  __typename: "LoginAnonymousPayload";
  jwtToken: any | null;
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
