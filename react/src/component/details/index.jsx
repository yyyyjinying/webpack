/* eslint-disable react/prop-types */
import React from "react";
import { observer } from "mobx-react";
import { columnRefs, COLUMNTYPE } from "./columnRefs";
import { Row, Col, Checkbox, Form, Modal, Input, DatePicker, Select } from "antd";
import utils from "common/utils";
import moment from "moment";
const { Option } = Select;

import "./style.less";
// import "./style.css";

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

  // 提交
  submit(e) {
    // 提交按钮是编辑的状态时不能提交
    if (this.hasEditStatus()) return;

    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const beginTime = utils.getTimerFormat(fieldsValue["beginTime"], 'YYYY-MM-DD');
        const check = utils.getYNFormat(fieldsValue["check"]);
        fieldsValue = {...fieldsValue, beginTime, check };
        console.log("fieldsValue", fieldsValue)
        this.props.openDialog({
          isShow: false,
          sign: this.props.sign,
          value: { ...this.props.detail, ...fieldsValue, beginTime, check },
        });
      }
    });
  }

  // 取消
  cancel() {
    this.props.openDialog({ isShow: false });
    this.setState({
      checked: false
    })
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
      "beginTime": moment(1322195034000)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { spanColumn } = this.columnRefs();
    const domType = item => {
      const { dataIndex, props, decorator } = item;

      // 展示detail
      if (this.props.sign == "detail") {
        return <span>{decorator.initialValue}</span>;
      }

      // 展示add和edit
      const domObj = {
        [COLUMNTYPE.checkboxType]: () => getFieldDecorator(dataIndex, decorator)(<Checkbox {...props}>checked</Checkbox>),
        [COLUMNTYPE.inputType]: () => getFieldDecorator(dataIndex, decorator)(<Input {...props} />),
        [COLUMNTYPE.timeRangeType]: () => getFieldDecorator(dataIndex, decorator)(<DatePicker.RangePicker {...props} />),
        [COLUMNTYPE.timeType]: () => getFieldDecorator(dataIndex, decorator)(<DatePicker {...props} />),
        [COLUMNTYPE.selectType]: () => getFieldDecorator(dataIndex, decorator)(
          <Select {...props}>
            {
              item.options && item.options.map((itemOption, index) => {
                return <Option key={index} value={itemOption.value}>{itemOption.text}</Option>
              })
            }
          </Select>,
        ),
      };
      return domObj[item.type]();
    };
    const items = () => {
      return spanColumn().map((item, index) => {
        return (
          item.visible && (
            <Col span={item.span} key={index}>
              <Form.Item className="item" label={item.title}>
                {domType(item)}
              </Form.Item>
            </Col>
          )
        );
      });
    };
    
    return (
      <Modal
        centered
        title="detail"
        okText={this.isDisabled() ? "修改" : "保存"}
        visible={this.props.isShow}
        onOk={e => this.submit(e)}
        onCancel={() => this.cancel()}
        afterClose={() => this.reset()}
        width="1000px"
        className="detail"
      >
        <button onClick={this.settimeHandle.bind(this)}>设置时间</button>
        <Form className="detailForm" layout="inline"> 
          <Row className="detailRow" gutter={24}>
            {items()}
          </Row>
        </Form>
        
      </Modal>
    );
  }
}

export default Form.create({
  mapPropsToFields: props => {
    console.log("mapPropsToFields", props);
  },
  onFieldsChange: (props, fields) => {
    console.log("onFieldsChange", props, fields);
  },
  onValuesChange: (props, fields) => {
    console.log("onValuesChange", props, fields);
  },
})(Details);
