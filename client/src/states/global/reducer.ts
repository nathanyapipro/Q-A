import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { RoleType } from "../../types/apollo";

export type CurrentUser = {
  readonly id: number;
  readonly role: RoleType;
  readonly username: string;
};

export interface State {
  auth: {
    readonly currentUser?: CurrentUser;
    readonly jwtToken?: string;
    readonly email?: string;
  };
  readonly isSiteMapOpen: boolean;
  readonly workspaceId: number;
}

const AUTH_INITIAL_STATE = {
  currentUser: undefined,
  jwtToken: undefined,
  email: undefined
};

const INITIAL_STATE = {
  auth: AUTH_INITIAL_STATE,
  isSiteMapOpen: false,
  workspaceId: 1
};

export function reducer(
  state: State = INITIAL_STATE,
  action: ActionType<typeof actions>
): State {
  switch (action.type) {
    case getType(actions.setAuth): {
      const { auth } = action.payload;

      if (auth) {
        localStorage.setItem("jwtToken", auth.jwtToken);
        return {
          ...state,
          auth: auth || AUTH_INITIAL_STATE
        };
      } else {
        localStorage.removeItem("jwtToken");
        return {
          ...state,
          auth: AUTH_INITIAL_STATE
        };
      }
    }
    case getType(actions.toggleSiteMapOpen): {
      return {
        ...state,
        isSiteMapOpen: !state.isSiteMapOpen
      };
    }
    case getType(actions.setWorkspaceId): {
      return {
        ...state,
        workspaceId: action.payload
      };
    }
    default:
      return state;
  }
}
