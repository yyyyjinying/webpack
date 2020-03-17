import utils from "common/utils";

const COLUMNTYPE = {
  checkboxType: 'checkbox',
  timeRangeType: "timeRange",
  timeType: 'time',
  inputType: "input",
  selectType: "select",
};
const SPAN_COLUMN_NUM = 8;
function columnRefs() {
  const columns = [
    {
      title: "beginTim",
      dataIndex: "beginTime",
      type: COLUMNTYPE.timeType,
      className: "beginTime",
      visible: true,
      props: {
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (date, dateString) => {
          console.log(date, dateString);
        },
        format: "YYYY-MM-DD",
        placeholder: "自定义文本",
      },
      decorator: {
        initialValue: utils.getDateFormat(this.props.detail["beginTime"]),// utils.getDateFormat(this.props.detail["beginTime"], "YYYY-MM-DD"),
        rules: [{ type: 'object', required: true, message: 'Please select time!' }]
      }
    },
    {
      title: "timeRange",
      dataIndex: "timeRange",
      type: COLUMNTYPE.timeRangeType,
      visible: false,
      props: {
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (date, dateString) => {
          console.log(date, dateString);
        },
        format: "YYYY-MM-DD",
        placeholder: ["start01", "end01"],
      },
      decorator: {
        initialValue: utils.getArrayDateFormat(this.props.detail["timeRange"]),
        rules: [{ type: 'array', required: true, message: 'Please select time!' }]
      }
    },
    {
      title: "select",
      dataIndex: "select",
      type: COLUMNTYPE.selectType,
      visible: true,
      options: [
        { text: "jack", value: "01" },
        { text: "pic", value: "02" },
        { text: "tom", value: "03" },
      ],
      props: {
        disabled: this.isDisabled(), // true:禁用 false:开启
        showSearch: true,
        placeholder: "Select a person",
        onChange: value => {
          console.log(`selected ${value}`);
        },
        onFocus: () => {
          console.log("blur");
        },
        onBlur: () => {
          console.log("focus");
        },
        onSearch: val => {
          console.log("search:", val);
        },
      },
      decorator: {
        initialValue: this.props.detail["select"],
        rules: [{ required: true, message: "必填11" }],
      },
    },
    {
      title: "03",
      dataIndex: "03",
      type: COLUMNTYPE.inputType,
      visible: true,
      props: {
        placeholder: "请输入",
        allowClear: true,
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (e) => {
          console.log("onChange", e.target.value);
        }
      },
      decorator: {
        initialValue: this.props.detail["03"],
        rules: [{ required: false, message: "必填11" }],
      },
    },
    {
      title: "03",
      dataIndex: "03",
      type: COLUMNTYPE.inputType,
      visible: true,
      props: {
        placeholder: "请输入",
        allowClear: true,
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (e) => {
          console.log("onChange", e.target.value);
        }
      },
      decorator: {
        initialValue: this.props.detail["03"],
        rules: [{ required: false, message: "必填11" }],
      },
    },
    {
      title: "04",
      dataIndex: "04",
      type: COLUMNTYPE.inputType,
      visible: true,
      props: {
        placeholder: "请输入",
        allowClear: true,
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (e) => {
          console.log("onChange", e.target.value);
        }
      },
      decorator: {
        initialValue: this.props.detail["03"],
        rules: [{ required: false, message: "必填11" }],
      },
    },
    {
      title: "05",
      dataIndex: "05",
      type: COLUMNTYPE.inputType,
      visible: true,
      props: {
        placeholder: "请输入",
        allowClear: true,
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (e) => {
          console.log("onChange", e.target.value);
        }
      },
      decorator: {
        initialValue: this.props.detail["03"],
        rules: [{ required: false, message: "必填11" }],
      },
    },
    {
      title: null,
      dataIndex: "check",
      type: COLUMNTYPE.checkboxType,
      visible: true,
      props: {
        disabled: this.isDisabled(), // true:禁用 false:开启
        onChange: (param) => {
          console.log("checked", param.target.checked);
        }
      },
      decorator: {
        valuePropName: 'checked',
        initialValue: utils.getYNBol(this.props.detail["check"])
      },
    },
  ];
  return {
    spanColumn: () => {
      return columns.map(item => {
        item.span = SPAN_COLUMN_NUM;
        if (item.type == COLUMNTYPE.inputType) {
          item.props.placeholder = item.props.placeholder || "请输入";
        }
        return item;
      });
    },
  };
}

export { columnRefs, COLUMNTYPE };
