/* eslint-disable react/prop-types */
import React from "react";
import { Table, Form } from "antd";
import columnRefs from "./columnRefs";
import "./index.less";
import _ from "lodash";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 选项下标标示
      selectedRow: [], // 勾选的数据
      dataSource: [
        {
          key: "1",
          name: "胡彦斌",
          age: 3454.54434,
          street: "Lake Park1212",
          building: "a",
          address:
            "西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号",
          description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 0.678,
          address: "西湖区湖底公园1号",
          street: "Lake Park",
          building: "C",
          description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
        },
      ],
      saveData: [],
    };

    this._rowSelectionChange = this._rowSelectionChange.bind(this);

    // 置于状态申明之后
    this.columnRefs = columnRefs.bind(this);
    this.columns = this.columnRefs(this.props).getColumns();
    this.rowSelection = this.columnRefs(this.props).rowSelection;

    this._debounce = _.debounce(this.onInputChange, 500);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  _rowSelectionChange(selectedRowKeys = [], selectedRow = []) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRow: selectedRow,
    });
  }

  onInputChange(index, key, value) {
    let { saveData, dataSource } = this.state;
    saveData[index] = { [key]: value };
    dataSource[index][key] = value;
    this.setState(
      {
        saveData,
        dataSource,
      },
      () => {
        console.log(this.state.saveData);
        console.log(this.state.dataSource);
      }
    );
  }

  editChange(index, key, value) {
    let { dataSource } = this.state;
    dataSource[index][key] = value;
    this.setState({ dataSource });
  }

  render() {
    console.log("render");

    return (
      <div className="component_table">
        <Table
          // components={components}
          rowClassName={() => "editable-row"}
          bordered
          size="small"
          pagination={false}
          rowSelection={this.rowSelection}
          columns={this.columns}
          // expandedRowRender={(record) => {
          //   return <p style={{ margin: 0 }}>{record.description}</p>
          // }}
          rowKey={(record, i) => i}
          dataSource={this.state.dataSource}
          scroll={{ x: "100%" }}
          hideOnSinglePage={true} // 只有一页数据隐藏分页
        />
      </div>
    );
  }
}
export default Form.create({})(Index);
