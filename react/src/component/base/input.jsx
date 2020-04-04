/* eslint-disable react/prop-types */
import React from "react";
import { Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
class EditInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editSign: false,
    };
  }

  _clickHandle(editSign) {
    this.setState(
      {
        editSign,
      },
      () => {
        if (editSign) {
          this.input.focus();
        }
      }
    );
  }

  render() {
    const {
      SpanText,
      props: {
        onChange,
        onBlur,
        onPressEnter,
        props: { text, curColumn, index },
      },
    } = this.props;
    const value = curColumn.format ? curColumn.format(text) : text;

    if (!curColumn.editable)
      return <SpanText>{value}</SpanText>;

    return !this.state.editSign ? (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          paddingRight: "11px",
          background: "#fff",
        }}>
        <input
          readOnly
          style={{
            outlineStyle: "none",
            flex: 1,
            height: "30px",
            border: 0,
            padding: "2px 11px",
            color: "rgba(0,0,0,.65)",
            lineHeight: "1.5",
            width: "100%",
          }}
          onClick={this._clickHandle.bind(this, true)}
          defaultValue={value}
        />
        <Tooltip title="提示信息" placement="right">
          <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
        </Tooltip>
      </span>
    ) : (
      <Input
        placeholder="请输入"
        disabled={false}
        defaultValue={text}
        ref={node => (this.input = node)}
        onChange={e => {
          e.persist(); // 开启nativeEvent
          onChange && onChange(index, e);
        }}
        onBlur={(e) => {
          this._clickHandle(false);
          onBlur && onBlur(index, e);
        }}
        onPressEnter={(e) => {
          this._clickHandle(false);
          onPressEnter && onPressEnter(index, e);
        }}
      />
    );
  }
}

export default EditInput;
