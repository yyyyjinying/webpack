/* eslint-disable react/prop-types */
import React from "react";
import { Table, Form } from "antd";
import columnRefs from "./columnRefs";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      dataSource: [
        {
          key: "1",
          name: "胡彦斌",
          age: 32,
          address: "西湖区湖底公园1号",
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 42,
          address: "西湖区湖底公园1号",
        },
      ],
    };
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

  render() {
    return (
      <div>
        <Table
          bordered
          pagination={false}
          rowSelection={this.rowSelection}
          columns={this.columns}
          rowKey={(record, i) => i}
          dataSource={this.state.dataSource}
        />
      </div>
    );
  }
}
export default Form.create({})(Index);
