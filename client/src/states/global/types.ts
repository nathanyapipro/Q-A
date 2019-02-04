import { Pick } from "../../types";
export interface Global {
  __typename: "Global";
  menu: boolean;
}

export type Global_Menu = Pick<Global, "__typename" | "menu">;

export interface Menu {
  global: Global_Menu;
}

export interface MenuVariables {}

export interface MenuToggle {}
export interface MenuToggleVariables {}
