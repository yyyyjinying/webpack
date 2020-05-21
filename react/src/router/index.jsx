/* eslint-disable no-unused-vars */
import React from "react";
import { Provider } from "mobx-react";
import Home from "./home";
import Topics from "./topics";
import Dashboard from "./dashboard";
import * as Store from "../store";

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
      <Provider {...Store}>
        <Router>
        <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <Topics />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>

          
        </Router>
      </Provider>
    </div>
  );
}
