import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import { STATUSES_QUERY } from "../queries";
import { Tags, Tags_tags_nodes } from "../types/queries/Tags";

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
>(STATUSES_QUERY, {
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
