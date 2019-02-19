import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  QuestionByIdVariables,
  QuestionById,
  QuestionById_questionById
} from "../types/apollo/QuestionById";

export const QUESTION_BY_ID_QUERY = gql`
  query QuestionById($questionId: Int!) {
    questionById(id: $questionId) {
      id
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
      answers(first: 1) {
        nodes {
          id
          content
          user {
            id
            username
          }
          createdAt
          updatedAt
        }
      }
      comments {
        totalCount
      }
      createdAt
      updatedAt
    }
  }
`;

export type InputProps = QuestionByIdVariables;

type Response = QuestionById;

type Variables = QuestionByIdVariables;

export type ChildProps = {
  questionById: QuestionById_questionById | null;
  loading: boolean;
  error?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  QUESTION_BY_ID_QUERY,
  {
    options: ({ questionId }) => ({
      variables: {
        questionId
      },
      fetchPolicy: "cache-and-network"
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
  }
);
