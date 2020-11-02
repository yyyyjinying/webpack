let path = require("path");
let fs = require("fs");
let ejs = require("ejs");
let babylon = require("babylon");
let traverse = require("@babel/traverse").default;
let t = require("@babel/types");
let generator = require("@babel/generator").default;

// babylon 主要就是把源码 转化成ast
// @babel-traverse
// @babel-types
// @babel/generator
class Compiler {
  constructor(config) {
    // entry output
    this.config = config;

    // 需要保存入口文件的路径
    this.entryId; // "./src.index.js"

    // 需要保存所有的模块依赖
    this.modules = {};

    this.entry = config.entry; // 入口路径

    // 工作路径
    this.root = process.cwd();
  }

  // 解析源码
  parse(source, parentPath) {
    // AST解析语法树
    let ast = babylon.parse(source);
    let dependencies = []; // 依赖的数组
    traverse(ast, {
      CallExpression(p) {
        // 调用表达式
        let node = p.node; // 对应的节点
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value; // 就是模块的引用名字
          moduleName = moduleName + (path.extname(moduleName) ? "" : ".js");
          moduleName = "./" + path.join(parentPath, moduleName);
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        }
      },
    });

    let sourceCode = generator(ast).code;

    return { sourceCode, dependencies };
  }

  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, "utf8");
    let rules = this.config.module.rules;
    for (let i = 0; i < rules.length; i++) {
      let { test, use } = rules[i];
      let len = use.length - 1;
      if (test.test(modulePath)) {
        function normalLoader() {
          let loader = require(use[len--]);
          content = loader(content);
          if (len >= 0) {
            normalLoader();
          }
        }

        normalLoader();
      }
    }
    return content;
  }

  binldModule(modulePath, isEntry) {
    // 拿到模块的内容
    let source = this.getSource(modulePath);
    // 模块id src/index.js
    let moduleName = "./" + path.relative(this.root, modulePath);
    // console.log(source, moduleName);

    if (isEntry) {
      this.entryId = moduleName;
    }
    // 解析需要把source源码进行改造， 返回一个依赖列表
    let { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    );
    // 把相对路径和模块中的内容 对应起来
    // console.log(sourceCode, dependencies);
    this.modules[moduleName] = sourceCode;

    dependencies.forEach((dep) => {
      this.binldModule(path.join(this.root, dep), false);
    });
  }

  emitFile() {
    // 发射文件
    // 拿到输出的目录
    let main = path.join(this.config.output.path, this.config.output.filename);
    let templateStr = this.getSource(path.join(__dirname, "main.ejs"));
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules,
    });

    this.assets = {};
    this.assets[main] = code;
    console.log(code);
    fs.writeFileSync(main, this.assets[main]);
  }

  run() {
    // 执行 并且创建模块的依赖关系
    this.binldModule(path.resolve(this.root, this.entry), true);
    console.log(this.modules, this.entryId);
    // 发射一个文件， 打包后的文件
    this.emitFile();
  }
}

module.exports = Compiler;
