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
class Topic extends React.Component {
    render() {
        let params = this.props.match.params;
        console.log(this.props)
        let id = (this.props.location.state && this.props.location.state.id) || -1;
        return <h3>Requested topic ID: {params.id}, state: {id}</h3>;
    }
}
export default withRouter(Topic);