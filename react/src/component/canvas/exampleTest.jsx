/* eslint-disable no-unused-vars */
import React from "react";
import C from "./utils";
import "./style.less";
import Ball from "./utils/ball";
import Arrow from "./utils/arrow";
import { MehTwoTone } from "@ant-design/icons";
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

  // 圆周运动
  circle(W, H, ctx) {
    const ball = new Ball({
      x: W / 2,
      y: H / 2,
      r: 35,
    }).render(ctx);

    let angle = 0;
    let spead = 0.02;
    let r = 150;

    (function move() {
      window.requestAnimationFrame(move);

      ctx.clearRect(0, 0, W, H);

      ctx.beginPath();
      ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
      ctx.stroke();

      ball.x = W / 2 + r * Math.cos(angle);
      ball.y = H / 2 + r * Math.sin(angle);

      angle += spead;
      angle %= Math.PI * 2;
      ball.render(ctx);
    })();
  }

  // 圆周运动
  ellipse(W, H, ctx) {
    const ball = new Ball({
      x: W / 2,
      y: H / 2,
      r: 35,
    }).render(ctx);

    let angle = 0;
    let spead = 0.02;
    let rx = 200,
      ry = 80;

    (function move() {
      window.requestAnimationFrame(move);

      ctx.clearRect(0, 0, W, H);

      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.scale(1, 0.4);
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ball.x = W / 2 + rx * Math.cos(angle);
      ball.y = H / 2 + ry * Math.sin(angle);

      angle += spead;
      angle %= Math.PI * 2;
      ball.render(ctx);
    })();
  }

  vector(W, H, ctx) {
    let ball = new Ball({
      x: 50,
      y: 50,
      r: 30,
    }).render(ctx);

    let spead = 2;
    let angle = (30 * Math.PI) / 180;

    (function move() {
      window.requestAnimationFrame(move);

      ctx.clearRect(0, 0, W, H);

      let vx = spead * Math.cos(angle);
      let vy = spead * Math.sin(angle);
      ball.x += vx;
      ball.y += vy;
      ball.render(ctx);
    })();
  }

  gravity(W, H, ctx) {
    let ball = new Ball({
      x: W / 2,
      y: 100,
      r: 30,
    }).render(ctx);

    let g = 0.2,
      vy = 0;
    (function move() {
      window.requestAnimationFrame(move);
      ctx.clearRect(0, 0, W, H);
      ball.y += vy;
      vy += g;

      // if (ball.y + ball.r >= H){
      //   ball.y = H -
      // }
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

    // 圆周运动
    // this.circle(W, H, ctx);

    // 椭圆运动
    // this.ellipse(W, H, ctx);

    // 向量运动
    // this.vector(W, H, ctx);

    // 重力垂直运动
    // this.gravity(W, H, ctx);
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
