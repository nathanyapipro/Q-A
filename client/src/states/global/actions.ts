import { createStandardAction } from "typesafe-actions";
import { CurrentUser } from "./reducer";

export type SetAuthPayload = {
  auth?: {
    currentUser: CurrentUser;
    jwtToken: string;
  };
};

export const actions = {
  setAuth: createStandardAction("global/SET_AUTH")<SetAuthPayload>(),
  toggleSiteMapOpen: createStandardAction("global/TOGGLE_SITE_MAP_OPEN")<
    void
  >(),
  setWorkspaceId: createStandardAction("global/SET_WORKSPACE_ID")<number>()
};
