/* eslint-disable react/prop-types */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Table, Form, Typography } from "antd";
import columnRefs from "./columnRefs";
import "./index.less";
import _ from "lodash";
// import BigNumber from 'BignNumber.js'
// import {bigNumber} from "./test_component/bigNumber";
const Data = [
  {
    name: "胡彦斌",
    age: 3,
    key: "0",
    street: "Lake Park1212",
    building: "01",
    createTime: "2020-04-08", // 1322195034000, // ,
    address:
      "西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号",
    // children: [
    //   {
    //     name: "222",
    //     age: 2,
    //     key: "0-1",
    //     street: "Lake Park1212",
    //     building: "02",
    //     createTime: "2020-04-08", // 1322195034000, // ,
    //     address: "qwqwqw",
    //   },
    // ],
  },
  {
    parent: true,
    name: "胡彦祖",
    age: 1,
    key: "1",
    address: "西湖区湖底公园1号",
    street: "Lake Park",
    building: "02",
    createTime: 1322195034000, // "2020-04-08",
    // children: [
    //   {
    //     key: "1-0",
    //     name: "333",
    //     age: 1,
    //     street: "Lake Park1212",
    //     building: "02",
    //     createTime: "2020-04-08", // 1322195034000, // ,
    //     address: "qwqwqw",
    //   },
    // ],
  },
];
// const { Text } = Typography;
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 选项下标标示
      selectedRow: [], // 勾选的数据
      total: 0,
      dataSource: [],
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

  _setIdentifiy(data, idx = "") {
    return data.map((item, index) => {
      item["tag"] = idx + "" + index + "";
      if (Array.isArray(item.children) && item.children.length > 0) {
        this._setIdentifiy(item.children, index + "-");
      }
      return item;
    });
  }

  UNSAFE_componentWillMount() {
    let dataSource = Data;
    dataSource = this._setIdentifiy(dataSource);
    console.log("int", dataSource);
    this.setState(
      {
        dataSource,
      },
      () => {
        this.total();
        console.log(this.state.dataSource);
      }
    );
  }

  componentDidMount() {}

  // 勾选
  _rowSelectionChange(selectedRowKeys = [], selectedRow = []) {
    this.rowSelection.selectedRowKeys = selectedRowKeys;
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRow: selectedRow,
    });
  }

  // 新增行
  addRow(tag, curRecord) {
    let { dataSource } = this.state;
    let newRecord = {};
    Object.keys(curRecord).forEach(item => {
      newRecord[item] = null;
    });
    this._setTagData(dataSource, tag, (item, data, index) => {
      data.splice(index + 1, 0, newRecord);
      dataSource = this._setIdentifiy(dataSource);
      this.setState(
        {
          dataSource,
        },
        () => {
          this.total();
        }
      );
    });
  }

  // 删除行
  delRow(tag) {
    debugger;
    let { dataSource } = this.state;
    this._setTagData(dataSource, tag, (item, data, index) => {
      data.splice(index, 1);
      dataSource = this._setIdentifiy(dataSource);
      this.setState(
        {
          dataSource,
        },
        () => {
          this.total();
        }
      );
    });
  }

  _setTagData(data, val, backCallFn) {
    data.forEach((item, index) => {
      if (item.tag == val) {
        debugger;
        backCallFn(item, data, index);
      }
      if (Array.isArray(item.children)) {
        this._setTagData(item.children, val, backCallFn);
      }
    });
  }

  // total
  _total(data, total) {
    data.forEach(item => {
      total = total + "-" + item.age;
      if (Array.isArray(item.children)) {
        this._total(item.children, total);
      }
    });
    return total;
  }

  total() {
    let { dataSource } = this.state;
    let total = 0;
    total = this._total(dataSource, total);
    console.log(total);
    this.setState({
      total,
    });
  }

  // 编辑
  onChange(tag, key, value) {
    let { dataSource } = this.state;
    this._setTagData(dataSource, tag, record => {
      record[key] = value;
      this.setState(
        {
          dataSource,
        },
        () => {
          console.log(this.state.dataSource);
          this.total();
        }
      );
    });
  }

  // 搜索
  onRequest(tag, key, value) {
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
          // expandedRowRender={(record) => {
          //   return <p style={{ margin: 0 }}>{record.description}</p>
          // }}
          rowKey={(record, i) => i}
          dataSource={this.state.dataSource}
          scroll={{ x: "100%" }}
          hideOnSinglePage={true} // 只有一页数据隐藏分页
          footer={() => {
            return (
              <div className="footer_total">
                <span>年龄总计：</span>
                <span>{this.state.total}</span>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
export default Form.create({})(Index);
