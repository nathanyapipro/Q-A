import { graphql, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import {
  UpdateAnswerByIdVariables,
  UpdateAnswerById
} from "../types/apollo/UpdateAnswerById";

export const UPDATE_ANSWER_BY_ID_MUTATION = gql`
  mutation UpdateAnswerById($updateAnswerByIdInput: UpdateAnswerByIdInput!) {
    updateAnswerById(input: $updateAnswerByIdInput) {
      answer {
        id
        questionId
        content
        user {
          id
          username
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export type InputProps = {};

type Response = UpdateAnswerById;

type Variables = UpdateAnswerByIdVariables;

export type ChildProps = {
  updateAnswer: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  UPDATE_ANSWER_BY_ID_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        updateAnswer: mutate
      };
    }
  }
);
