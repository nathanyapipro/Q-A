import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import { Statuses, Statuses_statuses_nodes } from "../types/apollo/Statuses";

const STATUSES_QUERY = gql`
  query Statuses {
    statuses {
      nodes {
        id
        name
      }
    }
  }
`;

type InputProps = any;

type Response = Statuses;

type Variables = {};

type ChildProps = {
  statuses: Array<Statuses_statuses_nodes>;
  statusesLoading: boolean;
  statusesError?: ApolloError;
};

export const withStatusesQuery = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(STATUSES_QUERY, {
  props: ({ data }) => {
    if (!data) {
      throw new Error("No data prop found");
    }
    const { loading, error } = data;

    return {
      statuses: data.statuses ? data.statuses.nodes : [],
      statusesLoading: loading,
      statusesError: error
    };
  }
});

export type WithStatusesQuery = ChildProps;
