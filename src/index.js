import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider from react-redux
import { store } from "./chat/store"; // Import your Redux store
import AppStateProvider from "./video/state";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
