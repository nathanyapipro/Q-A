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
