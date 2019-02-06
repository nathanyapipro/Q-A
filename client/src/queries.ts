import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query CurrentUser($userId: Int!) {
    userById(id: $userId) {
      id
      username
      role {
        id
        name
      }
    }
  }
`;

export const QUESTION_QUERY = gql`
  query Question($questionId: Int!) {
    questionById(id: $questionId) {
      id
      content
      user {
        id
        username
      }
      status {
        id
        name
      }
      questionTags {
        nodes {
          tag {
            id
            name
            color
          }
        }
      }
      votes {
        totalCount
      }
      comments {
        totalCount
      }
      answers {
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
      createdAt
      updatedAt
    }
  }
`;
