/* eslint-disable no-unused-vars */
import React from "react";
import { Provider } from "mobx-react";
import Home from "./home";
import Topics from "./topics";
import Store from "../store";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

export default function App() {
  return (
    <div>
      <Provider store={Store}>
        <Router>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/home/topics">Topics</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/home/topics">
              <Topics />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
