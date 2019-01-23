import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import client from "./services/apollo";
import AuthGate from "./routers/AuthGate";
import Loading from "./components/Loading";
import withTheme from "./components/withTheme";

function App() {
  return (
    <ApolloProvider client={client}>
      <React.Suspense fallback={<Loading />}>
        <Router>
          <AuthGate />
        </Router>
      </React.Suspense>
    </ApolloProvider>
  );
}

export default withTheme(App);
