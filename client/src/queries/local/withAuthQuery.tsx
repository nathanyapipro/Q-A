import { graphql } from "react-apollo";
import {
  AUTH_QUERY,
  Defaults as AuthResponse,
  Auth
} from "../../apollo/clientState/auth";

type InputProps = {};

type Response = AuthResponse;

type Variables = {};

type ChildProps = Pick<Auth, "jwt" | "userId">;

export const withAuthQuery = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(AUTH_QUERY, {
  props: ({ data }) => {
    if (!data) {
      throw new Error("No data prop found");
    }
    const { auth } = data;

    return {
      jwt: auth ? auth.jwt : null,
      userId: auth ? auth.userId : null
    };
  }
});

export type WithAuthQuery = ChildProps;
