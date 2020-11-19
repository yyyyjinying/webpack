import React from "react";
class Topic extends React.Component{
    onClickHandle() {
        let str: number = 12;

        console.log(str);
    }
    render(){
        return (
            <div onClick={this.onClickHandle.bind(this)}>
                dfdfdfdfdfdfffffff
            </div>
        )
    }
}
export default Topic;