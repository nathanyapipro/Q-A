import { reducer, State } from "./reducer";
import { actions } from "./actions";

export type GlobalState = State;
export const globalReducer = reducer;
export const globalActions = actions;
