import { Pick } from "../../types";

export interface LSFilters {
  __typename: "Filters";
  statusIds: Array<number>;
  tagIds: Array<number>;
  sortBy: string;
}

export interface LSFiltersALL {
  filters: LSFilters;
}

export interface LSFiltersStatusIds {
  filters: Pick<LSFilters, "__typename" | "statusIds">;
}

export interface LSFiltersTagIds {
  filters: Pick<LSFilters, "__typename" | "tagIds">;
}

export interface LSFiltersSortBy {
  filters: Pick<LSFilters, "__typename" | "sortBy">;
}

export interface LSFiltersStatusIdsSet {}
export interface LSFiltersStatusIdsSetVariables {
  statusIds: Array<number>;
}

export interface LSFiltersTagIdsSet {}
export interface LSFiltersTagIdsSetVariables {
  tagIds: Array<number>;
}

export interface LSFiltersSortBySet {}
export interface LSFiltersSortBySetVariables {
  sortBy: string;
}
