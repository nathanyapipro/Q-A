import { graphql, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import {
  UpdateCommentByIdVariables,
  UpdateCommentById
} from "../types/apollo/UpdateCommentById";

export const UPDATE_COMMENT_BY_ID_MUTATION = gql`
  mutation UpdateCommentById($updateCommentByIdInput: UpdateCommentByIdInput!) {
    updateCommentById(input: $updateCommentByIdInput) {
      comment {
        id
        questionId
        user {
          id
          username
          role
        }
        content
        updatedAt
        createdAt
      }
    }
  }
`;

export type InputProps = {};

type Response = UpdateCommentById;

type Variables = UpdateCommentByIdVariables;

export type ChildProps = {
  updateComment: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  UPDATE_COMMENT_BY_ID_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        updateComment: mutate
      };
    }
  }
);
