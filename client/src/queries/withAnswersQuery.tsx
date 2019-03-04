import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  AnswersVariables,
  Answers,
  Answers_answers_nodes
} from "../types/apollo/Answers";

export const ANSWERS_QUERY = gql`
  query Answers($questionId: Int!) {
    answers(orderBy: [CREATED_AT_ASC], condition: { questionId: $questionId }) {
      nodes {
        id
        questionId
        content
        user {
          id
          username
          role
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export type InputProps = AnswersVariables;

type Response = Answers;

type Variables = AnswersVariables;

export type ChildProps = {
  data: {
    nodes: Array<Answers_answers_nodes>;
  };
  loading: boolean;
  error?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  ANSWERS_QUERY,
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
      const { loading, error } = data;

      return {
        data: {
          nodes: data.answers ? data.answers.nodes : []
        },
        loading: loading,
        error: error
      };
    }
  }
);
