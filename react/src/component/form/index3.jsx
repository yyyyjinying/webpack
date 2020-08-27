/* eslint-disable no-unused-vars */
import React from "react";
import C from "./utils";
import "./style.less";
import Ball from "./utils/ball";
class Index extends React.Component {
  // 缓慢运动
  slow(W, H, ctx) {
    const ball = new Ball({ x: W / 2, y: H / 2, r: 50 }).render(ctx);

    let angle = 0;
    const SWING = 160; // 振幅
    (function move() {
      window.requestAnimationFrame(move);

      ctx.clearRect(0, 0, W, H);

      ball.x = W / 2 + Math.sin(angle) * SWING;
      angle += 0.05;
      angle %= Math.PI * 2;

      ball.render(ctx);
    })();
  }

  // 脉冲运动
  pulse(W, H, ctx) {
    const ball = new Ball({
      x: W / 2,
      y: H / 2,
      r: 50,
    }).render(ctx);

    let angle = 0;
    let initScale = 1;
    const SWING = 0.5;
    (function move() {
      window.requestAnimationFrame(move);
      ctx.clearRect(0, 0, W, H);
      ball.scaleX = ball.scaleY = initScale + Math.sin(angle) + SWING;
      angle += 0.05;
      angle %= Math.PI * 2;
      ball.render(ctx);
    })();
  }

  // 匀速运动
  constant(W, H, ctx) {
    const ball = new Ball({
      x: 100,
      y: H / 2,
      r: 30,
    }).render(ctx);

    let angle = 0;
    let vx = 1;
    let vy = 0.5;
    const SWING = 60;

    (function move() {
      window.requestAnimationFrame(move);
      ctx.clearRect(0, 0, W, H);
      ball.x += vx;
      ball.y = H / 2 + Math.sin(angle) * SWING;
      angle += 0.05;
      angle %= Math.PI * 2;
      ball.render(ctx);
    })();
  }

  componentDidMount() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = 800);
    let H = (canvas.height = 600);
    // 缓慢运动
    // this.slow(W, H, ctx);

    // 匀速运动
    // this.constant(W, H, ctx);

    // 脉冲运动
    // this.pulse(W, H, ctx);
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
