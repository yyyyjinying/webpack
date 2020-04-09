/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import * as utils from "utils";
import { AutoToolTip } from "component/base";
import { SpanText } from "component/base";

function columnRefs() {
  const columns = [
    {
      key: "key",
      title: "street",
      dataIndex: "street",
      width: 150,
      toolTip: {
        visible: true,
      },
    },
    {
      key: "key",
      title: "building",
      dataIndex: "building",
      width: 250,
      toolTip: {
        visible: true,
      },
      editable: true, // 表格编辑框没有提示toolTip
      renderElement: props => {
        const { curColumn } = props;
        if (utils.isExistString(props.record.tag, "-")) {
          return (
            <SpanText
              displayType="select"
              options={[
                { value: "01", text: "zhao" },
                { value: "02", text: "zhao1" },
              ]}
              onSelect={(index, value) =>
                this.onChange(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  value
                )
              }
              onSearch={(index, value) =>
                this._debounce(props.record.tag, curColumn.dataIndex, value)
              }
              {...{ props }}
            />
          );
        } else {
          return <SpanText>{props.text}</SpanText>;
        }
      },
    },
    {
      key: "key",
      title: "姓名",
      dataIndex: "name",
      rules: [{ required: true, message: "Please number!" }],
      width: 180,
      editable: true, // 表格编辑框没有提示toolTip
      renderElement: props => {
        if (utils.isExistString(props.record.tag, "-")) {
          return (
            <SpanText
              displayType="text"
              onPressEnter={(index, e) =>
                this.onChange(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  e.currentTarget.value
                )
              }
              onBlur={(index, e) =>
                this.onChange(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  e.currentTarget.value
                )
              }
              onSearch={(index, e) =>
                this._debounce(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  e.currentTarget.value
                )
              }
              {...{ props }}
            />
          );
        } else {
          return <SpanText>{props.text}</SpanText>;
        }
      },
    },
    {
      key: "key",
      title: "年龄",
      dataIndex: "age",
      toolTip: {
        visible: true,
      },
      width: 500,
      editable: true, // 表格编辑框没有提示toolTip
      format: text => {
        return utils.thousandSeparatorFormat(text);
      },
      renderElement: props => {
        if (utils.isExistString(props.record.tag, "-")) {
          return (
            <SpanText
              displayType="text"
              onPressEnter={(index, e) =>
                this.onChange(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  e.currentTarget.value
                )
              }
              onBlur={(index, e) =>
                this.onChange(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  e.currentTarget.value
                )
              }
              onSearch={(index, e) =>
                this._debounce(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  e.currentTarget.value
                )
              }
              {...{ props }}
            />
          );
        } else {
          return <SpanText>{props.text}</SpanText>;
        }
      },
    },
    {
      key: "key",
      title: "时间",
      dataIndex: "createTime",
      width: 200,
      toolTip: {
        visible: true,
      },
      editable: true, // 表格编辑框没有提示toolTip
      renderElement: props => {
        if (utils.isExistString(props.record.tag, "-")) {
          return (
            <SpanText
              displayType="datePicker"
              onChange={(index, value) => {
                this.onChange(
                  props.record.tag,
                  props.curColumn.dataIndex,
                  value.dateString
                );
              }}
              {...{ props }}
            />
          );
        } else {
          return <SpanText>{props.text}</SpanText>;
        }
      },
    },
    {
      key: "key",
      title: "住址",
      dataIndex: "address",
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
      renderElement: props => <SpanText>{props.text}</SpanText>,
    },
    {
      title: "add",
      dataIndex: "add",
      width: 100,
      fixed: "right",
      renderElement: props => {
        return utils.isExistString(props.record.tag, "-") ? (
          <a
            style={{ fontSize: "20px" }}
            onClick={this.addRow.bind(this, props.record.tag, props.record)}>
            +
          </a>
        ) : null;
      },
    },
    {
      key: "key",
      title: "del",
      dataIndex: "del",
      width: 100,
      fixed: "right",
      renderElement: props => {
        return utils.isExistString(props.record.tag, "-") ? (
          <a
            style={{ fontSize: "20px" }}
            onClick={this.delRow.bind(this, props.record.tag, props.record)}>
            -
          </a>
        ) : null;
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
