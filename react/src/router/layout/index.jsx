/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Link, Switch } from "react-router-dom";
import {Tree} from "antd";
import RouteWithSubRoutes from "./routeWithSubRoutes";

const {TreeNode} = Tree;
function Layout({ routes }) {
    const _getTreeNode = () => {

    }

    return (
      <div>
        <h2>Tacos</h2>
        <Tree showLine={true} showIcon={false}>
            {this._getTreeNode(this.state.sourceData)}
        </Tree>
        
        <ul>
          <li>
            <Link to="/tacos/bus">Bus</Link>
          </li>
          <li>
            <Link to="/tacos/cart">Cart</Link>
          </li>
        </ul>
  
        <div>content</div>
      </div>
    );
  }

  export default Layout;