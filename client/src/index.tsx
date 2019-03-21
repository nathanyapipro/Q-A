import * as React from "react";
import { render } from "react-dom";
import { install } from "@material-ui/styles";
import * as serviceWorker from "./serviceWorker";

install();

(async function() {
  const statesModule = await import("./states");
  const setupStore = statesModule.setupStore;
  const setupStoreResponse = await setupStore();
  const appModule = await import("./App");
  const App = appModule.default;

  render(<App {...setupStoreResponse} />, document.getElementById("root"));
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
