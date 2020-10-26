/* eslint-disable react/prop-types */
import React from "react";
import { Provider } from "mobx-react";
import RouteWithSubRoutes from "./routeWithSubRoutes";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "./style";
// import "./style/ls";
const routes = [
  {
    path: "/",
    exact: true, // 顶级加
    name: "home",
    component: Cart, //home
  },
  {
    path: "/home",
    exact: true, // 顶级加
    name: "home",
    component: Home, //home
  },
];

export default function RouteConfigExample() {
console.log("1212".includes("2"));
  return (
    <Provider>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/home">home</Link>
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

function Home() {
  return <h3 className="home"><span>Home</span>Home</h3>;
} 

function Cart() {
  return <h3>Cart</h3>;
}
