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

export const getYNBol = (val = "Y") => {
    return val.toString().toUpperCase() == "Y"; 
}