/* eslint-disable react/prop-types */
import React from "react";
import { Form, InputNumber } from "antd";
class Test extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="MonthPicker">
          {getFieldDecorator("number", {
            initialValue: 23,
            rules: [{ required: true, message: "Please number!" }],
          })(
            <InputNumber
              formatter={value =>
                String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={value => String(value).replace(/\$\s?|(,*)/g, "")}
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({})(Test);
