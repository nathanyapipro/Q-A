## Available Scripts

## Server

### Example Graphiql Queries/Mutations

Queries/Mutations

```
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(input: $createUserInput) {
      user {
        id
        username
      }
    }
}

mutation Login($loginInput: LoginInput!) {
  login(input: $loginInput) {
    jwtToken
  }
}

mutation CreateQuestion($questionInput : QuestionInput!, $questionTagInput: QuestionTagInput!, $answerInput: AnswerInput!) {
  createQuestion(
    input: { question: $questionInput }
  ) {
    question {
      id
      content
      userId
      statusId
      createdAt
      updatedAt
    }
  }
  createQuestionTag(
    input: { questionTag: $questionTagInput }
  ) {
    questionTag {
      id
    }
  }
  createAnswer(input: {answer: $answerInput}) {
    answer {
      id
    }
  }
}

query Statuses {
  statuses {
    nodes {
      id
      name
    }
  }
}

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
          id
          tag {
            name,
            color
          }
        }
    	}
      votes {
        nodes {
          id
          userId,
        },
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


query Questions($first: Int!, $offset: Int!, $orderBy: [QuestionsOrderBy!], $filter: QuestionFilter) {
  questions(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
    nodes {
      id
      content
      userId
      status {
        id
        name
      }
      questionTags(first:2) {
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

```

Variables

```
{
  "questionId": 1,
	"loginInput": {
    "username": "admin",
		"password": "12345678"
  },
	"questionInput": {
    "id": 5,
    "content": "My Q",
    "userId": 1,
    "statusId": 2
  },
  "questionTagInput": {
    "questionId": 5,
    "tagId": 1
  },
  "answerInput": {
    "questionId": 5,
    "userId": 1,
    "content": "My Answer is HERE"
  },
  "userId": 1,
  "first": 10,
  "offset": 0,
  "orderBy": [
    "ID_ASC"
  ],
  "filter": {
    "statusId": {
      "in": [1,2,3]
    }
  }
}
```

## CLient
