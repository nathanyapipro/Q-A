import { LS_GLOBAL_MENU_QUERY } from "./queries";
import { LSGlobal } from "./types";

interface Defaults {
  global: LSGlobal;
}

export const defaults: Defaults = {
  global: {
    __typename: "Global",
    menu: false
  }
};

const resolvers = {
  Mutation: {
    globalMenuToggle: (_: any, __: {}, { cache }: any) => {
      const previousState = cache.readQuery({ query: LS_GLOBAL_MENU_QUERY });
      const data = {
        global: {
          ...previousState.global,
          menu: !previousState.global.menu
        }
      };
      cache.writeQuery({ query: LS_GLOBAL_MENU_QUERY, data });
      return null;
    }
  }
};

export default resolvers;
