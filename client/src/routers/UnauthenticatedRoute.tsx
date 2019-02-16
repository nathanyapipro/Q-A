import * as React from "react";
import { compose } from "react-apollo";
import { Route, Redirect, RouteProps } from "react-router-dom";
import * as withAuthQuery from "../queries/local/withAuthQuery";

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

type Props = OwnProps & withAuthQuery.ChildProps;

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

const UnauthenticatedRoute: React.ComponentType<
  OwnProps & withAuthQuery.InputProps
> = compose(withAuthQuery.hoc)(UnauthenticatedRouteBase);

export default UnauthenticatedRoute;
