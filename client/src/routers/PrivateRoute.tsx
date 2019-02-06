import * as React from "react";
// import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
// import { StoreState } from "../states";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  isAuthenticated?: boolean;
}

// interface ReduxStateProps {
//   isAuthenticated: boolean;
// }

type Props = PrivateRouteProps; // & ReduxStateProps;

function PrivateRouteBase(props: Props) {
  const { component: Component, isAuthenticated = false, ...rest } = props;

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

// const mapStateToProps = (state: StoreState): ReduxStateProps => {
//   const { credentials } = state.auth;

//   return {
//     isAuthenticated: Boolean(
//       credentials && credentials.accessToken && credentials.user
//     )
//   };
// };

const PrivateRoute = PrivateRouteBase; //connect(mapStateToProps)(PrivateRouteBase);

export default PrivateRoute;
