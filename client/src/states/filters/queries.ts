import gql from "graphql-tag";

export const statusIds = gql`
  query Filters {
    filters @client {
      statusIds
    }
  }
`;

export const tagIds = gql`
  query Filters {
    filters @client {
      tagIds
    }
  }
`;

export const sortBy = gql`
  query Filters {
    filters @client {
      sortBy
    }
  }
`;

export const toggleMenu = gql`
  mutation GlobalToggleMenu {
    globalToggleMenu @client
  }
`;
