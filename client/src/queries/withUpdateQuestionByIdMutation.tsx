import { graphql, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import {
  UpdateQuestionByIdVariables,
  UpdateQuestionById
} from "../types/apollo/UpdateQuestionById";

export const UPDATE_QUESTION_BY_ID_MUTATION = gql`
  mutation UpdateQuestionById(
    $updateQuestionByIdInput: UpdateQuestionByIdInput!
  ) {
    updateQuestionById(input: $updateQuestionByIdInput) {
      question {
        id
        workspaceId
        content
        userId
        status {
          id
          status
        }
        tagIds
        questionTags {
          nodes {
            id
            tag {
              name
              color
            }
          }
          totalCount
        }
        voteCount
        hasVoted
        answers(first: 1) {
          nodes {
            id
            content
            user {
              id
              username
            }
            createdAt
            updatedAt
          }
        }
        comments {
          totalCount
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

type Response = UpdateQuestionById;

type Variables = UpdateQuestionByIdVariables;

export type ChildProps = {
  updateQuestion: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  UPDATE_QUESTION_BY_ID_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        updateQuestion: mutate
      };
    }
  }
);
