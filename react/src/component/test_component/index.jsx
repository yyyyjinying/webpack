/* eslint-disable react/prop-types */
import React from "react";
import { Form, InputNumber, Select } from "antd";
import NumberFormat from "react-number-format";
class Test extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <NumberFormat
          value={2456981.09344}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={value => <span>{value}</span>}
        />
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
          <Form.Item>
            {getFieldDecorator("select")(
              <Select>
                {[
                  { value: "01", text: "zhao" },
                  { value: "02", text: "zhao1" },
                ].map((itemOption, index) => {
                  return (
                    <Select.Option key={index} value={itemOption.value}>
                      {itemOption.text}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(Test);
