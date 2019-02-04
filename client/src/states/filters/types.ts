import { Pick } from "../../types";

export interface Filters {
  __typename: "Filters";
  statusIds: Array<number>;
  tagIds: Array<number>;
  sortBy: string;
}

export type Filters_StatusIds = Pick<Filters, "__typename" | "statusIds">;

export interface StatusIds {
  filters: Filters_StatusIds;
}
export interface StatusIdsVariables {}

export type Filters_TagIds = Pick<Filters, "__typename" | "tagIds">;

export interface TagIds {
  filters: Filters_TagIds;
}
export interface TagIdsVariables {}

export type Filters_SortBy = Pick<Filters, "__typename" | "sortBy">;

export interface SortBy {
  filters: Filters_SortBy;
}
export interface SortByVariables {}

export interface SetStatusIds {}
export interface SetStatusIdsVariables {
  statusIds: Array<number>;
}

export interface SetTagIds {}
export interface SetTagIdsVariables {
  tagIds: Array<number>;
}

export interface SetSortBy {}
export interface SetSortByVariables {
  sortBy: string;
}
