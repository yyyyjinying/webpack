/* eslint-disable react/prop-types */
import React from "react";
import { Form, InputNumber, Select, Input } from "antd";
import NumberFormat from "react-number-format";
class Test extends React.Component {

  onInputChange(event) {
    // event.persist()
    console.log(event);
  }
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
        <Input
          placeholder="请输入"
          disabled={false}
          // defaultValue={12434}
          // allowClear={true}
          // eslint-disable-next-line no-unused-vars
          onChange={(e) => setTimeout(() => {
            console.log(e)
            console.log(event.type); // => "click"
            this.onInputChange(e.target.value)
        },200)}
        />
        <Form>
          <Form.Item label="input">
            {getFieldDecorator("input", {             
              rules: [{ required: true, message: "Please number!" }],
            })(
              <Input
                onChange={(e) => {
                  e.persist()
                  console.log(e)
                }}
              />
            )}
          </Form.Item>
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
                onChange={this.onInputChange.bind(this)}
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
