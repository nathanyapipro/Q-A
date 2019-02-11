import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

const AskAQuestion = React.lazy(() => import("../pages/AskAQuestion"));
const Questions = React.lazy(() => import("../pages/Questions"));
const Question = React.lazy(() => import("../pages/Question"));

function AppRouter() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/ask-a-question" exact component={AskAQuestion} />
        <Route path="/questions" exact component={Questions} />
        <Route path="/questions/:id" exact component={Question} />
        <Redirect from="/" to="/questions" />
      </Switch>
    </AppLayout>
  );
}

export default AppRouter;
