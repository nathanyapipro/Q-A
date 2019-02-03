import { Filters } from "./types";

interface Defaults {
  filters: Filters;
}

export const defaults: Defaults = {
  filters: {
    __typename: "Filters",
    statusIds: [],
    tagIds: [],
    sortBy: "CREATED_AT_ASC"
  }
};

const resolvers = {
  Mutation: {}
};

export default resolvers;
