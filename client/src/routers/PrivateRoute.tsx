import * as React from "react";
import { compose } from "react-apollo";
import { Route, Redirect, RouteProps } from "react-router-dom";
import * as withAuthQuery from "../queries/local/withAuthQuery";

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

type Props = OwnProps & withAuthQuery.ChildProps;

function PrivateRouteBase(props: Props) {
  const { component: Component, jwtToken, ...rest } = props;
  const isAuthenticated = Boolean(jwtToken);
  // console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

const PrivateRoute: React.ComponentType<
  OwnProps & withAuthQuery.InputProps
> = compose(withAuthQuery.hoc)(PrivateRouteBase);

export default PrivateRoute;
