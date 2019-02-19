import { graphql, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import {
  DeleteCommentByIdVariables,
  DeleteCommentById
} from "../types/apollo/DeleteCommentById";
import { CommentsVariables, Comments } from "../types/apollo/Comments";
import { COMMENTS_QUERY } from "./withCommentsQuery";

export const DELETE_COMMENT_BY_ID_MUTATION = gql`
  mutation DeleteCommentById($deleteCommentByIdInput: DeleteCommentByIdInput!) {
    deleteCommentById(input: $deleteCommentByIdInput) {
      comment {
        id
      }
    }
  }
`;

export type InputProps = {
  questionId: number;
};

type Response = DeleteCommentById;

type Variables = DeleteCommentByIdVariables;

export type ChildProps = {
  deleteComment: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  DELETE_COMMENT_BY_ID_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        deleteComment: mutate
      };
    },
    options: ({ questionId }) => ({
      update: (cache, { data }) => {
        if (data && data.deleteCommentById && data.deleteCommentById.comment) {
          const deletedComment = data.deleteCommentById.comment;
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
                nodes: previousState.comments.nodes.filter(
                  comment => comment.id !== deletedComment.id
                ),
                totalCount: previousState.comments.totalCount - 1
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
