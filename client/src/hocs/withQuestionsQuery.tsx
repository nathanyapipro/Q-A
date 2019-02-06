import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import { QUESTIONS_QUERY } from "../queries";
import {
  QuestionsVariables,
  Questions,
  Questions_questions_nodes
} from "../types/queries/Questions";

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
