import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import { Tags, Tags_tags_nodes } from "../types/apollo/Tags";

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      nodes {
        id
        name
        color
      }
    }
  }
`;

export type InputProps = {};

type Response = Tags;

type Variables = {};

export type ChildProps = {
  tags: Array<Tags_tags_nodes>;
  tagsLoading: boolean;
  tagsError?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  TAGS_QUERY,
  {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({ data }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { loading, error } = data;

      return {
        tags: data.tags ? data.tags.nodes : [],
        tagsLoading: loading,
        tagsError: error
      };
    }
  }
);
