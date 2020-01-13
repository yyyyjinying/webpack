'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = printMe;
function printMe() {
    // console.log("print me");
    // console.error('I get called from print.js!');
    console.log('Updating print.js...');
    var num = 0;
    console.log(num);

    var aa = function aa() {
        console.log('aa');
    };
    aa();
}
