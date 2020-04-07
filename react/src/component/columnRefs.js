/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import * as utils from "utils";
import { AutoToolTip } from "component/base";
import { SpanText } from "component/base";

function columnRefs() {
  const columns = [
    {
      title: "add",
      dataIndex: "add",
      key: "add",
      width: 50,
      fixed: "left",
      renderElement: () => {
        return <a>+</a>;
      },
    },
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
          editable: true, // 表格编辑框没有提示toolTip
          renderElement: props => {
            const { curColumn, index } = props;
            return (
              <SpanText
                displayType="select"
                options={[
                  { value: "01", text: "zhao" },
                  { value: "02", text: "zhao1" },
                ]}
                onSelect={(index, value, option) => {
                  console.log(index, value, option);
                }}
                onSearch={value =>
                  this._debounce(index, curColumn.dataIndex, value)
                }
                {...{ props }}
              />
            );
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
      editable: true, // 表格编辑框没有提示toolTip
      renderElement: props => (
        <SpanText
          displayType="text"
          onPressEnter={(index, e) =>
            this.onChange(
              index,
              props.curColumn.dataIndex,
              e.currentTarget.value
            )
          }
          onBlur={(index, e) =>
            this.onChange(
              index,
              props.curColumn.dataIndex,
              e.currentTarget.value
            )
          }
          onChange={(index, e) =>
            this._debounce(
              index,
              props.curColumn.dataIndex,
              e.currentTarget.value
            )
          }
          {...{ props }}
        />
      ),
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
      renderElement: props => (
        <SpanText
          displayType="text"
          onPressEnter={(index, e) =>
            this.onChange(
              index,
              props.curColumn.dataIndex,
              e.currentTarget.value
            )
          }
          onBlur={(index, e) =>
            this.onChange(
              index,
              props.curColumn.dataIndex,
              e.currentTarget.value
            )
          }
          onChange={(index, e) =>
            this._debounce(
              index,
              props.curColumn.dataIndex,
              e.currentTarget.value
            )
          }
          {...{ props }}
        />
      ),
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

  const getColumns = columns => {
    return columns.map(item => {
      if (typeof item.render != "function") {
        item.render = (text, record, index) => {
          return AutoToolTip(text, record, index, item);
        };
      }

      if (Array.isArray(item.children)) {
        getColumns(item.children);
      }
      return item;
    });
  };

  return {
    rowSelection: {
      type: "checkbox",
      columnWidth: "60px",
      // fixed: 'left',
      onChange: (selectedRowKeys, selectedRow) => {
        this._rowSelectionChange(selectedRowKeys, selectedRow);
      },
    },
    getColumns: () => getColumns(columns),
  };
}

export default columnRefs;
