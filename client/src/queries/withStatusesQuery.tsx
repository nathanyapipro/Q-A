import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import { Statuses, Statuses_statuses_nodes } from "../types/apollo/Statuses";

export const STATUSES_QUERY = gql`
  query Statuses {
    statuses {
      nodes {
        id
        name
      }
    }
  }
`;

export type InputProps = any;

type Response = Statuses;

type Variables = {};

export type ChildProps = {
  statuses: Array<Statuses_statuses_nodes>;
  statusesLoading: boolean;
  statusesError?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  STATUSES_QUERY,
  {
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
  }
);
