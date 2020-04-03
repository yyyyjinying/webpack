import React from "react";
import EditInput from "./editInput";

const ele = (props) => {
    // eslint-disable-next-line react/prop-types
    return <span className="span_text">{props.children}</span>;
}

const SpanText = (props) => {
    if (props.editChange) {
        return <EditInput SpanText={ele} {...{props}}/>
    }
    return ele(props);
}

export default SpanText;
