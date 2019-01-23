import gql from "graphql-tag";

export const GLOBAL_MENU_TOGGLE = gql`
  mutation GlobalMenuToggle {
    globalMenuToggle @client
  }
`;

export const GLOBAL_MENU_GET = gql`
  query GlobalMenuGet {
    global @client {
      menu
    }
  }
`;
