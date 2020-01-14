import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    
    render() {
        const arr = [1,2,3,4,5];
        return (
            <div>
                {arr.map((item, index) => {
                    return <div key={index}>{item*2}</div>;
                })}
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));