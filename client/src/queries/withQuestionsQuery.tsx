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

type InputProps = QuestionsVariables;

type Response = Questions;

type Variables = QuestionsVariables;

type ChildProps = {
  questions: Array<Questions_questions_nodes>;
  questionsLoading: boolean;
  questionsError?: ApolloError;
};

export const withQuestionsQuery = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(QUESTIONS_QUERY, {
  options: variables => ({
    variables: {
      ...variables,
      offset: 0,
      first: 10
    }
  }),
  props: ({ data }) => {
    if (!data) {
      throw new Error("No data prop found");
    }
    const { loading, error } = data;

    return {
      questions: data.questions ? data.questions.nodes : [],
      questionsLoading: loading,
      questionsError: error
    };
  }
});

export type WithQuestionsQuery = ChildProps;
