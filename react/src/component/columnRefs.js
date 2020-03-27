// 修复React属性丢失
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Tooltip } from "antd";
// import utils from "utils";

function columnRefs() {
  const render = (text, record, index, curColumn) => {
    // tip位置
    let placement = curColumn.toolTip && curColumn.toolTip.placement;

    // tip信息
    let title = curColumn.toolTip && curColumn.toolTip.title;
    placement = placement || "rightTop";
    title = title || text;

    // content内容
    let element = null;
    if (curColumn.renderElement) {
      element = curColumn.renderElement(text, record, index, curColumn);
    } else {
      element = <span>{text}</span>;
    }

    if (curColumn.toolTip && curColumn.toolTip.visible) {
        element = <Tooltip key={index} {...{ placement, title }}>
          {element}
        </Tooltip>
    }
    return (element);
  };
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      toolTip: {
        visible: true,
        placement: "right",
        title: "提示信息test",
      },
      // eslint-disable-next-line react/display-name
      renderElement: text => {
        return <span style={{color: "red"}}>{text}</span>;
      },
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      toolTip: {
        visible: true,
      }
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      toolTip: {
        visible: true,
      }
    },
  ];

  const { selectedRowKeys } = this.state;

  return {
    rowSelection: {
      type: "checkbox",
      columnWidth: "60px",
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRow) => {
        this.setState({
          selectedRowKeys,
          selectedRow,
        });
      },
    },
    spanColumn: () => {
      return columns.map(item => {
        if (typeof item.render != "function") {
          item.render = (text, record, index) => {
            return render(text, record, index, item);
          };
          return item;
        }
      });
    },
  };
}

export default columnRefs;
