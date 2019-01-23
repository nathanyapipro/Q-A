import * as React from "react";
// import { connect } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
// import { StoreState } from "../states";

interface UnauthenticatedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  isAuthenticated?: boolean;
}

// interface ReduxStateProps {
//   isAuthenticated: boolean;
// }

type Props = UnauthenticatedRouteProps; //& ReduxStateProps;

function UnauthenticatedRouteBase(props: Props) {
  const { component: Component, isAuthenticated = true, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
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

const UnauthenticatedRoute = UnauthenticatedRouteBase; //connect(mapStateToProps)(UnauthenticatedRouteBase);

export default UnauthenticatedRoute;
