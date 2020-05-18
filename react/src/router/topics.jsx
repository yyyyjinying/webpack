/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import {
    Switch,
    Route,
    Link,
    withRouter,
  } from "react-router-dom";
import Topic from "./topic";
class Topics extends React.Component {
    render() {
        let match = this.props.match;
        console.log(this.props)
      
        return (
          <div>
            <h2>Topics{match.url}-{match.path}</h2>
            <ul>
                <li onClick={() => {
                   let history = this.props.history;
                   history.push(`${match.url}/1`, {id: 34}); 
                }}>路由跳转</li>
              <li>
                <Link to={`${match.url}/1`}>Components</Link>
              </li>
              <li>
                <Link to={`${match.url}/props-v-state`}>
                  Props v. State
                </Link>
              </li>
            </ul>
      
            {/* The Topics page has its own <Switch> with more routes
                that build on the /topics URL path. You can think of the
                2nd <Route> here as an "index" page for all topics, or
                the page that is shown when no topic is selected */}
            <Switch>
              <Route path={`${match.path}/:id`}>
                <Topic />
              </Route>
              <Route path={match.path}>
                <h3>Please select a topic.</h3>
              </Route>
            </Switch>
          </div>
        );
    }
}
export default withRouter(Topics);


