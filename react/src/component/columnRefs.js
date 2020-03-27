/* eslint-disable react/display-name */
// 修复React属性丢失
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Input, Tooltip } from "antd";


// import utils from "utils";

// eslint-disable-next-line no-unused-vars
function columnRefs(props) {
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
      element = (
        <Tooltip key={index} {...{ placement, title }}>
          {element}
        </Tooltip>
      );
    }
    return element;
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      rules: [{ required: true, message: "Please number!" }],
      renderElement: text => {
        return (
          <Input
            placeholder="请输入"
            disabled={false}
            defaultValue={text}
            style={{ width: "140px" }}
            allowClear={true}
            onChange={() => {
              console.log("input");
            }}
            suffix={
              <Tooltip title="Extra information">
                {/* <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} /> */}
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
      renderElement: text => {
        return <span style={{ color: "red" }}>{text}</span>;
      },
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      toolTip: {
        visible: true,
      },
    },
  ];

  return {
    rowSelection: {
      type: "checkbox",
      columnWidth: "60px",
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRow) => {
        this.setState({
          selectedRowKeys,
          selectedRow,
        });
      },
    },
    getColumns: () => {
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
