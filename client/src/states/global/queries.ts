import gql from "graphql-tag";

export const LS_GLOBAL_MENU_QUERY = gql`
  query LSGlobalMenu {
    global @client {
      menu
    }
  }
`;
export const LS_GLOBAL_MENU_TOGGLE_MUTATION = gql`
  mutation LSGlobalMenuToggle {
    globalMenuToggle @client
  }
`;
