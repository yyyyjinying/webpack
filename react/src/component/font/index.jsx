import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "./iconfont.js",
});

class Font extends React.Component {
  render() {
    return (
      <IconFont type="icon-add" style={{ fontSize: "16px", color: "red" }} />
    );
  }
}

export default Font;
