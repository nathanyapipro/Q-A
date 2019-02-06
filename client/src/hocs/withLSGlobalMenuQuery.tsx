import { graphql } from "react-apollo";
import { LS_GLOBAL_MENU_QUERY } from "../states/global/queries";
import { LSGlobal, LSGlobalMenu } from "../states/global/types";

type InputProps = {};

type Response = LSGlobalMenu;

type Variables = {};

type ChildProps = Pick<LSGlobal, "menu">;

export const withLSGlobalMenuQuery = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(LS_GLOBAL_MENU_QUERY, {
  props: ({ data }) => {
    if (!data) {
      throw new Error("No data prop found");
    }

    return {
      menu: data.global ? data.global.menu : false
    };
  }
});

export type WithLSGlobalMenuQuery = ChildProps;
