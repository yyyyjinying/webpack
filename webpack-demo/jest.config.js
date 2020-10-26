//jest babel-jest babel-plugin-transform-es2015-modules-commonjs
module.exports = {
  verbose: true,
  testMatch: ["<rootDir>/test/**/*.test.*"],
  testPathIgnorePatterns: ["node_modules", "<rootDir>/mock/"],
  testEnvironment: "jsdom",
  rootDir: "./src",
  moduleFileExtensions: ["js", "jsx", "ts", "json"],
};
