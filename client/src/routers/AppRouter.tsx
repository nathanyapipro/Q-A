import * as React from "react";
import { Switch, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const Questions = React.lazy(() => import("../pages/Questions"));

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" exact component={Questions} />
      </Switch>
    </AppLayout>
  );
}

export default AppRouter;
