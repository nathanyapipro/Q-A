interface ClientState {
  menu: boolean;
}

export const INITIAL_STATE: ClientState = {
  menu: false
};

// interface SetMenuParams {
//   menu: boolean;
// }

// const resolvers = {
//   Mutation: {
//     setMenu: (_: any, variables: SetMenuParams, { cache, getCacheKey }) => {
//       const id = getCacheKey({ __typename: 'TodoItem', id: variables.id })
//       const fragment = gql`
//         fragment completeTodo on TodoItem {
//           completed
//         }
//       `;
//       const todo = cache.readFragment({ fragment, id });
//       const data = { ...todo, completed: !todo.completed };
//       cache.writeData({ id, data });
//       return null;
//     },
//   },
// }
