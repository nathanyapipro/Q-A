import ApolloClient from "apollo-boost";
import { combineReducers, compose, createStore, Store } from "redux";
import { ActionType } from "typesafe-actions";
import { persistReducer, persistStore, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { GlobalState, globalReducer, globalActions } from "./global";
import {
  QuestionsState,
  questionsReducer,
  questionsActions
} from "./questions";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export type Actions = ActionType<
  typeof globalActions | typeof questionsActions
>;

export interface StoreState {
  global: GlobalState;
  questions: QuestionsState;
}

export interface SetupStoreResponse {
  client: ApolloClient<{}>;
  store: Store<StoreState>;
  persistor: Persistor;
}

export async function setupStore(): Promise<SetupStoreResponse> {
  const rootReducer = combineReducers({
    global: globalReducer,
    questions: questionsReducer
  });

  const enhancers = [];

  if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    persistReducer(
      {
        key: "fundamental",
        storage,
        whitelist: ["global"]
      },
      rootReducer
    ),
    compose(...enhancers)
  );

  // Flush persistor before retrieving accessToken
  // to ensure it is available in store before
  const persistor = persistStore(store);
  await persistor.flush();

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    request: async operation => {
      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) {
        operation.setContext({
          headers: { Authorization: `Bearer ${jwtToken}` }
        });
      }
    },
    onError: () => {
      store.dispatch(globalActions.setAuth({}));
      client.resetStore();
    }
  });

  return {
    client,
    store,
    persistor
  };
}
