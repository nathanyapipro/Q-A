import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  QuestionsVariables,
  Questions,
  Questions_questions_nodes
} from "../types/apollo/Questions";

export const QUESTIONS_QUERY = gql`
  query Questions(
    $first: Int!
    $offset: Int!
    $orderBy: [QuestionsOrderBy!]
    $workspaceId: Int!
    $filter: QuestionFilter
  ) {
    questions(
      first: $first
      offset: $offset
      orderBy: $orderBy
      filter: $filter
      condition: { workspaceId: $workspaceId }
    ) {
      nodes {
        id
        workspaceId
        content
        userId
        status {
          id
          status
        }
        tagIds
        questionTags {
          nodes {
            id
            tag {
              name
              color
            }
          }
          totalCount
        }
        voteCount
        hasVoted
        comments {
          totalCount
        }
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;

export type InputProps = QuestionsVariables;

type Response = Questions;

type Variables = QuestionsVariables;

export type ChildProps = {
  data: {
    nodes: Array<Questions_questions_nodes>;
    totalCount: number;
    offset: number;
    first: number;
  };
  loading: boolean;
  error?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  QUESTIONS_QUERY,
  {
    options: ({ offset, first, filter, orderBy, workspaceId }) => ({
      variables: {
        offset,
        first,
        filter,
        orderBy,
        workspaceId
      },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data, ownProps: { offset, first } }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { loading, error } = data;

      return {
        data: {
          nodes: data.questions ? data.questions.nodes : [],
          totalCount:
            data.questions && data.questions.totalCount
              ? data.questions.totalCount
              : 0,
          offset,
          first
        },
        loading: loading,
        error: error
      };
    }
  }
);
