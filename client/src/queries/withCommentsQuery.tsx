import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  CommentsVariables,
  Comments,
  Comments_comments_nodes
} from "../types/apollo/Comments";

export const COMMENTS_QUERY = gql`
  query Comments($questionId: Int!, $last: Int) {
    comments(
      last: $last
      offset: 0
      orderBy: [CREATED_AT_ASC]
      condition: { questionId: $questionId }
    ) {
      nodes {
        id
        questionId
        user {
          id
          username
          role
        }
        content
        updatedAt
        createdAt
      }
      totalCount
    }
  }
`;

export type InputProps = CommentsVariables;

type Response = Comments;

type Variables = CommentsVariables;

export type ChildProps = {
  data: {
    nodes: Array<Comments_comments_nodes>;
    totalCount: number;
  };
  loading: boolean;
  error?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  COMMENTS_QUERY,
  {
    options: ({ last, questionId }) => ({
      variables: {
        last,
        questionId
      },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { loading, error } = data;

      return {
        data: {
          nodes: data.comments ? data.comments.nodes : [],
          totalCount:
            data.comments && data.comments.totalCount
              ? data.comments.totalCount
              : 0
        },
        loading: loading,
        error: error
      };
    }
  }
);
