/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import axios from "axios";
import { observer, inject } from "mobx-react";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import AutoTable from "../component/autoTable/table01";
import "./css/style.css";
import "./css/table2.css";

@inject("Store01")
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.Store01;
  }
  componentDidMount() {
    axios.get("/api/widget?ajax=json&id=ad").then(res => {
      console.log(res);
    });
  }
  render() {
    console.log("store", this.store);
    let params = this.props.match.params;
    return (
      <div>
        <h1 className="bac">home</h1>
        <AutoTable />
      </div>
    );
  }
}
export default withRouter(Home);
