/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Table, Form } from "antd";
import columnRefs from "./columnRefs";
import "./index.less";
import _ from "lodash";
import { Resizable, ResizableBox } from "react-resizable";
// import "react-resizable/css/styles.css";
// eslint-disable-next-line no-unused-vars
import * as utils from "utils";
import $ from "jquery";
// import BigNumber from 'BignNumber.js'
// import {bigNumber} from "./test_component/bigNumber";
const Data = [
  {
    name: "喔121212121212112121211212121121212112121喔喔喔喔",
    age: 3,
    street: "Lake Park1212",
    building: "01",
    createTime: "2020-04-08", // 1322195034000, // ,
    address:
      "西湖区湖底公园号西湖区湖底公园西湖区湖底公园号西湖区湖底公园西湖区湖底公园号西湖区湖底公园西湖区湖底公园号西湖区湖底公园",
  },
  {
    name: "喔喔喔喔喔喔喔喔喔12喔喔喔喔喔喔喔喔喔3喔喔喔喔喔喔喔喔喔喔喔喔",
    age: 1,
    address: "西湖区湖底公园1号",
    street: "Lake Park",
    building: "02",
    createTime: 1322195034000, // "2020-04-08",
  },
];

const ResizableTitle = props => {
  console.log("ResizableTitle", props);
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  // className?: string;
  //   width: number;
  //   height: number;
  //   handle?: React.ReactNode | ((resizeHandle: ResizeHandle) => React.ReactNode);
  //   handleSize?: [number, number];
  //   lockAspectRatio?: boolean;
  //   axis?: Axis;
  //   minConstraints?: [number, number];
  //   maxConstraints?: [number, number];
  //   onResizeStop?: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  //   onResizeStart?: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  //   onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => any;
  //   draggableOpts?: any;
  //   resizeHandles?: ResizeHandle[];

  return (
    <Resizable
      width={width}
      height={0}
      // lockAspectRatio={true}
      // lockAspectRatio={16 / 9}
      axis="x"
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      }
      onResizeStop={onResize}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manualSelectedRowKeys: [],
      selectedRowKeys: [], // 选项下标标示
      selectedRows: [], // 勾选的数据
      total: 0,
      dataSource: [],
      saveData: [],
      columns: [
        {
          title: "street",
          dataIndex: "street",
          width: 150,
          render: text => {
            return <span>{text}</span>;
          },
        },
        {
          title: "building",
          dataIndex: "building",
          width: 150,
          render: text => {
            return <span>{text}</span>;
          },
        },
      ],
    };

    this.components = {
      header: {
        cell: ResizableTitle,
      },
    };

    this._rowSelectionChange = this._rowSelectionChange.bind(this);

    // 置于状态申明之后
    this.columnRefs = columnRefs.bind(this);
    this.columns = this.columnRefs(this.props).getColumns();
    this.rowSelection = this.columnRefs(this.props).rowSelection;

    // 防抖动
    this._debounce = _.debounce(this.onRequest, 500).bind(this);
  }

  _setIdentifiy(data, idx = 0) {
    return data.map((item, index) => {
      let num = idx + index;
      item["key"] = String(num);
      if (Array.isArray(item.children)) {
        this._setIdentifiy(item.children, num + "-");
      }
      return item;
    });
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  UNSAFE_componentWillMount() {
    let dataSource = Data;
    dataSource = this._setIdentifiy(dataSource);
    console.log("int", dataSource);
    this.setState({
      dataSource,
    });
  }

  componentDidMount() {
    this.setColumn();
  }

  setColumn() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    this.setState({
      columns,
    });
  }

  _getUniqData(data, arrValue) {
    return data.filter(item => !arrValue.includes(item));
  }

  _getChildrenKeys(record) {
    let childrenKeys = [];
    function getKey(data) {
      data.forEach(item => {
        childrenKeys.push(item.key);
        if (Array.isArray(item.children)) {
          getKey(item.children);
        }
      });
    }
    if (record.children) getKey(record.children);
    return childrenKeys;
  }

  // 父级是否勾选
  _getParent(dataSource, record) {
    let childrenValue = [];
    // eslint-disable-next-line no-inner-declarations
    function getChildrenValue(dataSource, record) {
      for (let i = 0; i < dataSource.length; i++) {
        const item = dataSource[i];

        if (item.key == record.key) {
          for (let j = 0; j < dataSource.length; j++) {
            const sItem = dataSource[j];
            childrenValue.push(sItem.key);
          }
          break;
        }
        if (record.key.indexOf(item.key) == 0 && item.children) {
          getChildrenValue(item.children, record);
        }
      }
    }
    getChildrenValue(dataSource, record);
    return childrenValue;
  }

  _allSelect(dataSource, record, selected, selectedRowKeys) {
    let arrs = this._getParent(dataSource, record);
    // true 子项没有全选
    let allSelectBol = this._getUniqData(arrs, selectedRowKeys).length > 0;
    let allKeyString = arrs[0].substring(0, arrs[0].search(/(-\d)$/));
    if (!allSelectBol) {
      return [...selectedRowKeys, allKeyString];
    }
    return this._getUniqData(selectedRowKeys, allKeyString);
  }

  // 勾选
  _rowSelectionChange(record, selected, selectedRows) {
    let { selectedRowKeys, dataSource } = this.state;
    let recordKeys = [record.key, ...this._getChildrenKeys(record)];
    if (selected) {
      selectedRowKeys = [...selectedRowKeys, ...recordKeys];
    } else {
      selectedRowKeys = this._getUniqData(selectedRowKeys, recordKeys);
    }
    selectedRowKeys = this._allSelect(
      dataSource,
      record,
      selected,
      selectedRowKeys
    );
    this.rowSelection.selectedRowKeys = selectedRowKeys;
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows,
    });
  }

  // 搜索
  onRequest(key, keyName, value) {
    console.log("request", keyName, value);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("render");

    return (
      <div className="component_table">
        <Table
          bordered
          components={this.components}
          size="small"
          pagination={false}
          // rowSelection={this.rowSelection}
          columns={this.state.columns}
          // expandedRowRender={(record) => {
          //   return <p style={{ margin: 0 }}>{record.description}</p>
          // }}
          dataSource={this.state.dataSource}
          scroll={{ x: "100%" }}
          hideOnSinglePage={true} // 只有一页数据隐藏分页
        />
        {/* <div style={{ background: "red", padding: "30px", width: "200px" }}>
          <textarea rows="1" readOnly className="textarea" value="我问问" />
        </div> */}
        <ResizableBox
          width={200}
          height={200}
          // draggableOpts={}
          minConstraints={[100, 100]}
          maxConstraints={[300, 300]}>
          <span>Contents</span>
        </ResizableBox>
      </div>
    );
  }
}
export default Form.create({})(Index);
