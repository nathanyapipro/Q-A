import { Pick } from "../../types";

export interface FiltersType {
  __typename: "Filters";
  statusIds: Array<number>;
  tagIds: Array<number>;
  sortBy: string;
}

export interface Filters {
  filters: Filters;
}

export interface StatusIdsVariables {}

export type Filters_StatusIds = Pick<FiltersType, "__typename" | "statusIds">;
export interface StatusIds {
  filters: Filters_StatusIds;
}
export interface StatusIdsVariables {}

export type Filters_TagIds = Pick<FiltersType, "__typename" | "tagIds">;
export interface TagIds {
  filters: Filters_TagIds;
}
export interface TagIdsVariables {}

export type Filters_SortBy = Pick<FiltersType, "__typename" | "sortBy">;
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
