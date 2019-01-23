import gql from "graphql-tag";

export const MENU_GET = gql`
  query MenuGet {
    global @client {
      menu
    }
  }
`;

export const MENU_TOGGLE = gql`
  mutation MenuToggle {
    menuToggle @client
  }
`;
