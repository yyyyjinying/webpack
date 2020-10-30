let {AsyncSeriesHook} = require("tapable");

class Lesson{
    constructor(){
        this.hooks = {
            arch: new AsyncSeriesHook(["name"]),
        }
    }

    tap(){
        this.hooks.arch.tapAsync("node", (name, cb) => {
            setTimeout(() => {
                console.log("node", name);
                cb();
            }, 1000)
        })
        this.hooks.arch.tapAsync("react", (name, cb) => {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("react", name);
                    cb();
                }, 1000)
            })
        })
    }

    start(){
        this.hooks.arch.callAsync("aa", (name) => {
            console.log("end", name)
        })
    }
}

export default Lesson;

