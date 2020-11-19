// module.exports = {
//   trailingComma: "es5", // "<none|es5|all>" 尾随逗号
//   tabWidth: 2,
//   useTabs: false, // 空格填充tab
//   semi: true, // 添加分号
//   singleQuote: false, // 使用双引号
//   jsxSingleQuote: false, // jsx使用双引号
//   bracketSpacing: true, // 在对象文字中的括号之间打印空格
//   jsxBracketSameLine: true, // 多行JSX元素的放在最后一行的末尾
//   arrowParens: "avoid", // "<avoid|always>"
//   requirePragma: false,
//   htmlWhitespaceSensitivity: "strict", // <css|strict|ignore>"
//   endOfLine: "auto", // 换行
// };
// // .prettierrc.js
module.exports = {
  // 一行最多 120 字符
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto',
};
