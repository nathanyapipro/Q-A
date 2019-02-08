import * as React from "react";
import { compose } from "react-apollo";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { withAuthQuery, WithAuthQuery } from "../queries/local/withAuthQuery";

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

type Props = OwnProps & WithAuthQuery;

function PrivateRouteBase(props: Props) {
  const { component: Component, jwtToken, ...rest } = props;
  const isAuthenticated = Boolean(jwtToken);
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        true ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
}

const PrivateRoute: React.ComponentType<OwnProps> = compose(withAuthQuery)(
  PrivateRouteBase
);

export default PrivateRoute;
