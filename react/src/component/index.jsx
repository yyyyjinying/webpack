/* eslint-disable react/prop-types */
import React from "react";
import { Table, Form, Button } from "antd";
import columnRefs from "./columnRefs";
import "./index.less";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      dataSource: [
        {
          key: "1",
          name: "胡彦斌",
          age: 3454.54434,
          address: "西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号",
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 0.678,
          address: "西湖区湖底公园1号",
        },
      ],
    };

    this._rowSelectionChange = this._rowSelectionChange.bind(this);

    // this.state状态申明之后
    this.columnRefs = columnRefs.bind(this);
    this.columns = this.columnRefs(this.props).getColumns();
    this.rowSelection = this.columnRefs(this.props).rowSelection;
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  //   shouldComponentUpdate() {
  //     console.log("shouldComponentUpdate")
  //   }
  _rowSelectionChange(selectedRowKeys, selectedRow) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRow: selectedRow,
    })
  }

  resetRowSelection() {
    this._rowSelectionChange([], []);
  }

  render() {
    return (
      <div className="component_table">
        <Button onClick={this.resetRowSelection.bind(this)}>重置复选框</Button>
        <Table
          bordered
          pagination={false}
          rowSelection={this.rowSelection}
          columns={this.columns}
          rowKey={(record, i) => i}
          dataSource={this.state.dataSource}
          scroll={{x: "100%"}}
          hideOnSinglePage={true} // 一页数据隐藏分页
        />
      </div>
    );
  }
}
export default Form.create({})(Index);
