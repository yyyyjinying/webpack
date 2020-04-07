import React from "react";
import Input from "./input";
import Select from "./select";
import DatePicker from "./datePicker";

const ele = props => {
  // eslint-disable-next-line react/prop-types
  return <span className="span_text">{props.children}</span>;
};

const SpanText = props => {
  let dom = null;
  switch (props.displayType) {
    case "text":
      dom = <Input SpanText={ele} {...{ props }} />;
      break;
    case "select":
      dom = <Select SpanText={ele} {...{ props }} />;
      break;
    case "datePicker":
      dom = <DatePicker SpanText={ele} {...{ props }} />;
      break;
    default:
      dom = ele(props);
      break;
  }
  return dom;
};

export default SpanText;
