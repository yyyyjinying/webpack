/* eslint-disable react/prop-types */
import React from "react";
import { Provider } from "mobx-react";
import RouteWithSubRoutes from "./routeWithSubRoutes";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true, // 顶级加
    name: "home",
    component: Cart, //home
  },
];

export default function RouteConfigExample() {

  return (
    <Provider {...Store}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/md">md</Link>
            </li>
            <li>
              <Link to="/tacos/bus">Tacos</Link>
            </li>
            <li>
              <Link to="/sandwiches">Sandwiches</Link>
            </li>
          </ul>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

// function Sandwiches() {
//   return <h2>Sandwiches</h2>;
// }

// function Bus() {
//   return <h3>Bus</h3>;
// } 

function Cart() {
  return <h3>Cart</h3>;
}
