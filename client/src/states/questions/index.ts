import { reducer, State } from "./reducer";
import { actions } from "./actions";

export type QuestionsState = State;
export const questionsReducer = reducer;
export const questionsActions = actions;
