import { graphql } from "react-apollo";
import * as lsGlobalQueries from "../states/global/queries";
import { Global, Menu } from "../states/global/types";

export interface WithLSGlobalMenuQuery extends Pick<Global, "menu"> {}

interface Response extends Menu {}

type InputProps = {};

type Variables = {};

export const withLSGlobalMenuQuery = graphql<
  InputProps,
  Response,
  Variables,
  WithLSGlobalMenuQuery
>(lsGlobalQueries.menu, {
  props: ({ data }) => ({
    menu: data && data.global ? data.global.menu : false
  })
});
