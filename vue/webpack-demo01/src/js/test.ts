import {square} from "./math";
import {a} from "./1.js";
class per {
    created() {
        console.log(square(2));
        console.log(process.env.NODE_ENV);
    }


}

var p = new per();
p.created();