/* eslint-disable no-unused-vars */
import React from "react";
import C from "./utils";
import "./style.less";
class Index extends React.Component {
    componentDidMount(){
        const canvas = document.getElementById("canvas");
        const pos = C.getOffset(canvas);
        let W = canvas.width = 800;
        let H = canvas.height = 600;
        const ctx = canvas.getContext("2d");

        let mouse = C.getOffset(canvas);


        C.drawSystem(ctx, W, H);

        canvas.onmousemove = function(){
            ctx.clearRect(0, 0, W, H);

            let dx = mouse.x - W / 2;
            let dy = mouse.y - H / 2;

            let angle = Math.atan(dy / dx) * 180 / Math.PI;

            C.drawSystem(ctx, W, H);
            ctx.beginPath();
            ctx.lineTo(mouse.x, mouse.y);
            ctx.lineTo(W / 2, H / 2);
            ctx.stroke();
            ctx.fillText(angle, mouse.x, mouse.y);
        }


        canvas.onclick = function(){
            console.log(pos.x, pos.y);
        }
    }
    render(){
        return (
            <div>
                <canvas id="canvas">
                    您的浏览器不支持 HTML5 canvas 标签。
                    </canvas>
            </div>
        );
    }
}

export default Index;

