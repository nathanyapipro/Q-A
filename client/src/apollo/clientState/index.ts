import * as auth from "./auth";

const clientState = {
  defaults: {
    ...auth.defaults
  },
  resolvers: {
    Mutation: {
      ...auth.Mutation
    }
  }
};

export default clientState;
