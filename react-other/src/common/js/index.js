function getThousandsGroupRegex(thousandsGroupStyle) {
    switch (thousandsGroupStyle) {
      case "lakh":
        return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
  
      case "wan":
        return /(\d)(?=(\d{4})+(?!\d))/g;
  
      case "thousand":
      default:
        return /(\d)(?=(\d{3})+(?!\d))/g;
    }
  }
  
  function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
    var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
    var index = str.search(/[1-9]/);
    index = index === -1 ? str.length : index;
    return (
      str.substring(0, index) +
      str
        .substring(index, str.length)
        .replace(thousandsGroupRegex, "$1" + thousandSeparator)
    );
  } //spilt a float number into different parts beforeDecimal, afterDecimal, and negation
  
  function splitDecimal(numStr) {
    var allowNegative =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var hasNagation = numStr[0] === "-";
    var addNegation = hasNagation && allowNegative;
    numStr = numStr.replace("-", "");
    var parts = numStr.split(".");
    var beforeDecimal = parts[0];
    var afterDecimal = parts[1] || "";
    return {
      beforeDecimal: beforeDecimal,
      afterDecimal: afterDecimal,
      hasNagation: hasNagation,
      addNegation: addNegation,
    };
  }
  