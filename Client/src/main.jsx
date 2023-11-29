import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Store/index.js";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <StyleProvider hashPriority="high">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyleProvider>
    </React.StrictMode>
  </Provider>,
);
