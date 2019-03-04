import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  CurrentUser,
  CurrentUser_currentUser
} from "../types/apollo/CurrentUser";

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      username
      role
    }
  }
`;

export type InputProps = {};

type Response = CurrentUser;

type Variables = {};

export type ChildProps = {
  currentUser: CurrentUser_currentUser | null;
  loading: boolean;
  error?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  CURRENT_USER_QUERY,
  {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({ data }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { loading, error, currentUser } = data;

      return {
        currentUser: currentUser ? currentUser : null,
        loading: loading,
        error: error
      };
    }
  }
);
