import { Pick } from "../../types";
export interface LSGlobal {
  __typename: "Global";
  menu: boolean;
}

export interface LSGlobalMenu {
  global: Pick<LSGlobal, "__typename" | "menu">;
}
