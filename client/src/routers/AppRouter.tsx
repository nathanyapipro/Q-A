import * as React from "react";
import { Switch, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" exact component={() => <div>APP</div>} />
      </Switch>
    </AppLayout>
  );
}

export default AppRouter;
