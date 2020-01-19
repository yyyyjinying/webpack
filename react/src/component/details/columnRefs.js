const COLUMNTYPE = {timeType: "time", inputType: "input", selectType: "select"};
const SPAN_COLUMN_NUM = 12;
function columnRefs() {
    const columns = [
        {
            title: "01",
            dataIndex: "01",
            type: COLUMNTYPE.timeType,
            visible: true,
            props: {
                disabled: false, // true:禁用 false:开启
                onChange: (date, dateString) => {
                    console.log(date, dateString)
                }
            }
        },
        {
            title: "02",
            dataIndex: "02",
            type: COLUMNTYPE.selectType,
            visible: true,
            options: this.state.options,
            props: {
                disabled: false, // true:禁用 false:开启
                showSearch: true,
                defaultValue: "jack",
                placeholder: "Select a person",
                optionFilterProp: "children",                
                filterOption: (input, option) => {
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                },
                onChange: (value) => {
                    console.log(`selected ${value}`);
                },
                onFocus: () => {
                    console.log('blur');
                },
                onBlur: () => {
                    console.log('focus');
                },
                onSearch: (val) => {
                    console.log('search:', val);
                }
            }
        },
        {
            title: "03",
            dataIndex: "03",
            type: COLUMNTYPE.inputType,
            visible: true,
            props: {
                placeholder: "请输入",
                allowClear: true,
                disabled: false, // true:禁用 false:开启
            },
            decorator: {
                initialValue: this.state.detailValue["03"],
                rules: [
                    {required: true, message: "必填11"}
                ]
            }
        },
        {
            title: "04",
            dataIndex: "04",
            type: COLUMNTYPE.timeType,
            visible: true,
            props: {
                disabled: false, // true:禁用 false:开启
                onChange: (date, dateString) => {
                    console.log(date, dateString)
                }
            }
        },
        {
            title: "05",
            dataIndex: "05",
            type: COLUMNTYPE.inputType,
            visible: true,
            props: {
                allowClear: true,
                disabled: false, // true:禁用 false:开启
            },
            decorator: {
                initialValue: this.state.detailValue["05"],
                rules: [
                    {required: true, message: "必填11"}
                ]
            }
        },
        {
            title: "06",
            dataIndex: "06",
            type: COLUMNTYPE.inputType,
            visible: true,
            props: {
                allowClear: true,
                disabled: false, // true:禁用 false:开启
            },
            decorator: {
                initialValue: this.state.detailValue["06"],
                rules: [
                    {required: true, message: "必填11"}
                ]
            }
        },
        {
            title: "07",
            dataIndex: "07",
            type: COLUMNTYPE.inputType,
            visible: true,
            props: {
                allowClear: true,
                disabled: false, // true:禁用 false:开启
            },
            decorator: {
                initialValue: this.state.detailValue["07"],
                rules: [
                    {required: true, message: "必填11"}
                ]
            }
        },
        {
            title: "08",
            dataIndex: "08",
            type: COLUMNTYPE.inputType,
            visible: false,
            props: {
                allowClear: true,
                disabled: true, // true:禁用 false:开启
            },
            decorator: {
                initialValue: this.state.detailValue["08"],
                rules: [
                    {required: true, message: "必填11"}
                ]
            }
        }
    ];
    return {        
        spanColumn: () => {
            return columns.map(item => {
                item.span = SPAN_COLUMN_NUM;
                if (item.type == COLUMNTYPE.inputType) {
                    item.props.placeholder = item.props.placeholder || "请输入";
                }
                return item;
            })
        }
    }
}

export {
    columnRefs,
    COLUMNTYPE
}