import React from "react";
import {observer} from "mobx-react";
import {columnRefs} from "./columnRefs";
import {Form} from "antd";

@observer
class Details extends React.Component {
    constructor(props) {
        super(props)
        this.columnRefs = columnRefs.bind(this);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>121</div>
        );
    }
}

export default Form.create()(Details);
