/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import * as utils from "utils";
import { AutoToolTip } from "component/base";
import { SpanText } from "component/base";

function columnRefs() {
  const columns = [
    // {
    //   title: "add",
    //   dataIndex: "add",
    //   width: 50,
    //   // fixed: "left",
    //   align: "center",
    //   // colSpan: {
    //   //   col: 5,
    //   //   span: props => {
    //   //     return {
    //   //       children: <a>{props.record.total}</a>,
    //   //       props: {
    //   //         colSpan: props.col || 0,
    //   //       },
    //   //     };
    //   //   },
    //   // },
    //   renderElement: props => {
    //     const { index, record } = props;
    //     return (
    //       <a
    //         style={{ fontSize: "20px" }}
    //         onClick={this.addRow.bind(this, index, record)}>
    //         +
    //       </a>
    //     );
    //   },
    // },
    // {
    //   title: "other",
    //   children: [
    //     {
    //       title: "street",
    //       dataIndex: "street",
    //       width: 150,
    //       toolTip: {
    //         visible: true,
    //       },
    //     },
    //     {
    //       title: "building",
    //       dataIndex: "building",
    //       width: 250,
    //       toolTip: {
    //         visible: true,
    //       },
    //       editable: true, // 表格编辑框没有提示toolTip
    //       renderElement: props => {
    //         const { curColumn } = props;
    //         return (
    //           <SpanText
    //             displayType="select"
    //             options={[
    //               { value: "01", text: "zhao" },
    //               { value: "02", text: "zhao1" },
    //             ]}
    //             onSelect={(index, value) =>
    //               this.onChange(
    //                 index,
    //                 props.curColumn.dataIndex,
    //                 value
    //               )
    //             }
    //             onSearch={(index, value) =>
    //               this._debounce(index, curColumn.dataIndex, value)
    //             }
    //             {...{ props }}
    //           />
    //         );
    //       },
    //     },
    //   ],
    // },
    {
      title: "street",
      dataIndex: "street",
      width: 350,
      align: "right",
      toolTip: {
        visible: true,
      },
    },
    {
      title: "building",
      dataIndex: "building",
      width: 250,
      toolTip: {
        visible: true,
      },
      editable: true, // 表格编辑框没有提示toolTip
      renderElement: props => {
        const { curColumn } = props;
        return (
          <SpanText
            displayType="select"
            options={[
              { value: "01", text: "zhao" },
              { value: "02", text: "zhao1" },
            ]}
            onSelect={(index, value) =>
              this.onChange(index, props.curColumn.dataIndex, value)
            }
            onSearch={(index, value) =>
              this._debounce(index, curColumn.dataIndex, value)
            }
            {...{ props }}
          />
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
      width: 200,
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
      // colSpan: {
      //   col: 1,
      //   span: props => {
      //     return {
      //       children: <a>{props.record.value}</a>,
      //       props: {
      //         colSpan: props.col || 0,
      //       },
      //     };
      //   },
      // },
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
      width: "100%",
      toolTip: {
        visible: true,
      },
      // colSpan: {
      //   col: 1,
      //   span: props => {
      //     return {
      //       children: <a>{props.record.arg}</a>,
      //       props: {
      //         colSpan: props.col || 0,
      //       },
      //     };
      //   },
      // },
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
      width: 100,
      // fixed: "right",
      renderElement: props => {
        return <a onClick={this.delRow.bind(this, props.index)}>delete</a>;
      },
    },
  ];

  const getColumns = columns => {
    let col = 0;
    return columns.map((item, idx) => {
      if (typeof item.render != "function") {
        item.render = (text, record, index) => {
          if (record.colSpan) {
            if (item.colSpan && item.colSpan.col) {
              col = item.colSpan.col;
              return item.colSpan.span({
                ...{ text, record, index, item },
                ...{ col: item.colSpan.col },
              });
            }

            if (col > 0 && idx <= col) {
              console.log(1);
              return {
                props: {
                  colSpan: 0,
                },
              };
            }
          } else {
            return AutoToolTip(text, record, index, item);
          }
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
