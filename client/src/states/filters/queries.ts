import gql from "graphql-tag";

export const filters = gql`
  query Filters {
    filters @client {
      statusIds
      tagIds
      sortBy
    }
  }
`;

export const toggleMenu = gql`
  mutation GlobalToggleMenu {
    globalToggleMenu @client
  }
`;
