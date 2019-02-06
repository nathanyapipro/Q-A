import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import { Tags, Tags_tags_nodes } from "../types/apollo/Tags";

const TAGS_QUERY = gql`
  query Tags {
    tags {
      nodes {
        id
        name
        color
        isEnabled
      }
    }
  }
`;

type InputProps = {};

type Response = Tags;

type Variables = {};

type ChildProps = {
  tags: Array<Tags_tags_nodes>;
  tagsLoading: boolean;
  tagsError?: ApolloError;
};

export const withTagsQuery = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TAGS_QUERY, {
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
});

export type WithTagsQuery = ChildProps;
