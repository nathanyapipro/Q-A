import gql from "graphql-tag";

const defaults = {
  global: {
    __typename: "Global",
    menu: false
  }
};

const resolvers = {
  Mutation: {
    toogleMenu: (_: any, __: any, { cache }: any) => {
      const query = gql`
        query GetGlobalMenu {
          global @client {
            menu
          }
        }
      `;

      const previousState = cache.readQuery({ query });

      const data = {
        global: {
          ...previousState.global,
          menu: !previousState.global.menu
        }
      };

      cache.writeQuery({ query, data });

      return null;
    }
  }
};

const globalResolver = {
  defaults,
  resolvers
};

export default globalResolver;
