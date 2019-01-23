import globalResolver from "./global/resolvers";

const clientState = {
  defaults: globalResolver.defaults,
  resolvers: globalResolver.resolvers
};

export default clientState;
