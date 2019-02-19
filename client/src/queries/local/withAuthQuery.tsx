import { graphql } from "react-apollo";
import {
  AUTH_QUERY,
  Defaults as AuthResponse,
  Auth
} from "../../apollo/clientState/auth";

export type InputProps = {};

type Response = AuthResponse;

type Variables = {};

export type ChildProps = Pick<Auth, "jwtToken">;

export const hoc = graphql<InputProps, Response, Variables, ChildProps>(
  AUTH_QUERY,
  {
    props: ({ data }) => {
      if (!data) {
        throw new Error("No data prop found");
      }
      const { auth } = data;

      return {
        jwtToken: auth ? auth.jwtToken : null
      };
    }
  }
);
