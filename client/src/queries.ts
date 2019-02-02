import gql from "graphql-tag";

export const login = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      jwtToken
    }
  }
`;

export const currentUser = gql`
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

export const statuses = gql`
  query Statuses {
    statuses {
      nodes {
        id
        name
      }
    }
  }
`;

export const tags = gql`
  query Tags {
    tags {
      nodes {
        id
        name
        color
        isEnabled
      }
    }
  }
`;

export const question = gql`
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
        nodes {
          id
          userId
        }
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

export const questions = gql`
  query Questions(
    $first: Int!
    $offset: Int!
    $orderBy: [QuestionsOrderBy!]
    $filter: QuestionFilter
  ) {
    questions(
      first: $first
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      nodes {
        id
        content
        userId
        status {
          id
          name
        }
        questionTags(first: 3) {
          nodes {
            id
            tag {
              name
              color
            }
          }
          totalCount
        }
        votes {
          totalCount
        }
        createdAt
        updatedAt
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
