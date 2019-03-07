import * as React from "react";
import { connect } from "react-redux";
import { StoreState } from "../states";
import { $isAuthenticated } from "../states/global/selectors";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface OwnProps extends RouteProps {
  component: React.ComponentType<any>;
}

interface ReduxStateProps {
  isAuthenticated: boolean;
}

type Props = OwnProps & ReduxStateProps;

function PrivateRouteBase(props: Props) {
  const { component: Component, isAuthenticated, ...rest } = props;
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

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    isAuthenticated: $isAuthenticated(state)
  };
};

const PrivateRoute = connect(mapStateToProps)(PrivateRouteBase);

export default PrivateRoute;
