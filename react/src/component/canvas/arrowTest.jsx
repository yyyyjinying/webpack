/* eslint-disable no-unused-vars */
import React from "react";
import C from "./utils";
import Arrow from "./utils/arrow";
class Index extends React.Component {
  mouseMove(W, H, ctx, canvas) {
    let arrow = new Arrow({
      x: W / 2,
      y: H / 2,
      w: 140,
      h: 60,
    }).render(ctx);

    let spead = 4;
    let mouse = C.getOffset(canvas);
    (function move() {
      window.requestAnimationFrame(move);

      let x = mouse.x - arrow.x;
      let y = mouse.y - arrow.y;

      // 防止抖动
      if (Math.abs(x) < 2) return;

      let angle = Math.atan2(y, x);
      let vx = spead * Math.cos(angle);
      let vy = spead * Math.sin(angle);

      ctx.clearRect(0, 0, W, H);

      arrow.x += vx;
      arrow.y += vy;
      arrow.rotation = angle;
      arrow.render(ctx);
    })();
  }
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = 800);
    let H = (canvas.height = 600);

    // 箭头跟随鼠标移动
    this.mouseMove(W, H, ctx, canvas);
  }
  render() {
    return (
      <div>
        <canvas id="canvas">您的浏览器不支持 HTML5 canvas 标签。</canvas>
      </div>
    );
  }
}

export default Index;
