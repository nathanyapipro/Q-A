import * as React from "react";
import { compose } from "react-apollo";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { withAuthQuery, WithAuthQuery } from "../queries/local/withAuthQuery";

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

type Props = OwnProps & WithAuthQuery;

function UnauthenticatedRouteBase(props: Props) {
  const { component: Component, jwt, userId, ...rest } = props;
  const isAuthenticated = Boolean(jwt && userId);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

const UnauthenticatedRoute: React.ComponentType<OwnProps> = compose(
  withAuthQuery
)(UnauthenticatedRouteBase);

export default UnauthenticatedRoute;
