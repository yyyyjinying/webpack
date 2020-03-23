import React from "react";
import {
  Row,
  Col,
  Checkbox,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
} from "antd";

const Base = (Props) => {
    const { spanColumn, COLUMNTYPE } = Props;
    const domType = item => {
      const { dataIndex, props, decorator } = item;
      // 展示add和edit
      const { getFieldDecorator } = Props.form;
      const domObj = {
        [COLUMNTYPE.checkboxType]: () =>
          getFieldDecorator(
            dataIndex,
            decorator
          )(<Checkbox {...props}>checked</Checkbox>),
        [COLUMNTYPE.numberType]: () =>
          getFieldDecorator(dataIndex, decorator)(<InputNumber {...props} />),
        [COLUMNTYPE.inputType]: () =>
          getFieldDecorator(dataIndex, decorator)(<Input {...props} />),
        [COLUMNTYPE.timeRangeType]: () =>
          getFieldDecorator(
            dataIndex,
            decorator
          )(<DatePicker.RangePicker {...props} />),
        [COLUMNTYPE.timeType]: () =>
          getFieldDecorator(dataIndex, decorator)(<DatePicker {...props} />),
        [COLUMNTYPE.selectType]: () =>
          getFieldDecorator(
            dataIndex,
            decorator
          )(
            <Select {...props}>
              {item.options &&
                item.options.map((itemOption, index) => {
                  return (
                    <Select.Option key={index} value={itemOption.value}>
                      {itemOption.text}
                    </Select.Option>
                  );
                })}
            </Select>
          ),
      };
      return domObj[item.type]();
    };
    return (
      <Form className="detailForm" layout="inline">
        <Row className="detailRow" gutter={24}>
          {spanColumn().map((item, index) => {
            return (
              item.visible && (
                <Col span={item.span} key={index}>
                  <Form.Item
                    style={item.style}
                    className={item.className + " item"}
                    label={item.title}>
                    {domType(item)}
                  </Form.Item>
                </Col>
              )
            );
          })}
          ;
        </Row>
      </Form>
    );
}

export default Base;
