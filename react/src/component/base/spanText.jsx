/* eslint-disable react/prop-types */
import React from "react";
import Input from "./input";
import Select from "./select";
import DatePicker from "./datePicker";
import * as utils from "../../common/utils";
const ele = props => {
  let str = utils.getEllipsisValueByWidth(props.children, props.width);
  // eslint-disable-next-line react/prop-types
  return <span className="span_text">{str}</span>;
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
