import React, { Component } from "react";
// import OrgChart from "react-orgchart";
import {OrgChart} from "./orgChartBase";
import "./style.less";

class wnChart extends Component {
  render() {
    const initechOrg = {
      name: "平安不动产",
      actor: "平安不动产",
      level: 0,
      children: [
        {
          name: "股权投资中心",
          actor: "股权投资中心",
          level: 1,
          children: [
            {
              name: "开发投资",
              actor:"商业投资",
              level: 2,
            },
            {
              name: "开发投资",
              actor:"商业投资",
              level: 2,
            },
            {
              name: "开发投资",
              actor:"商业投资",
              level: 2,
            },
            {
              name: "开发投资",
              actor:"商业投资",
              level: 2,
            },
          ],
        },
        {
          name: "金融产品中心",
          actor: "金融产品中心",
          level: 1,
        },
      ],
    };

    const MyNodeComponent = ({node}) => {
      let className = "level-three";
      if (node.level === 0) {
        className = "level-first";
      }
      if (node.level === 1) {
        className = "level-second"
      }
      return (
        <div
          className={"initechNode " + className}
          onClick={() => alert("Hi my real name is: " + node.actor)}
          >
          {node.name}
        </div>
      );
    };
    return <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />;
  }
}

export default wnChart;
