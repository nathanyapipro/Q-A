import { graphql, MutationFn } from "react-apollo";
import {
  CreateComment,
  CreateCommentVariables
} from "../types/apollo/CreateComment";
import { CommentsVariables, Comments } from "../types/apollo/Comments";
import gql from "graphql-tag";
import { COMMENTS_QUERY } from "./withCommentsQuery";

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
            role
          }
        }
        content
        updatedAt
        createdAt
      }
    }
  }
`;

export type InputProps = {
  questionId: number;
};

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
    },
    options: ({ questionId }) => ({
      update: (cache, { data }) => {
        if (data && data.createComment && data.createComment.comment) {
          const newComment = data.createComment.comment;
          const previousState = cache.readQuery<Comments, CommentsVariables>({
            query: COMMENTS_QUERY,
            variables: {
              last: undefined,
              questionId
            }
          });
          if (
            previousState &&
            previousState.comments &&
            previousState.comments.totalCount !== null
          ) {
            const newState = {
              ...previousState,
              comments: {
                ...previousState.comments,
                nodes: [...previousState.comments.nodes, newComment],
                totalCount: previousState.comments.totalCount + 1
              }
            };
            cache.writeQuery<Comments, CommentsVariables>({
              query: COMMENTS_QUERY,
              data: { ...newState },
              variables: {
                last: undefined,
                questionId
              }
            });
          }
        }
      }
    })
  }
);
