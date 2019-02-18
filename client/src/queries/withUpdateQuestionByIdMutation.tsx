import { graphql, MutationFn } from "react-apollo";
import gql from "graphql-tag";
import {
  UpdateQuestionByIdVariables,
  UpdateQuestionById
} from "../types/apollo/UpdateQuestionById";
import {
  QuestionByIdVariables,
  QuestionById
} from "../types/apollo/QuestionByID";
import { QUESTION_BY_ID_QUERY } from "./withQuestionByIdQuery";

export const UPDATE_QUESTION_BY_ID_MUTATION = gql`
  mutation UpdateQuestionById(
    $updateQuestionByIdInput: UpdateQuestionByIdInput!
  ) {
    updateQuestionById(input: $updateQuestionByIdInput) {
      question {
        id
        content
        userId
        status {
          id
          status
        }
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
    },
    options: ({ questionId }) => ({
      update: (cache, { data }) => {
        if (
          data &&
          data.updateQuestionById &&
          data.updateQuestionById.question
        ) {
          const updatedQuestion = data.updateQuestionById.question;
          const previousState = cache.readQuery<
            QuestionById,
            QuestionByIdVariables
          >({
            query: QUESTION_BY_ID_QUERY,
            variables: {
              questionId
            }
          });
          if (previousState && previousState.questionById) {
            const newState = {
              ...previousState,
              questionById: {
                ...previousState.questionById,
                ...updatedQuestion
              }
            };
            cache.writeQuery<QuestionById, QuestionByIdVariables>({
              query: QUESTION_BY_ID_QUERY,
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
