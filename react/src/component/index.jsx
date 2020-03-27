import React from "react";
import { Table } from "antd";
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
    this.columns = this.columnRefs().spanColumn();
    this.rowSelection = this.columnRefs().rowSelection;
  }

  componentDidUpdate() {
      console.log("componentDidUpdate")
  }

  componentWillUnmount() {
      console.log("componentWillUnmount")
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

export default Index;
