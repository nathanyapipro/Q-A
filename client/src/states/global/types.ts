import { Pick } from "../../types";
export interface Global {
  __typename: "Global";
  menu: boolean;
}

export type MenuGet_Global = Pick<Global, "__typename" | "menu">;

export interface MenuGet {
  global: MenuGet_Global;
}

export interface MenuGetVariables {}

export interface MenuToggle {}
export interface MenuToggleVariables {}
