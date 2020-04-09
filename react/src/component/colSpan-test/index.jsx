/* eslint-disable react/prop-types */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Table, Form, Typography } from "antd";
import columnRefs from "./columnRefs";
import "./index.less";
import _ from "lodash";

// const { Text } = Typography;
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 选项下标标示
      selectedRow: [], // 勾选的数据
      dataSource: [
        {
          name: "胡彦斌",
          age: 3454.54434,
          street: "Lake Park1212",
          building: null,
          createTime: "2020-04-08", // 1322195034000, // ,
          address:
            "西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号",
          children: [
            {
              name: "胡彦斌",
              age: 3454.54434,
              street: "Lake Park1212",
              building: null,
              createTime: "2020-04-08", // 1322195034000, // ,
              address: "qwqwqw",
            },
          ],
        },
        {
          name: "胡彦祖",
          age: 0.678,
          address: "西湖区湖底公园1号",
          street: "Lake Park",
          building: "02",
          createTime: 1322195034000, // "2020-04-08",
        },
        {
          colSpan: true,
          total: "总计",
          value: 0.678,
          arg: 12,
        },
      ],
      saveData: [],
    };

    this._rowSelectionChange = this._rowSelectionChange.bind(this);

    // 置于状态申明之后
    this.columnRefs = columnRefs.bind(this);
    this.columns = this.columnRefs(this.props).getColumns();
    this.rowSelection = this.columnRefs(this.props).rowSelection;

    // 防抖动
    this._debounce = _.debounce(this.onRequest, 500).bind(this);
  }

  // 勾选
  _rowSelectionChange(selectedRowKeys = [], selectedRow = []) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRow: selectedRow,
    });
  }

  // 新增行
  addRow(index, record) {
    let { dataSource } = this.state;
    let newRecord = {};
    Object.keys(record).forEach(item => {
      newRecord[item] = null;
    });
    dataSource.splice(index + 1, 0, newRecord);
    this.setState({
      dataSource,
    });
  }

  // 删除行
  delRow(index) {
    let { dataSource } = this.state;
    this.setState({
      dataSource: dataSource.filter((item, idx) => idx != index),
    });
  }

  // 编辑
  onChange(index, key, value) {
    let { saveData, dataSource } = this.state;
    saveData[index] = { [key]: value };
    dataSource[index][key] = value;
    this.setState({
      saveData,
      dataSource,
    });
  }

  // 搜索
  onRequest(index, key, value) {
    console.log("request", key, value);
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
          size="small"
          pagination={false}
          rowSelection={this.rowSelection}
          columns={this.columns}
          rowKey={(record, i) => i}
          dataSource={this.state.dataSource}
          scroll={{ x: "100%" }}
          hideOnSinglePage={true} // 只有一页数据隐藏分页
          footer={() => {
            return (
              <div>
                <span>总计：</span>
                <span>30</span>
                <span>12</span>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
export default Form.create({})(Index);
