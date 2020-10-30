/* eslint-disable no-unused-vars */
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./router";
// ReactDOM.render(<App />, document.getElementById("app"));
import "./style";
import moment from "moment";
import { add } from "./module";
console.log(add());

import "moment/locale/zh-cn"; // Ignore moment locale 手动引入zh-cn
moment.locale("zh-cn");
console.log(moment().format('ll' ));
console.log("test");

import Car from "./car.jpg";

import $ from "jquery";

const Img = new Image();
Img.src = Car;

document.body.appendChild(Img);
