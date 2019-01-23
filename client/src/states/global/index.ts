import { GLOBAL_MENU_GET } from "./queries";

export const defaults = {
  global: {
    __typename: "Global",
    menu: false
  }
};

const resolvers = {
  Mutation: {
    globalMenuToggle: (_: any, __: {}, { cache }: any) => {
      const previousState = cache.readQuery({ query: GLOBAL_MENU_GET });
      const data = {
        global: {
          ...previousState.global,
          menu: !previousState.global.menu
        }
      };
      cache.writeQuery({ query: GLOBAL_MENU_GET, data });
      return null;
    }
  }
};

export default resolvers;
