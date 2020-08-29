let C = {};

C.getOffset = (ele, fnBack) => {
  let mouse = { x: 0, y: 0 };
  ele.addEventListener("mousemove", e => {
    let { x, y } = C.eventWarpper(e);
    mouse.x = x;
    mouse.y = y;

    fnBack && fnBack(mouse);
  });

  return mouse;
};

C.eventWarpper = ev => {
  let { pageX, pageY, target } = ev;
  let { left, top } = target.getBoundingClientRect();
  return { x: pageX - left, y: pageY - top };
};

// 角度转化弧度
C.toRad = angle => {
  return (angle = (angle * Math.PI) / 180);
};

// 弧度转化角度
C.toAngle = rad => {
  return (rad * 180) / Math.PI;
};

C.drawSystem = (ctx, W, H) => {
  ctx.save();
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  //ctx.move();
  ctx.stroke();
  ctx.restore();
};

export default C;
