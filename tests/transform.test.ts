/*
 * @Author: Lu
 * @Date: 2024-02-02 11:22:18
 * @LastEditTime: 2024-02-02 20:14:36
 * @LastEditors: Lu
 * @Description:
 */
import { Parser } from "../src";
import { getTestData } from "./transform.testData";
const testData = getTestData();
const isOnly = testData.reduce((acc, v) => {
  if (acc) return acc;
  return !!v.only;
}, false);

describe.skip("transform", () => {
  testData
    .filter((v) => !v.skip)
    .filter((v) => (isOnly ? v.only : true))
    .forEach((v) => {
      test(v.name, () => {
        const $ = new Parser(v.input);
        expect($.transform()).toBe(v.output);
      });
    });
});
