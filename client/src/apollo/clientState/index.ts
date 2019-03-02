import * as auth from "./auth";
import * as workspace from "./workspace";

const clientState = {
  defaults: {
    ...auth.defaults,
    ...workspace.defaults
  },
  resolvers: {
    Mutation: {
      ...auth.Mutation,
      ...workspace.Mutation
    }
  }
};

export default clientState;
