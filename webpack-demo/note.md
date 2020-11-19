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
## 配置typescript
react react-dom react-route-dom typescript @types/react @types/react-dom


npm i eslint -D
npm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
npm i eslint-plugin-react -D
npm i eslint-config-alloy -D
npm i eslint-loader -D

npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy

"eslint": "^6.8.0",
    "eslint-friendly-formatter": "^4.0.1",
    "eslint-loader": "^3.0.3",
    "eslint-plugin-react": "^7.18.0",
    "@typescript-eslint/parser": "^4.8.1",
     "babel-eslint": "^10.0.3",