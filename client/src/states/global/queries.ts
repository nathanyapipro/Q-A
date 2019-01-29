import gql from "graphql-tag";

export const menu = gql`
  query GlobalMenu {
    global @client {
      menu
    }
  }
`;
export const toggleMenu = gql`
  mutation GlobalToggleMenu {
    globalToggleMenu @client
  }
`;
