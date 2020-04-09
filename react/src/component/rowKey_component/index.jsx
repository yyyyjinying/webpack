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
          key: 1,
          name: "胡彦斌",
          age: 3454.54434,
          street: "Lake Park1212",
          building: null,
          createTime: "2020-04-08", // 1322195034000, // ,
          address:
            "西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号",
          description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
          children: [
            {
              key: 11,
              name: "胡彦祖",
              age: 0.678,
              address: "西湖区湖底公园1号",
              street: "Lake Park",
              building: "02",
              createTime: 1322195034000, // "2020-04-08",
              description:
                "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            },
            {
              key: 12,
              name: "胡彦祖",
              age: 0.678,
              address: "西湖区湖底公园1号",
              street: "Lake Park",
              building: "02",
              createTime: 1322195034000, // "2020-04-08",
              description:
                "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            },
          ],
        },
        {
          key: 2,
          name: "胡彦祖",
          age: 0.678,
          address: "西湖区湖底公园1号",
          street: "Lake Park",
          building: "02",
          createTime: 1322195034000, // "2020-04-08",
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

    // 防抖动
    this._debounce = _.debounce(this.onRequest, 500).bind(this);
  }

  _setIdentifiy(data, idx = 1) {
    return data.map((item, index) => {
      let cNum = 0;
      let num = idx + index;
      item["key"] = num;

      if (Array.isArray(item.children) && item.children.length > 0) {
        num = Math.pow(10, ++cNum) * num + 1;
        this._setIdentifiy(item.children, num);
      }
      return item;
    });
  }

  UNSAFE_componentWillMount() {
    // let { dataSource } = this.state;
    // dataSource = this._setIdentifiy(dataSource);
    // console.log("int", dataSource);
    // this.setState(
    //   {
    //     dataSource,
    //   },
    //   () => {
    //     // this.total();
    //     console.log(this.state.dataSource);
    //   }
    // );
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

  // 新增行
  addRow(index, record) {
    let { dataSource } = this.state;
    let newRecord = {};
    Object.keys(record).forEach(item => {
      newRecord[item] = null;
    });
    dataSource.splice(index, 0, newRecord);
    this.setState({
      dataSource,
    });
  }

  onChange(index, key, value) {
    let { saveData, dataSource } = this.state;
    saveData[index] = { [key]: value };
    dataSource[index][key] = value;
    this.setState({
      saveData,
      dataSource,
    });
  }

  onRequest(index, key, value) {
    console.log("request", key, value);
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
          // expandedRowRender={(record) => {
          //   return <p style={{ margin: 0 }}>{record.description}</p>
          // }}
          // rowKey={(record, i) => i}
          // dataSource={this._setIdentifiy(this.state.dataSource)}
          dataSource={this.state.dataSource}
          scroll={{ x: "100%" }}
          hideOnSinglePage={true} // 只有一页数据隐藏分页
        />
      </div>
    );
  }
}
export default Form.create({})(Index);
