/* eslint-disable react/no-string-refs */
/* eslint-disable no-const-assign */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import {Button} from "antd";

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
  componentDidMount() {
    //  const xTable = this.refs.xTableRef;
    //  xTable.contentWindow.postMessage({a: 1}, '*');
  }
  // 通过 postMessage 向子窗口发送数据
  sendChildrenData() {
    const xTable = document.getElementById("xTableRef");
    xTable.contentWindow.postMessage({ a: 1 }, "*");
  }
  render() {
    let params = this.props.match.params;
    console.log(this.props);
    return (
      <div>
        <h3>Requested dashboard: {params.id}</h3>
        <Button onClick={this.sendChildrenData}>向子窗口发送数据</Button>
        <div>
          <div id="xtable"></div>
          <iframe
            onLoad={() => {
            }}
            id="xTableRef"
            width="100%"
            height="100%"
            src="http://localhost:3045/"
            name="iframe_a"></iframe>
        </div>
      </div>
    );
  }
}
export default withRouter(Index);
