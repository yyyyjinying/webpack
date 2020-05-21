/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  BrowserRouter as Router,
  withRouter,
} from "react-router-dom";
class Index extends React.Component {
  render() {
    let params = this.props.match.params;
    console.log(this.props);
    return (
      <div>
        <h3>Requested dashboard: {params.id}</h3>
        <div id="mainApp"></div>
      </div>
    );
  }
}
export default withRouter(Index);
