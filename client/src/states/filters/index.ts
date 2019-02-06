import {
  LSFilters,
  LSFiltersStatusIdsSetVariables,
  LSFiltersTagIdsSetVariables,
  LSFiltersSortBySetVariables
} from "./types";
import {
  LS_FILTERS_STATUS_IDS_QUERY,
  LS_FILTERS_TAG_IDS_QUERY,
  LS_FILTERS_SORT_BY_QUERY
} from "./queries";

interface Defaults {
  filters: LSFilters;
}

export const defaults: Defaults = {
  filters: {
    __typename: "Filters",
    statusIds: [],
    tagIds: [],
    sortBy: "CREATED_AT_ASC"
  }
};

const resolvers = {
  Mutation: {
    filtersStatusIdsSet: (
      _: any,
      { statusIds }: LSFiltersStatusIdsSetVariables,
      { cache }: any
    ) => {
      const previousState = cache.readQuery({
        query: LS_FILTERS_STATUS_IDS_QUERY
      });
      const data = {
        filters: {
          ...previousState.filters,
          statusIds
        }
      };
      cache.writeQuery({ query: LS_FILTERS_STATUS_IDS_QUERY, data });
      return null;
    }
  },
  filtersTagIdsSet: (
    _: any,
    { tagIds }: LSFiltersTagIdsSetVariables,
    { cache }: any
  ) => {
    const previousState = cache.readQuery({ query: LS_FILTERS_TAG_IDS_QUERY });
    const data = {
      filters: {
        ...previousState.filters,
        tagIds
      }
    };
    cache.writeQuery({ query: LS_FILTERS_TAG_IDS_QUERY, data });
    return null;
  },
  filtersSortBySet: (
    _: any,
    { sortBy }: LSFiltersSortBySetVariables,
    { cache }: any
  ) => {
    const previousState = cache.readQuery({ query: LS_FILTERS_SORT_BY_QUERY });
    const data = {
      filters: {
        ...previousState.filters,
        sortBy
      }
    };
    cache.writeQuery({ query: LS_FILTERS_SORT_BY_QUERY, data });
    return null;
  }
};

export default resolvers;
