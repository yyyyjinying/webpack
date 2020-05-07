/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import ReactDOM from "react-dom";
// import Topics from "component/router/topics-copy";
import Topics from "component/router/topics";

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

function Main() {
    return (
      <div>
        <Router history={customHistory}>
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
            <Topics/>
          </Route>
        </Switch>
      </Router>
      </div>
    );
  
}

function Home() {
  return <h2>Home</h2>;
}

ReactDOM.render(<Main/>, document.getElementById("app"));
