/* eslint-disable react/prop-types */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Table, Form } from "antd";
import columnRefs from "./columnRefs";
import "./index.less";
import _ from "lodash";
// eslint-disable-next-line no-unused-vars
import * as utils from "utils";
// import BigNumber from 'BignNumber.js'
// import {bigNumber} from "./test_component/bigNumber";
const Data = [
  {
    name: "胡彦斌",
    age: 3,
    street: "Lake Park1212",
    building: "01",
    createTime: "2020-04-08", // 1322195034000, // ,
    address:
      "西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号",
    children: [
      {
        name: "222",
        age: 2,
        street: "Lake Park1212",
        building: "02",
        createTime: "2020-04-08", // 1322195034000, // ,
        address: "qwqwqw",
      },
    ],
  },
  {
    name: "胡彦祖",
    age: 1,
    address: "西湖区湖底公园1号",
    street: "Lake Park",
    building: "02",
    createTime: 1322195034000, // "2020-04-08",
    children: [
      {
        name: "222",
        age: 2,
        street: "Lake Park1212",
        building: "02",
        createTime: "2020-04-08", // 1322195034000, // ,
        address: "qwqwqw",
      },
      {
        name: "333",
        age: 1,
        street: "Lake Park1212",
        building: "02",
        createTime: "2020-04-08", // 1322195034000, // ,
        address: "qwqwqw",
        children: [
          {
            name: "333",
            age: 1,
            street: "Lake Park1212",
            building: "02",
            createTime: "2020-04-08", // 1322195034000, // ,
            address: "qwqwqw",
          },
          {
            name: "333",
            age: 1,
            street: "Lake Park1212",
            building: "02",
            createTime: "2020-04-08", // 1322195034000, // ,
            address: "qwqwqw",
          },
        ],
      },
    ],
  },
];
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
      }
    );
  }

  componentDidMount() {}

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
    if(!allSelectBol){
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
    selectedRowKeys = this._allSelect(dataSource, record, selected, selectedRowKeys);
    this.rowSelection.selectedRowKeys = selectedRowKeys;
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows,
    });
  }

  // 新增行
  addRow(key, curRecord) {
    let { dataSource } = this.state;
    let newRecord = {};
    Object.keys(curRecord).forEach(item => {
      newRecord[item] = null;
    });
    this._setTagData(dataSource, key, (item, data, index) => {
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
  delRow(key) {
    let { dataSource } = this.state;
    this._setTagData(dataSource, key, (item, data, index) => {
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
      if (item.key == val) {
        backCallFn(item, data, index);
      }
      if (Array.isArray(item.children) && item.children.length > 0) {
        this._setTagData(item.children, val, backCallFn);
      }
    });
  }

  total() {
    let { dataSource } = this.state;
    let total = 0;
    function sum(data) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        total = Number(total) + Number(item.age);
        if (Array.isArray(item.children) && item.children.length > 0) {
          sum(item.children);
        }
      }
    }
    sum(dataSource);
    this.setState({
      total,
    });
  }

  // 编辑
  onChange(key, keyName, value) {
    let { dataSource } = this.state;
    this._setTagData(dataSource, key, record => {
      record[keyName] = value;
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

  // 通过key获取children
  _getChildrenToKey(keyArrs) {
    const key = keyArrs.length == 1 ? keyArrs[0] : null;
    let { dataSource } = this.state;
    let children = [];
    dataSource.forEach(item => {
      if (item.key == key) {
        children = item.children;
      }
    });

    let newRecord = {};
    return children.length == 0 && newRecord;
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
          size="small"
          pagination={false}
          rowSelection={this.rowSelection}
          columns={this.columns}
          // expandedRowRender={(record) => {
          //   return <p style={{ margin: 0 }}>{record.description}</p>
          // }}
          dataSource={this.state.dataSource}
          scroll={{ x: "100%" }}
          hideOnSinglePage={true} // 只有一页数据隐藏分页
          onExpandedRowsChange={keyArrs => {
            console.log(keyArrs);
          }}
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
