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
      width: 50,
      fixed: "left",
      align: "center",
      renderElement: props => {
        const { index, record } = props;
        return (
          <a
            style={{ fontSize: "20px" }}
            onClick={this.addRow.bind(this, index, record)}>
            +
          </a>
        );
      },
    },
    {
      title: "姓名",
      dataIndex: "name",
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
          onSearch={(index, e) =>
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
          onSearch={(index, e) =>
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
      title: "时间",
      dataIndex: "createTime",
      width: 200,
      toolTip: {
        visible: true,
      },
      editable: true, // 表格编辑框没有提示toolTip
      renderElement: props => (
        <SpanText
          displayType="datePicker"
          onChange={(index, value) => {
            this.onChange(index, props.curColumn.dataIndex, value.dateString);
          }}
          {...{ props }}
        />
      ),
    },
    {
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
      renderElement: props => <SpanText type="text">{props.text}</SpanText>,
    }
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
