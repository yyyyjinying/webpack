import React from "react";
import { render } from "react-dom";
import "./style.less";
// import "./tapable";
import Car from "./car.jpg";

const Img = new Image();
Img.src = Car;

document.body.appendChild(Img);

render(<h1>2324466322</h1>, document.getElementById("app"));
