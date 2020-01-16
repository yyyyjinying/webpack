import React from 'react';
import ReactDOM from 'react-dom';
import Test from "./component/test";

class App extends React.Component {
    
    render() {
        const arr = [4,6,5];
        return (
            <div>
                <Test/>
                {arr.map((item, index) => {
                    return <div key={index}>{item*2}</div>;
                })}
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));