import merge from "lodash.merge";
import globalResolvers, { defaults as globalDefaults } from "./global";

const clientState = {
  defaults: merge(globalDefaults),
  resolvers: merge(globalResolvers)
};

export default clientState;
