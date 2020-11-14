/* eslint-disable react/prop-types */
import React from "react";
import { Provider } from "mobx-react";
import RouteWithSubRoutes from "./routeWithSubRoutes";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import home from "./home";
import Bus from "../component/bus";
import MD from "../component/md";
// import Form from "../component/form/index";
// import Pdf from "@/component/pdf";
// import Form from "../component/form/index2";
// import Canvas from "../component/canvas";
import * as Store from "../store";
import Tacos from "./tacos";
import Detail from "../component/details";
import TableResizable from "../component/autoTable/tableResizable";
import Font from "../component/font";
// eslint-disable-next-line no-unused-vars
import * as Arr from "../test/array/lesson01";

const routes = [
  {
    path: "/",
    exact: true, // 顶级加
    name: "home",
    component: TableResizable, //home
  },
  {
    path: "/font",
    exact: true, // 顶级加
    name: "font",
    component: Font, //home
  },
  {
    path: "/md",
    exact: true, // 顶级加
    name: "md",
    component: MD, //home
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
        exact: true,
        path: "/tacos/bus",
        name: "bus",
        component: Bus,
      },
      {
        exact: true,
        path: "/tacos/cart",
        name: "cart",
        component: Cart,
      },
    ],
  },
];

export default function RouteConfigExample() {
  // console.log(Arr.sort05([7,5,2,4,6], 2));

  return (
    <Provider {...Store}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/font">font</Link>
            </li>
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
