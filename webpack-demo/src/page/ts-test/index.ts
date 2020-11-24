
function getVal<T>(obj: T, k: keyof T){
    return obj[k];
}

let obj1 = {
    x: 1,
    y: 2,
}

let obj2 = {
    username: "zhaojinying",
    age: 29
}
let a = getVal<typeof obj2>(obj2, "username");
let b = getVal(obj1, "x");
console.log(a,b);



