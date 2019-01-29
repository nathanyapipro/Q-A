import * as lsGlobalQueries from "./queries";

export const defaults = {
  global: {
    __typename: "Global",
    menu: false
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
