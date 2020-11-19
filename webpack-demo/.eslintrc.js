module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser', // 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': 1,
    /**
            "off"或0 -关闭规则
            "warn" 或1 - 开启规则, 使用警告 程序不会退出
            "error"或2 - 开启规则, 使用错误 程序退出
        */
    '@typescript-eslint/rule-name': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'prefer-const': 0,
    'no-debugger': 1, // debugger提示
    'no-unused-vars': 2, // 变量underfined
    'no-multi-spaces': 1, //不能用多余的空格
    //禁止使用没有定义的变量，除非在／＊global＊／已经申明
    'no-undef': 1,
    //禁止把undefined赋值给一个变量
    'no-undef-init': 2,
    //操作符前后需要加空格
    'space-infix-ops': 2,
    'no-string-refs': 0,
  },
};
