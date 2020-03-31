import moment from "moment";
export const getDateFormat = timer => {
  return moment(timer) || null;
};
export const getArrayDateFormat = (Array = [1582732800000, 1585324800000]) => {
  return Array.map(item => moment(item));
};

export const getTimerArrayFormat = (momentArray = []) => {
  return momentArray.map(item => getTimerFormat(item));
};

export const getTimerFormat = momentType => {
  return moment(momentType).valueOf() || null;
};

export const getYNFormat = (bol = true, val = { on: "Y", off: "N" }) => {
  return bol ? val.on : val.off;
};

export const getYNBol = (val = "Y", equalValue = "Y") => {
  return String(val).toUpperCase() == String(equalValue);
};

export const thousandSeparatorFormat = (str, thousandSeparator = ",") => {
  const thousandsGroupRegex = /(\d)(?=(\d{3})+(?!\d))/g;
  str = str != null ? String(str) : "";

  let beforeDecimal = "";
  let lastDecimal = "00";
  if (str.indexOf(".") != -1) {
    beforeDecimal = str.substring(0, str.search(/\./)) || "0";
    lastDecimal = str.substring(str.search(/\./) + 1, str.length) || "";
  } else {
    beforeDecimal = str;
  }

  const index = beforeDecimal.search(/[1-9]/);
  let strRes = beforeDecimal
    .substring(index, str.length)
    .replace(thousandsGroupRegex, "$1" + thousandSeparator);

  return [strRes]
    .concat(".")
    .concat(lastDecimal)
    .join("");
};
