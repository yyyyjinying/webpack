import {cube} from './math';
export default function printMe() {
    // console.log("print me");
    // console.error('I get called from print.js!');
    console.log('Updating print.js...');
    const num = 0;
    console.log(num);

    const aa = () => {
        console.log('aa');
    }
    aa();
}