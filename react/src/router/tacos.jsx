/* eslint-disable react/prop-types */

import React from "react";
import { Link, Switch } from "react-router-dom";
import RouteWithSubRoutes from "./routeWithSubRoutes";
function Tacos({ routes }) {
    return (
      <div>
        <h2>Tacos</h2>
        <ul>
          <li>
            <Link to="/tacos/bus">Bus</Link>
          </li>
          <li>
            <Link to="/tacos/cart">Cart</Link>
          </li>
        </ul>
  
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    );
  }

  export default Tacos;