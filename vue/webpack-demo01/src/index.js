 import _ from 'lodash';
 import "./css/style.css";
 import Icon from "./img/icon.jpg";
 import Data from './data.xml';
 import printMe from './js/print';
 import {cube} from './js/math';

  function component() {
    console.log(cube(2));
    var element = document.createElement('div');
    var btn = document.createElement('button');

   // Lodash, now imported by this script
    element.innerHTML = _.join(['hello', 'webpack'], ' ');

    element.classList = "hello";

    // 将图像添加到我们现有的 div。
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    console.log(Data);

    btn.innerHTML = 'Click me and check the console!';
    element.onclick = printMe;

    return element;
  }

  let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./js/print', function() {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element);
      element = component(); // 重新渲染页面后，component 更新 click 事件处理
      document.body.appendChild(element);
    })
  }