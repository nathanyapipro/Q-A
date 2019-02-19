import { graphql, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import {
  DeleteQuestionByIdVariables,
  DeleteQuestionById
} from "../types/apollo/DeleteQuestionById";

export const DELETE_QUESTION_BY_ID_MUTATION = gql`
  mutation DeleteQuestionById(
    $deleteQuestionByIdInput: DeleteQuestionByIdInput!
  ) {
    deleteQuestionById(input: $deleteQuestionByIdInput) {
      question {
        id
      }
    }
  }
`;

export type InputProps = {
  questionId: number;
};

type Response = DeleteQuestionById;

type Variables = DeleteQuestionByIdVariables;

export type ChildProps = {
  deleteQuestion: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  DELETE_QUESTION_BY_ID_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        deleteQuestion: mutate
      };
    }
  }
);
