import * as React from "react";
import { Switch, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

// const Login = React.lazy(() => import("../pages/Login"));

function AuthRouter() {
  return (
    <AuthLayout>
      <Switch>
        <Route path="/auth/login" exact component={() => <div>Login</div>} />
      </Switch>
    </AuthLayout>
  );
}

export default AuthRouter;
