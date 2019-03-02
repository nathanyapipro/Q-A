/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StatusType } from "./index";

// ====================================================
// GraphQL query operation: Statuses
// ====================================================

export interface Statuses_statuses_nodes {
  __typename: "Status";
  /**
   * unique identifier for the status.
   */
  id: number;
  /**
   * status of the status.
   */
  status: StatusType;
}

export interface Statuses_statuses {
  __typename: "StatusesConnection";
  /**
   * A list of `Status` objects.
   */
  nodes: Statuses_statuses_nodes[];
}

export interface Statuses {
  /**
   * Reads and enables pagination through a set of `Status`.
   */
  statuses: Statuses_statuses | null;
}
