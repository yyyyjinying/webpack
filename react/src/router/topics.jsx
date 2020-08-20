/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Topic from "./topic";
import RouteWithSubRoutes from "./routeWithSubRoutes";
class Topics extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let match = this.props.match;
    let {routes} = this.props;
    

    console.log(this.props);

    return (
      <div>
        <h2>
          Topics-{match.path}
        </h2>
        <ul>
          {
            routes.map((route, index) => {
              return <li key={index}><Link to={route.path}>{route.name}</Link></li>
            })
          }
          {/* <li
            onClick={() => {
              let history = this.props.history;
              history.push(`${match.url}/detailtest`, { id: 34 });
            }}>
            test
          </li> */}
        </ul>
        <Switch>
          {routes.map((route, index) => {
            return <RouteWithSubRoutes key={index} routes={route} />;
          })}
        </Switch>
      </div>
    );
  }
}
export default withRouter(Topics);
