## webpack安装
- 本地安装 
- yarn add webpack webpack-cli -D

## 手工配置webpack
- 默认配置文件 webpack.config.js
- package.json script配置，"start": "npx webpack --config ./build/dev.config.js",
```json
"scripts": {
    "test": "jest",
    "dev": "npx webpack-dev-server --config ./build/dev.config.js",
    "start": "npx webpack --config ./build/dev.config.js",
    "prod": "npx webpack --config ./build/prod.config.js"
},
```
## 配置css和less的module的rules规则
- less 可以引入 css
- css 不可以引入 less
```json
    {
        test: /\.less$/,
        use: [ // 顺序问题 先右后左 先下后上
        { 
            loader: "style-loader",
            options: {
            insert: function(element) { // // 将css插入head 可以指定位置
                var parent = document.querySelector('head');
                parent.insertBefore(element, parent.firstChild);
            }
            }
        },
        {
            loader: "css-loader", // @import 语法 
        },
        {
            loader: "postcss-loader",
            options: {
            parser: "postcss-less",
            syntax: "postcss-less",
            ident: "postcss",
            plugins: loader => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("autoprefixer")(),
                require("cssnano")(),
            ],
            },
        },
        {
            loader: "less-loader", // less -> css
            options: {
            javascriptEnabled: true, // 解决less混入
            },
        },
    }
```


