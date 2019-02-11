import { graphql, MutationFn } from "react-apollo";
import {
  CreateQuestion,
  CreateQuestionVariables
} from "../types/apollo/CreateQuestion";
import gql from "graphql-tag";

export const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestion($createQuestionInput: CreateQuestionInput!) {
    createQuestion(input: $createQuestionInput) {
      question {
        id
        content
        userId
        status {
          id
          name
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
        comments {
          totalCount
        }
        createdAt
        updatedAt
      }
    }
  }
`;

type InputProps = {};

type Response = CreateQuestion;

type Variables = CreateQuestionVariables;

type ChildProps = {
  createQuestion: MutationFn<Response, Variables>;
};

export const withCreateQuestionMutation = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(CREATE_QUESTION_MUTATION, {
  props: ({ mutate }) => {
    if (!mutate) {
      throw new Error("No mutate prop found");
    }

    return {
      createQuestion: mutate
    };
  }
});

export type WithCreateQuestionMutation = ChildProps;