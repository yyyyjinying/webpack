import moment from "moment";
export const getDateFormat = (timer) => {
    return moment(timer) || null;
}
export const getArrayDateFormat = (Array = [1582732800000, 1585324800000]) => {
    return Array.map(item => moment(item));
}

export const getTimerArrayFormat = (momentArray = []) => {
    return momentArray.map(item => getTimerFormat(item));
}

export const getTimerFormat = (momentType) => {
    return moment(momentType).valueOf() || null;
}

export const getYNFormat = (bol = true, val = {on: "Y", off: "N"}) => {
    return bol ? val.on : val.off;
}

export const getYNBol = (val = "Y", equalValue = "Y") => {
    return String(val).toUpperCase() == String(equalValue); 
}

export const testFn = () => {
    let num = "0.898";
    if (!num) return "0.00";
    num = num.replace(/^0+/, '');
    console.log(num);
    let first = num.match(/^[0-9]+/)[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let last = "";
    if (num.indexOf(".") != -1) {
      last = num.match(/\.[0-9]*/)[0];
      last = last.length == 1 ? ".00" : Number(last).toFixed(2).match(/\.[0-9]*/)[0];
    } else {
      last = ".00";
    }
    console.log(first + "" + last);

  }