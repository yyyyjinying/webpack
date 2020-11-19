import * as React from 'react';

class tsTest extends React.Component<any, any>{
    onClickHandle() {
        let str: number = 12;

        console.log(str);
    }
    render(){
        return (
            <div onClick={this.onClickHandle.bind(this)}>
                dfdfdf
            </div>
        )
    }
}

export default tsTest;