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
    this.props.editChange(index, key, e.currentTarget.value);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { text, curColumn, record, index } = this.props;
    return curColumn.editable && !this.state.editSign ? (
      <span onDoubleClick={this._clickHandle.bind(this, true)}>{text}</span>
    ) : (
      <Input
        placeholder="请输入"
        disabled={false}
        defaultValue={text}
        ref={node => (this.input = node)}
        onBlur={this.inputChange.bind(this, index, curColumn.dataIndex)}
        onPressEnter={this.inputChange.bind(this, index, curColumn.dataIndex)}
        suffix={
          <Tooltip title="提示信息" placement="right">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      />
    );
  }
}

export default EditInput;
