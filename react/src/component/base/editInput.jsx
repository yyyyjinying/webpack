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

  inputChange(index, key, e) {
    this._clickHandle(false);
    const { props } = this.props;
    props.editChange(index, key, e.currentTarget.value);
  }

  render() {
    const {
      SpanText,
      props: {
        props: { text, curColumn, index },
      },
    } = this.props;

    if (!curColumn.editable)
      return <SpanText>{curColumn.format(text)}</SpanText>;

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
          }}
          onClick={this._clickHandle.bind(this, true)}
          defaultValue={curColumn.format(text)}
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
        onBlur={this.inputChange.bind(this, index, curColumn.dataIndex)}
        onPressEnter={this.inputChange.bind(this, index, curColumn.dataIndex)}
      />
    );
  }
}

export default EditInput;
