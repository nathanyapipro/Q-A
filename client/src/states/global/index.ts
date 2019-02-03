import * as lsGlobalQueries from "./queries";
import { Global } from "./types";

interface Defaults {
  global: Global;
}

export const defaults: Defaults = {
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
