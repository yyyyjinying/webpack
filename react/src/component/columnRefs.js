/* eslint-disable react/display-name */
import React from "react";
import { Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import utils from "utils";
import { Render } from "component/base";

function columnRefs() {
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      rules: [{ required: true, message: "Please number!" }],
      width: 180,
      renderElement: (text, curColumn, record, index) => {
        return (
          <Input
            placeholder="请输入"
            disabled={false}
            defaultValue={text}
            // allowClear={true}
            onChange={(e) => {
              e.persist();
              this._debounce(index, {[curColumn.dataIndex]: e.target.value});
            }}
            suffix={
              <Tooltip title="提示信息" placement="rightTop">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        );
      },
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      toolTip: {
        visible: true,
      },
      width: 200,
      format: text => {
        return utils.thousandSeparatorFormat(text);
      },
      renderElement: (text, curColumn) => {
        return <span className="span_text">{curColumn.format(text)}</span>;
      },
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      toolTip: {
        visible: true,
      },
      onCell: (record, rowIndex) => {
        return {
          onClick: e => {
            console.log(e, record, rowIndex);
          }, // 点击行
          // onDoubleClick: event => {},
          // onContextMenu: event => {},
          // onMouseEnter: event => {}, // 鼠标移入行
          // onMouseLeave: event => {},
        };
      },
      renderElement: text => {
        return <span className="span_text">{text}</span>;
      },
    },
  ];

  return {
    rowSelection: {
      type: "checkbox",
      columnWidth: "60px",
      onChange: (selectedRowKeys, selectedRow) => {
        this._rowSelectionChange(selectedRowKeys, selectedRow);
      },
    },
    getColumns: () => {
      return columns.map(item => {
        if (typeof item.render != "function") {
          item.render = (text, record, index) => {
            return Render(text, record, index, item);
          };
          return item;
        }
      });
    },
  };
}

export default columnRefs;
