/*
 * @Author: Lu
 * @Date: 2024-02-17 09:31:04
 * @LastEditTime: 2024-03-28 16:07:58
 * @LastEditors: Lu
 * @Description:
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
module.exports = {
  input: "src/index.ts", // 确保指向你的 TypeScript 入口文件
  output: [
    {
      file: "lib/index.js",
      format: "umd",
      name: "PureJSHtmlParser",
    },
    {
      file: "lib/index.es.js",
      format: "es",
      name: "PureJSHtmlParser",
    },
  ],
  plugins: [
    nodeResolve(), // 解析 node_modules 中的模块
    commonjs(), // 转换 CommonJS 模块为 ES6
    typescript(),
  ], // 使用 TypeScript 插件
};
