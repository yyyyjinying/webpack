/* eslint-disable react/prop-types */
import React from "react";
import { observer } from "mobx-react";
import { columnRefs, mapFields } from "./columnRefs";
import { Modal, Form } from "antd";
import utils from "common/utils";
import "./style.less";
import { FormItem } from "component/base";
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

  render() {
    return (
      <Modal
        centered
        title="detail"
        okText={this.isDisabled() ? "修改" : "保存"}
        visible={this.props.isShow}
        onOk={e => this.submit(e)}
        onCancel={() => this.cancel()}
        afterClose={() => this.reset()}
        width="1200px"
        className="detail">
        <FormItem {...{ form: this.props.form, ...this.columnRefs() }} />
        {/* <button onClick={this.settimeHandle.bind(this)}>设置时间</button> */}
      </Modal>
    );
  }
}

export default Form.create(mapFields)(Details);
