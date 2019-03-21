import { ActionType, getType } from "typesafe-actions";
import { actions } from "./actions";
import { QuestionsOrderBy } from "../../types/apollo";

export type Filters = {
  tagIds: Array<number>;
  statusIds: Array<number>;
  orderBy: Array<QuestionsOrderBy>;
};

export type Pagination = {
  offset: number;
  first: number;
};

export interface State {
  filters: Filters;
  pagination: Pagination;
  readonly isFiltersOpen: boolean;
}

const FILTERS_INITIAL_STATE = {
  tagIds: [],
  statusIds: [],
  orderBy: [QuestionsOrderBy.VOTE_COUNT_DESC]
};

const PAGINATION_INITIAL_STATE = {
  offset: 0,
  first: 10
};

const INITIAL_STATE = {
  filters: FILTERS_INITIAL_STATE,
  pagination: PAGINATION_INITIAL_STATE,
  isFiltersOpen: false
};

export function reducer(
  state: State = INITIAL_STATE,
  action: ActionType<typeof actions>
): State {
  switch (action.type) {
    case getType(actions.reset): {
      return INITIAL_STATE;
    }
    case getType(actions.resetFilters): {
      return {
        ...state,
        filters: FILTERS_INITIAL_STATE,
        pagination: PAGINATION_INITIAL_STATE
      };
    }
    case getType(actions.setFiltersStatusIds): {
      return {
        ...state,
        filters: {
          ...state.filters,
          statusIds: action.payload
        },
        pagination: {
          ...state.pagination,
          offset: 0
        }
      };
    }
    case getType(actions.setFiltersTagIds): {
      return {
        ...state,
        filters: {
          ...state.filters,
          tagIds: action.payload
        },
        pagination: {
          ...state.pagination,
          offset: 0
        }
      };
    }
    case getType(actions.setFiltersOrderBy): {
      return {
        ...state,
        filters: {
          ...state.filters,
          orderBy: action.payload
        },
        pagination: {
          ...state.pagination,
          offset: 0
        }
      };
    }
    case getType(actions.setPaginationOffset): {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          offset: action.payload
        }
      };
    }
    case getType(actions.toggleFiltersOpen): {
      return {
        ...state,
        isFiltersOpen: !state.isFiltersOpen
      };
    }
    default:
      return state;
  }
}
