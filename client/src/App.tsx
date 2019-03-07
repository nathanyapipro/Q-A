import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SetupStoreResponse } from "./states";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import AuthGate from "./routers/AuthGate";
import Loading from "./components/Loading";
import withTheme from "./components/withTheme";

interface AppProps {}

type Props = AppProps & SetupStoreResponse;

function App(props: Props) {
  const { client, store, persistor } = props;

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <React.Suspense fallback={<Loading />}>
            <Router>
              <AuthGate />
            </Router>
          </React.Suspense>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default withTheme(App);
