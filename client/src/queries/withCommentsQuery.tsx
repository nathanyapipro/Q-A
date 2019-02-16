// import { graphql } from "react-apollo";
// import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
// import {
//   QuestionsVariables,
//   Questions,
//   Questions_questions_nodes
// } from "../types/apollo/Questions";

export const COMMENTS_QUERY = gql`
  query Comments($questionId: Int!, $first: Int!, $offset: Int!) {
    comments(
      first: $first
      offset: $offset
      orderBy: [CREATED_AT_DESC]
      condition: { questionId: $questionId }
    ) {
      nodes {
        id
        questionId
        user {
          id
          username
        }
        content
        updatedAt
        createdAt
      }
      totalCount
    }
  }
`;

// type InputProps = QuestionsVariables;

// type Response = Questions;

// type Variables = QuestionsVariables;

// type ChildProps = {
//   data: {
//     nodes: Array<Questions_questions_nodes>;
//     totalCount: number;
//     offset: number;
//     first: number;
//   };
//   loading: boolean;
//   error?: ApolloError;
// };

// export const withQuestionsQuery = graphql<
//   InputProps,
//   Response,
//   Variables,
//   ChildProps
// >(QUESTIONS_QUERY, {
//   options: ({ offset, first, filter, orderBy }) => ({
//     variables: {
//       offset,
//       first,
//       filter,
//       orderBy
//     }
//   }),
//   props: ({ data, ownProps: { offset, first } }) => {
//     if (!data) {
//       throw new Error("No data prop found");
//     }
//     const { loading, error } = data;

//     return {
//       data: {
//         nodes: data.questions ? data.questions.nodes : [],
//         totalCount:
//           data.questions && data.questions.totalCount
//             ? data.questions.totalCount
//             : 0,
//         offset,
//         first
//       },
//       loading: loading,
//       error: error
//     };
//   }
// });

// export type WithQuestionsQuery = ChildProps;
