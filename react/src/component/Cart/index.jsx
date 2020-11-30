import React from "react";
// import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import "./style.less";

class Cart extends React.Component {
  componentDidMount() {
    console.log("bus");
  }

  print() {
    window.print();
  }
  render() {
    return (
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[25, 25]}
        scale={1}>
        <div>I can now be moved around!</div>
      </Draggable>
    );
  }
}

export default Cart;
