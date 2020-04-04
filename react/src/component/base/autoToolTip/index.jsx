import React from "react";
import {
  Tooltip,
} from "antd";
import "./style.less";
import SpanText from "../spanText.jsx";

const AutoToolTip = (text, record, index, curColumn) => {
    // tip位置
    let placement = curColumn.toolTip && curColumn.toolTip.placement;
  
    // tip信息
    let title = curColumn.toolTip && curColumn.toolTip.title;
    placement = placement || "right";
    title = title || text;
  
    // format格式化
    if (curColumn.format) {
      title = curColumn.format(title);
    }
  
    // content内容
    let formatText = curColumn.format ? curColumn.format(text) : text;
    let element = <SpanText>{formatText}</SpanText>;
    if (typeof curColumn.renderElement == "function") {
      element = curColumn.renderElement({...{text, curColumn, record, index}});
    }
  
    if (!curColumn.editable && curColumn.toolTip && curColumn.toolTip.visible) {
      element = (
        <Tooltip key={index} {...{ placement, title }}>
          <span>{element}</span>
        </Tooltip>
      );
    }
    return element;
  }

export default AutoToolTip;
