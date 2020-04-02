/* eslint-disable react/display-name */
import React from "react";
import { Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import utils from "utils";
import { Render } from "component/base";
import EditInput from "component/base/editInput";

function columnRefs() {
  const columns = [
    {
      title: "other",
      children: [
        {
          title: 'street',
          dataIndex: 'street',
          key: 'street',
          width: 150,
        },
        {
          title: 'building',
          dataIndex: 'building',
          key: 'building',
          width: 150,
        },
      ]
    },
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
              e.persist(); // 开启nativeEvent
              this._debounce(index, [curColumn.dataIndex], e.target.value);
            }}
            suffix={
              <Tooltip title="提示信息" placement="right">
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
        visible: false,
      },
      width: 500,
      editable: true, // 表格编辑框
      format: text => {
        return utils.thousandSeparatorFormat(text);
      },
      // eslint-disable-next-line no-unused-vars
      renderElement: (text, curColumn, record, index) => {
        return (
          <EditInput editChange={this.editChange.bind(this)} {...{text, curColumn, record, index}}/>
        );
      },
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      width: 800,
      toolTip: {
        visible: true,
      },
      onCell: (record, rowIndex) => ({
        onClick: e => {
          console.log(e, record, rowIndex);
        }, // 点击行
        // onDoubleClick: event => {},
        // onContextMenu: event => {},
        // onMouseEnter: event => {}, // 鼠标移入行
        // onMouseLeave: event => {},
      }),
      renderElement: text => {
        return <span className="span_text">{text}</span>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      width: 100,
      fixed: 'right',
      renderElement: () => {
        return <a>delete</a>;
      }
    },
  ];

  return {
    rowSelection: {
      type: "checkbox",
      columnWidth: "60px",
      // fixed: 'left',
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
        }
        return item;
      });
    },
  };
}

export default columnRefs;
