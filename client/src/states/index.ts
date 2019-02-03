import merge from "lodash.merge";
import globalResolvers, { defaults as globalDefaults } from "./global";
import filtersResolvers, { defaults as filtersDefaults } from "./filters";

const clientState = {
  defaults: merge(globalDefaults, filtersDefaults),
  resolvers: merge(globalResolvers, filtersResolvers)
};

export default clientState;
