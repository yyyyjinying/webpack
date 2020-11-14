/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { render } from "react-dom";
import "./style.less";
// import "./tapable";
// import Car from "./car.jpg";

// const Img = new Image();
// Img.src = Car;

// document.body.appendChild(Img);
const sub = React.createElement(
  "h1",
  { id: "zhao", title: "一个子节点" },
  "标题文本01"
);
// eslint-disable-next-line no-unused-vars
class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>2324466322</h1>
          {sub}
          <window.other.default />
        </div>
      </div>
    );
  }
}

// render(sub, document.getElementById("app"));
render(<App />, document.getElementById("app"));
