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
  Tooltip,
} from "antd";

const FormItem = Props => {
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
};

const Render = (text, record, index, curColumn) => {
  // tip位置
  let placement = curColumn.toolTip && curColumn.toolTip.placement;

  // tip信息
  let title = curColumn.toolTip && curColumn.toolTip.title;
  placement = placement || "right";
  title = title || text;

  // format格式化
  if (curColumn.format) {
    title = curColumn.format(title);
  }

  // content内容
  let element = null;
  if (curColumn.renderElement) {
    element = curColumn.renderElement(text, curColumn, record, index);
  } else {
    element = <span className="span_text">{text}</span>;
  }

  if (curColumn.toolTip && curColumn.toolTip.visible) {
    element = (
      <Tooltip key={index} {...{ placement, title }}>
        <span>{element}</span>
      </Tooltip>
    );
  }
  return element;
};

export { FormItem, Render };
