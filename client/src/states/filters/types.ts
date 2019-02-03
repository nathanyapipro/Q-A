import { Pick } from "../../types";

export interface Filters {
  __typename: "Filters";
  statusIds: Array<number>;
  tagIds: Array<number>;
  sortBy: string;
}

export type MenuGet_Global = Pick<
  Filters,
  "__typename" | "statusIds" | "tagIds" | "sortBy"
>;

export interface MenuGet {
  global: MenuGet_Global;
}

export interface MenuGetVariables {}

export interface MenuToggle {}
export interface MenuToggleVariables {}
