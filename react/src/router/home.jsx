/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import {observer, inject} from "mobx-react";
import {
    Switch,
    Route,
    Link,
    withRouter,
  } from "react-router-dom";

import AutoTable from "../component/autoTable/table01";

@inject('store')
@observer
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.store;
    }
    componentDidMount(){
    }
    render() {
        console.log("store", this.store)
        let params = this.props.match.params;
        return <div>
            <h1>home</h1>
            <AutoTable />
        </div>;
    }
}
export default withRouter(Home);