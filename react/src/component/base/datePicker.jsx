/* eslint-disable react/prop-types */
import React from "react";
import { DatePicker } from "antd";
import * as utils from "utils";
class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  _getValueFormat(text, curColumn) {
    return curColumn.format ? curColumn.format(text) : text;
  }

  render() {
    const {
      SpanText,
      props: {
        onChange,
        props: { text, curColumn, index },
      },
    } = this.props;
    if (curColumn && !curColumn.editable)
      return <SpanText>{this._getValueFormat(text, curColumn)}</SpanText>;

    return (
      <DatePicker
        defaultValue={utils.getDateFormat(text)}
        value={utils.getDateFormat(text)}
        onChange={(date, dateString) => {
          const value = {
            dateTimer: date.valueOf(),
            dateString
          };
          onChange && onChange(index, value);
        }}
      />
    );
  }
}

export default Index;
