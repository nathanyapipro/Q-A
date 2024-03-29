import { graphql } from "react-apollo";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import {
  WorkspacesVariables,
  Workspaces,
  Workspaces_workspaces_nodes
} from "../types/apollo/Workspaces";

export const WORKSPACE_QUERY = gql`
  query Workspaces($email: String) {
    workspaces(email: $email) {
      nodes {
        id
        name
      }
    }
  }
`;

export type InputProps = WorkspacesVariables;

type Response = Workspaces;

type Variables = WorkspacesVariables;

export type ChildProps = {
  workspaces: Array<Workspaces_workspaces_nodes>;
  workspacesLoading: boolean;
  workspacesError?: ApolloError;
};

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  WORKSPACE_QUERY,
  {
    options: ({ email }) => ({
      variables: {
        email
      },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { loading, error } = data;

      return {
        workspaces: data.workspaces ? data.workspaces.nodes : [],
        workspacesLoading: loading,
        workspacesError: error
      };
    }
  }
);
