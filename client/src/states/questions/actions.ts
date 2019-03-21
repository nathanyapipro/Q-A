import { createStandardAction } from "typesafe-actions";
import { QuestionsOrderBy } from "../../types/apollo";

export const actions = {
  reset: createStandardAction("questions/RESET")<void>(),
  resetFilters: createStandardAction("questions/RESET_FILTERS")<void>(),
  setFiltersStatusIds: createStandardAction("questions/SET_FILTERS_STATUS_IDS")<
    Array<number>
  >(),
  setFiltersTagIds: createStandardAction("questions/SET_FILTERS_TAG_IDS")<
    Array<number>
  >(),
  setFiltersOrderBy: createStandardAction("questions/SET_FILTERS_ORDER_BY")<
    Array<QuestionsOrderBy>
  >(),
  setPaginationOffset: createStandardAction("questions/SET_PAGINATION_OFFSET")<
    number
  >(),
  toggleFiltersOpen: createStandardAction("questions/TOGGLE_FILTERS_OPEN")<
    void
  >()
};
