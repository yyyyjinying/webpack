/* eslint-disable react/prop-types */
import React from "react";
import { Provider } from "mobx-react";
import RouteWithSubRoutes from "./routeWithSubRoutes";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import home from "./home";
// import Form from "../component/form/index";
// import Pdf from "@/component/pdf";
// import Form from "../component/form/index2";
// import Canvas from "../component/canvas";
import * as Store from "../store";
import Tacos from "./tacos";
import Detail from "../component/details";
import str02 from "../test/string/lesson02";

const routes = [
  {
    path: "/",
    exact: true, // 顶级加
    name: "home",
    component: home, //home
  },
  {
    path: "/home",
    name: "home",
    exact: true, // 顶级加
    component: home,
  },
  {
    path: "/sandwiches",
    name: "sandwiches",
    exact: true, // 顶级加
    component: Detail,
  },
  {
    path: "/tacos",
    name: "tacos",
    component: Tacos,
    routes: [
      {
        path: "/tacos/bus",
        name: "bus",
        component: Bus,
      },
      {
        path: "/tacos/cart",
        name: "cart",
        component: Cart,
      },
    ],
  },
];



export default function RouteConfigExample() {
  str02("00110011");
  return (
    <Provider {...Store}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/tacos">Tacos</Link>
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

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}
