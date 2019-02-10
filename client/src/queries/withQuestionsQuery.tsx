import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  QuestionsVariables,
  Questions,
  Questions_questions_nodes
} from "../types/apollo/Questions";

const QUESTIONS_QUERY = gql`
  query Questions(
    $first: Int!
    $offset: Int!
    $orderBy: [QuestionsOrderBy!]
    $filter: QuestionFilter
  ) {
    questions(
      first: $first
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      nodes {
        id
        content
        userId
        status {
          id
          name
        }
        questionTags(first: 3) {
          nodes {
            id
            tag {
              name
              color
            }
          }
          totalCount
        }
        votes {
          totalCount
        }
        comments {
          totalCount
        }
        createdAt
        updatedAt
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

interface InputProps extends QuestionsVariables {
  handleChangePage: (page: number) => void;
}

type Response = Questions;

type Variables = QuestionsVariables;

type ChildProps = {
  data: {
    nodes: Array<Questions_questions_nodes>;
    totalCount: number;
  };
  loading: boolean;
  error?: ApolloError;
  handleChangePage: (page: number) => void;
};

export const withQuestionsQuery = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(QUESTIONS_QUERY, {
  options: ({ offset, first, filter }) => ({
    variables: {
      offset,
      first,
      filter
    }
  }),
  props: ({ data, ownProps: { handleChangePage } }) => {
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
            : 0
      },
      loading: loading,
      error: error,
      handleChangePage
    };
  }
});

export type WithQuestionsQuery = ChildProps;
