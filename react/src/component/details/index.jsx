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
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            isShow: true,
            expand: false,
            options: [
                {title: "jack", value: "jack"},
                {title: "pic", value: "pic"},
                {title: "tom", value: "tom"},
            ],
            detailValue: {
                "01": "01",
                "02": "02",
                "03": "03",
                "04": "04",
                "05": "05",
                "06": "06",
                "07": "07",
                "08": "08",
            }
        };
    }

    componentDidMount() {

    }

    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset() {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {spanColumn} = this.columnRefs();
        const dom = (item) => {            
            const {dataIndex, props, decorator} = item;
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
            okText="保存"           
            visible={this.state.isShow}
            onOk={(e) => this.handleReset(e)}
            onCancel={() => this.cancel()}
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
        // _.each(fields, (v, k) => {
        //     props.formData[k] = v
        // })
    }
})(Details);
