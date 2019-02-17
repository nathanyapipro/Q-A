import { graphql, MutationFn } from "react-apollo";
import {
  CreateComment,
  CreateCommentVariables
} from "../types/apollo/CreateComment";
import gql from "graphql-tag";

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(input: $createCommentInput) {
      comment {
        id
        questionId
        user {
          id
          username
          role {
            id
            name
          }
        }
        content
        updatedAt
        createdAt
      }
    }
  }
`;

export type InputProps = {};

type Response = CreateComment;

type Variables = CreateCommentVariables;

export type ChildProps = {
  createComment: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  CREATE_COMMENT_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        createComment: mutate
      };
    }
  }
);
