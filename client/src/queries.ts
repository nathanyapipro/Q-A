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
