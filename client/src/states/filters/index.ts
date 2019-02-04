import {
  FiltersType,
  SetStatusIdsVariables,
  SetTagIdsVariables,
  SetSortByVariables
} from "./types";
import * as lsFilterQueries from "./queries";

interface Defaults {
  filters: FiltersType;
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
    filtersSetStatusIds: (
      _: any,
      { statusIds }: SetStatusIdsVariables,
      { cache }: any
    ) => {
      const previousState = cache.readQuery({
        query: lsFilterQueries.statusIds
      });
      const data = {
        filters: {
          ...previousState.filters,
          statusIds
        }
      };
      cache.writeQuery({ query: lsFilterQueries.statusIds, data });
      return null;
    }
  },
  filtersSetTagIds: (
    _: any,
    { tagIds }: SetTagIdsVariables,
    { cache }: any
  ) => {
    const previousState = cache.readQuery({ query: lsFilterQueries.tagIds });
    const data = {
      filters: {
        ...previousState.filters,
        tagIds
      }
    };
    cache.writeQuery({ query: lsFilterQueries.tagIds, data });
    return null;
  },
  filtersSetSortBy: (
    _: any,
    { sortBy }: SetSortByVariables,
    { cache }: any
  ) => {
    const previousState = cache.readQuery({ query: lsFilterQueries.sortBy });
    const data = {
      filters: {
        ...previousState.filters,
        sortBy
      }
    };
    cache.writeQuery({ query: lsFilterQueries.sortBy, data });
    return null;
  }
};

export default resolvers;
