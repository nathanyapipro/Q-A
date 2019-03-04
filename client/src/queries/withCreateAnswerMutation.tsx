import { graphql, MutationFn } from "react-apollo";
import {
  CreateAnswer,
  CreateAnswerVariables
} from "../types/apollo/CreateAnswer";
import { AnswersVariables, Answers } from "../types/apollo/Answers";
import { ANSWERS_QUERY } from "./withAnswersQuery";
import gql from "graphql-tag";

export const CREATE_ANSWER_MUTATION = gql`
  mutation CreateAnswer($createAnswerInput: CreateAnswerInput!) {
    createAnswer(input: $createAnswerInput) {
      answer {
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

export type InputProps = {
  questionId: number;
};

type Response = CreateAnswer;

type Variables = CreateAnswerVariables;

export type ChildProps = {
  createAnswer: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  CREATE_ANSWER_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        createAnswer: mutate
      };
    },
    options: ({ questionId }) => ({
      update: (cache, { data }) => {
        if (data && data.createAnswer && data.createAnswer.answer) {
          const newAnswer = data.createAnswer.answer;
          const previousState = cache.readQuery<Answers, AnswersVariables>({
            query: ANSWERS_QUERY,
            variables: {
              questionId
            }
          });
          if (previousState && previousState.answers) {
            const newState = {
              ...previousState,
              answers: {
                ...previousState.answers,
                nodes: [...previousState.answers.nodes, newAnswer]
              }
            };
            cache.writeQuery<Answers, AnswersVariables>({
              query: ANSWERS_QUERY,
              data: { ...newState },
              variables: {
                questionId
              }
            });
          }
        }
      }
    })
  }
);
