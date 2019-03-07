import { StoreState } from "..";
import { CurrentUser } from "./reducer";

export const $isAuthenticated = (state: StoreState): boolean =>
  Boolean(
    state.global.auth.jwtToken &&
      state.global.auth.currentUser &&
      state.global.auth.currentUser.id
  );

export const $currentUser = (state: StoreState): CurrentUser | undefined =>
  state.global.auth.currentUser;
