/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { Input, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import utils from "utils";
import { AutoToolTip } from "component/base";
import { SpanText } from "component/base";

function columnRefs() {
  const columns = [
    {
      title: "other",
      children: [
        {
          title: "street",
          dataIndex: "street",
          key: "street",
          width: 150,
          toolTip: {
            visible: true,
          },
        },
        {
          title: "building",
          dataIndex: "building",
          key: "building",
          width: 150,
          toolTip: {
            visible: true,
          },
        },
      ],
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      rules: [{ required: true, message: "Please number!" }],
      width: 180,
      renderElement: props => {
        const { text, curColumn, index } = props;
        return (
          <Input
            placeholder="请输入"
            disabled={false}
            defaultValue={text}
            // allowClear={true}
            onChange={e => {
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
        visible: true,
      },
      width: 500,
      editable: true, // 表格编辑框没有提示toolTip
      format: text => {
        return utils.thousandSeparatorFormat(text);
      },
      renderElement: props => {
        // debugger;
        return (
          <SpanText
            displayType="text"
            editChange={this.editChange.bind(this)}
            {...{ props }}></SpanText>
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
      renderElement: props => <SpanText type="text">{props.text}</SpanText>,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 100,
      fixed: "right",
      renderElement: () => {
        return <a>delete</a>;
      },
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
            return AutoToolTip(text, record, index, item);
          };
        }
        return item;
      });
    },
  };
}

export default columnRefs;
