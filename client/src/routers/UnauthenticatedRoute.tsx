import * as React from "react";
import { compose } from "react-apollo";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { withAuthQuery, WithAuthQuery } from "../queries/local/withAuthQuery";

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

type Props = OwnProps & WithAuthQuery;

function UnauthenticatedRouteBase(props: Props) {
  const { component: Component, jwtToken, ...rest } = props;
  const isAuthenticated = Boolean(jwtToken);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to="/questions" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

const UnauthenticatedRoute: React.ComponentType<OwnProps> = compose(
  withAuthQuery
)(UnauthenticatedRouteBase);

export default UnauthenticatedRoute;
