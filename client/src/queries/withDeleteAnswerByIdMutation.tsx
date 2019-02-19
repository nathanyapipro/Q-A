import { graphql, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import {
  DeleteAnswerByIdVariables,
  DeleteAnswerById
} from "../types/apollo/DeleteAnswerById";
import { AnswersVariables, Answers } from "../types/apollo/Answers";
import { ANSWERS_QUERY } from "./withAnswersQuery";

export const DELETE_ANSWER_BY_ID_MUTATION = gql`
  mutation DeleteAnswerById($deleteAnswerByIdInput: DeleteAnswerByIdInput!) {
    deleteAnswerById(input: $deleteAnswerByIdInput) {
      answer {
        id
      }
    }
  }
`;

export type InputProps = {
  questionId: number;
};

type Response = DeleteAnswerById;

type Variables = DeleteAnswerByIdVariables;

export type ChildProps = {
  deleteAnswer: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  DELETE_ANSWER_BY_ID_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        deleteAnswer: mutate
      };
    },
    options: ({ questionId }) => ({
      update: (cache, { data }) => {
        if (data && data.deleteAnswerById && data.deleteAnswerById.answer) {
          const deletedAnswer = data.deleteAnswerById.answer;
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
                nodes: previousState.answers.nodes.filter(
                  answer => answer.id !== deletedAnswer.id
                )
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
