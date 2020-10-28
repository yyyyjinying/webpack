/* eslint-disable no-unused-vars */
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./router";
// ReactDOM.render(<App />, document.getElementById("app"));
import "./style.less";
import { add } from "./module";
console.log(add());
console.log("test");

import Car from "./car.jpg";

const Img = new Image();
Img.src = Car;

document.body.appendChild(Img);
