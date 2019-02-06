import * as auth from "./auth";

const clientState = {
  defaults: {
    ...auth.defaults
  },
  resolvers: {
    Murations: {
      ...auth.Mutations
    }
  }
};

export default clientState;
