/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import React from "react";
import axios from "axios";
import { observer, inject } from "mobx-react";
import { Button, Icon } from "antd";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import AutoTable from "../component/autoTable/table01";
// import "./css/style.css";
import Dashboard from "./dashboard";
import "./home.less";

@inject("Store01")
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.Store01;
    this.state = {
      test: "zhaojinying",
    };
  }
  componentDidMount() {
    axios.get("/api/widget?ajax=json&id=ad").then(res => {
      console.log(res);
    });

    let s =
      "11111qqqq这是一个文本这是一个文本这是一个文本这是一个文本这是一个文本这是一个文本11111qqqq这是一个文本这是一个文本这是一个文本这是一个文本这是一个文本这是一个文本";
    let el = document.getElementById("view");
    let n = el.offsetHeight;
    for (let i = 0; i < s.length; i++) {
      el.innerHTML = s.substr(0, i);
      if (n < el.scrollHeight) {
        el.style.overflow = "hidden";
        el.innerHTML = s.substr(0, i - 2) + "...";
        break;
      }
    }
  }
  render() {
    return (
      <div>
        <h1 className="bac">home</h1>
        <div className="table">
          <iframe
            onLoad={() => {}}
            id="xTableRef"
            width="100%"
            height="100%"
            src="http://localhost:3045/"
            name="iframe_a"></iframe>
        </div>

        <div className="autoTip" id="view"></div>
      </div>
    );
  }
}
export default withRouter(Home);
