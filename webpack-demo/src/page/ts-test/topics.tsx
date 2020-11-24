import React from "react";
import "./style";

class Topic extends React.Component{
    constructor(Iprops: any){
        super(Iprops);

    }
    onClickHandle() {
        let str: number = 12;

        console.log(str);
    }
    render(){
        return (
            <div className="box" onClick={this.onClickHandle.bind(this)}>
                dfdfdfdfdfdfffffff
            </div>
        )
    }
}
export default Topic;