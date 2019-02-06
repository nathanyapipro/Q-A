import gql from "graphql-tag";

export const LS_FILTERS_ALL_QUERY = gql`
  query LSFiltersAll {
    filters @client {
      statusIds
      tagIds
      sortBy
    }
  }
`;

export const LS_FILTERS_STATUS_IDS_QUERY = gql`
  query LSFiltersStatusIds {
    filters @client {
      statusIds
    }
  }
`;

export const LS_FILTERS_TAG_IDS_QUERY = gql`
  query LSFiltersTagIds {
    filters @client {
      tagIds
    }
  }
`;

export const LS_FILTERS_SORT_BY_QUERY = gql`
  query LSFiltersSortBy {
    filters @client {
      sortBy
    }
  }
`;

export const LS_FILTERS_STATUS_IDS_SET_MUTATION = gql`
  mutation LSFiltersStatusIdsSet {
    filtersStatusIdsSet @client
  }
`;

export const LS_FILTERS_TAG_IDS_SET_MUTATION = gql`
  mutation LSFiltersTagIdsSet {
    filtersTagIdsSet @client
  }
`;

export const LS_FILTERS_SORT_BY_SET_MUTATION = gql`
  mutation LSFiltersSortBySet {
    filtersSortBySet @client
  }
`;
