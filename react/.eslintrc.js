module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        /**
            "off"或0 -关闭规则
            "warn" 或1 - 开启规则, 使用警告 程序不会退出
            "error"或2 - 开启规则, 使用错误 程序退出
        */ 
        "no-debugger": 1, // debugger提示
        "no-unused-vars": 2, // 变量underfined
        "no-multi-spaces": 1,//不能用多余的空格
    }
};