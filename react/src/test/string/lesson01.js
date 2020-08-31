const getStr = str => {
  return str
    .match(/[\S]+/g)
    .map(item => {
      return item
        .split("")
        .reverse()
        .join("");
    })
    .join(" ");
};
// const getStr = str => {
//   return str
//     .split(" ")
//     .map(item => {
//       return item
//         .split("")
//         .reverse()
//         .join("");
//     })
//     .join(" ");
// };

export { getStr };
