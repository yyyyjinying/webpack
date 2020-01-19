import React from 'react';
import ReactDOM from 'react-dom';
import Test from "component/test";
import Detail from "component/details";

class App extends React.Component {
    
    render() {
        const arr = [4,6,5];
        return (
            <div>
                <Test/>
                <Detail/>
                {arr.map((item, index) => {
                    return <div key={index}>{item*2}</div>;
                })}
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));