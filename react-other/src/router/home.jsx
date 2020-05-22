/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import axios from "axios";
import { observer, inject } from "mobx-react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { Button } from "antd";

import AutoTable from "../component/autoTable/table01";
import "./css/style.css";
import "./css/table2.css";

@inject("Store01")
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.Store01;
    this.state = {
      testname: "zhaojingying",
    };
  }

  componentDidMount() {
    //event 参数中有 data 属性，就是父窗口发送过来的数据
    window.addEventListener(
      "message",
      event => {
        console.log(event.data);
      },
      false
    );

    axios.get("/api/widget?ajax=json&id=ad").then(res => {
      console.log(res);
    });
  }

  sendParent() {
    console.log(parent);
    debugger;
  }
  render() {
    console.log("store", this.store);
    let params = this.props.match.params;
    return (
      <div>
        <h1 className="bac">home</h1>
        <div>
          <Button onClick={this.sendParent}>调用父窗口</Button>
        </div>
        <AutoTable />
      </div>
    );
  }
}
export default withRouter(Home);
