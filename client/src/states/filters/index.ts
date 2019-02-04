import { Filters } from "./types";

interface Defaults {
  filters: Filters;
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
    globalToggleMenu: (_: any, __: {}, { cache }: any) => {
      const previousState = cache.readQuery({ query: lsGlobalQueries.menu });
      const data = {
        global: {
          ...previousState.global,
          menu: !previousState.global.menu
        }
      };
      cache.writeQuery({ query: lsGlobalQueries.menu, data });
      return null;
    }
  }
};

export default resolvers;
