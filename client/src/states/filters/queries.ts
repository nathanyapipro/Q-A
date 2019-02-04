import gql from "graphql-tag";

export const all = gql`
  query Filters {
    filters @client {
      statusIds
      tagIds
      sortBy
    }
  }
`;

export const statusIds = gql`
  query FiltersStatusIds {
    filters @client {
      statusIds
    }
  }
`;

export const tagIds = gql`
  query FiltersTagIds {
    filters @client {
      tagIds
    }
  }
`;

export const sortBy = gql`
  query FiltersSortBy {
    filters @client {
      sortBy
    }
  }
`;

export const setStatusIds = gql`
  mutation FiltersSetStatusIds {
    setStatusIds @client
  }
`;

export const setTagIds = gql`
  mutation FiltersSetTagIds {
    setTagIds @client
  }
`;

export const setSortBy = gql`
  mutation FiltersSetSortBy {
    setSortBy @client
  }
`;
