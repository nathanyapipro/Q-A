import * as React from "react";
import { Switch, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Loading from "../components/Loading";

const Login = React.lazy(() => import("../pages/Login"));
const LoginAdmin = React.lazy(() => import("../pages/LoginAdmin"));

function AuthRouter() {
  return (
    <AuthLayout>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/auth/login" exact component={Login} />
          <Route path="/auth/login-admin" exact component={LoginAdmin} />
        </Switch>
      </React.Suspense>
    </AuthLayout>
  );
}

export default AuthRouter;
