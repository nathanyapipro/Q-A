import { graphql, MutationFn } from "react-apollo";
import {
  QuestionToggleVote,
  QuestionToggleVoteVariables
} from "../types/apollo/QuestionToggleVote";
import gql from "graphql-tag";

export const QUESTION_TOGGLE_VOTE_MUTATION = gql`
  mutation QuestionToggleVote(
    $questionToggleVoteInput: QuestionToggleVoteInput!
  ) {
    questionToggleVote(input: $questionToggleVoteInput) {
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

export type InputProps = {};

type Response = QuestionToggleVote;

type Variables = QuestionToggleVoteVariables;

export type ChildProps = {
  questionToggleVote: MutationFn<Response, Variables>;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  QUESTION_TOGGLE_VOTE_MUTATION,
  {
    props: ({ mutate }) => {
      if (!mutate) {
        throw new Error("No mutate prop found");
      }

      return {
        questionToggleVote: mutate
      };
    }
  }
);
