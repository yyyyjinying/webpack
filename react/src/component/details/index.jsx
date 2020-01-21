/* eslint-disable react/prop-types */
import React from "react";
import {observer} from "mobx-react";
import {columnRefs, COLUMNTYPE} from "./columnRefs";
import {Row, Col, Form, Modal, Input, DatePicker, Select} from "antd";
const { Option } = Select;

import "./style.less";
@observer
class Details extends React.Component {
    constructor(props) {
        super(props)
        this.columnRefs = columnRefs.bind(this);
        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
        this.cancel = this.cancel.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
        this.hasEditStatus = this.hasEditStatus.bind(this);
        this.state = {
            editStatus: false, // 编辑按钮的状态 false：修改 true： 保存
            options: [
                {title: "jack", value: "jack"},
                {title: "pic", value: "pic"},
                {title: "tom", value: "tom"},
            ]
        };
    }

    hasEditStatus() {
        if (!this.state.editStatus) {
            this.setState({
                editStatus: true
            })
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
                this.props.openDialog({isShow: false, sign: this.props.sign, value: {...this.props.detail,...fieldsValue}});
            }
        });
    }

    // 取消
    cancel() {
        this.props.openDialog({isShow: false})
    }

    // 重制
    reset() {
        this.props.form.resetFields();
        this.setState({
            editStatus: false
        })
    }
    
    // 判断是否禁用
    isDisabled() {
        return this.props.sign == "edit" && !this.state.editStatus
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {spanColumn} = this.columnRefs();
        const dom = (item) => {            
            const {dataIndex, props, decorator} = item;

            // 展示detail
            if (this.props.sign == "detail") {
                return <span>{decorator.initialValue}</span>;
            }

            // 展示add和edit
            const domObj = {
                [COLUMNTYPE.inputType]:() => getFieldDecorator(dataIndex, decorator)(
                    <Input {...props}/>
                ),
                [COLUMNTYPE.timeType]:() => <DatePicker {...props} />,
                [COLUMNTYPE.selectType]:() => {
                    const children = item.options && item.options.map((itemOption, index) => {
                        return (<Option key={index} value={itemOption.title}>{itemOption.value}</Option>);
                    });
                    return <Select {...props}>{children}</Select>
                },
            }
            return domObj[item.type]();
        }
        const items = () => {
            return spanColumn().map((item, index) => { 
                return item.visible && <Col span={item.span} key={index}><Form.Item className="item" label={item.title}>{dom(item)}</Form.Item></Col>;
            })
        }
        return <Modal
            centered
            title="detail"
            okText={ this.isDisabled() ? "修改" : "保存"}           
            visible={this.props.isShow}
            onOk={(e) => this.submit(e)}
            onCancel={() => this.cancel()}
            afterClose={() => this.reset()}
            width="1000px"
            className="detail"
        >
            <Form className="detail-form" layout="inline">
                <Row className="detail-row" gutter={24}>{items()}</Row>
            </Form>
        </Modal>
    }
}

export default Form.create({
    mapPropsToFields: (props) => {
        console.log(props);
    },
    onValuesChange: (props, fields) => {
        console.log(props, fields)
    }
})(Details);
