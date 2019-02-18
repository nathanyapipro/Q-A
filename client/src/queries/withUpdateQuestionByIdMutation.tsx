// import { graphql } from "react-apollo";
// import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
// import {
//   QuestionByIdVariables,
//   QuestionById,
//   QuestionById_questionById
// } from "../types/apollo/QuestionByID";

export const UPDATE_QUESTION_BY_ID_MUTATION = gql`
  mutation UpdateQuestionById($updateQuestionInput: UpdateQuestionByIdInput!) {
    updateQuestionById(input: $updateQuestionInput) {
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

// export type InputProps = QuestionByIdVariables;

// type Response = QuestionById;

// type Variables = QuestionByIdVariables;

// export type ChildProps = {
//   questionById: QuestionById_questionById | null;
//   loading: boolean;
//   error?: ApolloError;
// };

// export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
//   QUESTION_BY_ID_QUERY,
//   {
//     options: ({ questionId }) => ({
//       variables: {
//         questionId
//       }
//     }),
//     props: ({ data }) => {
//       if (!data) {
//         throw new Error("No data prop found");
//       }
//       const { loading, error, questionById } = data;

//       return {
//         questionById: questionById ? questionById : null,
//         loading: loading,
//         error: error
//       };
//     }
//   }
// );
