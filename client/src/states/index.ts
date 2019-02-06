import globalResolvers, { defaults as globalDefaults } from "./global";
import filtersResolvers, { defaults as filtersDefaults } from "./filters";

const clientState = {
  defaults: {
    ...globalDefaults,
    ...filtersDefaults
  },
  resolvers: {
    Mutation: {
      ...globalResolvers.Mutation,
      ...filtersResolvers.Mutation
    }
  }
};

export default clientState;
