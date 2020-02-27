import moment from "moment";
export const getDateFormat = (timer, format = "YYYY-MM-DD") => {
    if (!timer) return null;
    const time = new Date(Number(timer));
    return moment(`${time.getFullYear()}${time.getMonth() + 1}${time.getDate()}`, format);
}

export const getTimerFormat = (momentType, format = "YYYY-MM-DD") => {
    return moment(momentType.format(format)).valueOf() || null;
}

export const getYNFormat = (bol = true, val = {on: "Y", off: "N"}) => {
    return bol ? val.on : val.off;
}

export const getYNBol = (val = "Y") => {
    return val.toString().toUpperCase() == "Y"; 
}