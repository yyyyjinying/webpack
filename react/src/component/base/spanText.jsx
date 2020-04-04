import React from "react";
import EditInput from "./editInput";

const ele = props => {
  // eslint-disable-next-line react/prop-types
  return <span className="span_text">{props.children}</span>;
};

const SpanText = props => {
  let dom = null;
  switch (props.displayType) {
    case "text":
      dom = <EditInput SpanText={ele} {...{ props }} />;
      break;
    case "select":
      dom = <EditInput SpanText={ele} {...{ props }} />;
      break;
    case "time":
      dom = <EditInput SpanText={ele} {...{ props }} />;
      break;
    default:
      dom = ele(props);
      break;
  }
  return dom;
};

export default SpanText;
