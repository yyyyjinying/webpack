/* eslint-disable react/prop-types */
import React from "react";
import { Select } from "antd";
class EditSelect extends React.Component {
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
        options,
        disabled,
        style,
        onSearch,
        onSelect,
        props: { text, curColumn, index },
      },
    } = this.props;
    if (!curColumn.editable)
      return <SpanText>{this._getValueFormat(text, curColumn)}</SpanText>;

    return (
      <Select
        showSearch={true}
        onSearch={value => onSearch && onSearch(value)}
        onSelect={(value, itemOption) =>
          onSelect && onSelect(index, value, itemOption.props.option)
        }
        style={{ width: "100%", ...style }}
        defaultValue={text}
        disabled={disabled}>
        {options.map((itemOption, index) => {
          return (
            <Select.Option
              disabled={itemOption.disabled}
              option={itemOption}
              key={index}
              value={itemOption.value}>
              {this._getValueFormat(itemOption.text, curColumn)}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}

export default EditSelect;
