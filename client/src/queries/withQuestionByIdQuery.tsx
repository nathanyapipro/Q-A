import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  QuestionByIdVariables,
  QuestionById,
  QuestionById_questionById
} from "../types/apollo/QuestionByID";

export const QUESTION_BY_ID_QUERY = gql`
  query QuestionById($questionId: Int!) {
    questionById(id: $questionId) {
      id
      content
      userId
      status {
        id
        name
      }
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
  }
`;

type InputProps = QuestionByIdVariables;

type Response = QuestionById;

type Variables = QuestionByIdVariables;

type ChildProps = {
  questionById: QuestionById_questionById | null;
  loading: boolean;
  error?: ApolloError;
};

export const withQuestionByIdQuery = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(QUESTION_BY_ID_QUERY, {
  options: ({ questionId }) => ({
    variables: {
      questionId
    }
  }),
  props: ({ data }) => {
    if (!data) {
      throw new Error("No data prop found");
    }
    const { loading, error, questionById } = data;

    return {
      questionById: questionById ? questionById : null,
      loading: loading,
      error: error
    };
  }
});

export type WithQuestionByIdQuery = ChildProps;
