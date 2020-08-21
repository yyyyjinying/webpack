/* eslint-disable react/prop-types */
import React from "react";
import { observer } from "mobx-react";
import { columnRefs, mapFields } from "./columnRefs";
import { Modal, Form,Button } from "antd";
import * as utils from "@/common/utils";
import "./style.less";
import { FormItem } from "component/base";
import _ from "lodash";

const COLUMNTYPE = {
  checkboxType: 'checkbox',
  timeRangeType: "timeRange",
  timeType: 'time',
  inputType: "input",
  selectType: "select",
  numberType: "number",
};
@observer
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.columnRefs = columnRefs.bind(this);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.cancel = this.cancel.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.hasEditStatus = this.hasEditStatus.bind(this);
    this.state = {
      editStatus: false, // 编辑按钮的状态 false：修改 true： 保存
      test: "",
      columns: this.columnRefs().spanColumn()
    };
  }

  hasEditStatus() {
    if (this.props.sign == "edit" && !this.state.editStatus) {
      this.setState({
        editStatus: true,
      });
      return true;
    }
    return false;
  }

  _validateFields(e, backCallFn) {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        backCallFn(fieldsValue);
      }
    });
  }

  // 提交
  submit(e) {
    // 提交按钮是编辑的状态时不能提交
    if (this.hasEditStatus()) return;

    this._validateFields(e, fieldsValue => {
      const beginTime = utils.getTimerFormat(fieldsValue["beginTime"]);
      const timeRange = utils.getTimerArrayFormat(fieldsValue["timeRange"]);
      const check = utils.getYNFormat(fieldsValue["check"]);
      fieldsValue = { ...fieldsValue, beginTime, timeRange, check };
      console.log("fieldsValue", fieldsValue);
      this.props.openDialog({
        isShow: false,
        sign: this.props.sign,
        value: { ...this.props.detail, ...fieldsValue, beginTime, check },
      });
    });
  }

  // 取消
  cancel() {
    console.log(
      "moment",
      utils.getDateFormat("2012-03-04").format("YYYY-MM-DD")
    );
    console.log(
      "moment",
      utils.getDateFormat(1582732800000).format("YYYY-MM-DD")
    );
    this.props.openDialog({ isShow: false });
    this.setState({
      checked: false,
    });
  }

  // 重制
  reset() {
    this.props.form.resetFields();
    this.setState({
      editStatus: false,
    });
  }

  // 判断是否禁用
  isDisabled() {
    return this.props.sign == "edit" && !this.state.editStatus;
  }

  settimeHandle() {
    this.props.form.setFieldsValue({
      // "03": "setvalue"
      beginTime: utils.getDateFormat(1322195034000),
    });
  }

  test() {
    this.setState(
      {
        test: "test2222",
      },
      () => {
        console.log("22", this.state.test);
      }
    );
    console.log("test");
  }

  componentDidMount() {
    console.log("details");
  }

  inputNumberOnChange(val, option) {
    console.log(val, option);
  }
  delClick(item){
    let num = 1;
    let columns = this.state.columns.filter(xItem => xItem.dataIndex !== item.dataIndex);
    columns = columns.map(item => {
      if(item.dataIndex.search(/[0-9]/) !== -1){
        num++;
        item.title = "add" + num;
        item.dataIndex = "add" + num;
      }
      return item;
    })
    this.setState({
      columns
    });
  }
  
  addClick(){
    let {dataIndex} = _.last(this.state.columns);
    let idx = dataIndex.search(/[0-9]/);
    let first = dataIndex.slice(0,idx);
    let last = dataIndex.slice(idx);
    dataIndex = first + (++last);
    let cItem = {
      title: dataIndex,
      dataIndex: dataIndex,
      type: COLUMNTYPE.inputType,
      visible: true,
      children: (item) => {
        return <button onClick={this.delClick.bind(this, item)}>x</button>
      },
      props: {
        placeholder: "请输入",
        allowClear: true,
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (e) => {
          console.log("onChange", e.target.value);
        }
      },
      decorator: {
        initialValue: '',//this.props.detail["03"],
        rules: [{ required: false, message: "必填11" }],
      },
    };
    this.state.columns.push(cItem);
    this.setState({
      columns: this.state.columns
    })
  }

  render() {
    let {COLUMNTYPE} = this.columnRefs();
    return (
      <Modal
        centered
        title="detail"
        okText={this.isDisabled() ? "修改" : "保存"}
        visible={true}
        onOk={e => this.submit(e)}
        onCancel={() => this.cancel()}
        afterClose={() => this.reset()}
        width="1200px"
        className="detail">
          <Button type="primary" onClick={this.addClick.bind(this)}>add</Button>
        <FormItem form={this.props.form} columns={this.state.columns} COLUMNTYPE={COLUMNTYPE}/>
        {/* <button onClick={this.settimeHandle.bind(this)}>设置时间</button> */}
      </Modal>
    );
  }
}

export default Form.create(mapFields)(Details);
