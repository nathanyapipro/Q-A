import gql from "graphql-tag";

export const MENU_TOGGLE = gql`
  mutation GlobalMenuToggle {
    globalMenuToggle @client
  }
`;

export const MENU_GET = gql`
  query GlobalMenuGet {
    global @client {
      menu
    }
  }
`;
